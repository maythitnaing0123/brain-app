"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Loader2 } from "lucide-react"
import { LoadingButton } from "@/components/loadingButton"
import { generateUploadUrl } from "../../convex/document"
import { Id } from "../../convex/_generated/dataModel"

const formSchema = z.object({
  title: z.string().min(1).max(250),
  file: z.instanceof(File)
})


export default function UploadDocumentForm({ onUpload }: { onUpload: () => void }) {

  const createDocument = useMutation(api.document.createDocument)
  const generateUploadUrl = useMutation(api.document.generateUploadUrl);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",

    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    //  Sleep 2second How?
   const postUrl =  await generateUploadUrl();

   const result = await fetch(postUrl, {
    method: "POST",
    headers: { "Content-Type": values.file!.type },
    body: values.file,
  });

  const {storageId} = await result.json()

     await createDocument({
      title: values.title,
      fileId : storageId as Id<"_storage">,

     })
    onUpload();

  }




  return (
    <Form {...form}  >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Expense Report" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field : {onChange , ...fileProps}}) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" 
                accept=".txt,.doc,.xml"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  onChange(file)


                }} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton

          loadingText="Uploading..."
          isLoading={form.formState.isSubmitting}>Upload
        </LoadingButton>
      </form>
    </Form>
  )
}