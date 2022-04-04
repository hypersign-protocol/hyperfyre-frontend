<template>
  <b-card no-body class="mx-auto overflow-hidden mt-3" style="max-width: 600px;">
    <b-row class="success-wrap">
      <b-col md="12">
        <b-card-body>
          <b-card-text class="w-100 text-center">
            <div class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
export default {
  props: {
    successMessage:  {
      type: String
    }
  },
  data() {
    return {};
  },
};
</script>