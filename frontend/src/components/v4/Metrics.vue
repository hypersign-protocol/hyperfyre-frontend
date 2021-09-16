<template>
<div>
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
</div>
</template>

<script>


export default {
    props: {
        userScore: Number,
        totalEntries: Number,
        timeLeft: Number
    },

    data(){
        return {
            timeUnit: "Days"
        }
    }
}
</script>

<style scoped>
    .card{
        padding: 10px;
        width: 200px;
        height: 100px;
        background-color: whitesmoke;
        border-color: grey;
        border-radius: 5px;
        font:bolder;
        float: left;
        margin-right: 10px;
        font-size: larger;
        font-weight: bold;
    }
</style>
