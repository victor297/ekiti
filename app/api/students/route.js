import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Progress from "@/models/Progress";
import QuizAttempt from "@/models/QuizAttempt";
import Topic from "@/models/Topic";
import Quiz from "@/models/Quiz";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const students = await User.find({ role: "student" })
    .select("name email createdAt isActive")
    .sort({ createdAt: -1 })
    .lean();

  const studentIds = students.map((s) => s.email);
  const progress = await Progress.find({ userId: { $in: studentIds } })
    .populate("topicId")
    .lean();

  const attempts = await QuizAttempt.find({ userId: { $in: studentIds } })
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  const attemptsByUser = attempts.reduce((acc, attempt) => {
    acc[attempt.userId] = (acc[attempt.userId] || 0) + 1;
    return acc;
  }, {});

  const progressByUser = progress.reduce((acc, item) => {
    acc[item.userId] = acc[item.userId] || [];
    acc[item.userId].push(item);
    return acc;
  }, {});

  const result = students.map((student) => {
    const studentProgress = progressByUser[student.email] || [];
    const avgScore = studentProgress.length
      ? Math.round(
          studentProgress.reduce((sum, item) => sum + (item.score || 0), 0) /
            studentProgress.length
        )
      : 0;
    return {
      id: student._id,
      name: student.name,
      email: student.email,
      isActive: student.isActive !== false, // Use !== false to handle existing records
      createdAt: student.createdAt,
      attemptCount: attemptsByUser[student.email] || 0,
      avgScore,
      progress: studentProgress
    };
  });

  return NextResponse.json({ students: result });
}
