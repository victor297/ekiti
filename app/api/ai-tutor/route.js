import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { question, lessonTitle, lessonType, context } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const systemPrompt = `You are a friendly and patient math tutor for JSS 2 (Junior Secondary School 2) students. 
Your role is to help students understand mathematical concepts in simple, clear language.

Current lesson: ${lessonTitle || "Mathematics"}
Lesson type: ${lessonType || "general"}
${context ? `Lesson context: ${context}` : ""}

Guidelines:
- Use simple, age-appropriate language
- Break down complex concepts into easy steps
- Provide examples when helpful
- Be encouraging and supportive
- Keep responses concise (2-3 paragraphs max)
- Use analogies and real-world examples
- If the question is off-topic, gently redirect to math learning`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("AI Tutor Error:", error);
    
    if (error.code === "insufficient_quota") {
      return NextResponse.json({ 
        error: "AI tutor is temporarily unavailable. Please try again later." 
      }, { status: 503 });
    }

    return NextResponse.json({ 
      error: "Failed to get AI response. Please try again." 
    }, { status: 500 });
  }
}
