<template>
  <div class="dialog" :class="{ 'dialog-hide': !show }">
    <div class="dialog-content"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    /**
     * Prop xác định trạng thái của dialog thông báo.
     * true: hiện
     * false: ẩn
     */
    show: Boolean,
  },
};
</script>

<style scoped>
.dialog {
  overflow: auto;
  position: fixed;
  top: 50px;
  left: 224px;
  width: calc(100vw - 226px);
  height: calc(100vh - 50px);
  /* background-color: #000; */
  background-color: rgba(255, 255, 255, 0.01);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 150;
}

.dialog.dialog-hide {
  display: none;
}

.dialog .dialog-content {
  width: 42px;
  height: 42px;
  position: relative;
  background: url("../assets/loading.svg") no-repeat 0 0;
  -webkit-animation: spin 0.7s linear infinite; /* Safari */
  animation: spin 0.7s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(340deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(340deg);
  }
}
</style>