<template>
  <div class="bg-gray-800 h-screen">
    <header>
      <div
        class="py-3 place-items-center bg-yellow-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border-b-2 border-gray-100 gap-96 grid-cols-3 justify-items-center grid absolute w-screen z-50"
      >
        <h1
          class="text-4xl from-yellow-600 via-white to-green-700 bg-gradient-to-r text-transparent bg-clip-text py-2 font-bold"
        >
          Indian Keylogger
        </h1>

        <img
          :src="require(`./assets/digital_india.svg`)"
          alt="Digital India"
          class="h-16 w-16"
          style="transform: scale(1.5)"
        />
        <h1 class="text-5xl">🇮🇳</h1>
      </div>
    </header>

    <div
      class="container mx-auto space-y-8 py-10 px-4 h-screen flex flex-col justify-center"
    >
      <div
        class="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3 gap-8"
      >
        <div class="flex flex-col space-y-1">
          <label class="text-white text-2xl font-bold" for="sessionStartTime">
            Filter by session start time:
          </label>
          <input
            type="datetime-local"
            name="sessionStartTime"
            class="border text-xl border-gray-300 rounded-md px-2 py-1"
            v-model="sessionStartTime"
            id=""
          />
        </div>
        <div class="flex flex-col space-y-1">
          <label class="text-white text-2xl font-bold" for="lastClear">
            Filter by last clear time:
          </label>
          <input
            type="datetime-local"
            name="lastClear"
            class="border text-xl border-gray-300 rounded-md px-2 py-1"
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
    <footer>
      <div
        class="py-3 bg-green-700 rounded-md place-items-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border-t-2 border-gray-100 grid-cols-3 justify-items-center grid bottom-0 absolute w-screen z-50"
      >
        <h1 class="text-2xl text-center text-white py-2">
          Made with ❤️ by Indians 🇮🇳
        </h1>
        <img
          :src="require(`./assets/ashok_chakra.svg`)"
          alt="Ashok Chakra"
          class="h-16 w-16"
        />
        <h1 class="text-xl text-center text-white">© Ayam Dobhal, 2023</h1>
      </div>
    </footer>
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
