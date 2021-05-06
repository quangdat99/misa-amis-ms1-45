<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-icon fas fa-bars"></div>
      <div class="header-left-text">CÔNG TY CỔ PHẦN MISA</div>
      <div class="header-left-icon fas fa-chevron-down"></div>
    </div>
    <div class="header-right">
      <div class="header-right-notify fas fa-bell"></div>
      <div class="header-right-avatar"></div>
      <div class="header-right-name">Đinh Quang Đạt</div>
      <div class="header-left-icon fas fa-chevron-down"></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: absolute;
  left: 226px;
  top: 0;
  right: 0;
  height: 64px;
  padding-right: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #e5e5e5;
}

.header .header-left {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header .header-left-text {
  font-family: Google-Sans-Bold;
  font-size: 18px;
  color: #333333;
  margin-left: 30px;
  font-weight: 400;
}

.header .header-left-icon {
  margin-left: 10px;
  color: #333333;
  font-size: 16px;
}

.header .fa-bars {
  font-size: 22px;
  margin-left: 0px;
}

.header .header-right {
  display: flex;
  align-items: center;
}

.header .header-right-notify {
  margin-right: 16px;
  font-size: 20px;
}

.header .header-right-avatar {
  border-radius: 50%;
  background-image: url("../../assets/img/default-avatar.jpg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
}

.header .header-right-name {
  margin-left: 16px;
  margin-right: 16px;
  font-family: Google-Sans-Bold;
  font-size: 18px;
  color: #333333;
}

.header .header-right-option {
}
</style>