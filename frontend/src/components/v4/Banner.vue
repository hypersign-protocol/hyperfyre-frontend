<template>
  <b-row class="banner">
    <b-col md="12">
      <b-card overlay img-src="https://picsum.photos/600/300/?image=25" img-alt="Card Image" text-variant="black" :title="`${eventName}`">
        <b-card-text>
          Event's end date: {{ toDate }}
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
 <!--  <div class="banner" :style="
      `background-color: ${themeColor}; color: ${fontColor} !important; border-color:${fontColor}`
    ">
    <h4>[Banner Component]</h4>
    <h3>{{ eventName }}</h3>
    <p>Event's end date: {{ toDate }}</p>
  </div> -->
</template>
<script>
export default {
  props: {
    eventName: String,
    themeColor: String,
    fontColor: String,
    fromDate: String,
    toDate: String,
  },
};
</script>
<style scoped>
/*.banner {
  padding: 10px;
  height: 300px;
  width: 730px;
  margin-left: 35%;
  margin-right: 30%;
  background: rgb(204, 203, 203);
  border-radius: 20px;
}*/
</style>