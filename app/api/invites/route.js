import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Invite from "@/models/Invite";

function generateToken() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "";
  for (let i = 0; i < 8; i += 1) {
    token += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return token;
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  let token = generateToken();
  let exists = await Invite.findOne({ token });
  while (exists) {
    token = generateToken();
    exists = await Invite.findOne({ token });
  }

  const invite = await Invite.create({
    token,
    createdBy: session.user.id
  });

  return NextResponse.json({ invite });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const invites = await Invite.find({ createdBy: session.user.id })
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json({ invites });
}
