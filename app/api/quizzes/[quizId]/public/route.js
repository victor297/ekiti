import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function GET(request, { params }) {
  await connectDB();
  const quiz = await Quiz.findById(params.quizId).lean();
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  const safeQuiz = {
    _id: quiz._id,
    title: quiz.title,
    description: quiz.description,
    topicId: quiz.topicId,
    level: quiz.level,
    questions: quiz.questions.map((q) => ({
      prompt: q.prompt,
      options: q.options,
      points: q.points
    }))
  };

  return NextResponse.json({ quiz: safeQuiz });
}
