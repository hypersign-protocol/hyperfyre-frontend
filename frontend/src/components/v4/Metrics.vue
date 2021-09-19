<template>
<!-- <div>
    <div class="card">
        <p><span>{{ userScore }}</span></p>
        <p>Your Score</p>
    </div>
    <div class="card">
        <p><span>{{ totalEntries }}</span></p>
        <p>Total Entries</p>
    </div>
    <div class="card">
        <p><span>{{ timeLeft}} </span></p>
        <p>{{ timeUnit }} left</p>
    </div>
</div> -->
    <b-row class="metrics-info">
        <b-col cols="4" sm="4" class="p-4 border-right" md="4">
            <div class="number">{{ userScore }}</div>
            <div class="text">Your Score</div>
        </b-col>
        <b-col cols="4" sm="4" class="p-4 border-right" md="4">
            <div class="number">{{ totalEntries }}</div>
            <div class="text">Total Entries</div>
        </b-col>
        <b-col cols="4" sm="4" class="p-4" md="4">
            <div class="number">{{ timeLeft}}</div>
            <div class="text">Days Left</div>
        </b-col>
    </b-row>
</template>
<script>
export default {
    props: {
        userScore: Number,
        totalEntries: Number,
        timeLeft: Number
    },

    data() {
        return {
            timeUnit: "Days"
        }
    }
}
</script>
<style scoped>
.card {
    padding: 10px;
    width: 200px;
    height: 100px;
    background-color: whitesmoke;
    border-color: grey;
    border-radius: 5px;
    font: bolder;
    float: left;
    margin-right: 10px;
    font-size: larger;
    font-weight: bold;
}
</style>