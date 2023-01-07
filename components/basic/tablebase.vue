<template>
  <div
    class="-mx-4 mt-8 overflow-hidden shadow ring-2 ring-black sm:-mx-6 md:mx-0 md:rounded-lg"
  >
    <table class="min-w-full divide-y divide-black">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
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
            class="px-3 py-4 text-sm text-gray-700 table-cell"
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
