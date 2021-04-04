import mongoose, {Schema, Document} from "mongoose";

export interface IProject extends Document{
    projectName: string;
    logoUrl: string;
    fromDate: string;
    toDate: string;
    ownerDid: string;
    twitterHandle: string;
    telegramHandle: string;

}

const ProjectSchema = new Schema({
    projectName:{ type: String, required: true },
    logoUrl:{ type: String, required: true },
    fromDate:{ type: Date, required: true },
    toDate:{ type: Date, required: true },
    ownerDid:{ type: String, required: true},
    twitterHandle:{ type: String, required: true},
    telegramHandle:{ type: String, required: true},
})

export default mongoose.model<IProject>("Project", ProjectSchema);