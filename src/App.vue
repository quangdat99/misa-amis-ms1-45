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
@import url("./assets/fonts/fontawesome-5.15.1/css/fontawesome.min.css");
@import url("./assets/fonts/fontawesome-5.15.1/css/solid.min.css");

//Stylesheet chung.
@font-face {
  font-family: NotoSans;
  src: url("./assets/fonts/notosans-regular.woff2") format("woff2");
}

// Biến chung.
$navbar-width: 178px;
$navbar-width-toggle: 52px;

$header-height: 48px;

$icon-size: 24px;

$color-white: #fff;

// mixins
@mixin flex-row {
  display: flex;
  flex-direction: row;
}

@mixin icon-default {
  background-image: url("./assets/img/Sprites.svg");
  background-repeat: no-repeat;
  display: inline-block;
}

@mixin icon-bind($position, $size: $icon-size) {
  background-position: $position;
  height: $size;
  width: $size;
}

.flex-row-align-center {
  @include flex-row();
  align-items: center;
}

// style chung
* {
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
}

html,
body {
  margin: 0;
  padding: 0;
  font-size: 13px;
  font-family: NotoSans;
  overflow-y: auto;
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

// Navbar
.navbar {
  background-color: #393a3d;
  color: #fff;
  width: 226px;
  height: 100vh;
  border-right: 2px solid #e5e5e5;
  // Logo-box
  .logo-box {
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    .toggle {
      font-size: 24px;
      flex-shrink: 1;
      cursor: pointer;
      color: #fff;
      margin-left: 10px;
      margin-right: 10px;
    }
    .logo {
      margin-left: 10px;
      height: 30px;
      width: 35px;
      flex-shrink: 1;
      background-image: url("./assets/logo-amis.png");
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
    }

    .title {
      font-size: 18px;
      flex-shrink: 1;
      cursor: pointer;
    }
  }
  .navbar-content {
    padding-top: 20px;
    .navbar-item {
      height: 45px;
      padding-left: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      &:active,
      &.active {
        background-color: #4d4d4d;
        color: #fff;
      }
      &:hover:not(.active) {
        background-color: #666666;
        color: #fff;
      }
      .navbar-item-icon {
        font-size: 16px;
        line-height: 20px;
        height: 20px;
        width: 20px;
        margin-right: 10px;
        &.fas {
          color: #b3b3b3;
        }
      }
      .navbar-item-text {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}

// Header
.header {
  position: absolute;
  left: 226px;
  top: 0;
  right: 0;
  height: 50px;
  padding-right: 16px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #e5e5e5;
  .header-left {
    display: flex;
    align-items: center;
    cursor: pointer;
    .header-left-icon {
      margin-left: 10px;
      color: #333333;
      font-size: 14px;
      &.fa-bars {
        font-size: 22px;
        margin-left: 0px;
      }
    }
    .header-left-text {
      font-family: Google-Sans-Bold;
      font-size: 16px;
      color: #333333;
      margin-left: 30px;
      font-weight: 400;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .header-right-notify {
      margin-right: 16px;
      background: url("./assets/img/Sprites.svg") no-repeat -788px -30px;
      width: 22px;
      height: 25px;
      cursor: pointer;
    }
    .header-right-avatar {
      border-radius: 50%;
      background-image: url("./assets/img/default-avatar.jpg");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 35px;
      height: 35px;
    }
    .header-right-name {
      margin-left: 16px;
      margin-right: 16px;
      font-family: Google-Sans-Bold;
      font-size: 18px;
      color: #333333;
    }
  }
}

// Content
.content {
  position: absolute;
  left: 226px;
  top: 50px;
  right: 0;
  bottom: 0;
  padding: 16px 16px 0 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 24px;
      font-family: Google-Sans-Bold;
    }
  }
  .toolbar-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 16px;
    background-color: #fff;
    .toolbar-right {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .btn-refresh {
        margin-left: 15px;
        padding-bottom: 5px;
        background: url("./assets/img/Sprites.svg") no-repeat -425px -201px;
        width: 21px;
        height: 23px;
        &:hover {
          background: url("./assets/img/Sprites.svg") no-repeat -1098px -90px;
          width: 20px;
          height: 21px;
        }
      }
    }
  }
  .grid-contain {
    padding-left: 15px;
    padding-right: 15px;
    background-color: #fff;
    .grid {
      background-color: #fff;
      max-height: calc(100vh - 200px);
      overflow: auto;
      .footer {
        background-color: #fff;
        position: sticky;
        bottom: -1px;
        height: 55px;
        display: flex;
        align-items: center;
        left: 0px;
        .footer-left {
          display: inline-block;
          line-height: 45px;
        }
        .footer-right {
          display: flex;
          position: absolute;
          right: 25px;
          top: 10px;
          .combobox {
            margin-right: 15px;
          }
        }
      }
    }
  }
}

// Table
.table {
  width: 100%;
  border-collapse: collapse;
  thead tr {
    border-bottom: 2px solid #e5e5e5;
    height: 35px;
    text-align: left;
    th {
      padding-left: 10px;
      padding-right: 10px;
      height: 20px;
      border-bottom: 1px solid #c7c7c7;
      border-right: 1px dotted #c7c7c7;
      background-color: #f1f1f1;
      white-space: nowrap;
      position: sticky;
      top: 0px;
      &:first-child {
        position: sticky;
        left: 0;
        top: 0;
        z-index: 3;
        border-right: none;
        width: 20px;
        .border-right {
          position: absolute;
          right: -1px;
          top: -1px;
          bottom: -1px;
          border-left: 1px dotted #c7c7c7;
          box-sizing: border-box;
        }
      }
      &:last-child {
        position: sticky;
        right: 0px;
        top: 0px;
        z-index: 3;
        .border-left {
          position: absolute;
          left: -1px;
          top: -1px;
          bottom: -1px;
          border-left: 1px dotted #c7c7c7;
          box-sizing: border-box;
        }
      }
      &:nth-last-child(2) {
        border-right: none;
      }
    }
  }
  tbody tr {
    &:hover td {
      background-color: #ececec;
    }
    &:last-child {
      border: none;
    }
    td {
      padding-left: 10px;
      padding-right: 8px;
      height: 40px;
      border-bottom: 1px solid #c7c7c7;
      border-right: 1px dotted #c7c7c7;
      &:first-child {
        padding-left: 10px;
        position: sticky;
        left: -1px;
        background-color: #fff;
        border-right: none;
        .border-right {
          position: absolute;
          right: -1px;
          top: -1px;
          bottom: -1px;
          border-left: 1px dotted #c7c7c7;
          box-sizing: border-box;
        }
      }
      &:last-child {
        padding-left: 25px;
        border-right: none;
        position: sticky;
        right: -1px;
        background-color: #fff;
        .border-left {
          position: absolute;
          left: -1px;
          top: -1px;
          bottom: -1px;
          border-left: 1px dotted #c7c7c7;
          box-sizing: border-box;
        }
        .btn-update,
        .btn-option {
          color: #0075c0;
          font-weight: bold;
          background: none;
          border: none;
          cursor: pointer;
        }
        .btn-option {
          width: 23px;
          border: none;
        }
      }
      &:nth-last-child(2) {
        border-right: none;
      }
    }
  }
}

// Dialog
.dialog {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  &.dialog-hide {
    display: none;
  }
  .dialog-content {
    width: 900px;
    margin: 150px auto;
    background-color: #fff;
    position: relative;
    .dialog-header {
      padding: 16px;
      .dialog-title {
        font-size: 24px;
        font-family: Google-Sans-Bold;
        margin-right: 16px;
      }
      .line-height {
        line-height: 33px;
        padding-left: 4px;
        margin-right: 8px;
        font-size: 16px;
        display: inline-block;
      }

      .dialog-button-close {
        background: url("./assets/img/Sprites.svg") no-repeat -137px -136px;
        position: absolute;
        right: 0;
        top: 0;
        height: 40px;
        width: 40px;
        cursor: pointer;
      }
      .dialog-button-help {
        background: url("./assets/img/Sprites.svg") no-repeat -80px -136px;
        position: absolute;
        right: 40px;
        top: 0;
        height: 40px;
        width: 40px;
        cursor: pointer;
      }
    }
    .dialog-body {
      padding-left: 24px;
      padding-right: 24px;
      .space-input {
        padding-left: 4px;
        padding-right: 4px;
        padding-top: 16px;
      }
    }
    .divide {
      border-top: 1px solid #e0e0e0;
      margin: 32px 30px 12px 28px;
    }
    .dialog-footer {
      padding-right: 24px;
      padding-bottom: 12px;
      height: 70px;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

// Radio
.radio {
  display: none;

  & + label {
    -webkit-appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    height: 18px;
    width: 18px;
    border-radius: 50px;
    display: inline-block;
    position: relative;

    &:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px 1px 3px rgba(0, 0, 0, 0.1);
    }
  }

  &:checked {
    & + label {
      border: 1px solid #2ca01c;

      &:after {
        content: " ";
        width: 10px;
        height: 10px;
        border-radius: 50px;
        position: absolute;
        top: 3px;
        background: #2ca01c;
        left: 3px;
      }

      &:active {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
          inset 0px 1px 3px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.pr-1 {
  padding-right: 8px;
}

.pl-1 {
  padding-right: 8px;
}

.px-1 {
  padding-left: 8px;
  padding-right: 8px;
}

.mx-1 {
  margin-left: 8px;
  margin-right: 8px;
}

.ml-1 {
  margin-left: 8px;
}

.ml-2 {
  margin-left: 16px;
}

.mt-1 {
  margin-top: 8px;
}

.mt-2 {
  margin-top: 16px;
}

.mb-2 {
  margin-bottom: 16px;
}

.mb-3 {
  margin-bottom: 24px;
}

.has-text-left {
  text-align: left;
}

.has-text-center {
  text-align: center;
}

.has-text-right {
  text-align: right;
}

.selected {
  background-color: #e5e5e5;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-1 {
  width: 8.33%;
}

.col-2 {
  width: 16.66%;
}

.col-3 {
  width: 25%;
}

.col-4 {
  width: 33.33%;
}

.col-5 {
  width: 41.66%;
}

.col-6 {
  width: 50%;
}

.col-7 {
  width: 58.33%;
}

.col-8 {
  width: 66.66%;
}

.col-9 {
  width: 75%;
}

.col-10 {
  width: 83.33%;
}

.col-11 {
  width: 91.66%;
}

.col-12 {
  width: 100%;
}

[class*="col-"] {
  flex: 0 0 auto;
}
</style>
