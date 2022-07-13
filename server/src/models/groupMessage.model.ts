import mongoose from 'mongoose';

export interface GroupMessageDocument extends mongoose.Document {
  content: string;
  senderId: mongoose.Types.ObjectId;
  senderName: string;
  group: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const groupMessageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    senderName: { type: String, required: true },
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
