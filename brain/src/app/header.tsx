"use client"


import Image from "next/image";
import { HeaderActions } from "./header-action";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";


export function Header() {
    return <div className="bg-slate-900 py-4">
        <div className="container mx-auto flex justify-between items-center">

            <div className="">
               <Link href="/" className="flex items-center gap-4 text-2xl">
               
                <Image 
                alt="Logo"
                src="/logo.png" width={40} height={40} 
                className="rounded "/>
                BIGBIN
                </Link>
            </div>

            <div className="flex items-center gap-4 justify-center">
            <ModeToggle />
               <HeaderActions/>
            </div>

        </div>

    </div>

}