import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next'

export const metaData: Metadata = {
  title: "Scribble - Sign in"
}

export default function SignInPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <SignIn appearance={{ variables: { colorPrimary: "#0f172a" } }} />
    </div>
  )
}
