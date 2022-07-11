import mongoose from 'mongoose';

export interface MessageDocument extends mongoose.Document {
  content: string;
  sender: mongoose.Types.ObjectId;
  reciver: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reciver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>('Message', messageSchema);

export default MessageModel;
