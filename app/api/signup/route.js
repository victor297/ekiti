import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Invite from "@/models/Invite";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const { name, email, password, gender, token } = body;

  if (!name || !email || !password || !gender || !token) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const invite = await Invite.findOne({ token }).lean();
  if (!invite) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (invite.usedCount >= invite.maxUses) {
    return NextResponse.json({ error: "Token usage limit reached (max 20 uses)" }, { status: 400 });
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    role: "student",
    password: hashed,
    gender,
    isActive: true
  });

  await Invite.findByIdAndUpdate(invite._id, {
    $inc: { usedCount: 1 }
  });

  return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email } });
}
