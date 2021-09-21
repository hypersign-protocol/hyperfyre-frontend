<template>
  <b-row>
    <b-col md="12">
      <b-card no-body class="banner rounded-0" :img-src="logoUrl" img-alt="Card Image">
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    eventName: String,
    themeColor: String,
    fontColor: String,
    fromDate: String,
    toDate: String,
    logoUrl: String
  },
};
</script>