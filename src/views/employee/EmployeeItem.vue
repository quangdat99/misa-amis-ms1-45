<template>
  <tr
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
    <td @dblclick.stop>
      <div class="border-left"></div>
      <div class="table-option">
        <Button :color="null" text="Sửa" @click="onClickBtnEdit" />
        <IconButton
          icon="icon icon-chevron-down-blue"
          @click="toggleDropdown($event, employee)"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import dayjs from "dayjs";

import Checkbox from "../../components/common/Checkbox";
import IconButton from "../../components/common/IconButton";
import Button from "../../components/common/Button";

export default {
  components: {
    Button,
    Checkbox,
    IconButton,
  },
  props: {
    /**
     * Thông tin nhân viên.
     */
    employee: { type: Object, default: null },
  },
  methods: {
    /**
     * Hàm đóng mở dropdown
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
};
</script>

