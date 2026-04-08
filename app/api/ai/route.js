import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { content, action } = await request.json();

    if (!content) {
      return new Response(JSON.stringify({ error: "No content provided" }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";
    if (action === "summarize") {
      prompt = `Resume la siguiente nota de forma concisa y profesional en una sola frase corta: "${content}"`;
    } else {
      prompt = `Analiza esta nota: "${content}"`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ result: text }), { status: 200 });
  } catch (error) {
    console.error("AI API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
