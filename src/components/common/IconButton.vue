<template>
  <!-- #region icon button -->
  <button
    class="btn"
    :class="icon ? icon : ''"
    @click.prevent="$emit('click', $event)"
  ></button>
  <!-- #endregion -->
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    /**
     * Icon class
     * CreatedBy: dqdat (11/6/2021)
     */
    icon: {
      type: String,
      default: null,
    },
  },
  //#endregion
};
//#endregion
</script>