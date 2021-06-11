<template>
  <div>
    <NavbarComponent />
    <HeaderComponent />
    <ContentComponent />
  </div>
</template>

<script>
import NavbarComponent from "./components/layout/Navbar";
import HeaderComponent from "./components/layout/Header";
import ContentComponent from "./components/layout/Content";
export default {
  name: "App",
  components: {
    NavbarComponent,
    HeaderComponent,
    ContentComponent,
  },
};
</script>

<style lang="scss">
@import "./assets/style/style.scss";
</style>
