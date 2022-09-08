const DASHBOARD = {

}
const TEAMMATES = {
    NO_TEAMS_FOUND:"No teams found, click on 'Invite' button to add team"
}
const EVENT = {
    ERROR_OCCURED: "Error occurred: ",
    INVALID_RESPONSE: "Invalid response",
    INVALID_PROJECT_SLUG: "Invalid Event slug",
    INVALID_AUTH_TOKEN: "Please! login"
}
const EVENTS = {
    EVENT_DELETED:"Event is deleted successfully",
    WRONG_EVENT_ID:"Please enter valid event Id",
    EVENT_CLOSED:"Cannot edit CLOSED event! OPEN it to edit",
    NO_EVENT_FOUND:"No events found, click on create button to create a new event!",
    CHECK_ALL_TYPE: "PLease Check if any type left empty",
    CHECK_ALL_TITLE_EMPTY: "Check if any Title field you left empty",
    CHECK_ALL_VALUE_EMPTY: "Check if any Value field you left empty",
    REF_POINT: {
        NOT_VALID_INP: 'Please enter valid Referee and Referral point',
        NOT_POS_INP: 'Refree Point and Referral Point Should be Positive number'
    },
    VALIDATION: {
        INVALID_PROJECT_NAME: "Please provide valid Event Name",
        INVALID_LOGO_URL: "Banner Url is not Valid",
        INVALID_SLUG: "Please enter a valid Event Slug.",
        EMPTY_SLUG: "Event slug can't be empty"
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
        THEME_COLOR_NOT_SAME: "Theme color and font color cannot be same",
        CHOOSE_ATLEAST_ONE_TAG: "Please choose atleast one tag",
        ATLEAST_ONE_TAG: "Must have atleast one tag configured",
        CHOOSE_TAG: "Please choose Tag",
        DUPLICATE_TAG: "Duplicate tags are not allowed",
        PROJECT_DELETED: "Event not found"
    },

    ACTIONS: {
        VALID_URL: "Please Enter Valid Url",
        TITLE_URL: "Do not put url in title",
        EMPTY_TITLE: "Title Should not be empty",
        SCORE_IS_NUM: "Please enter a Score that should be a number",
        SCORE_IS_NUM_ANY_LEFT: "Check if there is any score field left empty",
        SCORE_IS_POSITIVE_NUM: "Please enter a Score that should be a Positive number",
        INVALID_EVENT_TYPE: "Invalid event type",

        SOCIAL: {
            SOCIAL_TYPE: "Please choose Social Action Type",
            RETWEET_NOT_EMPTY: "Retweet Url Should not be empty",
            INVITE_NOT_EMPTY: "Invite Link Should not be empty",
            SOCIAL_HANDLE_EMPTY: "Social Handle Should not be empty",
            URL_IN_SOCIAL_HANDLE: "Do not put url in Social Handle",
            RETWEET_VALID_URL: "Plase Enter valid retweet url",
            INVALID_INVITE_LINK: "Invalid Invite Link",
            INVALID_TWITTER_USERNAME: "Invalid Twitter Username",
            INVALID_TELEGRAM_USERNAME: "Invalid Telegram Username",
        },

        CUSTOM: {
            CUSTOM_TYPE: "Please choose Custom Action Type",
            EMPTY_INFO: "Info Should not be empty",
            URL_NOT_EMPTY: "Url Should not be empty"
        },

        BLOCKCHAIN: {
            CHOOSE_TYPE: "Please choose Blockchain Type"
        },

        SMARTCONTRACT: {
            ABI_SYNTAX_ERROR: "Please check the syntax of abi",
            CHOOSE_CONTRACT_TYPE: "Please choose Contract Type",
            METHODS_EMPTY: "Methods Cannot be empty.",
            ADDRESS_NOT_EMPTY: "Contract Address Should not be empty",
            ABI_NOT_EMPTY: "Contract ABI Should not be empty",
            THBALANCE_NOT_NEGATIVE: "Enter the Threshold balance that should be a Positive Number",
            VALID_CONTRACT_ADDRESS: "Please enter valid Contract address"
        },

        PRIZECARD: {
            PRIZE_TYPE: "Please select prize type",
            PRIZE_NAME_NOT_URL: "Please enter valid prize name",
            PRIZE_NUMBER_OF_WINNER: "Please enter valid number of winners",
            PRIZE_PER_WINNER_NOT_URL: "Please enter valid prize per winner",
            PRIZE_NAME_NOT_EMPTY: "Prize name should not be empty",
            EMPTY_NO_OF_WINNERS: "Number of Winners Should not be empty",
            EMPTY_PRIZE_PER_WINNER: "Prize Per Winner Should not empty"
        },
        KYCACCORDIN: {
            KYC_TYPE: "Please Select KYC provider",
            KYC_TITLE: "KYC title should not be empty",
            KYC_SLUG: "KYC slug should not be empty",
            SLUG_NOT_URL: "Do not put url in slug",
            KYC_LENGTH: "You cannot Add more then one KYC verification",
            DUPLICATE_KYC: "You cannot add more than one Kyc action",
            KYC_TITLE_URL: "KYC Title Cannot be URL"

        }

    }
}

const APP = {
    APP_NAME_NOT_EMPTY: "Please provide App name",
    APP_NAME_URL: "Please provide valid App name",
    APP_BASE_URL_EMPTY: "Please provide Base URL for app",
    APP_BASE_URL_NOT_VALID: "Please provide valid Base URL",
    APP_GENERATED_SUCCESSFULLY: "App generated Successfully",
    APP_UPDATED_SUCCESSFULLY: "App details updated Successfully"
}

const ORGDATA= {
    ORG_UPDATED_SUCCESSFULLY:"Org details updated Successfully"
}
const PARTICIPANTS = {
    SELECT_EVENT:"Plase select an event",
    EXPORT_ALL: {

    },
    LOTTERY: {
        NO_OF_RECORDS: "Number of records must be less or equal to the total",
        ENTER_NUMBER_OF_WINNERS: "Please enter Number of winners to choose"
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
    EVENT,
    APP,
    ORGDATA,
    TEAMMATES
}