import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["video", "animation", "text", "quiz", "interactive"],
      required: true
    },
    description: { type: String, default: "" },
    textContent: { type: String, default: "" }, // For text-based lessons
    contentUrl: { type: String, default: "" }, // For video/animation URLs or file attachments
    durationMins: { type: Number, default: 0 },
    customId: { type: String, default: "" },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", default: null }
  },
  { _id: false }
);

const TopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: String, default: "JSS 2" },
    summary: { type: String, default: "" },
    lessons: { type: [LessonSchema], default: [] },
    createdBy: { type: String, default: "seed" }
  },
  { timestamps: true }
);

export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
