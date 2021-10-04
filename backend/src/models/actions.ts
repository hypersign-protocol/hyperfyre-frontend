import mongoose, { Schema, Document } from 'mongoose';

export enum EventActionType {
  INPUT_TEXT = 'INPUT_TEXT',
  INPUT_NUMBER = 'INPUT_NUMBER',
  TWITTER_FOLLOW = 'TWITTER_FOLLOW',
  TWITTER_RETWEET = 'TWITTER_RETWEET',
  TELEGRAM_JOIN = 'TELEGRAM_JOIN',
  BLOCKCHAIN_ETH = 'BLOCKCHAIN_ETH',
  BLOCKCHAIN_TEZ = 'BLOCKCHAIN_TEZ',
  HYPERSIGN_AUTH = 'HYPERSIGN_AUTH',
}

export interface IEventAction extends Document {
  eventId: string;
  type: EventActionType;
  title: string;
  placeHolder: string;
  isManadatory: boolean;
  value: string;
  score: number;
}

export const ActionSchema = new Schema({
  eventId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  placeHolder: { type: String, required: false },
  isManadatory: { type: Boolean, required: true },
  value: { type: String, required: false },
  score: { type: Number, required: true },
});

export default mongoose.model<IEventAction>('Action', ActionSchema);
