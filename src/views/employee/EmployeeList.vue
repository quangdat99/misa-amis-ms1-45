<template>
  <div>
    <div class="content">
      <div class="title-box">
        <div class="title">Nhân viên</div>
        <Button text="Thêm mới nhân viên" @click="onClickAddEmployee" />
      </div>
      <div class="toolbar-box mt-1">
        <div class="toolbar-left"></div>
        <div class="toolbar-right">
          <div class="con-input">
            <Input
              style="width: 280px"
              placeholder="Tìm theo mã, tên hoặc số điện thoại"
              :hasIcon="true"
              :value="employeeFilter"
              @input="onInputFilterEmployee"
            />
            <div class="icon-input icon icon-search"></div>
          </div>
          <div
            content="Lấy lại dữ liệu"
            v-tippy="{
              placement: 'bottom',
            }"
          >
            <IconButton
              icon="icon icon-refresh"
              style="margin-left: 8px; padding: 0"
              @click="onClickBtnRefresh"
            />
          </div>
          <div
            content="Xuất ra Excel"
            v-tippy="{
              placement: 'bottom',
            }"
          >
            <IconButton
              icon="icon icon-excel"
              style="margin-left: 8px; padding: 0"
            />
          </div>
        </div>
      </div>
      <div class="grid-contain">
        <div class="grid bg-white">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <Checkbox />
                  <div class="border-right"></div>
                </th>
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
                <th>
                  <div class="border-left"></div>
                  CHỨC NĂNG
                </th>
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
                  @change="onChangePageSize"
                  v-model="limit"
                />
              </div>
              <Pagination :page="page" :totalPage="totalPage" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogEmployee
      :show="isShowDialogEmployee"
      :employee.sync="selectedEmployee"
      :optionDepartment="optionDepartment.slice(1)"
      @onClose="onCloseDialogEmployee"
      @onSave="onClickButtonSaveEmployee"
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
    <Loading :show="isShowLoading" />
  </div>
</template>

<script>
import IconButton from "../../components/common/IconButton";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input.vue";

import Checkbox from "../../components/common/Checkbox";
import Combobox from "../../components/Combobox";
import Loading from "../../components/common/Loading";

import AlertDialog from "../../components/AlertDialog";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Pagination from "../../components/common/Pagination";

import DialogEmployee from "./DialogEmployee";
import EmployeeItem from "./EmployeeItem";

import axios from "axios";

export default {
  name: "EmployeeList",
  components: {
    Button,
    IconButton,
    Loading,
    Input,
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
       * Biến xác định trạng thái của Loading.
       * true: hiện
       * false: ẩn.
       */
      isShowLoading: false,

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
        })
        .catch((err) => console.log(err));
    },
    /**
     * Hàm lấy danh sách có lọc nhân viên từ server.
     */
    fetchData() {
      this.isShowLoading = true;
      let url = `https://localhost:44366/api/v1/Employees/employeeFilter?pageSize=${this.limit}&pageNumber=${this.page}`;
      if (this.employeeFilter) {
        url += `&employeeFilter=${this.employeeFilter}`;
      }
      axios
        .get(url, { crossdomain: true })

        .then((res) => {
          if (res.status == 200) {
            this.isShowLoading = false;
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
    onClickBtnRefresh() {
      this.resetFilter();
      this.fetchCountEmployees();
      this.fetchData();
    },

    /**
     * Hàm click button thêm nhân viên.
     */
    onClickAddEmployee() {
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
     * Hàm Click button Lưu nhân viên.
     */
    async onClickButtonSaveEmployee() {
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
        // Nếu update không thay đổi mã nhân viên:
        // tiến hành call api lưu thông tin nhân viên.
        this.updateEmployee(configAxios);
      } else {
        // Nếu là thêm mới hoặc thay đổi mã nhân viên:
        // kiểm tra xem có bị trùng mã nhân viên không.
        const response = await axios.get(
          "https://localhost:44366/api/v1/Employees/EmployeeCodeExist/" +
            this.selectedEmployee.employeeCode
        );

        if (response.data == 1) {
          // Nếu trùng thì show dialog thông báo.
          this.showAlertDialogWithMsg(
            "Nhân viên <" +
              this.selectedEmployee.employeeCode +
              "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
          );
        } else {
          // tiến hành call api lưu thông tin nhân viên.
          this.insertOrUpdateEmployee(configAxios);
        }
      }
    },

    /**
     * Hàm thêm mới hoặc update nhân viên vào database thêm mới hoặc thay đổi mã nhân viên.
     */
    insertOrUpdateEmployee(configAxios) {
      axios(configAxios)
        .then(() => {
          // thực hiện đóng dialog thêm và sửa nhân viên.
          this.onCloseDialogEmployee();

          // show dialog thông báo với lời thông báo Lưu thành công.
          this.$toast.success("Cập nhật bản ghi thành công", {
            position: "top-right",
          });

          // Lấy lại dữ liệu từ api với bộ lọc mặc định.
          if (configAxios.method == "PUT") {
            this.fetchData();
          } else {
            this.onClickBtnRefresh();
          }
        })
        .catch((err) => {
          // show dialog thông báo khi lưu thất bại.
          this.$toast.error("Lưu thất bại", { position: "top-right" });
          console.log(err);
        });
    },
    /**
     * Hàm update thông nhân viên vào database khi không thay đổi mã nhân viên.
     */
    updateEmployee(configAxios) {
      axios(configAxios)
        .then(() => {
          // thực hiện đóng dialog thêm và sửa nhân viên.
          this.onCloseDialogEmployee();
          // show thông báo Lưu thành công.
          this.$toast.success("Cập nhật bản ghi thành công", {
            position: "top-right",
          });
          // Lấy lại dữ liệu từ api với bộ lọc mặc định.
          this.fetchData();
        })
        .catch((err) => {
          // show dialog thông báo khi lưu thất bại.
          this.$toast.error("Lưu thất bại", { position: "top-right" });
          console.log(err);
        });
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
            this.$toast.success("Xóa bản ghi thành công", {
              position: "top-right",
            });

            // fetch lại dữ liệu.
            this.fetchCountEmployees();
            this.fetchData();
          })
          .catch((err) => {
            // hiển thị thông báo khi thất bại.
            this.$toast.error("Xóa thất bại", { position: "top-right" });

            console.log(err);
          });
      }
    },

    /**
     * Hàm filter khi change value input search.
     */
    onInputFilterEmployee(val) {
      this.employeeFilter = val;
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.fetchData();
        this.fetchCountEmployees();
      }, 300);
    },

    /**
     * Hàm filter khi change pageSize combobox
     */
    onChangePageSize() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.fetchData();
        this.fetchCountEmployees();
      }, 300);
    },

    updateEmployeeDepartmentName(val) {
      this.selectedEmployee.employeeDepartmentName = val;
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
  mounted() {},
};
</script>
