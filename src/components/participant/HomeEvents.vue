<template class="">
    <ul class="head cards row flex-row flex-nowrap" style="overflow-x: scroll">
        <li v-for="event in userEventList" :key="event._id">
            <a href="" class="card">
                <div class="card__img">
                    <img class="card__image" :src="event.logoUrl" alt="" />
                </div>
                <div class="card__overlay">
                    <div class="card__header">
                        <div class="card__header-text">
                            <h3 class="card__title">{{ truncate1(event.projectName, 30) }}</h3>
                            <span class="card__status">{{ timeLeft(event) }} days left</span>
                        </div>
                        <div class="card_trophy">
                            <ul v-if="event.numberOfReferals != null" style="list-style: none;">
                                <li class="description">Score</li>
                                <li><i class="fa fa-trophy"></i></li>

                                <li class="heading">{{ event.numberOfReferals }}</li>

                            </ul>
                            <ul v-if="event.investorsCount != null" style="list-style: none;">
                                <li class="description">Users</li>
                                <li><i class="fa fa-users"></i></li>
                                <li class="heading">{{ event.investorsCount }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </a>
        </li>

    </ul>
</template>
<style scoped>
.head {
    --surface-color: #fff;
    --curve: 20;
   
}

.card__img{
    min-width: 307px;
    min-height: 150px;
    max-height: 150px;
}
.card_trophy{
    color: gray;        
    text-align: center;
    width: 40%;
    font-size: 15px;
}
.card_trophy i{
    font-size: 1.5rem;
}
* {
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: #fef8f8;
}

.cards {
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    gap: 2rem;
    /* margin: 4rem 5vw; */
    padding: 0;
    list-style-type: none;
}

.card {
    position: relative;
    display: block;
    height: 100%;
    border-radius: calc(var(--curve) * 1px);
    overflow: hidden;
    text-decoration: none;
}

.card__image {
width: 100%;
    min-height: 200px;
    max-height: 200px;
}

.card__overlay {
    /* position: absolute; */
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    border-radius: calc(var(--curve) * 1px);
    background-color: var(--surface-color);
    transform: translateY(100%);
    transition: .2s ease-in-out;
}

.card:hover .card__overlay {
    transform: translateY(0);
}

.card__header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 2em;
    border-radius: calc(var(--curve) * 1px) 0 0 0;
    background-color: var(--surface-color);
    transform: translateY(-100%);
    transition: .2s ease-in-out;
}

.card__arc {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 100%;
    right: 0;
    z-index: 1;
}

.card__arc path {
    fill: var(--surface-color);
    d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
    transform: translateY(0);
}

.card__thumb {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.card__title {
    font-size: 1em;
    margin: 0 0 .3em;
    color: #6A515E;
}

.card__tagline {
    display: block;
    margin: 1em 0;
    font-family: "MockFlowFont";
    font-size: .8em;
    color: #D7BDCA;
}

.card__status {
    font-size: .8em;
    color: #D7BDCA;
}

.card__description {
    padding: 0 2em 2em;
    margin: 0;
    color: #D7BDCA;
    font-family: "MockFlowFont";
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.card__header-text{
    width: 60%;
}
</style>

<script>

import { truncate } from "../../mixins/fieldValidationMixin.js";


export default {
    props: {
        userEventList: {
            type: Object
        }
    },
    methods: {
        gotoUrl(path) {
            const url = `${window.location.origin}/form/${path}`
            window.open(url)
        },
        timeLeft(eventData) {
            if (eventData.fromDate && eventData.projectStatus) {
                const toDateParse = new Date(eventData.toDate);
                const fromDateParse = new Date(new Date().toISOString()); // now

                return Math.ceil((toDateParse - fromDateParse) / (1000 * 60 * 60 * 24));
            } else {
                return 0;
            }
        },
        truncate1(str, number) {
            return truncate(str, number);
        },
    },
    
}
</script>
