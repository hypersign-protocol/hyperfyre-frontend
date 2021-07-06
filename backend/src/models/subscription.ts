import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
    did: string;
    token: string;
    hasExpired: boolean;
    totalCount: number;
}

const SubscriptionSchema = new Schema({
  did: { type: String, required: true },
  token: { type: String, required: true },
  hasExpired : { type: Boolean, required: true },
  totalCount: { type: Number, required: true }
});

export default mongoose.model<ISubscription>("Subscription", SubscriptionSchema);


