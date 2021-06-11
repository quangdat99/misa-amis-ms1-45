<template>
  <div class="dropdown autocomplete">
    <div class="dropdown-btn con-input">
      <input
        type="text"
        class="input has-icon"
        readonly
        :value="options[current].text"
        @focus="showOption"
        @blur="onBlur"
        @keydown.up.prevent="up"
        @keydown.down.prevent="down"
        @keydown.enter="enter"
      />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleOption"
      >
        <div class="icon icon-arrow-dropdown"></div>
      </div>
    </div>
    <div class="dropdown-content reserve" :class="{ hide: !isShow }">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="dropdown-item"
        :class="{ active: current == i }"
        @click.prevent="clickOption(option, i)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
//#region  export
export default {
  //#region  props
  props: {
    /**
     * Khởi tạo anh sách option
     * CreatedBy: dqdat (11/6/2021)
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * Giá trị khởi tạo
     * CreatedBy: dqdat (11/6/2021)
     */
    value: {
      type: Number,
      default: null,
    },
  },
  //#endregion

  //#region data
  data: () => ({
    /**
     * Hiển thị danh sách option
     * CreatedBy: dqdat (11/6/2021)
     */
    isShow: false,

    /**
     * Trang thái active của option
     * CreatedBy: dqdat (11/6/2021)
     */
    current: 0,
  }),
  //#endregion

  //#region methods
  methods: {
    /**
     * Thay đổi trạng thái popup
     * CreatedBy: dqdat (11/6/2021)
     */
    toggleOption() {
      if (this.isShow) {
        this.isShow = false;
        this.$el.querySelector("input").blur();
      } else {
        this.showOption();
      }
    },

    /**
     * Hiển thị popup
     * CreatedBy: dqdat (11/6/2021)
     */
    showOption() {
      this.$el.querySelector("input").focus();
      this.isShow = true;
    },

    /**
     * Chọn một suggesstion
     * CreatedBy: dqdat (11/6/2021)
     */
    clickOption(option, index) {
      this.$emit("update:value", option.value);
      this.$emit("onChange");
      this.current = index;
      this.isShow = false;
    },

    /**
     * Blur input
     * CreatedBy: dqdat (11/6/2021)
     */
    onBlur() {
      setTimeout(() => {
        this.isShow = false;
      }, 200);
    },

    /**
     * Nhấn enter
     * CreatedBy: dqdat (11/6/2021)
     */
    enter() {
      this.$emit("update:value", this.options[this.current].value);
      this.$emit("onChange");
      this.isShow = false;
      this.$el.querySelector("input").blur();
    },

    /**
     * Nhấn up
     * CreatedBy: dqdat (11/6/2021)
     */
    up() {
      if (this.current > 0) this.current--;
    },

    /**
     * Nhấn down
     * CreatedBy: dqdat (11/6/2021)
     */
    down() {
      if (this.current < this.options.length - 1) this.current++;
    },
  },
  //#endregion

  //#region mounted
  mounted() {
    /**
     * Khởi tạo trạng thái active option ban đầu
     * CreatedBy: dqdat (11/6/2021)
     */
    let index = this.options.findIndex((s) => s.value == this.value);
    if (index >= 0) {
      this.current = index;
    } else {
      this.current = 0;
    }
  },
  //#endregion
};
//#endregion
</script>