import mongoose, { Schema, Document } from 'mongoose';
import { IEventAction } from './actions';

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
  projectId: { type: String, required: true },
  numberOfReferals: { type: Number, required: true },
  actions: { type: Array<IEventAction>(), required: true }, // 0,
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false },
});

export default mongoose.model<IInvestor>('Investor', InvestorSchema);
