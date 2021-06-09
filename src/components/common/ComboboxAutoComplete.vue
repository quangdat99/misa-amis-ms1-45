<template>
  <div class="dropdown autocomplete">
    <div class="dropdown-btn con-input">
      <input
        type="text"
        class="input has-icon"
        :value="valueInput"
        v-bind="inputAttributes"
        @focus="showSuggestion"
        @blur="onBlur"
        @keydown.up.prevent="up"
        @keydown.down.prevent="down"
        @keydown.enter.prevent="enter"
        @input="onInput"
      />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleSuggestion"
      >
        <div class="icon icon-arrow-dropdown"></div>
      </div>
    </div>
    <div class="dropdown-content" :class="{ hide: !isShow }">
      <div class="dropdown-item-empty" v-if="suggestionData.length == 0">
        Không có dữ liệu hiển thị
      </div>
      <div
        v-for="(suggestion, i) in suggestionData"
        :key="i"
        class="dropdown-item"
        :class="{ active: current == i }"
        @click.prevent="clickSuggestion(suggestion, i)"
      >
        {{ suggestion.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Danh sách suggestion của autocomplete.
     */
    suggestions: {
      type: Array,
      required: true,
    },

    /**
     * Giá trị khởi tạo cho input
     */
    value: {
      type: String,
      default: null,
    },

    /**
     * Attribute thêm cho input
     */
    inputAttributes: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    /**
     * Xác định trạng thái popup autocomplete
     */
    isShow: false,

    /**
     * vị trí hiện tại
     */
    current: 0,

    /**
     * Danh sách suggesstion của autocomplete có lọc
     */
    suggestionData: [],

    /**
     * Giá trị của input
     */
    valueInput: "",
  }),
  methods: {
    /**
     * Đảo ngược trạng thái popup
     */
    toggleSuggestion() {
      if (this.isShow) {
        this.isShow = false;
      } else {
        this.showSuggestion();
      }
    },

    /**
     * Hiển thị popup
     */
    showSuggestion() {
      this.$el.querySelector("input").focus();
      this.isShow = true;
    },

    /**
     * Nhấn enter
     */
    enter() {
      this.$emit("update:value", this.suggestionData[this.current].value);
      this.valueInput = this.suggestionData[this.current].text;
      this.isShow = false;
    },

    /**
     * Nhấn up
     * CreatedBy: dqdat 02/06/2021
     */
    up() {
      if (this.current > 0) this.current--;
      this.valueInput = this.suggestionData[this.current].text;
    },

    /**
     * Nhấn down
     */
    down() {
      if (this.current < this.suggestions.length - 1) this.current++;
      this.valueInput = this.suggestionData[this.current].text;
    },

    /**
     * Chọn một suggesstion
     */
    clickSuggestion(suggestion, index) {
      this.current = index;
      this.isShow = false;
      this.$emit("update:value", suggestion.value);
      this.valueInput = suggestion.text;
    },

    /**
     * Blur input
     */
    onBlur() {
      var res = this.suggestions.find((s) => s.text == this.valueInput);
      if (res) {
        this.$emit("update:value", res.value);
      } else {
        this.$emit("update:value", null);
      }

      setTimeout(() => {
        this.isShow = false;
        this.$emit("blur");
      }, 300);
    },

    /**
     * Nhập vào input
     */
    onInput(e) {
      let val = e.target.value;
      this.valueInput = val;
      this.current = 0;
      if (this.suggestions) {
        this.suggestionData = this.suggestions.filter((s) =>
          s.text.toLowerCase().includes(val.toLowerCase())
        );
        this.isShow = true;
      }
    },
  },

  mounted() {
    this.suggestionData = this.suggestions;
    let index = this.suggestionData.findIndex((s) => s.value == this.value);
    if (index >= 0) {
      this.current = index;
      this.valueInput = this.suggestionData[this.current].text;
    } else {
      this.current = 0;
      this.valueInput = "";
    }
  },
};
</script>