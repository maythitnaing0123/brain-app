"use client"

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading, useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {ModeToggle} from "@/components/theme-toggle";
export default function Home() {

  const getDocument = useQuery(api.document.getDocument)
  const createDocument = useMutation(api.document.createDocument)

  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        {
          getDocument?.map(doc => (
            <div key={doc._id}>{doc.title}</div>
          ))
        }
        <ModeToggle/>
        <Button
       
        onClick={() => createDocument({title: "Hello Wrold"})}>Click me!</Button>
      </Authenticated>
   
      </main>
    </div>
  );
}


