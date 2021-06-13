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
        <div class="grid bg-white data">
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
                @toggleTableOption="toggleTableOption"
              />
            </tbody>
          </table>
          <div
            v-if="!hasData"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              position: sticky;
              left: 0;
            "
          >
            <img
              src="../../assets/img/bg_report_nodata.svg"
              alt="Không có dữ liệu"
              style="margin: 50px auto"
            />
            <div
              class="has-text-center"
              style="font-size: 15px; font-weight: bold; margin-bottom: 80px"
            >
              Không có dữ liệu
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
                  :value.sync="pageSize"
                  :options="[
                    { value: 10, text: '10 bản ghi trên trang' },
                    { value: 20, text: '20 bản ghi trên trang' },
                    { value: 30, text: '30 bản ghi trên trang' },
                    { value: 50, text: '50 bản ghi trên trang' },
                    { value: 100, text: '100 bản ghi trên trang' },
                  ]"
                  @onChange="onChangePageSize"
                />
              </div>
              <Pagination :page.sync="page" :totalPage="totalPage" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogEmployee
      ref="dialogEmployeeRef"
      v-if="employeeDialogConfig.isShow"
      :employee.sync="employeeDialogConfig.employee"
      :optionDepartment="optionDepartment"
      @onClose="onClickBtnCloseEmployeeDialog"
      @onSave="onClickBtnSave"
      @onSaveAndAdd="onClickBtnSaveAndAdd"
      @showAlertDialog="showAlertDialog"
    />
    <AlertDialog
      v-if="alertDialogConfig.isShow"
      :msg="alertDialogConfig.msg"
      :type="alertDialogConfig.type"
      @onClose="onCloseAlertDialog"
    />

    <OptionTableEmployee
      v-if="employeeTableOptionConfig.isShow"
      v-bind="{ ...employeeTableOptionConfig }"
      @onClose="closeEmployeeTableOption"
      @onClickBtnDel="onClickBtnDel"
      @onClickDuplicate="onClickDuplicate"
    />

    <ConfirmDialog
      v-if="confirmDialogConfig.isShow"
      :msg="confirmDialogConfig.msg"
      @onClose="onCloseConfirmDialog"
      @onOk="delEmployee"
    />
    <Loading v-if="isShowLoading" />
    <InformationDialog
      v-if="infoDialogConfig.isShow"
      @onClose="infoDialogConfig.isShow = false"
      @onNegative="onNegativeInfoDialog"
      @onPositive="onPositiveInfoDialog"
    />
  </div>
</template>

<script>
//#region import
import {
  getEmployees,
  getNewEmployeeCode,
  getEmployee,
  delEmployee,
  checkEmployeeCodeExist,
  saveEmployee,
} from "../../api/employee.js";

import { getEmployeeDepartments } from "../../api/employeeDepartment.js";

import IconButton from "../../components/common/IconButton";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input.vue";
import Checkbox from "../../components/common/Checkbox";
import Loading from "../../components/common/Loading";
import AlertDialog from "../../components/common/AlertDialog";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Pagination from "../../components/common/Pagination";
import Combobox from "../../components/common/Combobox";

import DialogEmployee from "./DialogEmployee";
import EmployeeItem from "./EmployeeItem";
import InformationDialog from "./InformationDialog.vue";
import OptionTableEmployee from "./OptionTableEmployee.vue";
//#endregion

//#region export
export default {
  //#region components
  components: {
    Button,
    IconButton,
    Loading,
    Input,
    Checkbox,
    AlertDialog,
    ConfirmDialog,
    EmployeeItem,
    DialogEmployee,
    InformationDialog,
    OptionTableEmployee,
    Pagination,
    Combobox,
  },
  //#endregion

  //#region created
  created() {
    this.getEmployees();
    this.getEmployeeDepartments();
  },
  //#endregion

  //#region data
  data() {
    return {
      /**
       * Config của dialog info
       * CreatedBy: dqdat (11/6/2021)
       */
      infoDialogConfig: {
        isShow: false,
      },

      /**
       * Config của dialog nhân viên
       * CreatedBy: dqdat (11/6/2021)
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
       * CreatedBy: dqdat (11/6/2021)
       */
      confirmDialogConfig: {
        isShow: false,
        msg: "",
      },
      /**
       * Config của dialog alert.
       * CreatedBy: dqdat (11/6/2021)
       */
      alertDialogConfig: {
        isShow: false,
        msg: "",
        type: "warning",
      },

      /**
       * các option cho combobox đơn vị.
       * CreatedBy: dqdat (11/6/2021)
       */
      optionDepartment: [],

      /**
       * Mảng nhân viên được fetch từ server về và có lọc theo filter.
       * CreatedBy: dqdat (11/6/2021)
       */
      employees: [],

      /**
       * số bản ghi employee > 0 thì bằng true, và ngược lại
       * CreatedBy: dqdat (11/6/2021)
       */
      hasData: true,

      /**
       * Số bản ghi được fetch từ server về và có lọc theo filter.
       * CreatedBy: dqdat (11/6/2021)
       */
      countEmloyees: 0,

      /**
       * Config của dropdown chức năng option table
       * CreatedBy: dqdat (11/6/2021)
       */
      employeeTableOptionConfig: {
        isShow: false,
        top: 0,
        left: 0,
      },

      /**
       * Thông tin nhân viên đang được chọn để thao tác
       * CreatedBy: dqdat (11/6/2021)
       */
      employeeModify: {},

      /**
       * Từ khóa để lọc danh sách nhân viên
       * CreatedBy: dqdat (11/6/2021)
       */
      employeeFilter: "",

      /**
       * set time out cho input tìm kiếm
       * CreatedBy: dqdat (11/6/2021)
       */
      timeOut: null,

      /**
       * Biến xác định trạng thái của Loading.
       * true: hiện
       * false: ẩn.
       * CreatedBy: dqdat (11/6/2021)
       */
      isShowLoading: false,

      /**
       * Số lượng nhân viên trên 1 trang. Mặc định là 20
       * CreatedBy: dqdat (11/6/2021).
       */
      pageSize: 20,

      /**
       * Trang hiện tại. Mặc định là 1.
       * CreatedBy: dqdat (11/6/2021)
       */
      page: 1,

      /**
       * tổng số trang.
       * CreatedBy: dqdat (11/6/2021)
       */
      totalPage: 0,
    };
  },
  //#endregion

  //#region methods
  methods: {
    /**
     * Hàm lấy danh sách có lọc nhân viên từ server.
     * CreatedBy: dqdat (11/6/2021)
     */
    getEmployees() {
      this.isShowLoading = true;
      getEmployees({
        page: this.page,
        pageSize: this.pageSize,
        employeeFilter: this.employeeFilter,
      })
        .then((data) => {
          this.countEmloyees = data.countEmployees;
          this.totalPage = Math.ceil(this.countEmloyees / this.pageSize);

          this.isShowLoading = false;

          this.employees = data.employees;
          if (this.employees.length > 0) {
            this.hasData = true;
          } else {
            this.hasData = false;
          }
        })
        .catch(() => {
          this.isShowLoading = false;
        });
    },

    /**
     * Hàm lấy tất cả các phòng ban.
     * CreatedBy: dqdat (11/6/2021)
     */
    getEmployeeDepartments() {
      getEmployeeDepartments()
        .then((data) => {
          this.optionDepartment = data.map((d) => ({
            value: d.employeeDepartmentId,
            text: d.employeeDepartmentName,
          }));
        })
        .catch();
    },

    /**
     * Hàm reset bộ lọc về mặc định.
     * CreatedBy: dqdat (11/6/2021)
     */
    resetFilter() {
      this.page = 1;
      this.employeeFilter = "";
      this.hasData = true;
    },

    /**
     * Sự kiện click button refresh.
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickBtnRefresh() {
      this.resetFilter();
      this.getEmployees();
    },

    /**
     * Hàm click button thêm nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickAddEmployee() {
      if (this.employeeDialogConfig.isShow == false) {
        getNewEmployeeCode()
          .then((data) => {
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
     * Hàm double click vào employeeItem trong bảng.
     * CreatedBy: dqdat (11/6/2021)
     */
    onDblClickEmployeeItem(employeeId) {
      getEmployee(employeeId)
        .then((data) => {
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
     * CreatedBy: dqdat (11/6/2021)
     */
    showDialogEmployee() {
      this.employeeDialogConfig.isShow = true;
    },

    /**
     * Hàm đóng dialog thông báo.
     * CreatedBy: dqdat (11/6/2021)
     */
    onCloseAlertDialog() {
      this.alertDialogConfig = {
        isShow: false,
        msg: "",
        type: "warning",
      };
    },

    /**
     * Hàm show dialog thông báo.
     * CreatedBy: dqdat (11/6/2021)
     */
    showAlertDialog(alertDialogConfig) {
      this.alertDialogConfig = {
        isShow: true,
        msg: alertDialogConfig.msg,
        type: alertDialogConfig.type,
      };
    },

    /**
     * Hàm Click button Lưu nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    async onClickBtnSave() {
      // Check mã nhân viên có trùng với nhân viên khác trên hệ thống không.
      var checkDuplicate;
      await checkEmployeeCodeExist(
        this.employeeDialogConfig.employee.employeeCode,
        this.employeeDialogConfig.employee.employeeId
      )
        .then((data) => {
          checkDuplicate = data;
        })
        .catch();

      // Nếu không trùng
      if (checkDuplicate != 1) {
        await saveEmployee(
          this.employeeDialogConfig.employee,
          this.employeeDialogConfig.isInsert
        )
          .then(() => {
            // thực hiện đóng dialog thêm và sửa nhân viên.
            this.closeEmployeeDialog();

            // show toast thông báo với lời thông báo Lưu thành công.
            this.$toast.success("Cập nhật bản ghi thành công", {
              position: "top-right",
            });

            // Reload lại dữ liệu với bộ lọc mặc định.
            if (this.employeeDialogConfig.isInsert == true) {
              this.onClickBtnRefresh();
            } else {
              this.getEmployees();
            }
          })
          .catch(() => {
            // show dialog thông báo khi lưu thất bại.
            this.$toast.error("Lưu thất bại", { position: "top-right" });
          });
      } else {
        // Nếu trùng thì show dialog thông báo.
        this.alertDialogConfig = {
          isShow: true,
          msg:
            "Nhân viên <" +
            this.employeeDialogConfig.employee.employeeCode +
            "> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.",
          type: "warning",
        };
      }
    },

    /**
     * click button cất và thêm
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickBtnSaveAndAdd() {
      this.onClickBtnSave()
        .then(() => {
          this.onClickAddEmployee();
        })
        .catch();
    },

    /**
     * Hàm đóng dialog thêm hoặc sửa nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    closeEmployeeDialog() {
      this.employeeDialogConfig = {
        isShow: false,
        employee: {},
        employeeOrigin: {},
        errors: null,
        isInsert: null,
      };
    },

    /**
     * click button đóng dialog nhân viên
     * CreatedBy: dqdat (11/6/2021)
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
     * CreatedBy: dqdat (11/6/2021)
     */
    onCloseConfirmDialog() {
      this.confirmDialogConfig.isShow = false;
      this.confirmDialogConfig.msg = "";
    },

    /**
     * click button xóa nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickBtnDel() {
      this.employeeTableOptionConfig = {
        isShow: false,
        top: 0,
        left: 0,
      };
      if (this.employeeModify) {
        this.confirmDialogConfig = {
          isShow: true,
          msg: `Bạn có chắc chắn muốn xóa nhân viên <${this.employeeModify.employeeCode}> không?`,
        };
      }
    },

    /**
     * click button nhân bản
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickDuplicate() {
      this.employeeTableOptionConfig = {
        isShow: false,
        top: 0,
        left: 0,
      };
      if (this.employeeModify) {
        getEmployee(this.employeeModify.employeeId)
          .then((employee) => {
            this.employeeDialogConfig.isInsert = true;
            this.employeeDialogConfig.employee = employee;
            return getNewEmployeeCode();
          })
          .then((newEmployeeCode) => {
            this.employeeDialogConfig.employee = {
              ...this.employeeDialogConfig.employee,
              employeeCode: newEmployeeCode,
            };
            this.employeeDialogConfig.employeeOrigin = {
              ...this.employeeDialogConfig.employee,
            };
            this.employeeDialogConfig.isShow = true;
          })
          .catch();
      }
    },

    /**
     * Hàm xóa nhân viên đang được chọn.
     * CreatedBy: dqdat (11/6/2021)
     */
    delEmployee() {
      if (this.employeeModify.employeeId) {
        delEmployee(this.employeeModify.employeeId)
          .then(() => {
            // hiển thị toast thông báo với câu thông báo.
            this.$toast.success("Xóa bản ghi thành công", {
              position: "top-right",
            });

            // reload lại dữ liệu.
            this.getEmployees();
          })
          .catch(() => {
            // hiển thị toast thông báo khi thất bại.
            this.$toast.error("Xóa thất bại", { position: "top-right" });
          });
      }
    },

    /**
     * Hàm filter khi change value input search.
     * CreatedBy: dqdat (11/6/2021)
     */
    onInputFilterEmployee(val) {
      this.employeeFilter = val;
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.getEmployees();
      }, 300);
    },

    /**
     * Hàm filter khi change pageSize combobox
     * CreatedBy: dqdat (11/6/2021)
     */
    onChangePageSize() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.getEmployees();
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
      this.$refs.dialogEmployeeRef.onClickSave();
    },

    /**
     * Hàm click vào icon down blue.
     * Gán employee đang được chọn và hiển thị dropdown ở phần chức năng
     * @param {object} data Gồm các thông tin về left, top và thông tin nhân viên
     * CreatedBy: dqdat (11/6/2021)
     */
    toggleTableOption(data) {
      let newLeft = data.left - 100;
      let newTop = data.top + 16;
      let employee = data.employee;

      let windowHeight = window.innerHeight;

      if (newTop > windowHeight - 100) {
        newTop -= 132;
      }
      this.employeeModify = employee;
      this.employeeTableOptionConfig = {
        isShow: true,
        top: newTop,
        left: newLeft,
      };
    },

    /**
     * Hàm đóng dropdown chức năng nhân viên
     * CreatedBy: dqdat (11/6/2021)
     */
    closeEmployeeTableOption() {
      this.employeeTableOptionConfig = {
        isShow: false,
        top: 0,
        left: 0,
      };
    },
  },
  //#endregion

  //#region watch
  watch: {
    page: function () {
      this.getEmployees();
    },
  },
  //#endregion
};
//#endregion
</script>
