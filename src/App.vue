<template>
  <div>
    <NavbarComponent :isNavbarToggle.sync="isNavbarToggle" />
    <HeaderComponent @onNavbarToggle="isNavbarToggle = true" />
    <ContentComponent />
  </div>
</template>

<script>
//#region import
import NavbarComponent from "./components/layout/Navbar";
import HeaderComponent from "./components/layout/Header";
import ContentComponent from "./components/layout/Content";
//#endregion
//#region export
export default {
  name: "App",
  components: {
    NavbarComponent,
    HeaderComponent,
    ContentComponent,
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
