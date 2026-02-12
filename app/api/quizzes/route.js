import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get("topicId");
  const query = topicId ? { topicId } : {};
  const quizzes = await Quiz.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ quizzes });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();

  if (!body.title || !body.topicId) {
    return NextResponse.json({ error: "Missing title or topicId" }, { status: 400 });
  }

  const quiz = await Quiz.create(body);
  return NextResponse.json({ quiz }, { status: 201 });
}
