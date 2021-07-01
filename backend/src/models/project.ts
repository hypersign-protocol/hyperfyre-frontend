import mongoose, {Schema, Document} from "mongoose";

export interface IProject extends Document{
    projectName: string;
    logoUrl: string;
    fromDate: string; // data and time both
    toDate: string; // data and time both
    ownerDid: string;
    twitterHandle: string;
    telegramHandle: string;
    twitterPostFormat: string;
    projectStatus: Boolean;
    telegramAnnouncementChannel: string;

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
    telegramAnnouncementChannel: { type: String}
})

export default mongoose.model<IProject>("Project", ProjectSchema);