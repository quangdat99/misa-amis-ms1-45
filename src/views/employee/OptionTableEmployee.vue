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
     * CreatedBy: dqdat (11/6/2021)
     */
    top: {
      type: Number,
      default: 0,
    },

    /**
     * Vị trí của component so với left
     * CreatedBy: dqdat (11/6/2021)
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
     * CreatedBy: dqdat (11/6/2021)
     */
    closeDialog() {
      this.$emit("onClose");
    },
  },
  //#endregion

  //#region mounted
  mounted() {
    this.$refs.autofocus.focus();
  },
  //#endregion
};
//#endregion
</script>