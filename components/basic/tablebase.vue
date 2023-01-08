<template>
  <div class="-mx-4 mt-8 shadow sm:-mx-6 md:mx-0 overflow-hidden rounded-lg">
    <table class="min-w-full divide-y divide-black">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            scope="col"
            class="px-8 py-3.5 text-center text-2xl capitalize font-semibold text-white bg-black lg:table-cell"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-black bg-white">
        <tr v-for="item in bodyArray" :key="item.id">
          <td
            v-for="elem in Object.keys(item)"
            :key="`${elem}+${item.id}`"
            class="px-8 py-8 text-xl text-gray-700 table-cell text-center"
          >
            <template>{{ item[elem] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    bodyArray: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>
