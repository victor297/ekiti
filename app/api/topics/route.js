import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Topic from "@/models/Topic";

export async function GET() {
  await connectDB();
  const topics = await Topic.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ topics });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const topic = await Topic.create(body);
  return NextResponse.json({ topic }, { status: 201 });
}
