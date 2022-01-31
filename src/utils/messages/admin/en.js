const DASHBOARD = {

}
const EVENT={
    ERROR_OCCURED: "Error occurred: ",
    INVALID_RESPONSE: "Invalid response",
    INVALID_PROJECT_SLUG:"Invalid Event slug"
}
const EVENTS = {
    CHECK_ALL_TITLE_EMPTY:"Check if any Title field you left empty",
    CHECK_ALL_VALUE_EMPTY:"Check if any Value field you left empty",
    REF_POINT:{
        NOT_VALID_INP:'Please enter valid Referee and Referral point',
        NOT_POS_INP:'Refree Point and Referral Point Should be Positive number'
    },
    VALIDATION:{
        INVALID_PROJECT_NAME: "Please provide valid Event Name",
        INVALID_LOGO_URL: "Banner Url is not Valid"
    },
    CREATE_EDIT_EVENT: {
        PROJECT_FETCHED: "Event is fetched. Event Name ",
        PROJECT_SAVED: "Event is saved. Id = ",
        PROJECT_FETCHED_NO: "Number of Events fetched ",
        COPIED_TO_CLIPBOARD: "is copied to clipboard",
        ERROR_WHILE_COPYING: "Error in copying text: ",
        PROJECT_NAME: "Please Specify a Event name",
        PROJECT_LOGO_URL: "Please specify a Banner Url",
        PROJECT_DATE_TIME: "Please specify a start and end date",
        PROJECT_BLOCKCHAIN_TYPE: "Please provide Blockchain Type",
        THEME_NOT_WHITE: "Theme color cannot be white",
        THEME_COLOR_NOT_SAME: "Theme color and font color cannot be same"
    },
    
    ACTIONS:{
        VALID_URL: "Please Enter Valid Url",
        TITLE_URL: "Do not put url in title",
        EMPTY_TITLE: "Title Should not be empty",
        SCORE_IS_NUM: "Please enter a Score that should be a number",
        SCORE_IS_NUM_ANY_LEFT:"Check if there is any score field left empty",
        SCORE_IS_POSITIVE_NUM: "Please enter a Score that should be a Positive number",
        INVALID_EVENT_TYPE: "Invalid event type",

    SOCIAL:{
        SOCIAL_TYPE: "Please choose Social Action Type",
        RETWEET_NOT_EMPTY: "Retweet Url Should not be empty",
        INVITE_NOT_EMPTY: "Invite Link Should not be empty",
        SOCIAL_HANDLE_EMPTY: "Social Handle Should not be empty",
        URL_IN_SOCIAL_HANDLE: "Do not put url in Social Handle",
        RETWEET_VALID_URL: "Plase Enter valid retweet url",
        INVALID_INVITE_LINK: "Invalid Invite Link"
    },

    CUSTOM:{
        CUSTOM_TYPE: "Please choose Custom Action Type",
        EMPTY_INFO: "Info Should not be empty",
        URL_NOT_EMPTY: "Url Should not be empty"
    },

    BLOCKCHAIN:{
        CHOOSE_TYPE: "Please choose Blockchain Type"
    },

    SMARTCONTRACT:{
        CHOOSE_CONTRACT_TYPE: "Please choose Contract Type",
        ADDRESS_NOT_EMPTY: "Contract Address Should not be empty",
        THBALANCE_NOT_NEGATIVE: "Enter the Threshold balance that should be a Positive Number",
        VALID_CONTRACT_ADDRESS: "Please enter valid Contract address"
    },
    
    PRIZECARD:{
        PRIZE_TYPE: "Please select prize type",
        EMPTY_NO_OF_WINNERS: "Number of Winners Should not be empty",
        EMPTY_PRIZE_PER_WINNER: "Prize Per Winner Should not empty"
    }

    }
}


const PARTICIPANTS = {

    EXPORT_ALL : {

    },
    LOTTERY : {
        NO_OF_RECORDS:"No of records must be less or equal to total"
    }
}

const SUBSCRIPTIONS = {
    YOU_ARE_SUBSCRIBED: "Your are subscribed. SubscriptionId = ",
    SUBSCRIPTION_EXHAUSTED: "Your Subscription has been exhauseted. Please subscribe to New Plan",
    SELECT_CURRENCY_AND_NETWORK: "Please select Currency and network"
    
}

module.exports = {
    DASHBOARD,
    EVENTS,
    PARTICIPANTS,
    SUBSCRIPTIONS,
    EVENT
}