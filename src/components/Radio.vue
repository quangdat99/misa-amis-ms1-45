 <template>
  <div>
    <label v-if="label" class="label-input">
      {{ label }}
    </label>
    <div class="input">
      <label v-for="(o, i) in option" :key="i">
        <input
          type="radio"
          name="radio-input"
          :value="o.value"
          :checked="value == o.value"
          v-model="valueCombobox"
        />
        {{ o.text }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radio",
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
      default: null,
    },
  },
  computed: {
    valueCombobox: {
      get() {
        return this.value;
      },
      set(val1) {
        this.$emit("input", val1);
      },
    },
  },
};
</script>

<style>
.label-input {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
.input {
  padding-top: 6px;
}
</style>