<template>
  <div class="dialog" :class="{ 'dialog-hide': !show }">
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="row ml-2">
          <div class="dialog-title">Thông tin nhân viên</div>
          <Checkbox />
          <div class="line-height">Là khách hàng</div>
          <Checkbox />
          <div class="line-height">Là nhà cung cấp</div>
        </div>
        <div class="dialog-button-help"></div>
        <div class="dialog-button-close" @click="closeDialog"></div>
      </div>
      <div class="dialog-body">
        <div class="row">
          <div class="row col-6" style="padding-right: 8px">
            <div class="col-4 space-input">
              <FieldInput
                ref="employeeCode"
                label="Mã"
                :important="true"
                :autoFocusInput="true"
                :errorMsg="errors.employeeCode"
                v-model="employee.employeeCode"
                @blur="onValidEmployeeCode"
              />
            </div>
            <div class="col-8 space-input">
              <FieldInput
                label="Họ và tên"
                :important="true"
                :errorMsg="errors.employeeName"
                v-model="employee.employeeName"
                @blur="onValidFullName"
              />
            </div>
          </div>
          <div class="row col-6">
            <div class="col-5 space-input">
              <FieldInput
                label="Ngày sinh"
                typeInput="date"
                v-model="dateOfBirthInput"
              />
            </div>
            <div class="col-7 space-input">
              <Radio
                label="Giới tính"
                :option="genders"
                v-model="employee.gender"
              />
            </div>
          </div>
          <div class="col-6 space-input">
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
          <div class="row col-6">
            <div class="col-7 space-input">
              <FieldInput label="Số CMTND" v-model="employee.identityNumber" />
            </div>
            <div class="col-5 space-input">
              <FieldInput
                label="Ngày cấp"
                typeInput="date"
                v-model="identityDateInput"
              />
            </div>
          </div>
          <div class="col-6 space-input">
            <FieldInput
              label="Chức danh"
              style="padding-right: 8px"
              v-model="employee.employeePosition"
            />
          </div>
          <div class="col-6 space-input">
            <FieldInput label="Nơi cấp" v-model="employee.identityPlace" />
          </div>
          <div class="col-12 space-input mt-2">
            <FieldInput label="Địa chỉ" v-model="employee.employeeAddress" />
          </div>
        </div>
        <div class="row">
          <div class="col-3 space-input">
            <FieldInput label="DT di động" v-model="employee.phoneNumber" />
          </div>
          <div class="col-3 space-input">
            <FieldInput label="DT cố định" v-model="employee.teleNumber" />
          </div>
          <div class="col-3 space-input">
            <FieldInput
              label="Email"
              typeInput="email"
              v-model="employee.email"
            />
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-3 space-input">
            <FieldInput label="Tài khoản ngân hàng" />
          </div>
          <div class="col-3 space-input">
            <FieldInput label="Tên ngân hàng" />
          </div>
          <div class="col-3 space-input">
            <FieldInput label="Chi nhánh" />
          </div>
        </div>
      </div>
      <div class="divide"></div>
      <div class="dialog-footer">
        <Button
          text="Hủy"
          :color="null"
          styleBtn="border: 1px solid #8d9096;margin-right: 567px;"
          @click="closeDialog"
        />
        <Button
          text="Cất"
          :color="null"
          @click="onSaveEmployee"
          styleBtn="border: 1px solid #8d9096; margin-right: 12px;"
        />
        <Button text="Cất và Thêm" icon="save" @click="onSaveEmployee" />
      </div>
    </div>
  </div>
</template>

<script>
import FieldInput from "../../components/FieldInput";
import Combobox from "../../components/Combobox";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Radio from "../../components/Radio";

export default {
  name: "DialogEmployee",
  components: {
    FieldInput,
    Combobox,
    Button,
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
    };
  },
  methods: {
    /**
     * Hàm gọi khi click vào button lưu.
     */
    onSaveEmployee() {
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
      if (valid) {
        this.$emit("onSave");
      } else {
        console.log(this.errors);
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
      if (this.employee && this.employee.employeeDepartmentId) {
        this.errors.employeeDepartment = "";
      } else {
        this.errors.employeeDepartment = "Đơn vị không được để trống.";
      }
    },

    /**
     * Hàm đóng dialog.
     */
    closeDialog() {
      this.errors = {
        employeeCode: "",
        employeeName: "",
      };
      this.$emit("onClose");
    },

    /**
     * Hàm chuyển date string về dạng YYYY-MM-DD
     */
    formatDate(dateStr) {
      if (dateStr) {
        let date = new Date(dateStr);
        let dateString =
          date.getDate() < 10
            ? "0" + date.getDate().toString()
            : date.getDate().toString();
        let monthString =
          date.getMonth() < 9
            ? "0" + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString();
        let yearString = date.getFullYear().toString();
        return `${yearString}-${monthString}-${dateString}`;
      }
      return null;
    },
  },
  computed: {
    /**
     * Computed ngày sinh nhân viên.
     */
    dateOfBirthInput: {
      get() {
        return this.formatDate(this.employee.dateOfBirth);
      },
      set(val) {
        this.employee.dateOfBirth = val;
      },
    },

    /**
     * Computed ngày cấp CMND.
     */
    identityDateInput: {
      get() {
        return this.formatDate(this.employee.identityDate);
      },
      set(val) {
        this.employee.identityDate = val;
      },
    },
  },
  watch: {
    show: function (val) {
      if (val) {
        this.$nextTick(function () {
          this.$refs.employeeCode.$el.children[1].focus();
        });
      }
    },
  },
};
</script>

<style scoped>
.dialog {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.4);
}

.dialog.dialog-hide {
  display: none;
}

.dialog .dialog-content {
  width: 900px;
  margin: 150px auto;
  background-color: #fff;
  position: relative;
}

.dialog .dialog-header {
  padding: 16px;
}

.dialog .dialog-header .dialog-title {
  font-size: 24px;
  font-family: Google-Sans-Bold;
  margin-right: 16px;
}

.dialog .dialog-header .line-height {
  line-height: 33px;
  padding-left: 4px;
  margin-right: 8px;
  font-size: 16px;
  display: inline-block;
}

.dialog .dialog-header .dialog-button-close {
  background: url('../../assets/img/Sprites.svg') no-repeat -137px -136px;
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  width: 40px;
  cursor: pointer;
}



.dialog .dialog-header .dialog-button-help {
  background: url('../../assets/img/Sprites.svg') no-repeat -80px -136px;
  position: absolute;
  right: 40px;
  top: 0;
  height: 40px;
  width: 40px;
  cursor: pointer;
}



.dialog .dialog-body {
  padding-left: 24px;
  padding-right: 24px;
}

.dialog .divide {
  border-top: 1px solid #e0e0e0;
  margin: 32px 30px 12px 28px;
}

.dialog .dialog-footer {
  padding-right: 24px;
  padding-bottom: 12px;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* nội dung dialog thêm và sửa */

.dialog .dialog-body .input-avatar {
  margin-top: 16px;
  background-image: url("../../assets/img/default-avatar.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 180px;
  border-radius: 50%;
  border: 1px solid #bbb;
}

.dialog .dialog-body .space-input {
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 16px;
}

.dialog .dialog-body .title {
  font-size: 15px;
  margin-bottom: 4px;
}

.dialog .dialog-body .underline-title {
  border-top: 5px solid #019160;
  width: 100px;
  margin-left: 4px;
}
</style>