<template>
  <tr
    :class="{ selected: selectedId == employee.employeeId }"
    @dblclick="$emit('dblclick', employee.employeeId)"
    @click="$emit('click', employee.employeeId)"
  >
    <td>
      <Checkbox />
      <div class="border-right"></div>
    </td>
    <td>{{ employee.employeeCode }}</td>
    <td>{{ employee.employeeName }}</td>
    <td>{{ genderName }}</td>
    <td>{{ employee.dateOfBirth | formatDateOfBirth }}</td>
    <td>{{ employee.identityNumber }}</td>
    <td>{{ employee.employeePosition }}</td>
    <td>{{ departmentName }}</td>
    <td></td>
    <td></td>
    <td></td>
    <td class="center">
      <div class="border-left"></div>
      <button class="btn-update" @click="onClickEmployeeItemUpdate">Sửa</button>
      <select class="btn-option fas fa-caret-down" v-model="selected">
        <option selected style="display: none"></option>
        <option value="0">Nhân bản</option>
        <option value="1">Xóa</option>
        <option value="2">Ngừng sử dụng</option>
      </select>
    </td>
  </tr>
</template>

<script>
import Checkbox from "../../components/Checkbox";

export default {
  components: {
    Checkbox,
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
    onClickEmployeeItemUpdate() {
      this.$emit("updateEmployee", this.employee.employeeId);
    },
  },
  name: "EmployeeItem",
  props: {
    /**
     * Thông tin nhân viên.
     */
    employee: Object,

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

<style scoped>
tr:last-child {
  border: none;
}

tr td {
  padding-left: 10px;
  padding-right: 8px;
  height: 40px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
}

tr td:first-child {
  padding-left: 10px;
  position: sticky;
  left: -1px;
  background-color: #fff;
  border-right: none;
}

tr td:last-child {
  padding-left: 25px;
  border-right: none;
  position: sticky;
  right: -1px;
  background-color: #fff;
}

tr td:nth-last-child(2) {
  border-right: none;
}

tr:hover td {
  background-color: #ececec;
}

.border-right {
  position: absolute;
  right: -1px;
  top: -1px;
  bottom: -1px;
  border-left: 1px dotted #c7c7c7;
  box-sizing: border-box;
}

.border-left {
  position: absolute;
  left: -1px;
  top: -1px;
  bottom: -1px;
  border-left: 1px dotted #c7c7c7;
  box-sizing: border-box;
}

.btn-update,
.btn-option {
  color: #0075c0;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
}
.btn-option {
  width: 23px;
  border: none;
}
</style>