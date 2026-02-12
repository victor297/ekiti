import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topic from "@/models/Topic";

export async function POST(request, { params }) {
  await connectDB();
  const { topicId } = params;
  const body = await request.json();

  console.log("Creating lesson for topic:", topicId);
  console.log("Body:", body);

  const lesson = {
    title: body.title,
    type: body.type,
    description: body.description || "",
    textContent: body.textContent || "",
    contentUrl: body.contentUrl || "",
    durationMins: Number(body.durationMins || 0),
    quizId: body.quizId || null
  };

  const topic = await Topic.findByIdAndUpdate(
    topicId,
    { $push: { lessons: lesson } },
    { new: true }
  ).lean();

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json({ topic });
}
