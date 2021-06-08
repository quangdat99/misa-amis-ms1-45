<template>
  <div class="dialog" :class="{ 'dialog-hide': !show }">
    <div class="dialog-content zoomIn" style="width: 450px">
      <div class="flex-row-align-center" style="padding: 32px 24px 0 24px">
        <div class="icon icon-warning-48"></div>
        <div style="margin-left: 16px">
          {{ msg }}
        </div>
      </div>
      <div class="divide"></div>

      <div class="dialog-footer">
        <Button text="Ok" @click="closeDialog" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./common/Button";
export default {
  name: "AlertDialog",
  components: {
    Button,
  },
  props: {
    /**
     * Prop xác định trạng thái của dialog thông báo.
     * true: hiện
     * false: ẩn
     */
    show: Boolean,

    /**
     * Lời nhắn của dialog thông báo.
     */
    msg: String,
  },
  methods: {
    /**
     * Hàm thực hiện đóng dialog thông báo.
     */
    closeDialog() {
      this.$emit("onClose");
    },
  },
};
</script>
