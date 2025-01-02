import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'

export default async function Home() {

  const {userId} = await auth();

  if(userId) redirect("/notes");

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="FlowBrain - logo" width={100} height={100} />
        <span className="text-4xl font-extrabold tracking-tight lg:text-6xl">
          Scribble
        </span>
      </div>
      <p className="max-w-prose text-center font-semibold tracking-normal">
        An intelligent note-taking app with AI integration, built with OpenAI,
        PineCone, NextJS, ShadCn UI, Clerk and more...
      </p>

      <Button size="lg" asChild>
        <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
}
