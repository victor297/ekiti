import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { seedTopics, seedUsers } from "../data/seedData.js";
import { seedQuizzes } from "../data/seedQuizzes.js";
import Topic from "../models/Topic.js";
import User from "../models/User.js";
import Progress from "../models/Progress.js";
import Quiz from "../models/Quiz.js";

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "jss2_math_app"
  });

  await Topic.deleteMany({});
  await User.deleteMany({});
  await Progress.deleteMany({});
  await Quiz.deleteMany({});

  const topics = await Topic.insertMany(seedTopics);
  const users = await User.insertMany(
    await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    )
  );

  const student = users.find((u) => u.role === "student");
  if (student) {
    await Progress.insertMany(
      topics.slice(0, 2).map((topic) => ({
        userId: student.email,
        topicId: topic._id,
        completedLessons: Math.max(1, Math.floor(topic.lessons.length / 2)),
        totalLessons: topic.lessons.length,
        score: 78
      }))
    );
  }

  const topicsByName = new Map(topics.map((topic) => [topic.name, topic._id]));
  await Quiz.insertMany(
    seedQuizzes.map((quiz) => ({
      title: quiz.title,
      topicId: topicsByName.get(quiz.topicName),
      description: quiz.description,
      questions: quiz.questions
    }))
  );

  console.log(`Seeded ${topics.length} topics, ${users.length} users, quizzes.`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
