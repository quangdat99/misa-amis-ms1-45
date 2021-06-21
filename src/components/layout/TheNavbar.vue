<template>
  <div
    class="navbar"
    :class="{ toggle: isNavbarToggle, slideInRight: !isNavbarToggle }"
  >
    <div class="logo-box" v-if="!isNavbarToggle">
      <div class="toggle"></div>
      <div class="logo-branch">
        <div class="logo"></div>
        <div class="title">KẾ TOÁN</div>
      </div>
    </div>

    <div
      class="logo-box-toggle"
      v-else
      @click.prevent="$emit('update:isNavbarToggle')"
    >
      <div class="icon icon-three-stripes"></div>
    </div>
    <!-- #region navbar-content -->
    <div class="navbar-content">
      <router-link
        to="/"
        class="navbar-item"
        :class="{ active: $route.name == 'overview' }"
        content="Tổng quan"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-dashboard"></div>
        </div>
        <div class="navbar-item-text">Tổng quan</div>
      </router-link>
      <router-link
        to="/employee"
        class="navbar-item"
        :class="{ active: $route.name == 'employee' }"
        content="Danh sách nhân viên"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-employee"></div>
        </div>
        <div class="navbar-item-text">Danh sách nhân viên</div>
      </router-link>
      <div
        class="navbar-item"
        content="Tiền mặt"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-cash"></div>
        </div>
        <div class="navbar-item-text">Tiền mặt</div>
      </div>
      <div
        class="navbar-item"
        content="Tiền gửi"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-bank"></div>
        </div>
        <div class="navbar-item-text">Tiền gửi</div>
      </div>
      <div
        class="navbar-item"
        content="Mua hàng"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-pu"></div>
        </div>
        <div class="navbar-item-text">Mua hàng</div>
      </div>
      <div
        class="navbar-item"
        content="Bán hàng"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-sale"></div>
        </div>
        <div class="navbar-item-text">Bán hàng</div>
      </div>
      <div
        class="navbar-item"
        content="Quản lý đơn hàng"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-invoice"></div>
        </div>
        <div class="navbar-item-text">Quản lý đơn hàng</div>
      </div>
      <div
        class="navbar-item"
        content="Kho"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-stock"></div>
        </div>
        <div class="navbar-item-text">Kho</div>
      </div>
      <div
        class="navbar-item"
        content="Công cụ dụng cụ"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-tools"></div>
        </div>
        <div class="navbar-item-text">Công cụ dụng cụ</div>
      </div>
      <div
        class="navbar-item"
        content="Tài sản cố định"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-fixed-assets"></div>
        </div>
        <div class="navbar-item-text">Tài sản cố định</div>
      </div>
      <div
        class="navbar-item"
        content="Thuế"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-tax"></div>
        </div>
        <div class="navbar-item-text">Thuế</div>
      </div>
      <div
        class="navbar-item"
        content="Giá thành"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-price"></div>
        </div>
        <div class="navbar-item-text">Giá thành</div>
      </div>
      <div
        class="navbar-item"
        content="Tổng hợp"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-general"></div>
        </div>
        <div class="navbar-item-text">Tổng hợp</div>
      </div>
      <div
        class="navbar-item"
        content="Ngân sách"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-budget"></div>
        </div>
        <div class="navbar-item-text">Ngân sách</div>
      </div>
      <div
        class="navbar-item"
        content="Báo cáo"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-report"></div>
        </div>
        <div class="navbar-item-text">Báo cáo</div>
      </div>
      <div
        class="navbar-item"
        content="Phân tích tài chính"
        v-tippy="{
          placement: 'right-start',
          followCursor: true,
        }"
      >
        <div class="navbar-item-icon">
          <div class="icon icon-navbar-finance"></div>
        </div>
        <div class="navbar-item-text">Phân tích tài chính</div>
      </div>
    </div>
    <!-- #endregion -->
  </div>
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    /**
     * Chuyển đổi độ rộng Navbar
     */
    isNavbarToggle: {
      type: Boolean,
      default: false,
    },
  },
  //#endregion
};
//#endregion
</script>
