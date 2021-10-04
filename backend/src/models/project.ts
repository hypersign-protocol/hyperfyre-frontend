import mongoose, {Schema, Document} from "mongoose";
import { IEventAction } from "./actions";

export interface IProject extends Document{
    projectName: string;
    logoUrl: string;
    fromDate: string; // data and time both
    toDate: string; // data and time both
    ownerDid: string;    
    projectStatus: boolean;
    blockchainType: string;
    investorsCount: number;
    themeColor: string;
    fontColor: string;
    slug: string;
    actions: Array<IEventAction>;
    createdAt: Date;
    updatedAt: Date;
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
    projectStatus: { type: Boolean, required: true},
    blockchainType: {type: EBlockchainType, required: true},
    investorsCount: {type: Number},
    themeColor: { type: String, required: true},
    fontColor: { type: String, required: true},
    slug: { type: String, required: true},
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
})

export default mongoose.model<IProject>("Project", ProjectSchema);