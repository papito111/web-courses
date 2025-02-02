"use client"
import React, { useState } from 'react'
import * as z from "zod";
import axios from 'axios';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Pencil, PlusCircle, ImageIcon, File, X, Loader2 } from 'lucide-react';
import{
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
    
    
} from "@/components/ui/form";


import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import{ Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import { FileUpload } from '@/components/ui/file-uploader';


interface AttachmentsFormProps {
    initialData: Course & {attachments: Attachment[]};
    courseId: string;
};

const formSchema = z.object({
    url: z.string().min(1),

});


const AttachmentsForm = ({initialData, courseId} : AttachmentsFormProps) => {

    const router = useRouter();

    const [deletingId, setDeletingID] = useState<string | null>(null);
    const[isEditing, setisEditing] = React.useState(false);
    

    const toggleEdit = () => setisEditing((current) => !current); 

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {imageUrl:initialData?.imageUrl || "",},
    // });

    // const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.post(`/api/courses/${courseId}/attachments`,values);
            toast.success("Course is updated");
            toggleEdit();
            router.refresh();
        }catch(error) {
            console.log("something went wrong", error)
            toast.error("Failed to update the course")
        }
    }

    const onDelete = async (id:string) => {
        try{
            setDeletingID(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Attachment deleted")
            router.refresh();
        }catch(error){
            toast.error("Something went wrong");
        } finally {
            setDeletingID(null);
        }
    };

  return (
    <div className='border mt-6 bg-slate-200 rounded-md p-2'>

        <div className='font-medium flex items-center justify-between'>
            Course attachments
            <Button onClick={toggleEdit} className = "hover:bg-transparent" variant="ghost">
                {isEditing && (
                    <>Cancel</>
                )}
                { !isEditing && (
                    <>
                    <PlusCircle className='h-4 w-4 mr-1' />
                    Add a file
                    </>
                )}
              
            </Button>
            
        </div>
        {!isEditing && (
            <>
            {initialData.attachments.length === 0 && (
                <p className='text-sm mt-2 text-slate-600 '>
                    No attachments
                </p>
            )} 
            {initialData.attachments.length > 0 &&(
                <div className='space-y-2'>
                    {initialData.attachments.map((attachment)=>(
                        <div key={attachment.id} className='flex bg-gray-50 items-center  justify-between rounded p-1 mt-2 text-center'>
                            <File className='flex h-4 w-4 ml-2 mr-2 flex-shrink-0' />
                            <p className='break-words truncate text-sm'>
                            {attachment.name}
                            </p>
                            {deletingId === attachment.id &&(
                                <div>
                                    <Loader2 className='animate-spin h-4 w-4'/>
                                </div>

                            )}
                            {deletingId !== attachment.id &&(
                                <button onClick = {() => onDelete(attachment.id)} className='p-3 opacity-90 transition'>
                                    <X className='h-4 w-4'/>
                                </button>

                            )}
                        </div>
                    ))}

                </div>
            )}
            </>
        )}
        {isEditing && (
            <div>
                <FileUpload
                    endpoint="courseAttachment"
                    
                    onChange={(url) => {
                        if(url) {
                            onSubmit({url: url});
                        }
                    }}
                />
                <div className='pt-2  text-center'>
                    Add files for your students
                </div>
            </div>
        )}
        {/* --- {initialData.title} --- {courseId} */}
    </div>
  )
}

export default AttachmentsForm