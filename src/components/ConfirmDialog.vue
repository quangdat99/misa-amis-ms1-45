<template>
  <div class="dialog" :class="{ 'dialog-hide': !show }">
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="dialog-title">CẢNH BÁO</div>
        <div class="dialog-button-close" @click="closeDialog">&#x2715;</div>
      </div>
      <div class="dialog-body">
        {{ msg }}
      </div>
      <div class="divide"></div>

      <div class="dialog-footer">
        <Button
          text="Hủy"
          :color="null"
          @click="closeDialog"
          styleBtn="border: 1px solid #8d9096;margin-right: 207px;"
        />
        <Button text="Ok" @click="onConfirmed" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "AlertDialog",
  components: {
    Button,
  },
  props: {
    /**
     * Prop xác định trạng thái của dialog.
     * true: hiện
     * false: ẩn
     */
    show: Boolean,

    /**
     * Lời nhắn.
     */
    msg: String,
  },
  methods: {
    /**
     * Hàm đóng dialog.
     */
    closeDialog() {
      this.$emit("onClose");
    },

    /**
     * Hàm khi click button Ok.
     */
    onConfirmed() {
      this.$emit("onClose");
      this.$emit("onOk");
    },
  },
};
</script>

<style scoped>
.dialog {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog.dialog-hide {
  display: none;
}

.dialog .dialog-content {
  width: 400px;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
}

.dialog .dialog-header {
  padding: 16px;
}

.dialog .dialog-header .dialog-title {
  font-size: 15px;
  font-family: Google-Sans-Bold;
}

.dialog .dialog-header .dialog-button-close {
  font-size: 16px;
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-bottom-left-radius: 4px;
}

.dialog .dialog-header .dialog-button-close:hover {
  background-color: #e5e5e5;
}

.dialog .dialog-body {
  padding: 0 24px 24px 24px;
}

.dialog .divide {
  border-top: 1px solid #e0e0e0;
  margin: 0px 30px 12px 28px;
}

.dialog .dialog-footer {
  padding-right: 24px;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
  border-radius: 4px;
}
</style>