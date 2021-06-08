<template>
  <div class="dialog" :class="{ 'dialog-hide': !show }">
    <div class="dialog-content zoomIn" style="width: 450px">
      <div class="flex-row-align-center" style="padding: 32px 24px 0 24px">
        <div class="icon" :class="classType"></div>
        <div style="margin-left: 16px">
          {{ msg }}
        </div>
      </div>
      <div class="divide"></div>

      <div class="dialog-footer" v-if="type == 'warning'">
        <div class="dialog-footer-right">
          <Button :text="textBtn" color="primary" @click="closeDialog" />
        </div>
        <!-- <Button text="Ok" @click="closeDialog" /> -->
      </div>
      <div
        v-if="type == 'error'"
        class="dialog-footer"
        style="justify-content: center"
      >
        <Button :text="textBtn" color="primary" @click="closeDialog" />
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
     * Lời nhắn
     */
    msg: {
      type: String,
      default: "",
    },

    /**
     * Text button
     * CreatedBy: dqdat 01/06/2021
     */
    textBtn: {
      type: String,
      default: "Đóng",
    },

    /**
     * Loại dialog alert
     * warning, error
     */
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    classType: function () {
      if (this.type == "warning") return "icon-warning-48";
      if (this.type == "error") return "icon-error";
      return "";
    },
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
