<style scoped>
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}

.floatLeft {
  float: left;
}
.floatRight {
  float: right;
}
.card-header {
  background: aliceblue;
  padding: 0px;
}
.sm-tiles {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda71c;
  color: #888b8f;
}
.sm-tiles:hover {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda7a3;
  font-style: bold;
  color: #888b8f;
}

label {
  font-weight: bold;
}
.card {
  border-radius: 10px;
}
.paginationContainer {
  display: flex;
  list-style: none;

  justify-content: center;
}
.paginationContainer >>> li {
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 3px;
}
.paginationContainer >>> li.active {
  background-color: #007bff;
  color: #fff;
}
.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #007bff;
  background-color: #007bff;
  margin: 1px 0;
}
.checkbox {
  background-color: rgb(58, 58, 58);
  -moz-appearance: initial;
}
input[type="checkbox"]:before {
  position: relative;
  display: block;
  width: 11px;
  height: 11px;
  content: "";
  background-color: rgb(58, 58, 58);
}

input[type="checkbox"]:after {
  position: relative;
  display: block;
  left: 2px;
  top: -11px;
  width: 7px;
  height: 7px;
  content: "";
  background-color: rgb(58, 58, 58);
  background-repeat: no-repeat;
  background-position: center;
}

input[type="checkbox"]:checked:after {
  background-size: 16px;
  background-position-y: 2px;
  background-image: url("data:image/png;base64,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");
}

input[type="checkbox"]:disabled:after {
  -webkit-filter: opacity(0.4);
}

input[type="checkbox"]:not(:disabled):checked:hover:after {
  background-size: 16px;
  background-position-y: 2px;
  background-image: url("data:image/png;base64,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");
}

/* Large checkboxes */
input.large {
  height: 22px;
}

input.large[type="checkbox"]:before {
  width: 20px;
  height: 20px;
}

input.large[type="checkbox"]:after {
  top: -20px;
  width: 16px;
  height: 16px;
}

/* Custom checkbox */
input.large.custom[type="checkbox"]:checked:after {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGHRFWHRBdXRob3IAbWluZWNyYWZ0aW5mby5jb23fZidLAAAAk0lEQVQ4y2P4//8/AyUYwcAD+OzN/oMwshjRBoA0Gr8+DcbIhhBlAEyz+qZZ/7WPryHNAGTNMOxpJvo/w0/uP0kGgGwGaZbrKgfTGnLc/0nyAgiDbEY2BCRGdCDCnA2yGeYVog0Aae5MV4c7Gzk6CRqAbDM2w/EaQEgzXgPQnU2SAcTYjNMAYm3GaQCxNuM0gFwMAPUKd8XyBVDcAAAAAElFTkSuQmCC");
}

input.large.custom[type="checkbox"]:not(:disabled):checked:hover:after {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGHRFWHRBdXRob3IAbWluZWNyYWZ0aW5mby5jb23fZidLAAAAk0lEQVQ4y2P4//8/AyUYwcAD+OzN/oMwshjRBoA0Gr8+DcbIhhBlAEyz+qZZ/7WPryHNAGTNMOxpJvo/w0/uP0kGgGwGaZbrKgfTGnLc/0nyAgiDbEY2BCRGdCDCnA2yGeYVog0Aae5MV4c7Gzk6CRqAbDM2w/EaQEgzXgPQnU2SAcTYjNMAYm3GaQCxNuM0gFwMAPUKd8XyBVDcAAAAAElFTkSuQmCC");
}
.tweetUrlInput input {
  width: 100%;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid;
  padding: 2px 5px;
  outline: none;
}


@media screen and (max-width: 990px) {
 
}

@media screen and (max-width: 768px) {
 ol{
   margin-top: 100px;
 }
 .tweetInput-container{
  
  width: 80% !important;
  margin: 10px auto !important;
 }
 .text-container{

   flex-direction: column !important;
 }
}

@media screen and (max-width: 516px) {
  .tweetUrlInput{
    flex-direction: column;
    width: 100%;
  }
  .tweetUrlInput input{
    width: 100% !important;
    margin: 10px 0;
    text-align: center;
  }
   .tweetInput-container{
     width: 100%;
     text-align: center;
   }
}


</style>
<template>
  <div>
    <div>
      <ol class="px-0">
        <li
          class="text-left w-100 d-flex flex-wrap align-items-center  my-3"
          v-for="(rule, idx) in stepOneData.rules"
          :key="rule.id"
        >
          <div class="position-relative d-flex text-container" style="width: 95%">
            <div>
            {{ rule.id + ". " + rule.text }}
            </div>

            <div v-if="rule.id == 1" class="ml-2">
              <a
                :href="
                  'https://twitter.com/' +
                    projectDetails.twitterHandle +
                    '?ref_src=twsrc%5Etfw'
                "
                target="_blank"
                >@{{ projectDetails.twitterHandle }}</a
              >
            </div>


            <div class="ml-2" v-if="rule.id == 3" for="checkbox-3">
              <a
                :href="`https://telegram.im/@${projectDetails.telegramHandle}`"
                target="_blank"
                title="Join our telegram channel for latest updates"
                ><i></i> @{{ projectDetails.telegramHandle }}</a
              >
            </div>
          </div>

          <div>
            <input
              :id="'checkbox-' + rule.id"
              v-model="stepOneData.rules[idx].checked"
              class="checkbox large"
              type="checkbox"
            />
          </div>


           <div class="w-100 ml-2 tweetInput-container" v-if="rule.id == 2">
            <a
              @click="handleInputShow"
              target="_blank"
              href="https://twitter.com/intent/tweet?text=I%20am%20happy%20with%20%23hypersign%20%23pollkadot%20%40hypersignchain%20"
              title="Tweet about this project tagging two of your friends"
              class="ml-1"
              >#mydatamyway #secureidentity [click here to auto generate]</a
            >
            <div
              v-if="rule.showTweetInput && showInput"
              class="tweetUrlInput mt-2 d-flex align-items-center"
            >
              <p class="flex-1 m-0 mr-2">Paste your tweet URL here:</p>
              <input
                placeholder="Your Tweet Url"
                v-model="stepOneData.rules[idx].tweetUrl"
                type="url"
                class="w-50"
              />
            </div>
          </div>
          
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
// This components will have the content for each stepper step.

export default {
  name: "StepOne",
  props: {
    stepOneData: {
      type: Object,
    },
    projectDetails: {
      type: Object,
    },
  },
  data() {
    return {
      showInput: true,
    };
  },
  methods: {
    handleInputShow() {
      this.showInput = true;
    },
  },
};
</script>
