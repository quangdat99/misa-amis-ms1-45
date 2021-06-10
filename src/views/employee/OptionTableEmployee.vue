<template>
  <div
    ref="autofocus"
    tabindex="0"
    @focusout="closeDialog"
    class="table-option-dropdown zoomIn"
    :style="{ top: top + 'px', left: left + 'px' }"
  >
    <div class="dropdown-item" @click="$emit('onClickDuplicate')">Nhân bản</div>
    <div class="dropdown-item" @click="$emit('onClickBtnDel')">Xóa</div>
    <div class="dropdown-item">Ngừng sử dụng</div>
  </div>
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    /**
     * Vị trí của component so với top
     */
    top: {
      type: Number,
      default: 0,
    },

    /**
     * Vị trí của component so với left
     */
    left: {
      type: Number,
      default: 0,
    },
  },
  //#endregion

  //#region methods
  methods: {
    /**
     * Phương thức đóng dialog.
     */
    closeDialog() {
      this.$emit("onClose");
    },
  },

  mounted() {
    this.$refs.autofocus.focus();
  },
  //#endregion
};
//#endregion
</script>