"use client"

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { use } from "react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function DocumentPage({ params }:
    { params: Promise<{ documentId: Id<"documents"> }> }) {
    const { documentId } = use(params);


    const document = useQuery(api.document.getDocumentByID, {
        documentId
    })


    if (document === undefined && !Array.isArray(document))
         return <div className="flex justify-center text-center mt-[20%]">Loading...</div>;


    return (
        <main className="p-20 pb-0 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">{document?.title}</h1>
            </div>

            <div className="flex gap-12">


                <Tabs defaultValue="document" className="w-full" >
                    <TabsList className="mb-2">
                        <TabsTrigger value="document" className="w-fit">Document</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                    </TabsList>
                    <TabsContent value="document" className="w-full">
                        <div className="flex flex-1 bg-slate-900 h-[600px]
                         p-4 rounded-md">

                            {document?.fileUrl && (
                                <iframe className="w-full whitespace-pre-line"
                                    src={document.fileUrl} />

                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="chat">
                         {document && <ChatPanel documentId={document?._id} />}
                    </TabsContent>
                </Tabs>





                {/* end */}



            </div>

        </main>
    )



}