<template>
  <div class="container mx-auto space-y-8 py-10 px-4">
    <h1 class="text-2xl">Keybase.io</h1>
    <p class="text-gray-500">
      Keybase is a social network for people who care about security and
      privacy. It's a place to share your public key with the world, and prove
      you own social accounts with cryptographic proofs. It's also a place to
      find cryptographic proofs for others, and to discuss all things related to
      security and cryptography.
    </p>

    <div
      class="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3"
    >
      <div class="flex flex-col space-y-1">
        <label for="sessionStartTime"> Filter by session start time: </label>
        <input
          type="datetime-local"
          name="sessionStartTime"
          class="border border-gray-300 rounded-md px-2 py-1"
          v-model="sessionStartTime"
          id=""
        />
      </div>
      <div class="flex flex-col space-y-1">
        <label for="lastClear"> Filter by last clear time: </label>
        <input
          type="datetime-local"
          name="lastClear"
          class="border border-gray-300 rounded-md px-2 py-1"
          v-model="lastClear"
          id=""
        />
      </div>
    </div>

    <table-component
      :headers="headers"
      :body-array="bodyArray"
    ></table-component>
    <pagination-component
      :per-page="perPage"
      :current-page="currentPage"
      :total-pages="totalPages"
      :pages-to-show="pagesToShow"
      @page-changed="pageChanged"
    ></pagination-component>
  </div>
</template>
<script>
const pickKeys = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
import TableComponent from "../components/basic/tablebase.vue";
import PaginationComponent from "../components/basic/Pagination.vue";
export default {
  name: "index",
  components: { TableComponent, PaginationComponent },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      pagesToShow: 1,
      totalPages: 10,
      lastClear: null,
      sessionStartTime: null,
      dbEntries: [],
    };
  },
  computed: {
    headers() {
      return ["key", "timestamp", "lastClear", "sessionStartTime"];
    },
    bodyArray() {
      return this.dbEntries.map((e) => {
        const data = pickKeys(e, [
          "key",
          "timestamp",
          "lastClear",
          "sessionStartTime",
        ]);
        return {
          ...data,
          timestamp: this.$moment(data.timestamp).format(
            "dddd, DD MMMM YYYY HH:mm:ss"
          ),
          lastClear: this.$moment(data.lastClear).format(
            "dddd, DD MMMM YYYY HH:mm:ss"
          ),
          sessionStartTime: this.$moment(data.sessionStartTime).format(
            "dddd, DD MMMM YYYY HH:mm:ss"
          ),
        };
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    currentPage() {
      this.fetchData();
    },
    lastClear() {
      this.fetchData();
    },
    sessionStartTime() {
      this.fetchData();
    },
  },
  methods: {
    pageChanged(page) {
      this.currentPage = page;
    },
    fetchData() {
      const that = this;
      const Service = this.$provider.$keylogger;
      Service.clearQuery();
      Service.equals("page", this.currentPage);
      Service.equals("limit", this.perPage);
      if (this.lastClear) {
        Service.equals("lastClear", this.lastClear);
      }
      if (this.sessionStartTime) {
        Service.equals("sessionStartTime", this.sessionStartTime);
      }

      Service.getAll()
        .then((res) => {
          console.log(res);
          that.totalPages = res.totalPages;
          that.dbEntries = res.results;
        })
        .catch((err) => {
          console.log(err);
          alert("Error fetching data");
        });
    },
  },
};
</script>
