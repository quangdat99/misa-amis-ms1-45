<template>
  <!-- #region dialog -->
  <div class="dialog">
    <div class="dialog-background" @click="onClickCloseDialog"></div>
    <!-- #region dialog-content -->
    <div class="dialog-content zoomIn">
      <!-- #region dialog-header -->
      <div class="dialog-header">
        <div class="row ml-2">
          <div class="dialog-title">Thông tin nhân viên</div>
          <div class="row">
            <Checkbox class="pt-1 pr-1" />
            <div class="line-height">Là khách hàng</div>
          </div>
          <div class="row">
            <Checkbox class="pt-1 pr-1" />
            <div class="line-height">Là nhà cung cấp</div>
          </div>
          <div class="dialog-header-right">
            <div
              class="dialog-button-help"
              content="Giúp (F1)"
              v-tippy="{
                placement: 'bottom',
              }"
            >
              <IconButton
                icon="icon icon-help"
                style="margin: 8px; padding: 0"
              />
            </div>
            <div
              class="dialog-button-close"
              @click="onClickCloseDialog"
              content="Đóng (ESC)"
              v-tippy="{
                placement: 'bottom',
              }"
            >
              <IconButton
                icon="icon icon-close"
                style="margin: 8px; padding: 0"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
      <!-- #region dialog-body -->
      <div class="dialog-body">
        <div class="row">
          <div class="col-6 pr-2">
            <div class="row">
              <div class="col-4 pr-1">
                <div class="con-input">
                  <label class="label-input"
                    >Mã <span style="color: #f20">*</span></label
                  >
                  <Input
                    ref="employeeCode"
                    :value="employee && employee.employeeCode"
                    :class="{ 'has-error': errors && errors.employeeCode }"
                    @input="
                      $emit('update:employee', {
                        ...employee,
                        employeeCode: $event,
                      })
                    "
                    @blur="onValidEmployeeCode"
                    tabindex="1"
                  />
                  <span
                    v-if="errors && errors.employeeCode"
                    class="text-error"
                    >{{ errors && errors.employeeCode }}</span
                  >
                </div>
              </div>
              <div class="col-8">
                <div class="con-input">
                  <label class="label-input"
                    >Tên <span style="color: #f20">*</span></label
                  >

                  <Input
                    :class="{ 'has-error': errors && errors.employeeName }"
                    :value="employee && employee.employeeName"
                    @input="
                      $emit('update:employee', {
                        ...employee,
                        employeeName: $event,
                      })
                    "
                    @blur="onValidFullName"
                    tabindex="2"
                  />

                  <span
                    v-if="errors && errors.employeeName"
                    class="text-error"
                    >{{ errors && errors.employeeName }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-5 pr-1">
                <div class="con-input">
                  <label class="label-input">Ngày sinh</label>
                  <DatePicker
                    ref="dateOfBirth"
                    displayFormat="DD/MM/YYYY"
                    :inputAttributes="{
                      class: `${
                        errors && errors.dateOfBirth
                          ? 'input has-error'
                          : 'input'
                      }`,
                      style: 'font-size: 13px',
                      placeholder: 'DD/MM/YYYY',
                      tabindex: '2',
                    }"
                    :weekdays="localeDatePicker.weekdays"
                    :months="localeDatePicker.months"
                    :isDateDisabled="isDateDisabled"
                    :value="
                      employee && employee.dateOfBirth
                        ? formatYYYMMDD(employee.dateOfBirth)
                        : null
                    "
                    @input="
                      $emit('update:employee', {
                        ...employee,
                        dateOfBirth: $event,
                      })
                    "
                    @blur="onValidDateOfBirth"
                  />
                  <div class="icon-input-date icon icon-option-date"></div>
                </div>
              </div>
              <div class="col-7">
                <div>
                  <label class="label-input">Giới tính</label>
                  <div class="flex-row-align-center" style="height: 32px">
                    <div
                      class="flex-row-align-center"
                      style="margin-right: 16px"
                    >
                      <Radio
                        name="gender"
                        value="1"
                        :checked="employee && employee.gender == 1"
                        @change="
                          $emit('update:employee', {
                            ...employee,
                            gender: parseInt($event),
                          })
                        "
                      />
                      <label style="margin-left: 8px">Nam</label>
                    </div>
                    <div
                      class="flex-row-align-center"
                      style="margin-right: 16px"
                    >
                      <Radio
                        name="gender"
                        value="0"
                        :checked="employee && employee.gender == 0"
                        @change="
                          $emit('update:employee', {
                            ...employee,
                            gender: parseInt($event),
                          })
                        "
                      />
                      <label style="margin-left: 8px">Nữ</label>
                    </div>
                    <div
                      class="flex-row-align-center"
                      style="margin-right: 16px"
                    >
                      <Radio
                        name="gender"
                        value="2"
                        :checked="employee && employee.gender == 2"
                        @change="
                          $emit('update:employee', {
                            ...employee,
                            gender: parseInt($event),
                          })
                        "
                      />
                      <label style="margin-left: 8px">Khác</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 pr-2">
            <div class="con-input">
              <label class="label-input"
                >Đơn vị <span style="color: #f20">*</span></label
              >
              <ComboboxAutoComplete
                :value="employee && employee.employeeDepartmentId"
                :inputAttributes="{
                  tabindex: '4',
                  class: {
                    'has-error': errors && errors.employeeDepartmentId,
                  },
                }"
                :options="optionDepartment"
                @update:value="
                  $emit('update:employee', {
                    ...employee,
                    employeeDepartmentId: $event,
                  })
                "
                @blur="onValidDepartment"
              />
              <span
                v-if="errors && errors.employeeDepartmentId"
                class="text-error"
                >{{ errors && errors.employeeDepartmentId }}</span
              >
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-7 pr-1">
                <div>
                  <label class="label-input">Số CMND</label>
                  <Input
                    :value="employee && employee.identityNumber"
                    @input="
                      $emit('update:employee', {
                        ...employee,
                        identityNumber: $event,
                      })
                    "
                    tabindex="5"
                  />
                </div>
              </div>
              <div class="col-5">
                <div class="con-input">
                  <label class="label-input">Ngày cấp</label>
                  <DatePicker
                    displayFormat="DD/MM/YYYY"
                    :inputAttributes="{
                      class: `${
                        errors && errors.identityDate
                          ? 'input has-error'
                          : 'input'
                      }`,
                      style: 'font-size: 13px',
                      placeholder: 'DD/MM/YYYY',
                      tabindex: '6',
                    }"
                    :weekdays="localeDatePicker.weekdays"
                    :months="localeDatePicker.months"
                    :isDateDisabled="isDateDisabled"
                    :value="
                      employee && employee.identityDate
                        ? formatYYYMMDD(employee.identityDate)
                        : null
                    "
                    @input="
                      $emit('update:employee', {
                        ...employee,
                        identityDate: $event,
                      })
                    "
                    @blur="onValidIdentityDate"
                  />
                  <div class="icon-input-date icon icon-option-date"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 pr-2">
            <div>
              <label class="label-input">Chức danh</label>
              <Input
                :value="employee && employee.employeePosition"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    employeePosition: $event,
                  })
                "
                tabindex="7"
              />
            </div>
          </div>
          <div class="col-6">
            <div>
              <label class="label-input">Nơi cấp</label>
              <Input
                :value="employee && employee.identityPlace"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    identityPlace: $event,
                  })
                "
                tabindex="8"
              />
            </div>
          </div>
          <div class="col-12 mt-2">
            <div>
              <label class="label-input">Địa chỉ</label>
              <Input
                :value="employee && employee.employeeAddress"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    employeeAddress: $event,
                  })
                "
                tabindex="9"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3 pr-1">
            <div>
              <label class="label-input">Điện thoại di động</label>
              <Input
                :value="employee && employee.phoneNumber"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    phoneNumber: $event,
                  })
                "
                tabindex="10"
              />
            </div>
          </div>
          <div class="col-3 pr-1">
            <div>
              <label class="label-input">Điện thoại cố định</label>
              <Input
                :value="employee && employee.teleNumber"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    teleNumber: $event,
                  })
                "
                tabindex="11"
              />
            </div>
          </div>
          <div class="col-3">
            <div>
              <label class="label-input">Email</label>
              <Input
                :value="employee && employee.email"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    email: $event,
                  })
                "
                tabindex="12"
              />
            </div>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-3 pr-1">
            <div>
              <label class="label-input">Tài khoản ngân hàng</label>
              <Input
                :value="employee && employee.bankAccountNumber"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    bankAccountNumber: $event,
                  })
                "
                tabindex="13"
              />
            </div>
          </div>
          <div class="col-3 pr-1">
            <div>
              <label class="label-input">Tên ngân hàng</label>
              <input
                type="text"
                class="input"
                :value="employee && employee.bankName"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    bankName: $event,
                  })
                "
                tabindex="14"
              />
            </div>
          </div>
          <div class="col-3">
            <div>
              <label class="label-input">Chi nhánh</label>
              <Input
                :value="employee && employee.bankBranchName"
                @input="
                  $emit('update:employee', {
                    ...employee,
                    bankBranchName: $event,
                  })
                "
                tabindex="15"
              />
              <input
                type="text"
                style="height: 0px; width: 0px; border: none"
                tabindex="16"
                @focus="onFocusInputEmployeeCode"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
      <!-- #region dialog-footer -->
      <div class="divide"></div>
      <div class="dialog-footer">
        <div class="dialog-footer-left">
          <Button color="secondary" text="Hủy" @click="onClickCloseDialog" />
        </div>
        <div class="dialog-footer-right flex-row-align-center">
          <Button
            text="Cất"
            :color="'secondary'"
            style="margin-right: 10px"
            @click="onClickSave"
            content="Cất (Ctrl+S)"
            v-tippy="{
              placement: 'bottom',
            }"
          />
          <Button
            text="Cất và Thêm"
            @click="onClickSaveAndAdd"
            content="Cất và thêm (Ctrl + Shift + S)"
            v-tippy="{
              placement: 'bottom',
            }"
          />
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </div>
  <!-- #endregion -->
</template>

<script>
//#region import
import dayjs from "dayjs";
import DatePicker from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

import Input from "../../components/common/Input";

import IconButton from "../../components/common/IconButton";
import ComboboxAutoComplete from "../../components/common/ComboboxAutoComplete";

import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";
import Radio from "../../components/common/Radio";
//#endregion

//#region export
export default {
  //#region components
  components: {
    DatePicker,
    Input,
    ComboboxAutoComplete,
    Button,
    IconButton,
    Checkbox,
    Radio,
  },
  //#endregion

  //#region props
  props: {
    /**
     * Khởi tạo giá trị nhân viên.
     * Khi thêm mới: nhân viên rỗng.
     * CreatedBy: dqdat (11/6/2021)
     */
    employee: {
      type: Object,
      default: null,
    },

    /**
     * Option trong combobox Đơn vị.
     * CreatedBy: dqdat (11/6/2021)
     */
    optionDepartment: Array,
  },
  //#endregion

  //#region data
  data() {
    return {
      /**
       * Thông tin lỗi.
       * CreatedBy: dqdat (11/6/2021)
       */
      errors: {
        employeeCode: "",
        employeeName: "",
        employeeDepartmentId: "",
        dateOfBirth: "",
      },

      /**
       * Locale datepicker
       * CreatedBy: dqdat (11/6/2021)
       */
      localeDatePicker: {
        weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        months: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
    };
  },
  //#endregion

  //#region methods
  methods: {
    //#region onClick Save, SaveAndAdd, Close EmployeeDialog
    /**
     * Hàm gọi khi click vào button Cất.
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickSave() {
      let valid = this.validateBeforeSave();
      if (valid) {
        this.$emit("onSave");
      } else {
        var values = Object.keys(this.errors).map((k) => this.errors[k]);
        var alertDialogConfig = {
          msg: values.find((val) => val != ""),
          type: "error",
        };
        this.$emit("showAlertDialog", alertDialogConfig);
      }
    },

    /**
     * Hàm gọi khi click vào button Cất và thêm.
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickSaveAndAdd() {
      let valid = this.validateBeforeSave();
      if (valid) {
        this.$emit("onSaveAndAdd");
      } else {
        var values = Object.keys(this.errors).map((k) => this.errors[k]);
        var alertDialogConfig = {
          msg: values.find((val) => val != ""),
          type: "error",
        };
        this.$emit("showAlertDialog", alertDialogConfig);
      }
    },

    /**
     * Hàm đóng dialog.
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickCloseDialog() {
      this.errors = {
        employeeCode: "",
        employeeName: "",
        employeeDepartmentId: "",
        dateOfBirth: "",
        identityDate: "",
      };
      this.$emit("onClose");
    },
    //#endregion

    //#region Validate Input
    /**
     * Kiểm tra lỗi trước khi bấm Save
     * CreatedBy: dqdat (11/6/2021)
     */
    validateBeforeSave() {
      let valid = true;
      this.onValidEmployeeCode();
      this.onValidFullName();
      this.onValidDepartment();
      this.onValidDateOfBirth();
      this.onValidIdentityDate();
      for (let err in this.errors) {
        if (this.errors[err]) {
          valid = false;
          break;
        }
      }
      return valid;
    },
    /**
     * valid mã nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    onValidEmployeeCode() {
      if (this.employee && this.employee.employeeCode) {
        this.errors.employeeCode = "";
      } else {
        this.errors.employeeCode = "Mã không được để trống.";
      }
    },

    /**
     * valid họ tên nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    onValidFullName() {
      if (this.employee && this.employee.employeeName) {
        this.errors.employeeName = "";
      } else {
        this.errors.employeeName = "Tên không được để trống.";
      }
    },

    /**
     * valid đơn vị của nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    onValidDepartment() {
      if (this.employee && this.employee.employeeDepartmentId) {
        this.errors.employeeDepartmentId = "";
      } else {
        this.errors.employeeDepartmentId = "Đơn vị không được để trống.";
        if (this.employee.employeeDepartmentId == "") {
          this.errors.employeeDepartmentId =
            "Dữ liệu <Đơn vị> không có trong danh mục.";
        }
      }
    },

    /**
     * valid ngày sinh của nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    onValidDateOfBirth() {
      if (
        this.employee &&
        this.employee.dateOfBirth &&
        dayjs(this.employee.dateOfBirth).format("YYYY-MM-DD") == "Invalid Date"
      ) {
        this.errors.dateOfBirth = "Ngày sinh không đúng định dạng";
      } else {
        this.errors.dateOfBirth = "";
      }
    },

    /**
     * valid ngày cấp của nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    onValidIdentityDate() {
      if (
        this.employee &&
        this.employee.identityDate &&
        dayjs(this.employee.identityDate).format("YYYY-MM-DD") == "Invalid Date"
      ) {
        this.errors.identityDate = "Ngày cấp không đúng định dạng";
      } else {
        this.errors.identityDate = "";
      }
    },
    //#endregion

    //#region format Date
    /**
     * Hàm format date về dạng YYYY-MM-DD
     * CreatedBy: dqdat (11/6/2021)
     */
    formatYYYMMDD(dateStr) {
      return dateStr ? dayjs(dateStr).format("YYYY-MM-DD") : null;
    },
    /**
     * Hàm disabled ngày tháng năm lớn hơn hiện tại
     * CreatedBy: dqdat (11/6/2021)
     */
    isDateDisabled(date) {
      return date > new Date();
    },
    //#endregion

    //#region Key Down
    /**
     * sự kiện nhấn phím
     * CreatedBy: dqdat (11/6/2021)
     */
    onKeyDown(e) {
      if (e.keyCode == 27) {
        // ESC
        this.onClickCloseDialog();
        e.preventDefault();
      }

      if (e.key == "s" && e.ctrlKey) {
        // Ctrl + s
        this.onClickSave();
        e.preventDefault();
      }

      if (e.key == "S" && e.ctrlKey) {
        // Ctrl + Shift + s
        this.onClickSaveAndAdd();
        e.preventDefault();
      }
    },

    /**
     * focus vào ô nhận mã nhân viên
     * CreatedBy: dqdat (19/06/2021)
     */
    onFocusInputEmployeeCode() {
      this.$refs.employeeCode.$el.focus();
    },
    //#endregion
  },
  //#endregion

  //#region mounted
  mounted() {
    // Khi khởi tạo thì auto focus vào input employeeCode
    this.$refs.employeeCode.$el.focus();
    document.addEventListener("keydown", this.onKeyDown);
  },
  //#endregion

  //#region boforeDestroy
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  //#endregion
};
//#endregion
</script>
