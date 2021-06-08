<template>
  <tr
    :class="{ selected: selectedId == employee.employeeId }"
    @dblclick="$emit('dblclick', employee.employeeId)"
    @click="$emit('click', employee.employeeId)"
  >
    <td @dblclick.stop>
      <Checkbox />
      <div class="border-right"></div>
    </td>
    <td>{{ employee.employeeCode }}</td>
    <td>{{ employee.employeeName }}</td>
    <td>{{ genderName }}</td>
    <td>{{ dateOfBirth(employee.dateOfBirth) }}</td>

    <td>{{ employee.identityNumber }}</td>
    <td>{{ employee.employeePosition }}</td>
    <td style="min-width: 200px">{{ departmentName }}</td>
    <td>{{ employee.bankAccountNumber }}</td>
    <td>{{ employee.bankName }}</td>
    <td>{{ employee.bankBranchName }}</td>
    <td class="center" @dblclick.stop>
      <div class="border-left"></div>
      <button class="btn-update" @click="onClickBtnEdit">Sửa</button>
      <select class="btn-option fas fa-caret-down" v-model="selected">
        <option selected style="display: none"></option>
        <option value="0">Nhân bản</option>
        <option value="1">Xóa</option>
        <option value="2">Ngừng sử dụng</option>
      </select>
      <!-- <IconButton
        icon="icon icon-chevron-down-blue"
        @click="toggleDropdown($event, employee)"
      /> -->
    </td>
  </tr>
</template>

<script>
import dayjs from "dayjs";

import Checkbox from "../../components/common/Checkbox";
//import IconButton from "../../components/common/IconButton";

export default {
  components: {
    Checkbox,
    //IconButton,
  },
  data() {
    return {
      /**
       * Đơn vị ứng với nhân viên.
       */
      employeeDepartment: {},
      selected: "",
    };
  },
  created() {},
  methods: {
    /**
     * Hàm đóng mở dropdown
     * CreatedBy: dqdat 30/05/2021
     */
    toggleDropdown(event, empl) {
      let left = event.clientX;
      let top = event.clientY;
      this.$emit("toggleTableOption", { left, top, employee: empl });
    },
    onClickBtnEdit() {
      this.$emit("updateEmployee", this.employee.employeeId);
    },

    dateOfBirth(dateStr) {
      return dateStr ? dayjs(dateStr).format("DD/MM/YYYY") : null;
    },
  },
  name: "EmployeeItem",
  props: {
    /**
     * Thông tin nhân viên.
     */
    employee: { type: Object, default: null },

    /**
     * Id của nhân viên đang được chọn.
     */
    selectedId: {
      type: String,
      default: null,
    },
  },
  computed: {
    /**
     * Computed binđ giới tính. Mặc định là Không xác định.
     */
    genderName: function () {
      if (this.employee.gender == 0) {
        return "Nữ";
      } else if (this.employee.gender == 1) {
        return "Nam";
      } else if (this.employee.gender == 2) {
        return "Khác";
      } else {
        return "Không xác định";
      }
    },

    /**
     * Computed bind email nhân viên. Mặc định là không rõ.
     */
    email: function () {
      return this.employee.Email || "Không rõ";
    },

    /**
     * Computed bind phòng ban của nhân viên. Mặc định là không rõ.
     */
    departmentName: function () {
      return this.employee.employeeDepartmentName || "Không rõ";
    },
  },
  filters: {
    /**
     * Filter giúp chuyển date String về dạng DD-MM-YYYY. Mặc định là null.
     */
    formatDateOfBirth(dateOfBirth) {
      if (dateOfBirth) {
        let date = new Date(dateOfBirth);
        let dateString =
          date.getDate() < 10
            ? "0" + date.getDate().toString()
            : date.getDate().toString();
        let monthString =
          date.getMonth() < 9
            ? "0" + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString();
        let yearString = date.getFullYear();
        return `${dateString}/${monthString}/${yearString}`;
      }
      return "Không xác định";
    },

    /**
     * Filter chuyển định dạng tiền tệ. xxx.xxx.xxx
     */
    formatSalary(salary) {
      if (salary) {
        return new Intl.NumberFormat("vi-VN").format(salary);
      }
      return "Không rõ";
    },
  },
  watch: {
    selected: function (val) {
      if (val == "1") {
        this.$emit(
          "btnDelEmployee",
          this.employee.employeeId,
          this.employee.employeeCode
        );
        this.selected = "";
      }
    },
  },
};
</script>

