<template>
  <tr @dblclick="$emit('dblclick', employee.employeeId)">
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
//#region import
import dayjs from "dayjs";
import Checkbox from "../../components/common/Checkbox";
import IconButton from "../../components/common/IconButton";
import Button from "../../components/common/Button";
//#endregion

//#region export
export default {
  //#region components
  components: {
    Button,
    Checkbox,
    IconButton,
  },
  //#endregion

  //#region props
  props: {
    /**
     * Thông tin nhân viên.
     * CreatedBy: dqdat (11/6/2021)
     */
    employee: { type: Object, default: null },
  },
  //#endregion

  //#region methods
  methods: {
    /**
     * Hàm mở dropdown option table
     * CreatedBy: dqdat (11/6/2021)
     */
    toggleDropdown(event, empl) {
      let left = event.clientX;
      let top = event.clientY;
      this.$emit("toggleTableOption", { left, top, employee: empl });
    },

    /**
     * Hàm click vào button Sửa
     * CreatedBy: dqdat (11/6/2021)
     */
    onClickBtnEdit() {
      this.$emit("updateEmployee", this.employee.employeeId);
    },

    /**
     * Hàm chuyển định dạng ngày/tháng/năm
     * CreatedBy: dqdat (11/6/2021)
     */
    dateOfBirth(dateStr) {
      return dateStr ? dayjs(dateStr).format("DD/MM/YYYY") : null;
    },
  },
  //#endregion

  //#region computed
  computed: {
    /**
     * Computed binđ giới tính. Mặc định là Không xác định.
     * CreatedBy: dqdat (11/6/2021)
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
     * CreatedBy: dqdat (11/6/2021)
     */
    email: function () {
      return this.employee.Email || "Không rõ";
    },

    /**
     * Computed bind phòng ban của nhân viên. Mặc định là không rõ.
     * CreatedBy: dqdat (11/6/2021)
     */
    departmentName: function () {
      return this.employee.employeeDepartmentName || "Không rõ";
    },
  },
  //#endregion
};
//#endregion
</script>

