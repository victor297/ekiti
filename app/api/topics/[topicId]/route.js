import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topic from "@/models/Topic";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { topicId } = params;
    const body = await request.json();

    const topic = await Topic.findByIdAndUpdate(
      topicId,
      {
        name: body.name,
        level: body.level,
        summary: body.summary
      },
      { new: true, runValidators: true }
    );

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ topic });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update topic" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { topicId } = params;

    const topic = await Topic.findByIdAndDelete(topicId);

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Topic deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete topic" },
      { status: 500 }
    );
  }
}
