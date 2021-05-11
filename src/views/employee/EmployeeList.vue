<template>
  <div>
    <div class="content">
      <div class="title-box">
        <div class="title">Nhân viên</div>
        <Button text="Thêm mới nhân viên" @click="btnClickAddEmployee" />
      </div>
      <div class="toolbar-box mt-1">
        <div class="toolbar-left"></div>
        <div class="toolbar-right">
          <FieldInput
            styleInput="width: 280px"
            placeholder="Tìm theo Mã, Tên hoặc Số điện thoại"
            icon="search"
            v-model="employeeFilter"
            @change="onHandleEmployeeFilter"
          />
          <div class="btn-refresh">
            <Button
              :onlyIcon="true"
              icon="redo fa-2x"
              styleBtn=" border:none;padding-top:4px;"
              @click="btnRefreshData"
            />
          </div>
        </div>
      </div>
      <div class="grid bg-white">
        <table class="table">
          <thead>
            <tr>
              <th><Checkbox /></th>
              <th>MÃ NHÂN VIÊN</th>
              <th>TÊN NHÂN VIÊN</th>
              <th>GIỚI TÍNH</th>
              <th>NGÀY SINH</th>
              <th>SỐ CMND</th>
              <th>CHỨC DANH</th>
              <th>TÊN ĐƠN VỊ</th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN NGÂN HÀNG</th>
              <th>CHI NHÁNH TK NGÂN HÀNG</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            <EmployeeItem
              v-for="e in employees"
              :key="e.EmployeeId"
              :employee="e"
              @dblclick="onDblClickEmployeeItem"
              @updateEmployee="onDblClickEmployeeItem"
              @btnDelEmployee="btnDelEmployee"
            />
          </tbody>
        </table>
        <div v-if="!hasData">
          <div
            class="has-text-center"
            style="font-size: 15px; font-weight: bold; padding: 100px"
          >
            Không có dữ liệu.
          </div>
        </div>
        <div class="footer" v-if="employees.length != 0">
          <div class="footer-left">
            Tổng số:
            <span style="font-weight: bold">{{ countEmloyees }}</span> bản ghi
          </div>

          <div class="footer-right">
            <div class="combobox">
              <Combobox
                styleCombobox="width: 210px"
                :option="optionPage"
                @change="onHandleEmployeeFilter"
                v-model="limit"
              />
            </div>
            <Pagination :page="page" :totalPage="totalPage" />
          </div>
        </div>
      </div>
    </div>
    <DialogEmployee
      :show="isShowDialogEmployee"
      :employee="selectedEmployee"
      :optionDepartment="optionDepartment.slice(1)"
      @onClose="onCloseDialogEmployee"
      @onSave="saveEmployee"
    />
    <AlertDialog
      :show="isShowAlertDialog"
      :msg="msg"
      @onClose="onCloseAlertDialog"
    />
    <ConfirmDialog
      :show="isShowConfirmDialog"
      :msg="msgConfirm"
      @onClose="onCloseConfirmDialog"
      @onOk="delEmployee"
    />
  </div>
</template>

<script>
import Button from "../../components/Button";
import FieldInput from "../../components/FieldInput";
import Checkbox from "../../components/Checkbox";
import Combobox from "../../components/Combobox";
import AlertDialog from "../../components/AlertDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import Pagination from "../../components/Pagination";

import DialogEmployee from "./DialogEmployee";
import EmployeeItem from "./EmployeeItem";

import axios from "axios";

export default {
  name: "EmployeeList",
  components: {
    Button,
    FieldInput,
    Checkbox,
    Combobox,
    AlertDialog,
    ConfirmDialog,
    EmployeeItem,
    DialogEmployee,
    Pagination,
  },

  created() {
    this.fetchCountEmployees();
    this.fetchData();
    this.fetchDepartments();
  },
  data() {
    return {
      /**
       * các option cho combobox đơn vị.
       */
      optionDepartment: [{ value: "", text: "Tất cả phòng ban" }],

      /**
       * các option cho combobox phân trang.
       */
      optionPage: [
        { value: 10, text: "10 bản ghi trên 1 trang" },
        { value: 20, text: "20 bản ghi trên 1 trang" },
        { value: 30, text: "30 bản ghi trên 1 trang" },
        { value: 50, text: "50 bản ghi trên 1 trang" },
        { value: 100, text: "100 bản ghi trên 1 trang" },
      ],

      /**
       * Mảng nhân viên được fetch từ server (có filter).
       */
      employees: [],
      hasData: true,

      /**
       * Dữ liệu nhân viên đang được chọn. Biến này dùng để truyền qua component con dialog thêm và sửa.
       * Mặc định là thêm mới - Nhân viên rỗng.
       */
      selectedEmployee: {},

      /**
       * Id của nhân viên đang được chọn từ bảng. Id này dùng xác định xóa nhân viên cần xóa.
       * Mặc định là null.
       */
      selectedEmployeeId: null,

      /**
       * Mã của nhân viên đang được chọn từ bảng. mã này dùng check trùng mã.
       * Mặc định là null.
       */
      selectedEmployeeCode: null,

      /**
       * Filter danh sách nhân viên theo mã hoặc tên hoặc số điện thoại. Mặc định là "".
       */
      employeeFilter: "",
      timeOut: null,

      /**
       * Biến xác định trạng thái của dialog thêm và sửa.
       * true: hiện
       * false: ẩn
       */
      isShowDialogEmployee: false,

      /**
       * Biến xác định trạng thái của dialog thông báo.
       * true: hiện
       * false: ẩn.
       */
      isShowAlertDialog: false,

      /**
       * Biến xác định trạng thái của dialog xác nhận.
       * true: hiện
       * false: ẩn.
       */
      isShowConfirmDialog: false,

      /**
       * Câu thông báo hiển thị trong dialog thông báo. Mặc định là "".
       */
      msg: "",

      /**
       * Câu thông báo hiển thị trong dialog xác nhận. Mặc định là "".
       */
      msgConfirm: "",

      /**
       * Check mã nhân viên có bị trùng hay không. True -trùng mã , False - không trùng mã.
       */
      checkEmployeeCodeExist: true,

      /**
       * Số lượng nhân viên trên 1 trang. Mặc định là 10.
       */
      limit: 20,

      /**
       * Trang hiện tại. Mặc định là 1.
       */
      page: 1,

      /**
       * tổng số trang.
       */
      totalPage: 0,

      /**
       * Số bản ghi lọc theo filter.
       */
      countEmloyees: 0,
    };
  },
  methods: {
    /**
     * Hàm lấy số nhân viên lọc theo filter.
     */
    fetchCountEmployees() {
      axios
        .get(
          "https://localhost:44366/api/v1/Employees/CountEmployees?employeeFilter=" +
            this.employeeFilter
        )
        .then((res) => res.data)
        .then((data) => {
          this.countEmloyees = data;
          this.totalPage = Math.ceil(this.countEmloyees / this.limit);
          console.log(this.totalPage);
        })
        .catch((err) => console.log(err));
    },
    /**
     * Hàm lấy danh sách có lọc nhân viên từ server.
     */
    fetchData() {
      let url = `https://localhost:44366/api/v1/Employees/employeeFilter?pageSize=${this.limit}&pageNumber=${this.page}`;
      if (this.employeeFilter) {
        url += `&employeeFilter=${this.employeeFilter}`;
        console.log(this.employeeFilter);
      }
      axios
        .get(url, { crossdomain: true })

        .then((res) => {
          if (res.status == 200) {
            return res.data;
          }
          return Promise.reject("Không có dữ liệu.");
        })
        .then((data) => {
          this.employees = data;
          if (this.employees.length > 0) {
            this.hasData = true;
          } else {
            this.hasData = false;
          }
          console.log(this.employees);
        })
        .catch((err) => console.log(err));
    },

    /**
     * Hàm lấy tất cả các phòng ban.
     */
    fetchDepartments() {
      axios
        .get("https://localhost:44366/api/v1/EmployeeDepartments")
        .then((res) => res.data)
        .then((data) => {
          for (let d of data) {
            let optDepartment = {
              value: d.employeeDepartmentId,
              text: d.employeeDepartmentName,
            };
            this.optionDepartment.push(optDepartment);
          }
        })
        .catch((err) => console.log(err));
    },

    /**
     * Hàm reset bộ lọc về mặc định.
     */
    resetFilter() {
      this.page = 1;
      this.limit = 20;
      this.employeeFilter = "";
      this.hasData = true;
    },

    /**
     * Sự kiện click button refresh.
     */
    btnRefreshData() {
      this.resetFilter();
      this.fetchCountEmployees();
      this.fetchData();
    },

    /**
     * Hàm click button thêm nhân viên.
     */
    btnClickAddEmployee() {
      axios
        .get("https://localhost:44366/api/v1/Employees/EmployeeCodeMax")
        .then((res) => res.data)
        .then((data) => {
          this.selectedEmployee.employeeCode =
            "NV-" + (parseInt(data.match(/\d/g).join("")) + 1);
          this.showDialogEmployee();
        })
        .catch((err) => console.log(err));
    },

    /**
     * Hàm double click vào employeeItem.
     */
    onDblClickEmployeeItem(employeeId) {
      axios
        .get(`https://localhost:44366/api/v1/Employees/${employeeId}`)
        .then((res) => res.data)
        .then((data) => {
          this.selectedEmployee = data;
          this.selectedEmployeeCode = this.selectedEmployee.employeeCode;
          this.showDialogEmployee();
        })
        .catch((err) => console.log(err));
    },

    /**
     * Hàm hiển thị dialog thêm và sửa nhân viên.
     */
    showDialogEmployee() {
      this.isShowDialogEmployee = true;
    },

    /**
     * Hàm đóng dialog thông báo.
     */
    onCloseAlertDialog() {
      this.isShowAlertDialog = false;
      this.msg = "";
    },

    /**
     * Hàm show dialog thông báo với msg.
     */
    showAlertDialogWithMsg(msg) {
      this.msg = msg;
      this.isShowAlertDialog = true;
    },

    /**
     * lưu thông tin nhân viên.
     */
    saveEmployee() {
      // cấu hình axios req.
      let configAxios = {
        data: this.selectedEmployee,
      };

      if (this.selectedEmployee.employeeId) {
        // nếu là sửa nhân viên.
        configAxios.url = `https://localhost:44366/api/v1/Employees/${this.selectedEmployee.employeeId}`;
        configAxios.method = "PUT";
      } else {
        // nếu là thêm mới nhân viên.
        configAxios.url = "https://localhost:44366/api/v1/Employees";
        configAxios.method = "POST";
      }

      if (
        this.selectedEmployee.employeeId &&
        this.selectedEmployeeCode == this.selectedEmployee.employeeCode
      ) {
        // tiến hành call api lưu thông tin nhân viên.
        axios(configAxios)
          .then(() => {
            // thực hiện đóng dialog thêm và sửa nhân viên.
            this.onCloseDialogEmployee();

            // show dialog thông báo với lời thông báo Lưu thành công.
            this.showAlertDialogWithMsg("Lưu thành công.");

            // Lấy lại dữ liệu từ api với bộ lọc mặc định.
            // this.btnRefreshData();
            // this.fetchCountEmployees();
            this.fetchData();
          })
          .catch((err) => {
            // show dialog thông báo khi lưu thất bại.
            this.showAlertDialogWithMsg("Lưu thất bại.");
            console.log(err);
          });
      } else {
        // kiểm tra xem có bị trùng mã nhân viên không.
        axios
          .get(
            "https://localhost:44366/api/v1/Employees/EmployeeCodeExist/" +
              this.selectedEmployee.employeeCode
          )
          .then((res) => res.data)
          .then((data) => {
            if (data == 1) {
              // show dialog thông báo khi lưu thất bại.
              this.showAlertDialogWithMsg(
                "Nhân viên <" +
                  this.selectedEmployee.employeeCode +
                  "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
              );
            } else {
              // tiến hành call api lưu thông tin nhân viên.
              axios(configAxios)
                .then(() => {
                  // thực hiện đóng dialog thêm và sửa nhân viên.
                  this.onCloseDialogEmployee();

                  // show dialog thông báo với lời thông báo Lưu thành công.
                  this.showAlertDialogWithMsg("Lưu thành công.");

                  // Lấy lại dữ liệu từ api với bộ lọc mặc định.
                  if (configAxios.method == "PUT") {
                    this.fetchData();
                  } else {
                    this.btnRefreshData();
                  }
                })
                .catch((err) => {
                  // show dialog thông báo khi lưu thất bại.
                  this.showAlertDialogWithMsg("Lưu thất bại.");
                  console.log(err);
                });
            }
          })
          .catch((err) => console.log(err));
      }
    },

    /**
     * Hàm đóng dialog thêm và sửa nhân viên.
     */
    onCloseDialogEmployee() {
      this.isShowDialogEmployee = false;
      this.selectedEmployee = {};
      this.selectedEmployeeCode = null;
      this.checkEmployeeCodeExist = true;
    },

    /**
     * Hàm đóng dialog xác nhận.
     */
    onCloseConfirmDialog() {
      this.isShowConfirmDialog = false;
      this.msgConfirm = "";
    },

    /**
     * Hàm hiển thị dialog xác nhận với một câu thông báo msg.
     */
    showConfirmDialogWithMsg(msg) {
      this.msgConfirm = msg;
      this.isShowConfirmDialog = true;
    },

    /**
     * Sự kiện click button xóa nhân viên.
     * Lưu ý: phải đã chọn nhân viên cần xóa.
     */
    btnDelEmployee(employeeId, employeeCode) {
      this.selectedEmployeeId = employeeId;

      this.showConfirmDialogWithMsg(
        "Bạn có chắc muốn xóa nhân viên <" + employeeCode + "> này không ?",
        employeeId
      );
    },
    /**
     * Hàm xóa nhân viên đang được chọn.
     */
    delEmployee() {
      if (this.selectedEmployeeId) {
        axios
          .delete(
            `https://localhost:44366/api/v1/Employees/${this.selectedEmployeeId}`
          )
          .then(() => {
            // hiển thị dialog thông báo với câu thông báo.
            this.showAlertDialogWithMsg("Xóa thành công.");

            // fetch lại dữ liệu.
            this.fetchCountEmployees();
            this.fetchData();
          })
          .catch((err) => {
            // hiển thị thông báo khi thất bại.
            this.showAlertDialogWithMsg("Xóa thất bại.");
            console.log(err);
          });
      }
    },

    /**
     * Hàm click vào employeeItem.
     */
    onClickEmployeeItem() {},

    onHandleEmployeeFilter() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.fetchData();
        this.fetchCountEmployees();
      }, 300);
    },
  },
  watch: {
    "$route.query": function (val) {
      if (val) {
        this.page = parseInt(val.page) || 1;
      } else {
        this.page = 1;
      }
      this.fetchData();
    },
    page: function (val) {
      if (val == 1) {
        this.$router.replace({ query: null });
      }
    },
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  left: 226px;
  top: 50px;
  right: 0;
  bottom: 0;
  padding: 16px 16px 0 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
}

.content .title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content .title-box .title {
  font-size: 24px;
  font-family: Google-Sans-Bold;
}

.content .toolbar-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 16px;
  padding-bottom: 40px;
  background-color: #fff;
}

.content .toolbar-left,
.content .toolbar-right {
  display: flex;
  align-items: center;
}
.content .toolbar-right .btn-refresh {
  margin-left: 10px;
  padding-bottom: 5px;
}

.grid {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 30px;
  max-height: calc(100% - 155px);
  top: 140px;
  left: 15px;
  right: 15px;
  position: absolute;
  overflow: auto;
  flex: 1;
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead tr,
.table tbody tr {
  border-bottom: 2px solid #e5e5e5;
  height: 44px;
  text-align: left;
}

.table thead tr {
  height: 35px;
}

.table th {
  position: sticky;
  top: 0px;
}

.table tbody tr:hover {
  background-color: #ecececb2;
}

.table tbody tr:last-child {
  border: none;
}

.table thead tr th,
.table tbody tr td {
  padding-left: 10px;
  padding-right: 8px;
  height: 20px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
  background-color: #f1f1f1;
}

.table thead tr th:first-child,
.table tbody tr td:first-child {
  padding-left: 16px;
}

.table thead tr th:last-child,
.table tbody tr td:last-child {
  padding-right: 16px;
}

.footer {
  background-color: #fff;
  position: sticky;
  bottom: 0px;
  height: 45px;
  display: flex;
  align-items: center;
}

.footer .footer-left {
  display: inline-block;
  line-height: 45px;
}

.footer .footer-right {
  display: flex;
  position: absolute;
  right: 0;
  top: 7px;
}
.footer .footer-right .combobox {
  margin-right: 15px;
}
</style>