<template>
  <!-- #region panagition -->
  <div class="pagination">
    <!-- #region Trước -->
    <div
      @click="$emit('update:page', page - 1)"
      v-if="page > 1"
      class="pagination-item"
    >
      <div class="prev-page">Trước</div>
    </div>
    <div class="pagination_item disabled-prev" v-if="page == 1">Trước</div>
    <!-- #endregion -->
    <!-- #region page-item -->
    <div class="pagination-item" @click="$emit('update:page', 1)">
      <div class="page" :class="{ active: page == 1 }">1</div>
    </div>
    <!-- ... -->
    <div class="three-dot" v-if="page > 4">...</div>
    <div
      v-for="n in rangePage"
      :key="n"
      class="pagination-item"
      @click="$emit('update:page', n)"
    >
      <div class="page" :class="{ active: n == page }">{{ n }}</div>
    </div>
    <!-- ... -->
    <div class="three-dot" v-if="page < totalPage - 3">...</div>
    <div
      v-if="totalPage > 1"
      class="pagination-item"
      @click="$emit('update:page', totalPage)"
    >
      <div class="page" :class="{ active: page == totalPage }">
        {{ totalPage }}
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region Sau -->
    <div
      @click="$emit('update:page', page + 1)"
      v-if="page < totalPage"
      class="pagination-item"
    >
      <div class="next-page">Sau</div>
    </div>
    <div class="pagination_item disabled-next" v-if="page == totalPage">
      Sau
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
     * Trang hiện tại.
     * CreatedBy: dqdat (11/6/2021)
     */
    page: {
      type: Number,
      default: 1,
    },

    /**
     * Tổng số trang.
     * CreatedBy: dqdat (11/6/2021)
     */
    totalPage: {
      type: Number,
      default: 1,
    },
  },
  //#endregion

  //#region computed
  computed: {
    /**
     *  Khởi tạo danh sách các các page có thể click
     * CreatedBy: dqdat (11/6/2021)
     * */
    rangePage: function () {
      let range = [];
      let start = this.page > 4 ? this.page - 2 : 2;
      let end =
        this.page < this.totalPage - 3 ? this.page + 2 : this.totalPage - 1;
      for (let i = start; i <= end; i++) range.push(i);
      return range;
    },
  },
  //#endregion
};
//#endregion
</script>
