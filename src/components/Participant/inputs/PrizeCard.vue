<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="#313540" class="mr-2"> mdi-circle</v-icon>
        Prize Details
      </div>
      <template v-slot:actions>
        <v-chip class="black--text font-weight-bold" color="green" small label>
          +15
        </v-chip>
        <v-icon color="#fff"> mdi-chevron-down </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-center">
        <v-simple-table dark v-if="prizeData.length">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Prize Name</th>
                <th class="text-left">No of winners</th>
                <th class="text-left">Prize Per Winner</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in prizeData" :key="row._id">
                <td class="wrapword">{{ row.title }}</td>
                <td>{{ JSON.parse(row.value).winners }}</td>
                <td>{{ JSON.parse(row.value).prizeValue }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  name: "PrizeCard",
  props: {
    prizeData: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.wrapword {
  white-space: -moz-pre-wrap !important;
  white-space: -webkit-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: normal;
}
</style>
