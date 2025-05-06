"use client"

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading, useQuery, useMutation } from "convex/react";
import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";


export function Header() {
    return <div className="bg-slate-900 py-4">
        <div className="container mx-auto flex justify-between items-center">

            <div className="flex items-center gap-4 text-2xl">
                <Image 
                alt="Logo"
                src="/logo.png" width={40} height={40} 
                className="rounded "/>
                BIGBIN
            </div>

            <div>
                <Unauthenticated>
                    <SignInButton />
                </Unauthenticated>
                <Authenticated>
                    <div className="flex gap-4">
                    <UserButton />

                    <ModeToggle />
                    </div>

                </Authenticated>
            </div>

        </div>

    </div>

}