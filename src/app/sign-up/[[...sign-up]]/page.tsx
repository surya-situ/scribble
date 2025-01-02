import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metaData: Metadata = {
  title: "Scribble - Sign up"
}

export default function SignUpPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <SignUp appearance={{ variables: { colorPrimary: "#0f172a" } }} />
    </div>
  )
}
