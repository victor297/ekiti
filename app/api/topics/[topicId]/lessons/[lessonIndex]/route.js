import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topic from "@/models/Topic";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { topicId, lessonIndex } = params;
    const body = await request.json();

    console.log("Updating lesson:", { topicId, lessonIndex });
    console.log("Body:", body);

    const index = parseInt(lessonIndex);
    
    // Construct the update object using dot notation for the specific index
    const updatePath = `lessons.${index}`;
    const updateData = {
      [`${updatePath}.title`]: body.title,
      [`${updatePath}.type`]: body.type,
      [`${updatePath}.description`]: body.description || "",
      [`${updatePath}.textContent`]: body.textContent || "",
      [`${updatePath}.contentUrl`]: body.contentUrl || "",
      [`${updatePath}.durationMins`]: Number(body.durationMins || 0),
      [`${updatePath}.quizId`]: body.quizId || null
    };

    const topic = await Topic.findOneAndUpdate(
      { _id: topicId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found or update failed" },
        { status: 404 }
      );
    }

    if (index < 0 || index >= topic.lessons.length) {
      return NextResponse.json(
        { error: "Lesson index out of range" },
        { status: 400 }
      );
    }

    return NextResponse.json({ topic });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update lesson" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { topicId, lessonIndex } = params;

    const topic = await Topic.findById(topicId);

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    const index = parseInt(lessonIndex);
    if (index < 0 || index >= topic.lessons.length) {
      return NextResponse.json(
        { error: "Lesson index out of range" },
        { status: 400 }
      );
    }

    // Remove the lesson at the specified index
    topic.lessons.splice(index, 1);
    await topic.save();

    return NextResponse.json({ 
      message: "Lesson deleted successfully",
      topic: topic.toObject() 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
