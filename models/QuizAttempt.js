import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionIndex: { type: Number, required: true },
    selectedIndex: { type: Number, required: true }
  },
  { _id: false }
);

const QuizAttemptSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    score: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    answers: { type: [AnswerSchema], default: [] }
  },
  { timestamps: true }
);

QuizAttemptSchema.index({ userId: 1, quizId: 1, createdAt: -1 });

export default mongoose.models.QuizAttempt ||
  mongoose.model("QuizAttempt", QuizAttemptSchema);
