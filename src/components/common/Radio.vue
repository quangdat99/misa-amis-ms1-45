<template>
  <!-- #region radio -->
  <div style="display: inline-block">
    <input
      :tabindex="index"
      type="radio"
      :id="id"
      class="radio"
      :name="name"
      :value="value"
      :checked="checked"
      @input="$emit('change', $event.target.value)"
    />
    <label :for="id"></label>
    <label :for="id" style="margin-left: 8px">Nam</label>
  </div>
  <!-- #endregion -->
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    index: String,
    /**
     * name của radio
     * CreatedBy: dqdat (11/6/2021)
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * Giá trị của radio
     * CreatedBy: dqdat (11/6/2021)
     */
    value: {
      type: String,
      required: true,
    },

    /**
     * Xác định radio có được check hay không
     * CreatedBy: dqdat (11/6/2021)
     */
    checked: {
      type: Boolean,
      default: null,
    },
  },
  //#endregion

  //#region data
  data() {
    return {
      id: Math.random(),
    };
  },
  //#endregion
};
//#endregion
</script>