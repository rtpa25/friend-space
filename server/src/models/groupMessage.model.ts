import mongoose from 'mongoose';

export interface GroupMessageDocument extends mongoose.Document {
  content: string;
  sender: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const groupMessageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GroupMessageModel = mongoose.model<GroupMessageDocument>(
  'GroupMessage',
  groupMessageSchema
);

export default GroupMessageModel;
