<template>
  <div class="dropdown autocomplete">
    <div class="dropdown-btn con-input">
      <input
        type="text"
        class="input has-icon"
        readonly
        :value="suggestions[current].text"
        @focus="showSuggestion"
        @blur="onBlur"
      />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleSuggestion"
      >
        <div class="icon icon-arrow-dropdown"></div>
      </div>
    </div>
    <div class="dropdown-content reserve" :class="{ hide: !isShow }">
      <div
        v-for="(suggestion, i) in suggestions"
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
    suggestions: {
      type: Array,
      required: true,
    },
    value: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    isShow: false,
    current: 0,
  }),
  methods: {
    toggleSuggestion() {
      if (this.isShow) {
        this.isShow = false;
      } else {
        this.showSuggestion();
      }
    },
    showSuggestion() {
      this.$el.querySelector("input").focus();
      this.isShow = true;
    },
    clickSuggestion(suggestion, index) {
      this.$emit("update:value", suggestion.value);
      this.$emit("onChange");
      this.current = index;
      this.isShow = false;
    },

    onBlur() {
      setTimeout(() => {
        this.isShow = false;
      }, 200);
    },
  },

  mounted() {
    let index = this.suggestions.findIndex((s) => s.value == this.value);
    if (index >= 0) {
      this.current = index;
    } else {
      this.current = 0;
    }
  },
};
</script>