import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  planId: string;
  userDid: string;
  subscritionDate: Date;
  isActive: boolean;
  hasExpired: boolean;  
  leftOverNoRequests: number;
}

const SubscriptionSchema = new Schema({
  planId: { type: String, required: true },
  userDid: { type: String, required: true },
  subscritionDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  hasExpired: { type: Boolean, required: true },
  leftOverNoRequests: { type: Number, required: true }
});

export default mongoose.model<ISubscription>("Subscription", SubscriptionSchema);


