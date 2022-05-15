<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      class="px-0 font-14 line-h-17 white--text font-weight--medium"
    >
      <div class="d-flex align-center">
        <v-icon size="22" color="white" class="mr-2"> mdi-gift-outline</v-icon>
        <!-- <v-icon size="22" color="#313540" class="mr-2"> mdi-circle</v-icon> -->
        Prize Details
      </div>
      <template v-slot:actions>
        <v-icon color="#fff">mdil-chevron-down </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-column align-center justify-center">
        <v-data-table
          v-if="prizeData.length"
          class="result-table campaign"
          :headers="headers"
          :hide-default-footer="true"
          :items="prizeData"
          item-key="_id"
          dark
        >
          <template v-slot:item.type="{ item }">
            <template v-for="(val, index) in prizeTypes">
              <span v-if="val.value === item.type" :key="index">
                {{ val.text }}</span
              >
            </template>
          </template>
          <template v-slot:item.title="{ item }">
            {{ item.title }}
          </template>
          <template v-slot:item.no_of_winners="{ item }">
            {{ JSON.parse(item.value).winners }}
          </template>
          <template v-slot:item.prize_per_winner="{ item }">
            {{ JSON.parse(item.value).prizeValue }}
          </template>
        </v-data-table>
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
    return {
      headers: [
        {
          text: "Prize Name",
          sortable: false,
          value: "title",
          align: "left",
        },
        {
          text: "No of Winners",
          sortable: false,
          value: "no_of_winners",
          align: "left",
        },
        {
          text: "Prize per Winner",
          sortable: false,
          value: "prize_per_winner",
          align: "left",
        },
      ],
    };
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
