import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Progress from "@/models/Progress";
import QuizAttempt from "@/models/QuizAttempt";
import Topic from "@/models/Topic";
import Quiz from "@/models/Quiz";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const student = await User.findById(params.id).lean();
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const progress = await Progress.find({ userId: student.email })
    .populate("topicId")
    .lean();
  const attempts = await QuizAttempt.find({ userId: student.email })
    .sort({ createdAt: -1 })
    .populate("quizId")
    .lean();

  return NextResponse.json({
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      isActive: student.isActive !== false,
      createdAt: student.createdAt
    },
    progress,
    attempts
  });
}

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const { isActive } = await request.json();

    await connectDB();
    const student = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    );

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: `Student account ${isActive ? "activated" : "deactivated"} successfully`,
      student: { id: student._id, name: student.name, isActive: student.isActive }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
