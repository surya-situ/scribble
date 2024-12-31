import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw Error("OPENAI_API_KEY is not set!");
}

const openai = new OpenAI({ apiKey });

export default openai;

export async function getEmbedding(text: string, content: string | undefined): Promise<number[]> {
  // Create embeddings using OpenAI's API
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  console.log(response.data)

  // Check if response.data is available and is an array
  if (
    !response.data ||
    !Array.isArray(response.data) ||
    response.data.length === 0
  ) {
    throw new Error("No embedding data returned.");
  }

  const embedding = response.data[0].embedding;

  // Ensure embedding is returned properly
  if (!embedding) {
    throw new Error("Error in generating embedding.");
  };

  return embedding;
}
