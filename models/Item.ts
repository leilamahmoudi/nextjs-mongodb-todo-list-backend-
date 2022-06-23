import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    todo: { type: Schema.Types.ObjectId, ref: "Todo" },
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

interface IItem extends Document {
  todo_id: { type: typeof mongoose.Schema.Types.ObjectId; ref: string };
  task: string;
  description?: string;
  isDone?: boolean;
}
export default mongoose.model<IItem>("Item", itemSchema);
