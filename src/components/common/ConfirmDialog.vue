<template>
  <div class="dialog">
    <div class="dialog-background" @click="closeDialog"></div>
    <div class="dialog-content zoomIn" style="width: 450px">
      <div class="flex-row-align-center" style="padding: 32px 24px 0 24px">
        <div class="icon icon-warning-48" style="width: 70px"></div>
        <div style="margin-left: 16px">
          {{ msg }}
        </div>
      </div>
      <div class="divide"></div>

      <div class="dialog-footer">
        <Button
          text="Không"
          :color="'secondary'"
          style="position: absolute; left: 28px"
          @click="closeDialog"
          styleBtn="border: 1px solid #8d9096;margin-right: 207px;"
        />
        <Button text="Có" @click="onConfirmed" />
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
