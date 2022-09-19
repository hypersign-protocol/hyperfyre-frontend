<template>
  <div class="card event-card tableCard">
  <b-table thead-class="thead-light" :class="customStyle" :items="items" :fields="fields">
    <template v-for="(field, index) in fields" #[`cell(${field.key})`]="data">
      <span v-if="field.type === 'date'" :key="index" :type="field.type">{{
        new Date(items[data.index][field.key]).toLocaleString()
      }}</span>
      <span :key="index" v-else>{{ field.isCopy ? truncate1(data.value,15) : data.value }}</span>
      <span :key="index" v-if="field.isCopy == true" 
      :isCopy="field.isCopy" @click="copy(data.value,field.label)"
      class="copy"
      ><i class="far fa-copy"></i></span>
        <span  :key="index" v-if="field.editOnly==true">
          <i
            class="fas fa-pencil-alt"
            style="padding: 2px; cursor: pointer"
            title="Click to update"
            @click="updateRecord(data.item)"
          >
          </i>
        </span>

        <span :key="index" v-if="field.isDelete==true">
          <i
            class="fas fa-trash"
            style="padding: 2px; cursor: pointer"
            title="Click to delete"
            @click="deleteRecord(data.item)"
          >
          </i>
        </span>
      <!-- </div> -->
    </template>
  </b-table>
</div>
</template>

<script>
import notificationMixins from "../../mixins/notificationMixins"
import {truncate} from "../../mixins/fieldValidationMixin"
export default {
  name: "HfTable",
  components: {},
  mixins:[notificationMixins],
  props: {
    items: Array,
    fields: Array,
    customStyle:String
  },
  data() {
    return {};
  },
  methods: {
    updateRecord(row) {
      console.log(row);
      this.$emit("updateRecord", row);
    },
    deleteRecord(res) {
      this.$emit("deleteRecord", res);
    },
    copy(textToCopy, contentType) {
        if (textToCopy) {
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    this.notifySuccess(
                        `${contentType} copied!`
                    );
                })
                .catch((err) => {
                    this.notifyErr(
                        'Error while copying',
                        err
                    );
                });
        }
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
  },
};
</script>

<style scoped>
.tableCard {
  word-wrap: break-word; white-space: nowrap;  box-sizing: border-box;
}
.copy {
    padding: 7px;
    font-size: medium;
    cursor: pointer;
    color: grey;
}
</style>
