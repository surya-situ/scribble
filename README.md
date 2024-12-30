# Scribble - AI note application
Scribble is an AI note application where user can ask the AI chat to search for note without looking manually.

## Table of content
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Scribble is an AI-powered note-taking application designed to simplify your workflow. With Scribble, users can effortlessly search for notes using an AI chat assistant, eliminating the need to sift through files manually. Stay organized and access your notes instantly with intelligent search capabilities.

## Technologies
Project is created with:
* nextjs 15
* Shadcn UI
* Clerk ( for user authentication)
* MongoDB
* OpenAI
* Pinecone
* Prisma
* Zod

## Setup
To run this project, install it locally using npm:

- To install all dependencies
```bash
npm install
```
- Make sure to rename { example.env } file to { .env } and  change environment variables.
```bash
DATABASE_URL="YOUR_MONGODB_DATABASE_URI"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/notes
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/notes

OPENAI_API_KEY="YOUR_OPENAI_API_KEY"

PINECONE_API_KEY="YOUR_PINECONE_API_KEY"
```

- To run the project
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

