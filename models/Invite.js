import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    role: { type: String, enum: ["student"], default: "student" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    usedCount: { type: Number, default: 0 },
    maxUses: { type: Number, default: 20 }
  },
  { timestamps: true }
);

export default mongoose.models.Invite || mongoose.model("Invite", InviteSchema);
