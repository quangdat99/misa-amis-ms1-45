<template>
  <!-- #region dialog -->
  <div class="dialog">
    <div class="dialog-background" @click="closeDialog"></div>
    <div class="dialog-content zoomIn" style="width: 500px">
      <!-- #region dialog-body -->
      <div class="flex-row-align-center" style="padding: 32px 24px 0 24px">
        <div class="icon" :class="classType"></div>
        <div style="margin-left: 16px">
          {{ msg }}
        </div>
      </div>
      <!-- #endregion -->
      <!-- #region dialog-footer -->
      <div class="divide"></div>
      <div class="dialog-footer" v-if="type == 'warning'">
        <div class="dialog-footer-right">
          <Button :text="textBtn" color="primary" @click="closeDialog" />
        </div>
      </div>
      <div
        v-if="type == 'error'"
        class="dialog-footer"
        style="justify-content: center"
      >
        <Button
          :text="textBtn"
          color="primary"
          @click="closeDialog"
          style="margin-left: 12px"
        />
      </div>
      <!-- #endregion -->
    </div>
  </div>
  <!-- #endregion -->
</template>

<script>
//#region inport
import Button from "./Button";
//#endregion
//#region export
export default {
  //#region components
  components: {
    Button,
  },
  //#endregion

  //#region props
  props: {
    /**
     * Lời nhắn
     * CreatedBy: dqdat (11/6/2021)
     */
    msg: {
      type: String,
      default: "",
    },

    /**
     * Text button
     * CreatedBy: dqdat (11/6/2021)
     */
    textBtn: {
      type: String,
      default: "Đóng",
    },

    /**
     * Loại dialog alert
     * warning, error
     * CreatedBy: dqdat (11/6/2021)
     */
    type: {
      type: String,
      required: true,
    },
  },
  //#endregion

  //#region computed
  computed: {
    classType: function () {
      if (this.type == "warning") return "icon-warning-48";
      if (this.type == "error") return "icon-error";
      return "";
    },
  },
  //#endregion

  //#region methods
  methods: {
    /**
     * Hàm thực hiện đóng dialog thông báo.
     * CreatedBy: dqdat (11/6/2021)
     */
    closeDialog() {
      this.$emit("onClose");
    },
  },
  //#endregion
};
//#endregion
</script>
