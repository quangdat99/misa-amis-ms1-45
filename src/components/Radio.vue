 <template>
  <div class="radio-button-group">
    <label v-if="label" class="label-input">
      {{ label }}
      <template v-if="important"><span class="important"> *</span></template>
    </label>
    <div class="input">
      <label v-for="(o, i) in option" :key="i">
        <input
          type="radio"
          name="radio-input"
          :value="o.value"
          :checked="val == value"
          v-model="valueCombobox"
        />
        {{ o.text }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRadioButtonGroup",
  data() {
    return {
      valRadio: null,
    };
  },
  props: {
    // Tên label của input.
    label: {
      type: String,
      default: null,
    },
    option: {
      required: true,
      type: Array,
    },
    /**
     * Giá trị khởi tạo của combobox.
     */
    value: {
      default: "",
    },
  },
  computed: {
    valueCombobox: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style>
.radio-button-group {
}

.label-input {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
.input {
  padding-top: 6px;
}
</style>