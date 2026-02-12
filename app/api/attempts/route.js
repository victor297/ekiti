import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import QuizAttempt from "@/models/QuizAttempt";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");
  const userId = searchParams.get("userId");

  let query = {};
  if (session.user.role === "teacher") {
    if (quizId) query.quizId = quizId;
    if (userId) query.userId = userId;
  } else {
    query.userId = session.user.email;
  }

  const attempts = await QuizAttempt.find(query)
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("quizId")
    .lean();

  return NextResponse.json({ attempts });
}
