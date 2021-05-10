<template>
  <div class="pagination">
    <router-link
      :to="'/employee?page=' + (page - 1)"
      v-if="page > 1"
      class="pagination-item"
    >
      <div class="prev-page">Trước</div>
    </router-link>
    <div class="pagination_item disabled-prev" v-if="page == 1">Trước</div>

    <router-link
      v-for="n in rangePage"
      :key="n"
      class="pagination-item"
      :to="'/employee?page=' + n"
    >
      <div class="page" :class="{ active: n == page }">{{ n }}</div>
    </router-link>

    <router-link
      :to="'/employee?page=' + (page + 1)"
      v-if="page < totalPage"
      class="pagination-item"
    >
      <div class="next-page">Sau</div>
    </router-link>
    <div class="pagination_item disabled-next" v-if="page == totalPage">
      Sau
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    /**
     * Trang hiện tại.
     */
    page: {
      type: Number,
      default: 1,
    },

    /**
     * Tổng số trang.
     */
    totalPage: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    rangePage: function () {
      let range = [];
      let start = this.page > 3 ? this.page - 2 : 1;
      let end = this.page < this.totalPage - 2 ? this.page + 2 : this.totalPage;
      for (let i = start; i <= end; i++) range.push(i);
      return range;
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
}

.pagination .pagination-item {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  margin-left: 4px;
  margin-right: 4px;
  text-decoration: none;
  color: #000;
}

.pagination .pagination-item .page {
  width: 24px;

  text-align: center;
}

.pagination .pagination-item .page.active {
  font-weight: bold;
  border: 1px solid #bbb;
}

.pagination .pagination-item .page:hover:not(.active) {
}

.pagination .first-page {
}

.pagination .prev-page {
}

.pagination .next-page {
}

.pagination .last-page {
}
.disabled-prev {
  margin-right: 15px;
  color: rgb(206, 206, 206);
}
.disabled-next {
  margin-left: 15px;
  color: rgb(206, 206, 206);
}
</style>