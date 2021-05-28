 <template>
  <div>
    <label v-if="label" class="label-input">
      {{ label }}
    </label>

    <div class="input">
      <label v-for="(o, i) in option" :key="i" class="flex">
        <input
          type="radio"
          name="radio-input"
          :value="o.value"
          v-model="valueCombobox"
        />
        <div class="custom-radio radio-border">
          <div class="radio-content"></div>
        </div>
        <span>{{ o.text }}</span>
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

<style scoped>
.label-input {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

.flex {
  display: flex;
}

.input {
  padding-top: 6px;
  padding-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
}

input[type="radio"] {
  display: none;
}
input[type="radio"]:checked + .radio-border {
  border: 1px solid #2ca01c;
}
input[type="radio"]:checked + .custom-radio .radio-content {
  background-color: #2ca01c;
}
.custom-radio {
  margin-right: 8px;
}
.radio-border {
  border: 1px solid #babec5;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.radio-content {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>