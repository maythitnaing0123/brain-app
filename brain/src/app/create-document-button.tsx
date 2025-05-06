import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UploadDocumentForm from "./upload-document-form";
import { useState } from "react";


export function CreateDocumentButton() {

const [isOpen , setIsOpen] = useState(false)

    return <>

        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
                <Button>Upload Document</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload a Document</DialogTitle>
                    <DialogDescription>
                        Upload a team document for you to search over in the future.
                                          
                        </DialogDescription>
                        <UploadDocumentForm 
                        onUpload={() => setIsOpen(false)}/>  
                </DialogHeader>


            </DialogContent>
        </Dialog>

    </>
}