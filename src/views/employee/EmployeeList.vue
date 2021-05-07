<template>
  <div>
    <div class="content">
      <div class="title-box">
        <div class="title">Nhân viên</div>
        <Button text="Thêm mới nhân viên" @click="btnClickAddEmployee" />
      </div>
      <div class="toolbar-box mt-1">
        <div class="toolbar-left"></div>
        <div class="toolbar-right">
          <FieldInput
            styleInput="width: 280px"
            placeholder="Tìm theo Mã, Tên hoặc Số điện thoại"
            icon="search"
            v-model="employeeFilter"
            @change="onHandleEmployeeFilter"
          />
          <div class="btn-refresh">
            <Button
              :onlyIcon="true"
              icon="redo fa-2x"
              styleBtn=" border:none;padding-top:4px;"
              @click="btnRefreshData"
            />
          </div>
        </div>
      </div>
      <div class="grid bg-white">
        <table class="table">
          <thead>
            <tr>
              <th><Checkbox /></th>
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
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            <EmployeeItem
              v-for="e in employees"
              :key="e.EmployeeId"
              :employee="e"
              :selectedId="selectedEmployeeId"
              @dblclick="onDblClickEmployeeItem"
              @click="onClickEmployeeItem"
            />
          </tbody>
        </table>
        <div class="footer">
          <div class="footer-left">
            Tổng số:
            <span style="font-weight: bold">{{ employees.length }}</span> bản
            ghi
          </div>
          <div class="footer-right">
            <Combobox
              styleCombobox="width: 200px"
              class="ml-1"
              :option="optionDepartment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/Button";
import FieldInput from "../../components/FieldInput";
import Checkbox from "../../components/Checkbox";
import Combobox from "../../components/Combobox";

import EmployeeItem from "./EmployeeItem";

import axios from "axios";

export default {
  name: "EmployeeList",
  components: {
    Button,
    FieldInput,
    Checkbox,
    Combobox,
    EmployeeItem,
  },

  created() {
    this.fetchData();
  },
  data() {
    return {
      /**
       * các option cho combobox phòng ban.
       */
      optionDepartment: [{ value: "", text: "Tất cả phòng ban" }],

      /**
       * Mảng nhân viên được fetch từ server (có filter).
       */
      employees: [],

      /**
       * Filter danh sách nhân viên theo mã hoặc tên hoặc số điện thoại. Mặc định là "".
       */
      employeeFilter: "",
    };
  },
  methods: {
    /**
     * Hàm lấy danh sách có lọc nhân viên từ server.
     */
    fetchData() {
      let url = "https://localhost:44365/api/v1/Employees";

      axios
        .get(url, { crossdomain: true })

        .then((res) => {
          if (res.status == 200) {
            return res.data;
          }
          return Promise.reject("Không có dữ liệu.");
        })
        .then((data) => {
          this.employees = data;
          console.log(this.employees);
        })
        .catch((err) => console.log(err));
    },

    /**
     * Sự kiện click button refresh.
     */
    btnRefreshData() {},

    /**
     * Hàm click button thêm nhân viên.
     */
    btnClickAddEmployee() {},

    /**
     * Hàm double click vào employeeItem.
     */
    onDblClickEmployeeItem() {},

    /**
     * Hàm click vào employeeItem.
     */
    onClickEmployeeItem() {},

    onHandleEmployeeFilter() {},
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  left: 226px;
  top: 50px;
  right: 0;
  bottom: 0;
  padding: 16px 16px 0 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
}

.content .title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content .title-box .title {
  font-size: 24px;
  font-family: Google-Sans-Bold;
}

.content .toolbar-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 16px;
  padding-bottom: 40px;
  background-color: #fff;
}

.content .toolbar-left,
.content .toolbar-right {
  display: flex;
  align-items: center;
}
.content .toolbar-right .btn-refresh {
  margin-left: 10px;
}

.grid {
  background-color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  max-height: calc(100% - 150px);
  top: 140px;
  left: 15px;
  right: 15px;
  position: absolute;
  overflow-y: auto;
  flex: 1;
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead tr,
.table tbody tr {
  border-bottom: 2px solid #e5e5e5;
  height: 44px;
  text-align: left;
}

.table thead tr {
  height: 35px;
}

.table th {
  position: sticky;
  top: 0px;
}

.table tbody tr:hover {
  background-color: #ecececb2;
}

.table tbody tr:last-child {
  border: none;
}

.table thead tr th,
.table tbody tr td {
  padding-left: 10px;
  padding-right: 8px;
  height: 20px;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px dotted #c7c7c7;
  background-color: #f1f1f1;
}

.table thead tr th:first-child,
.table tbody tr td:first-child {
  padding-left: 16px;
}

.table thead tr th:last-child,
.table tbody tr td:last-child {
  padding-right: 16px;
}

.footer {
  background-color: #fff;
  position: sticky;
  bottom: 0px;
  height: 45px;
}

.footer .footer-left {
  display: inline-block;
  line-height: 45px;
}

.footer .footer-right {
  display: inline-block;
  position: absolute;
  right: 0;
}
</style>