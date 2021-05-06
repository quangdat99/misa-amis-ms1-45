<template>
  <div class="navbar">
    <div class="logo-box">
      <div class="toggle fas fa-th"></div>
      <div class="logo"></div>
      <div class="title">KẾ TOÁN</div>
    </div>

    <div class="navbar-content">
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-chart-pie"></div>
        <div class="navbar-item-text">Tổng quan</div>
      </div>
      <router-link
        to="/employee"
        class="navbar-item"
        :class="{ active: $route.name == 'employee' }"
      >
        <div class="navbar-item-icon fas fa-users"></div>
        <div class="navbar-item-text">Danh sách nhân viên</div>
      </router-link>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-chart-bar"></div>
        <div class="navbar-item-text">Tiền mặt</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-chart-pie"></div>
        <div class="navbar-item-text">Tiền gửi</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Mua hàng</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Bán hàng</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Quản lý đơn hàng</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Công cụ dụng cụ</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Tài sản cố định</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Thuế</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Giá thành</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Tổng hợp</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Ngân sách</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Báo cáo</div>
      </div>
      <div class="navbar-item">
        <div class="navbar-item-icon fas fa-cog"></div>
        <div class="navbar-item-text">Phân tích tài chính</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  background-color: #393a3d;
  color: #fff;
  width: 226px;
  height: 100vh;
  border-right: 2px solid #e5e5e5;
}

.fas {
  color: #b3b3b3;
}

/* Css cho logo */

.navbar .logo-box {
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 16px;
}

.navbar .logo-box .toggle {
  font-size: 24px;
  flex-shrink: 1;
  cursor: pointer;
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
}

.navbar .logo-box .title {
  font-size: 18px;
  flex-shrink: 1;
  cursor: pointer;
}

.navbar .logo-box .logo {
  margin-left: 10px;
  height: 30px;
  width: 35px;
  flex-shrink: 1;
  background-image: url("../../assets/logo-amis.png");
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}

/* css cho navbar menu */
.navbar .navbar-content {
  padding-top: 20px;
}

.navbar .navbar-content .navbar-item {
  height: 52px;
  padding-left: 20px;
  /* padding-top: 15px;
  padding-bottom: 15px; */
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

.navbar .navbar-content .navbar-item:active,
.navbar .navbar-content .navbar-item.active {
  background-color: #4d4d4d;
  color: #fff;
}

.navbar .navbar-content .navbar-item:hover:not(.active) {
  background-color: #666666;
  color: #fff;
}

.navbar .navbar-content .navbar-item-icon {
  font-size: 16px;
  line-height: 20px;
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

.navbar .navbar-content .navbar-item-text {
  font-size: 16px;
  color: #fff;
}
</style>