<template>
  <!-- #region dialog -->
  <div class="dialog">
    <div class="dialog-background" @click="closeDialog"></div>
    <div class="dialog-content zoomIn" style="width: 450px">
      <!-- #region dialog-body -->
      <div class="flex-row-align-center" style="padding: 32px 24px 0 24px">
        <div class="icon icon-warning-48" style="width: 70px"></div>
        <div style="margin-left: 16px">
          {{ msg }}
        </div>
      </div>
      <!-- #endregion -->
      <!-- #region dialog-footer -->
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
      <!-- #endregion -->
    </div>
  </div>
  <!-- #endregion -->
</template>

<script>
//#region import
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
     * Lời nhắn.
     * CreatedBy: dqdat (11/6/2021)
     */
    msg: String,
  },
  //#endregion

  //#region methods
  methods: {
    /**
     * Hàm đóng dialog.
     * CreatedBy: dqdat (11/6/2021)
     */
    closeDialog() {
      this.$emit("onClose");
    },

    /**
     * Hàm khi click button Ok.
     * CreatedBy: dqdat (11/6/2021)
     */
    onConfirmed() {
      this.$emit("onClose");
      this.$emit("onOk");
    },
  },
  //#endregion
};
//#endregion
</script>
