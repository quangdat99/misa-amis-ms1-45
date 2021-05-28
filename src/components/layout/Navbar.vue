<template>
  <div class="navbar">
    <div class="logo-box">
      <div class="toggle fas fa-th"></div>
      <div class="logo"></div>
      <div class="title">KẾ TOÁN</div>
    </div>

    <div class="navbar-content">
      <router-link
        to="/"
        class="navbar-item"
        :class="{ active: $route.name == 'overview' }"
      >
        <div class="navbar-item-icon fas fa-chart-pie"></div>
        <div class="navbar-item-text">Tổng quan</div>
      </router-link>
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
        <div class="navbar-item-text">Kho</div>
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
