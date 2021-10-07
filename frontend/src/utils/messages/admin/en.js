const DASHBOARD = {

}
const EVENT={
    ERROR_OCCURED: "Error occurred: ",
    INVALID_RESPONSE: "Invalid response",
    INVALID_PROJECT_SLUG:"Invalid project slug"
}
const EVENTS = {
    VALIDATION:{
        INVALID_PROJECT_NAME: "Please provide valid project name",
        INVALID_LOGO_URL: "Banner Url is not Valid"
    },
    CREATE_EDIT_EVENT: {
        PROJECT_FETCHED: "Project is fetched. ProjectName ",
        PROJECT_SAVED: "Project is saved. Id = ",
        PROJECT_FETCHED_NO: "No. of projects fetched ",
        COPIED_TO_CLIPBOARD: "is copied to clipboard",
        ERROR_WHILE_COPYING: "Error in copying text: ",
        PROJECT_NAME: "Please Specify a project name",
        PROJECT_LOGO_URL: "Please specify a Banner Url",
        PROJECT_DATE_TIME: "Please specify a start and end date",
        PROJECT_BLOCKCHAIN_TYPE: "Please provide Blockchain Type",
        THEME_NOT_WHITE: "Theme color cannot be white",
        THEME_COLOR_NOT_SAME: "Theme color and font color cannot be same"
    },
}


const PARTICIPANTS = {

    EXPORT_ALL : {

    },
    LOTTERY : {
        NO_OF_RECORDS:"No of records must be less or equal to total"
    }
}

const SUBSCRIPTIONS = {
    YOU_ARE_SUBSCRIBED: "Your are subscribed. SubscriptionId = "
    
}

module.exports = {
    DASHBOARD,
    EVENTS,
    PARTICIPANTS,
    SUBSCRIPTIONS,
    EVENT
}