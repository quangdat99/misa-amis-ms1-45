<template>
  <!-- #region combobox auto complete -->
  <div class="dropdown autocomplete">
    <!-- #region dropdown button, input -->
    <div class="dropdown-btn con-input">
      <input
        type="text"
        class="input has-icon"
        :value="valueInput"
        v-bind="inputAttributes"
        @focus="showOption"
        @blur="onBlur"
        @keydown.up.prevent="up"
        @keydown.down.prevent="down"
        @keydown.enter.prevent="enter"
        @input="onInput"
      />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleOption"
      >
        <div class="icon icon-arrow-dropdown"></div>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region dropdown content -->
    <div class="dropdown-content" :class="{ hide: !isShow }">
      <div class="dropdown-item-empty" v-if="optionData.length == 0">
        Không có dữ liệu hiển thị
      </div>
      <div
        v-for="(option, i) in optionData"
        :key="i"
        class="dropdown-item"
        :class="{ active: current == i }"
        @click.prevent="clickoption(option, i)"
      >
        {{ option.text }}
      </div>
    </div>
    <!-- #endregion -->
  </div>
  <!-- #endregion -->
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    /**
     * Danh sách option của comboboxAutoComplete.
     * CreatedBy: dqdat (11/6/2021)
     */
    options: {
      type: Array,
      required: true,
    },

    /**
     * Giá trị khởi tạo cho input
     * CreatedBy: dqdat (11/6/2021)
     */
    value: {
      type: String,
      default: null,
    },

    /**
     * Attribute thêm cho input
     * CreatedBy: dqdat (11/6/2021)
     */
    inputAttributes: {
      type: Object,
      default: null,
    },
  },
  //#endregion

  //#region data
  data: () => ({
    /**
     * Xác định trạng thái popup comboboxAutoComplete
     * CreatedBy: dqdat (11/6/2021)
     */
    isShow: false,

    /**
     * vị trí hiện tại
     * CreatedBy: dqdat (11/6/2021)
     */
    current: 0,

    /**
     * Danh sách option của comboboxAutoComplete có lọc
     * CreatedBy: dqdat (11/6/2021)
     */
    optionData: [],

    /**
     * Giá trị của input
     * CreatedBy: dqdat (11/6/2021)
     */
    valueInput: "",
  }),
  //#endregion

  //#region  methods
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
     * Nhấn enter
     * CreatedBy: dqdat (11/6/2021)
     */
    enter() {
      this.$emit("update:value", this.optionData[this.current].value);
      this.valueInput = this.optionData[this.current].text;
      this.isShow = false;
      this.$el.querySelector("input").blur();
    },

    /**
     * Nhấn up
     * CreatedBy: dqdat (11/6/2021)
     */
    up() {
      if (this.current > 0) this.current--;
      this.valueInput = this.optionData[this.current].text;
    },

    /**
     * Nhấn down
     * CreatedBy: dqdat (11/6/2021)
     */
    down() {
      if (this.current < this.options.length - 1) this.current++;
      this.valueInput = this.optionData[this.current].text;
    },

    /**
     * Chọn một option
     * CreatedBy: dqdat (11/6/2021)
     */
    clickoption(option, index) {
      this.current = index;
      this.isShow = false;
      this.$emit("update:value", option.value);
      this.valueInput = option.text;
    },

    /**
     * Blur input
     * CreatedBy: dqdat (11/6/2021)
     */
    onBlur() {
      var res = this.options.find((s) => s.text == this.valueInput);
      if (res) {
        this.$emit("update:value", res.value);
      } else {
        if (this.valueInput) {
          this.$emit("update:value", "");
        } else {
          this.$emit("update:value", null);
        }
      }

      setTimeout(() => {
        this.isShow = false;
        this.$emit("blur");
      }, 300);
    },

    /**
     * Nhập vào input
     * CreatedBy: dqdat (11/6/2021)
     */
    onInput(e) {
      let val = e.target.value;
      this.valueInput = val;
      this.current = 0;
      if (this.options) {
        this.optionData = this.options.filter((s) =>
          s.text.toLowerCase().includes(val.toLowerCase())
        );
        this.isShow = true;
      }
    },
  },
  //#endregion

  //#region mounted
  mounted() {
    // Khởi tạo dữ liệu Options
    this.optionData = this.options;

    // Khởi tạo trạng thái active option ban đầu
    let index = this.optionData.findIndex((s) => s.value == this.value);
    if (index >= 0) {
      this.current = index;
      this.valueInput = this.optionData[this.current].text;
    } else {
      this.current = 0;
      this.valueInput = "";
    }
  },
  //#endregion
};
//#endregion
</script>