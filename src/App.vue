<template>
  <div>
    <TheNavbar :isNavbarToggle.sync="isNavbarToggle" />
    <TheHeader @onNavbarToggle="isNavbarToggle = true" />
    <TheContent />
  </div>
</template>

<script>
//#region import
import TheNavbar from "./components/layout/TheNavbar";
import TheHeader from "./components/layout/TheHeader";
import TheContent from "./components/layout/TheContent";
//#endregion
//#region export
export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
  },
  data() {
    return {
      isNavbarToggle: false,
    };
  },
};
//#endregion
</script>
 
<style lang="scss">
@import "./assets/style/style.scss";
</style>
