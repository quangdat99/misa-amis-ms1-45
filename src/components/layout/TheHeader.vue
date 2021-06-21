<template>
  <div class="header">
    <div class="header-left">
      <div
        class="header-left-icon icon icon-three-stripes"
        @click.prevent="$emit('onNavbarToggle')"
      ></div>
      <div class="header-left-text">
        CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
      </div>
      <div class="header-left-icon icon icon-chevron-down"></div>
    </div>
    <div class="header-right">
      <div class="header-right-notify icon icon-notify"></div>
      <div class="header-right-avatar"></div>
      <div class="header-right-name">Đinh Quang Đạt</div>
      <div class="header-left-icon icon icon-chevron-down"></div>
    </div>
  </div>
</template>

