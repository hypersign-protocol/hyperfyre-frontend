import mongoose, { Schema, Document } from "mongoose";
import { IEventAction } from "./actions";

export interface IInvestor extends Document {
    did: string;
    email: string;
    name: string;
    ethAddress: string;
    twitterHandle: string;
    telegramHandle: string;
    projectId: string;
    tweetUrl: string;
    hasTwitted: boolean;
    hasJoinedTGgroup: boolean;
    isVerfiedByHypersign: boolean;
    isVerificationComplete: boolean;
    numberOfReferals: number;
    actions: IEventAction[];
    createdAt: Date;
    updatedAt: Date;
}

const InvestorSchema = new Schema({
  did: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  ethAddress: { type: String, required: true },
  twitterHandle: { type: String, required: true },
  telegramHandle: { type: String, required: true, default: false },
  hasTwitted: { type: Boolean, required: true, default: false },
  hasJoinedTGgroup: { type: Boolean, required: true, default: false },
  isVerfiedByHypersign: { type: Boolean, required: true, default: false },
  isVerificationComplete: { type: Boolean, required: true, default: false },
  projectId: { type: String, required: true },
  tweetUrl: { type: String, required: true },
  numberOfReferals: { type: Number, required: true },
  actions: { type: Array<IEventAction>(), required: true }, // 0,
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false }
});

export default mongoose.model<IInvestor>("Investor", InvestorSchema);


