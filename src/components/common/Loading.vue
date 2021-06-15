<template>
  <!-- #region dialog loading -->
  <div class="dialog">
    <div class="dialog-background"></div>
    <div class="dialog-content"></div>
  </div>
  <!-- #endregion -->
</template>

<script>
//#region  export
export default {};
//#endregion
</script>

<style scoped>
/* #region css */
.dialog .dialog-background {
  background-color: rgba(0, 0, 0, 0.05);
}
.dialog .dialog-content {
  width: 42px;
  height: 42px;
  position: relative;
  background: url("../../assets/img/loading.svg") no-repeat 0 0;
  -webkit-animation: spin 0.7s linear infinite;
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
/* #endregion */
</style>