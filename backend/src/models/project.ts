import mongoose, {Schema, Document} from "mongoose";

export interface IProject extends Document{
    projectName: string;
    logoUrl: string;
    fromDate: string;
    toDate: string;
    ownerDid: string;
}

const ProjectSchema = new Schema({
    projectName:{ type: String, required: true },
    logoUrl:{ type: String, required: true },
    fromDate:{ type: Date, required: true },
    toDate:{ type: Date, required: true },
    ownerDid:{ type: String, required: true},
})

export default mongoose.model<IProject>("Project", ProjectSchema);