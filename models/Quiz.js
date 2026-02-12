import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    options: { type: [String], required: true },
    correctIndex: { type: Number, required: true },
    explanation: { type: String, default: "" },
    points: { type: Number, default: 1 }
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    level: { type: String, default: "JSS 2" },
    description: { type: String, default: "" },
    questions: { type: [QuestionSchema], default: [] },
    createdBy: { type: String, default: "teacher" }
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
