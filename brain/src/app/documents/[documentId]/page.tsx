"use client"

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { use } from "react";
import { useAuth } from "@clerk/nextjs";


export default function DocumentPage({ params }:
    { params: Promise<{ documentId: Id<"documents"> }> }) {
    const { documentId } = use(params);


    const document = useQuery(api.document.getDocumentByID, {
        documentId
    })


    if (document === undefined) return <div className="flex justify-center text-center">Loading...</div>;

    if (!document) {
        return <div>You don't have access to view this
            document
        </div>
    }

    return (
        <main className="p-24 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{document?.title}</h1>
            </div>

            <div className="flex gap-12">

                <div className="flex flex-1 bg-slate-900 h-[600px] p-4 rounded-md">

                    {document.fileUrl && (
                        <iframe className="w-full"
                            src={document.fileUrl} />

                    )}
                </div>

                <div className="w-[300px] bg-gray-900">

                </div>

            </div>

        </main>
    )



}