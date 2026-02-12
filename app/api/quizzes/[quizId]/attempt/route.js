import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import QuizAttempt from "@/models/QuizAttempt";
import Progress from "@/models/Progress";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { answers } = body;

  if (!Array.isArray(answers)) {
    return NextResponse.json({ error: "Missing answers" }, { status: 400 });
  }

  const quiz = await Quiz.findById(params.quizId).lean();
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  let score = 0;
  let totalPoints = 0;

  quiz.questions.forEach((q, idx) => {
    const points = q.points || 1;
    totalPoints += points;
    const userAnswer = answers.find((a) => a.questionIndex === idx);
    if (userAnswer && userAnswer.selectedIndex === q.correctIndex) {
      score += points;
    }
  });

  const percentage = totalPoints ? Math.round((score / totalPoints) * 100) : 0;

  const attempt = await QuizAttempt.create({
    userId: session.user.email,
    quizId: quiz._id,
    topicId: quiz.topicId,
    score,
    totalPoints,
    percentage,
    answers
  });

  const totalLessons = quiz.questions.length;
  await Progress.findOneAndUpdate(
    { userId: session.user.email, topicId: quiz.topicId },
    {
      $set: {
        completedLessons: Math.max(1, totalLessons),
        totalLessons,
        score: percentage,
        lastActiveAt: new Date()
      }
    },
    { upsert: true, new: true }
  );

  const feedback = quiz.questions.map((q, idx) => {
    const userAnswer = answers.find((a) => a.questionIndex === idx);
    return {
      questionIndex: idx,
      correctIndex: q.correctIndex,
      explanation: q.explanation || "",
      isCorrect: userAnswer?.selectedIndex === q.correctIndex
    };
  });

  return NextResponse.json({
    attempt: {
      id: attempt._id,
      score,
      totalPoints,
      percentage
    },
    feedback
  });
}
