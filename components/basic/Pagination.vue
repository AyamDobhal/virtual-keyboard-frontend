<template>
  <ul class="flex flex-row space-x-3 justify-end">
    <li v-if="currentPage > 1" class="page-item">
      <a
        class="page-link"
        href="#"
        aria-label="Previous"
        @click.prevent="changePage(currentPage - 1)"
      >
        <i class="ph-caret-circle-left-fill text-2xl"></i>
      </a>
    </li>
    <li
      v-for="page in pages"
      :key="page"
      class="text-lg w-6 flex items-center justify-center h-6 bg-gray-200 rounded-full"
      :class="{ 'bg-gray-800 text-white': page === currentPage }"
    >
      <a class="page-link" href="#" @click.prevent="changePage(page)">{{
        page
      }}</a>
    </li>
    <li v-if="currentPage < totalPages" class="page-item">
      <a
        class="page-link"
        href="#"
        aria-label="Next"
        @click.prevent="changePage(currentPage + 1)"
      >
        <i class="ph-caret-circle-right-fill text-2xl"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    perPage: {
      type: Number,
      required: true,
      default: 10,
    },
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1,
    },
    pagesToShow: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  computed: {
    pages() {
      const pages = [];
      const half = Math.floor(this.pagesToShow / 2);
      let start = this.currentPage - half;
      let end = this.currentPage + half;
      if (start < 1) {
        start = 1;
        end = this.pagesToShow;
      }
      if (end > this.totalPages) {
        end = this.totalPages;
        start = this.totalPages - this.pagesToShow + 1;
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      this.$emit("page-changed", page);
    },
  },
};
</script>
