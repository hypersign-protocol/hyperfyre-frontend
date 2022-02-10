<template>
<b-card no-body class="action-wrap">
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="profile"
      @click="visible = !visible"

    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/gift.svg" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text">Prize Details</div>
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse id="profile" v-model="visible"  >
      <b-card-body class="user-details">
        <table
          v-if="prizeData.length"
          class="table table-bordered"
          style="background: #ffff"
        >
          <thead class="thead-light">
            <tr>
              <th>Prize Name</th>
              <th>Number of winners</th>
              <th>Prize Per Winner</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in prizeData" :key="row._id">
              <th>
                {{ row.title }}
              </th>
              <td>{{ JSON.parse(row.value).winners }}</td>
              <td>
                {{ JSON.parse(row.value).prizeValue }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script>
export default {
  name: "PrizeCard",
  props: {
    prizeData: {
      required: true,
      type: Array
    },
  },
  data() {
    return {
      visible: false,
    };  
  },
};
</script>
