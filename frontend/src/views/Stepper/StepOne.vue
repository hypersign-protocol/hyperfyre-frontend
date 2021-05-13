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
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC");
}

input[type="checkbox"]:disabled:after {
  -webkit-filter: opacity(0.4);
}

input[type="checkbox"]:not(:disabled):checked:hover:after {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC");
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
</style>
<template>
  <div>
    <p class="text-right w-100">Step 1 of 3</p>
    <div>
      <h4 class="text-left my-4">RULES</h4>
      <ol class="px-0">
        <li
          class="text-left w-100 d-flex align-items-center  my-3"
          v-for="(rule, idx) in data.rules"
          :key="rule.id"
        >
          <div style="width: 95%">{{ idx + 1 }}. {{ rule.text }}</div>

          <div>
            <input class="checkbox large" type="checkbox" />
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
    data: {
      type: Object,
    },
  },
};
</script>
