<template>
  <div>
    <div class="content">
      <div class="title-box">
        <div class="title">Danh sách fffnhân viên</div>
        <Button
          text="Thêm nhân viên"
          iconLeft="user-plus"
          @click="btnClickAddEmployee"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  position: absolute;
  left: 226px;
  top: 64px;
  right: 0;
  bottom: 0;
  padding: 16px 16px 0 16px;
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  background: aquamarine;
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
</style>