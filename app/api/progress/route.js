import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Progress from "@/models/Progress";
import Topic from "@/models/Topic";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const progress = await Progress.find({ userId }).populate("topicId").lean();
  return NextResponse.json({ progress });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const { userId, topicId, completedLessons, score } = body;

  if (!userId || !topicId) {
    return NextResponse.json({ error: "Missing userId or topicId" }, { status: 400 });
  }

  const topic = await Topic.findById(topicId).lean();
  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  const totalLessons = topic.lessons.length;

  const progress = await Progress.findOneAndUpdate(
    { userId, topicId },
    {
      $set: {
        completedLessons: completedLessons ?? 0,
        totalLessons,
        score: score ?? 0,
        lastActiveAt: new Date()
      }
    },
    { upsert: true, new: true }
  ).lean();

  return NextResponse.json({ progress });
}
