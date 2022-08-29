<template>
  <b-table striped :items="items" :fields="fields">
    <template v-for="(field, index) in fields" #[`cell(${field.key})`]="data">
      <span v-if="field.type === 'date'" :key="index" :type="field.type">{{
        new Date(items[data.index][field.key]).toLocaleString()
      }}</span>
      <span :key="index" v-else>{{ data.value }}</span>
      <span :key="index" v-if="field.isCopy == 'true'" 
      :isCopy="field.isCopy" @click="copy(data.value,field.label)"
      class="copy"
      ><i class="far fa-copy"></i></span>
      <div :key="index" v-if="field.key === 'action'">
        <span>
          <i
            class="fas fa-pencil-alt"
            style="padding: 2px; cursor: pointer"
            title="Click to edit the coupon"
            @click="updateRecord(data.item)"
          >
          </i>
        </span>

        <span>
          <i
            class="fas fa-trash"
            style="padding: 2px; cursor: pointer"
            title="Click to delete the coupon"
            @click="deleteRecord(data.item)"
          >
          </i>
        </span>
      </div>
    </template>
  </b-table>
</template>

<script>
import notificationMixins from "../../mixins/notificationMixins"
export default {
  name: "HfTable",
  components: {},
  mixins:[notificationMixins],
  props: {
    items: Array,
    fields: Array,
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
  },
};
</script>

<style scoped>
.copy {
    padding: 7px;
    font-size: medium;
    cursor: pointer;
    color: grey;
}
</style>
