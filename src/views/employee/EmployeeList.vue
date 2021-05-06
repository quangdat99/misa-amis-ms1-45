<template>
  <div>
    <div class="content">
      <div class="title-box">
        <div class="title">Nhân viên</div>
        <Button text="Thêm mới nhân viên" @click="btnClickAddEmployee" />
      </div>
      <div class="toolbar-box mt-1">
        <div class="toolbar-left">
          <FieldInput
            styleInput="width: 280px"
            placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
            icon="search"
            v-model="employeeFilter"
            @change="onHandleEmployeeFilter"
          />
        </div>

        <div class="toolbar-right">
          <Button :onlyIcon="true" icon="sync-alt" @click="btnRefreshData" />
          <Button
            :onlyIcon="true"
            icon="trash"
            styleBtn="background-color: #f20; color: #fff; margin-left: 8px"
            @click="btnDelEmployee"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/Button";
import FieldInput from "../../components/FieldInput";

export default {
  name: "EmployeeList",
  components: {
    Button,
    FieldInput,
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
}

.content .toolbar-left,
.content .toolbar-right {
  display: flex;
  align-items: center;
}
</style>