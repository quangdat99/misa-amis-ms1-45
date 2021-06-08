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
                  v-model="pageSize"
                />
              </div>
              <Pagination :page="page" :totalPage="totalPage" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogEmployee
      v-if="employeeDialogConfig.isShow"
      :employee.sync="employeeDialogConfig.employee"
      :optionDepartment="optionDepartment.slice(1)"
      @onClose="onClickBtnCloseEmployeeDialog"
      @onSave="onClickBtnSave"
      @onSaveAndAdd="onClickBtnSaveAndAdd"
    />
    <AlertDialog
      v-if="alertDialogConfig.isShow"
      :msg="alertDialogConfig.msg"
      :type="alertDialogConfig.type"
      @onClose="onCloseAlertDialog"
    />
    <ConfirmDialog
      v-if="confirmDialogConfig.isShow"
      :msg="confirmDialogConfig.msg"
      @onClose="onCloseConfirmDialog"
      @onOk="delEmployee"
    />
    <Loading :show="isShowLoading" />
    <InformationDialog
      v-if="infoDialogConfig.isShow"
      @onClose="infoDialogConfig.isShow = false"
      @onNegative="onNegativeInfoDialog"
      @onPositive="onPositiveInfoDialog"
    />
  </div>
</template>

<script>
import {
  getEmployees,
  getCountEmployees,
  getNewEmployeeCode,
  getEmployee,
  delEmployee,
  checkEmployeeCodeExist,
  saveEmployee,
} from "../../api/employee.js";
import IconButton from "../../components/common/IconButton";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input.vue";
import Checkbox from "../../components/common/Checkbox";
import Combobox from "../../components/Combobox";
import Loading from "../../components/common/Loading";
import AlertDialog from "../../components/common/AlertDialog";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Pagination from "../../components/common/Pagination";

import DialogEmployee from "./DialogEmployee";
import EmployeeItem from "./EmployeeItem";
import InformationDialog from "./InformationDialog.vue";

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
    InformationDialog,
    Pagination,
  },

  created() {
    this.getCountEmployees();
    this.getEmployees();
    this.fetchDepartments();
  },
  data() {
    return {
      /**
       * Config của dialog info
       * CreatedBy: dqdat 03/06/2021
       */
      infoDialogConfig: {
        isShow: false,
      },

      /**
       * Config của dialog nhân viên
       * CreatedBy: dqdat 01/06/2021
       */
      employeeDialogConfig: {
        isShow: false,
        employee: {},
        employeeOrigin: {},
        isInsert: true,
        errors: null,
      },

      /**
       * Config của dialog xác nhận
       */
      confirmDialogConfig: {
        isShow: false,
        msg: "",
      },
      /**
       * Config của dialog alert.
       */
      alertDialogConfig: {
        isShow: false,
        msg: "",
        type: "warning",
      },

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
       * Số bản ghi lọc theo filter.
       */
      countEmloyees: 0,

      /**
       * Thông tin nhân viên đang được chọn để thao tác
       */
      employeeModify: {},

      /**
       * Filter danh sách nhân viên theo mã hoặc tên hoặc số điện thoại. Mặc định là "".
       */
      employeeFilter: "",
      timeOut: null,

      /**
       * Biến xác định trạng thái của Loading.
       * true: hiện
       * false: ẩn.
       */
      isShowLoading: false,

      /**
       * Số lượng nhân viên trên 1 trang. Mặc định là 10.
       */
      pageSize: 20,

      /**
       * Trang hiện tại. Mặc định là 1.
       */
      page: 1,

      /**
       * tổng số trang.
       */
      totalPage: 0,
    };
  },
  methods: {
    /**
     * Hàm lấy số nhân viên lọc theo filter.
     */
    getCountEmployees() {
      getCountEmployees(this.employeeFilter)
        .then((data) => {
          this.countEmloyees = data;
          this.totalPage = Math.ceil(this.countEmloyees / this.pageSize);
        })
        .catch();
    },
    /**
     * Hàm lấy danh sách có lọc nhân viên từ server.
     */
    getEmployees() {
      this.isShowLoading = true;
      getEmployees({
        page: this.page,
        pageSize: this.pageSize,
        employeeFilter: this.employeeFilter,
      })
        .then((data) => {
          this.isShowLoading = false;
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
      this.pageSize = 20;
      this.employeeFilter = "";
      this.hasData = true;
    },

    /**
     * Sự kiện click button refresh.
     */
    onClickBtnRefresh() {
      this.resetFilter();
      this.getCountEmployees();
      this.getEmployees();
    },

    /**
     * Hàm click button thêm nhân viên.
     */
    onClickAddEmployee() {
      if (this.employeeDialogConfig.isShow == false) {
        getNewEmployeeCode()
          .then((data) => {
            //this.employeeModify.employeeCode = data;
            //this.showDialogEmployee();
            this.employeeDialogConfig = {
              isShow: true,
              employee: {
                employeeCode: data,
              },
              isInsert: true,
              errors: null,
            };
            this.employeeDialogConfig.employeeOrigin = {
              ...this.employeeDialogConfig.employee,
            };
          })
          .catch();
      }
    },

    /**
     * Hàm double click vào employeeItem.
     */
    onDblClickEmployeeItem(employeeId) {
      getEmployee(employeeId)
        .then((data) => {
          //this.employeeModify = data;
          // this.showDialogEmployee();
          this.employeeDialogConfig = {
            isShow: true,
            employee: data,
            isInsert: false,
            errors: null,
          };
          this.employeeDialogConfig.employeeOrigin = {
            ...this.employeeDialogConfig.employee,
          };
        })
        .catch();
    },

    /**
     * Hàm hiển thị dialog thêm và sửa nhân viên.
     */
    showDialogEmployee() {
      this.employeeDialogConfig.isShow = true;
    },

    /**
     * Hàm đóng dialog thông báo.
     */
    onCloseAlertDialog() {
      this.alertDialogConfig.isShow = false;
      this.alertDialogConfig.msg = "";
    },

    /**
     * Hàm show dialog thông báo với msg.
     */
    showAlertDialogWithMsg(msg) {
      this.alertDialogConfig.msg = msg;
      this.alertDialogConfig.isShow = true;
    },

    /**
     * Hàm Click button Lưu nhân viên.
     */
    async onClickBtnSave() {
      var checkDuplicate;
      await checkEmployeeCodeExist(
        this.employeeDialogConfig.employee.employeeCode,
        this.employeeDialogConfig.employee.employeeId
      )
        .then((data) => {
          checkDuplicate = data;
        })
        .catch();

      // var isInsert = true;
      // if (this.employeeDialogConfig.employee.employeeId != null) {
      //   isInsert = false;
      // }
      if (checkDuplicate != 1) {
        await saveEmployee(
          this.employeeDialogConfig.employee,
          this.employeeDialogConfig.isInsert
        )
          .then(() => {
            // thực hiện đóng dialog thêm và sửa nhân viên.
            this.closeEmployeeDialog();

            // show dialog thông báo với lời thông báo Lưu thành công.
            this.$toast.success("Cập nhật bản ghi thành công", {
              position: "top-right",
            });

            // Lấy lại dữ liệu từ api với bộ lọc mặc định.
            if (this.employeeDialogConfig.isInsert == true) {
              this.onClickBtnRefresh();
            } else {
              this.getEmployees();
            }
          })
          .catch((err) => {
            // show dialog thông báo khi lưu thất bại.
            this.$toast.error("Lưu thất bại", { position: "top-right" });
            console.log(err);
          });
      } else {
        // Nếu trùng thì show dialog thông báo.
        this.showAlertDialogWithMsg(
          "Nhân viên <" +
            this.employeeDialogConfig.employee.employeeCode +
            "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
        );
      }
    },

    /**
     * click button cất và thêm
     * CreatedBy: dqdat 03/06/2021
     */
    onClickBtnSaveAndAdd() {
      this.onClickBtnSave()
        .then(() => {
          this.onClickAddEmployee();
        })
        .catch();
    },

    /**
     * Hàm đóng dialog nhân viên.
     */
    closeEmployeeDialog() {
      this.employeeDialogConfig = {
        isShow: false,
        employee: {},
        employeeOrigin: {},
        errors: null,
        isInsert: true,
      };

      //this.employeeModify = {};
      this.checkEmployeeCodeExist = true;
    },

    /**
     * click button đóng dialog nhân viên
     * CreatedBy: dqdat 03/06/2021
     */
    onClickBtnCloseEmployeeDialog() {
      for (let key in this.employeeDialogConfig.employee) {
        if (
          this.employeeDialogConfig.employeeOrigin[key] !=
          this.employeeDialogConfig.employee[key]
        ) {
          this.infoDialogConfig.isShow = true;
          return;
        }
      }
      this.closeEmployeeDialog();
    },

    /**
     * Hàm đóng dialog xác nhận.
     */
    onCloseConfirmDialog() {
      this.confirmDialogConfig.isShow = false;
      this.confirmDialogConfig.msg = "";
    },

    /**
     * Hàm hiển thị dialog xác nhận với một câu thông báo msg.
     */
    showConfirmDialogWithMsg(msg) {
      this.confirmDialogConfig.msg = msg;
      this.confirmDialogConfig.isShow = true;
    },

    /**
     * Sự kiện click button xóa nhân viên.
     */
    btnDelEmployee(employeeId, employeeCode) {
      this.employeeModify.employeeId = employeeId;
      this.showConfirmDialogWithMsg(
        "Bạn có chắc chắn muốn xóa nhân viên <" + employeeCode + "> không ?",
        employeeId
      );
    },

    /**
     * Hàm xóa nhân viên đang được chọn.
     */
    delEmployee() {
      if (this.employeeModify.employeeId) {
        delEmployee(this.employeeModify.employeeId)
          .then(() => {
            // hiển thị dialog thông báo với câu thông báo.
            this.$toast.success("Xóa bản ghi thành công", {
              position: "top-right",
            });

            // fetch lại dữ liệu.
            this.getCountEmployees();
            this.getEmployees();
          })
          .catch(() => {
            // hiển thị thông báo khi thất bại.
            this.$toast.error("Xóa thất bại", { position: "top-right" });
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
        this.getEmployees();
        this.getCountEmployees();
      }, 300);
    },

    /**
     * Hàm filter khi change pageSize combobox
     */
    onChangePageSize() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.getEmployees();
        this.getCountEmployees();
      }, 300);
    },

    /**
     * click button Không trong info dialog.
     * CreatedBy: dqdat 03/06/2021
     */
    onNegativeInfoDialog() {
      this.infoDialogConfig.isShow = false;
      this.closeEmployeeDialog();
    },

    /**
     * click button Có trong info dialog
     * CreatedBy: dqdat 03/06/2021
     */
    onPositiveInfoDialog() {
      this.infoDialogConfig.isShow = false;
      //this.$refs.employeeDialogRef.validateBeforeSave();
      this.onClickBtnSave();
    },
  },
  watch: {
    "$route.query": function (val) {
      if (val) {
        this.page = parseInt(val.page) || 1;
      } else {
        this.page = 1;
      }
      this.getEmployees();
    },
    page: function (val) {
      if (val == 1) {
        this.$router.replace({ query: null });
      }
    },
  },
};
</script>
