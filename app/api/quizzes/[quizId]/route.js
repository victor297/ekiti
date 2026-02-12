import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function GET(request, { params }) {
  await connectDB();
  const quiz = await Quiz.findById(params.quizId).lean();
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }
  return NextResponse.json({ quiz });
}

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  const quiz = await Quiz.findByIdAndUpdate(params.quizId, body, {
    new: true
  }).lean();

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json({ quiz });
}

export async function DELETE(request, { params }) {
  await connectDB();
  const quiz = await Quiz.findByIdAndDelete(params.quizId).lean();
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
