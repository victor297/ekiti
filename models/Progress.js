import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    completedLessons: { type: Number, default: 0 },
    totalLessons: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    lastActiveAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

ProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

export default mongoose.models.Progress || mongoose.model("Progress", ProgressSchema);
