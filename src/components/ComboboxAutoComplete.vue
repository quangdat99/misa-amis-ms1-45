<template>
  <div class="field-input">
    <div class="input-icon-right" @click="onClickShowMenu"></div>
    <input
      ref="input"
      class="input"
      :style="styleCombobox"
      :class="{ 'has-error': errorMsg }"
      v-model="value"
      @click="onClickShowMenu"
    />
    <div class="combo-menu" :class="{ 'menu-hide': !show }" >
      <!-- <div class="menu-header-container">
        <table class="menu-table">
          <thead class="menu-header">
            <tr>
              <th
                class="menu-header__th"
                style="width: 100px; text-align: left"
              >
                Mã đơn vị
              </th>
              <th
                class="menu-header__th"
                style="width: 250px; text-align: left"
              >
                Tên đơn vị
              </th>
            </tr>
          </thead>
        </table>
      </div> -->
      <div class="menu-body-container">
        <table class="menu-table">
          <tbody class="menu-items">
            <tr class="dropdown-item" v-for="(o, i) in option" :key="i" @click="onClickOption">
              <!-- <td
                class="dropdown-item-td"
                style="width: 100px; text-align: left"
              >
                123
              </td> -->
              <td
                class="dropdown-item-td"
                style="width: 250px; text-align: left"
              >
                 {{ o.text }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-if="errorMsg" class="text-error">{{ errorMsg }}</p>
  </div>
</template>

<script>
export default {
  name: "ComboboxAutoComplete",
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      /**
     * Xác định trạng thái của dialog.
     * true: hiện
     * false: ẩn
     */
    show: false,
    }
  },
  props: {
    

    // Tên label của input.
    label: {
      type: String,
      default: null,
    },

    /**
     * Xác định field input có bắt buộc không.
     * true: có
     * false: không.
     */
    important: {
      type: Boolean,
      default: false,
    },

    /**
     * Giá trị khởi tạo của input.
     */
    value: {
      default: null,
    },

    // Các option của combobox.
    option: Array,

    /**
     * Hiển thị lỗi input khi valid.
     */
    errorMsg: {
      type: String,
      default: null,
    },

    // style cho combobox
    styleCombobox: {
      type: String,
      default: null,
    },
  },

  methods: {
    onClickShowMenu(){
      this.show = !this.show;
      this.$nextTick(function () {
          this.$refs.input.focus();
        });
    },
    outside(){
      setTimeout(() => {
      this.show = false;
      }, 200);
    },
    onClickOption(){
      // this.show = false;
      this.$refs.input.focus();
      this.$refs.input.value.$emit("change", "abc");
    }
  },

  computed: {
    valueInput: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      },
    },
  },
  watch: {
  },
};
</script>

<style scoped>
.field-input .label-input {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

.field-input .label-input .important {
  color: red;
}

.field-input .input {
  border: 1px solid #bbb;
  outline: none;
  border-radius: 3px;
  height: 32px;
  padding-left: 16px;
  font-size: 13px;
  width: 100%;
  padding-top: 0px;
}

.field-input {
  position: relative;
}

.field-input .input-icon-right {
  position: absolute;
  right: 1px;
  top: 1px;
  height: 30px;
  width: 30px;
  background: url("../assets/img/Sprites.svg") no-repeat -552px -350px;
  cursor: pointer;
}
.field-input .input-icon-right:hover {
  background-color: #dddddd;
}

.field-input .input {
  padding-left: 15px;
}

.field-input .input:focus {
  border-color: #2ca01c;
}

.field-input .input.has-error {
  border-color: red;
}

.field-input .text-error {
  margin: 0;
  color: red;
}

.combo-menu {
  position: absolute;
  top: 33px;
  min-height: 100px;
  width: 100%;
  z-index: 10001;
  background-color: #fff;
  border: 1px solid #babec5;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 -8px 34px 0 rgb(0 0 0 / 5%);
}

.combo-menu .menu-header-container {
  background: #f4f5f8;
}

.combo-menu .menu-table {
  width: 100%;
  border-collapse: collapse;
}

.combo-menu .menu-header-container .menu-header th {
  padding: 0 10px;
  height: 32px;
}

.combo-menu .menu-body-container {
  max-height: 160px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2px 1px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  white-space: nowrap;
}

.dropdown-item .dropdown-item-td {
  padding: 0 10px;
}

.dropdown-item:hover {
  color: #35bf22;
  background-color: #e6e6e6;
}

.menu-hide {
  display: none;
}
</style>