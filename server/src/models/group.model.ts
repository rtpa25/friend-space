import mongoose from 'mongoose';

export interface GroupDocument extends mongoose.Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const GroupModel = mongoose.model<GroupDocument>('Group', groupSchema);

export default GroupModel;
