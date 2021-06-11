<template>
  <input
    class="input"
    :class="{ 'has-icon': hasIcon }"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
  />
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    /**
     * Xác định có icon không
     * CreatedBy: dqdat (11/6/2021)
     */
    hasIcon: {
      type: Boolean,
      default: false,
    },

    /**
     * Placeholder của input
     * CreatedBy: dqdat (11/6/2021)
     */
    placeholder: {
      type: String,
      default: "",
    },

    /**
     * Type của input
     * CreatedBy: dqdat (11/6/2021)
     */
    type: {
      type: String,
      default: "text",
    },

    /**
     * Giá trị của input
     * CreatedBy: dqdat (11/6/2021)
     */
    value: {
      type: String,
      default: "",
    },
  },
  //#endregion
};
//#endregion
</script>