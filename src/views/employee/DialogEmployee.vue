<template>
  <div class="dialog" :class="{ 'dialog-hide': !show }">
    <div class="dialog-content zoomIn">
      <div class="dialog-header">
        <div class="row ml-2">
          <div class="dialog-title">Thông tin nhân viên</div>
          <div class="row">
            <Checkbox class="pt-1" />
            <div class="line-height">Là khách hàng</div>
          </div>
          <div class="row">
            <Checkbox class="pt-1" />
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
                <div>
                  <label class="label-input">Ngày sinh</label>
                  <DatePicker
                    ref="dateOfBirth"
                    displayFormat="DD/MM/YYYY"
                    :inputAttributes="{
                      class: 'input',
                      style: 'font-size: 13px',
                      placeholder: 'DD/MM/YYYY',
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
                  />
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
            <!-- <ComboboxAutoComplete
              :important="true"
              :errorMsg="errors.employeeDepartment"
              @updateEmployeeDepartmentName="updateEmployeeDepartmentName"
              label="Đơn vị"
              v-model="DepartmentName"
              :option="optionDepartment.slice(1)"
              @blur="onValidDepartment"
            /> -->
            <Combobox
              label="Đơn vị"
              :important="true"
              :option="optionDepartment"
              :errorMsg="errors.employeeDepartment"
              v-model="employee.employeeDepartmentId"
              @change="onValidDepartment"
              style="padding-right: 8px"
            />
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
                  />
                </div>
              </div>
              <div class="col-5">
                <div>
                  <label class="label-input">Ngày sinh</label>
                  <DatePicker
                    ref="dateOfBirth"
                    displayFormat="DD/MM/YYYY"
                    :inputAttributes="{
                      class: 'input',
                      style: 'font-size: 13px',
                      placeholder: 'DD/MM/YYYY',
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
                  />
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
              />
            </div>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import DatePicker from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

import Input from "../../components/common/Input";

import IconButton from "../../components/common/IconButton";
// import ComboboxAutoComplete from "../../components/ComboboxAutoComplete";
import Combobox from "../../components/Combobox";

import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";
import Radio from "../../components/common/Radio";

export default {
  name: "DialogEmployee",
  components: {
    DatePicker,
    Input,
    // ComboboxAutoComplete,
    Combobox,
    Button,
    IconButton,
    Checkbox,
    Radio,
  },
  props: {
    /**
     * Xác định trạng thái của dialog.
     * true: hiện
     * false: ẩn
     */
    show: Boolean,

    /**
     * nhân viên đang được chỉnh sửa.
     * Lưu ý: Khi thêm mới: nhân viên rỗng.
     */
    employee: {
      type: Object,
      default: null,
    },

    /**
     * Option trong combobox Đơn vị.
     */
    optionDepartment: Array,

    /**
     * Option trong combobox vị trí.
     */
    optionPosition: Array,
  },

  data() {
    return {
      /**
       * Option trong combobox giới tính.
       */
      genders: [
        { value: 0, text: "Nữ" },
        { value: 1, text: "Nam" },
        {
          value: null,
          text: "Không xác định",
        },
      ],

      /**
       * Thông tin lỗi.
       */
      errors: {
        employeeCode: "",
        employeeName: "",
        employeeDepartment: "",
      },

      /**
       * Locale datepicker
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
  methods: {
    validateBeforeSave() {
      let valid = true;
      this.onValidEmployeeCode();
      this.onValidFullName();
      this.onValidDepartment();
      for (let err in this.errors) {
        if (this.errors[err]) {
          valid = false;
          break;
        }
      }
      return valid;
    },
    /**
     * Hàm gọi khi click vào button lưu.
     */
    onClickSave() {
      // let valid = true;
      // this.onValidEmployeeCode();
      // this.onValidFullName();
      // this.onValidDepartment();
      // for (let err in this.errors) {
      //   if (this.errors[err]) {
      //     valid = false;
      //     break;
      //   }
      // }
      let valid = this.validateBeforeSave();
      if (valid) {
        this.$emit("onSave");
      }
    },

    onClickSaveAndAdd() {
      let valid = this.validateBeforeSave();
      if (valid) {
        this.$emit("onSaveAndAdd");
      }
    },

    /**
     * valid mã nhân viên.
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
     */
    onValidFullName() {
      if (this.employee && this.employee.employeeName) {
        this.errors.employeeName = "";
      } else {
        this.errors.employeeName = "Tên nhân viên không được để trống.";
      }
    },

    /**
     * valid đơn vị của nhân viên .
     */
    onValidDepartment() {
      if (this.employee && this.employee.employeeDepartmentName) {
        this.errors.employeeDepartment = "";
      } else {
        this.errors.employeeDepartment = "Đơn vị không được để trống.";
      }
    },

    /**
     * Hàm đóng dialog.
     */
    onClickCloseDialog() {
      this.errors = {
        employeeCode: "",
        employeeName: "",
      };
      this.$emit("onClose");
    },

    /**
     * Hàm format date về dạng YYYY-MM-DD
     * CreatedBy: dqdat (25/05/2021)
     */
    formatYYYMMDD(dateStr) {
      return dateStr ? dayjs(dateStr).format("YYYY-MM-DD") : null;
    },

    isDateDisabled(date) {
      return date > new Date();
    },

    updateEmployeeDepartmentName(val) {
      this.employee.employeeDepartmentName = val;
    },

    /**
     * sự kiện nhấn phím
     * CreatedBy: dqdat 01/06/2021
     */
    onKeyDownListener(e) {
      if (e.keyCode == 27) {
        // ESC
        this.onClickCloseDialog();
        e.preventDefault();
      }

      if (e.key == "s" && (e.ctrlKey || e.metaKey)) {
        // Ctrl + s
        this.onClickSave();
        e.preventDefault();
      }

      if (e.key == "S" && (e.ctrlKey || e.metaKey)) {
        // Ctrl + Shift + s
        this.onClickSaveAndAdd();
        e.preventDefault();
      }
    },
  },
  computed: {
    /**
     * Computed ngày sinh nhân viên.
     */
    DepartmentName: {
      get() {
        return this.employee.employeeDepartmentName;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    show: function (val) {
      if (val) {
        this.$nextTick(function () {
          this.$refs.employeeCode.$el.focus();
        });
        document.addEventListener("keydown", this.onKeyDownListener);
      } else {
        document.removeEventListener("keydown", this.onKeyDownListener);
      }
    },
  },
  mounted() {
    this.$refs.employeeCode.$el.focus();
  },
};
</script>
