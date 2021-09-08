import mongoose, {Schema, Document} from "mongoose";


export enum EventActionType{
    INPUT_TEXT = "INPUT_TEXT",
    INPUT_NUMBER = "INPUT_NUMBER",
    // FOLLOW_FACEBOOK,
    // TWITTER_FOLLOW,
    // TWITTER_RETWEET,
    // TELEGRAM_JOIN    
}

interface EventAction{
    type: EventActionType;
    title: string; 
    placeHolder: string; 
    isManadatory: boolean;
    value: string;
    score: number;
}


export interface IProject extends Document{
    projectName: string;
    logoUrl: string;
    fromDate: string; // data and time both
    toDate: string; // data and time both
    ownerDid: string;

    // social
        // twitter
        twitterHandle: string;
        twitterPostFormat: string;
        
        // telegram
        telegramHandle: string;
        telegramAnnouncementChannel: string;

        // facebook        

        // instagram

    
    actions: Array<EventAction>;
    projectStatus: Boolean;
    blockchainType: string;
    investorsCount: number;
    themeColor: string;
    fontColor: string;
    slug: string;

}

export enum EBlockchainType {
    ETHEREUM = "ETHEREUM",
    TEZOS = "TEZOS"
}
const ProjectSchema = new Schema({
    projectName:{ type: String, required: true },
    logoUrl:{ type: String, required: true },
    fromDate:{ type: Date, required: true },
    toDate:{ type: Date, required: true },
    ownerDid:{ type: String, required: true},
    twitterHandle:{ type: String, required: true},
    telegramHandle:{ type: String, required: true},
    twitterPostFormat: { type: String, required: true},
    projectStatus: { type: Boolean, required: true},
    telegramAnnouncementChannel: { type: String},
    blockchainType: {type: EBlockchainType, required: true},
    investorsCount: {type: Number},
    themeColor: { type: String, required: true},
    fontColor: { type: String, required: true},
    slug: { type: String, required: true},
    actions: { type: Array<EventAction>(), required: true}
})

export default mongoose.model<IProject>("Project", ProjectSchema);