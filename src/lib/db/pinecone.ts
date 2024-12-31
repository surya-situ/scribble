import { Pinecone } from "@pinecone-database/pinecone";

const apiKey= process.env.PINECONE_API_KEY;

if(!apiKey) {
    throw Error("PINECONE_API_KEY is ont set!")
};

const pinecone = new Pinecone({
    // environment: "gcp-starter",
    apiKey
});

export const index = pinecone.Index("scribble");