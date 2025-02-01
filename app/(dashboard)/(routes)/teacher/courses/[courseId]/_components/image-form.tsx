"use client"
import React from 'react'
import * as z from "zod";
import axios from 'axios';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react';
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
import { Course } from '@prisma/client';
import { FileUpload } from '@/components/ui/file-uploader';


interface ImageFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),

});


const ImageForm = ({initialData, courseId} : ImageFormProps) => {

    const router = useRouter();

    const[isEditing, setisEditing] = React.useState(false);

    const toggleEdit = () => setisEditing((current) => !current); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {imageUrl:initialData?.imageUrl || "",},
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}`,values);
            toast.success("Course is updated");
            toggleEdit();
            router.refresh();
        }catch(error) {
            console.log("something went wrong", error)
            toast.error("Failed to update the course")
        }
    }



  return (
    <div className='border mt-6 bg-slate-200 rounded-md p-2'>

        <div className='font-medium flex items-center justify-between'>
            Image
            <Button onClick={toggleEdit} className = "hover:bg-transparent" variant="ghost">
                {isEditing && (
                    <>Cancel</>
                )}
                { !isEditing && !initialData.imageUrl &&(
                    <>
                    <PlusCircle className='h-4 w-4 mr-1' />
                    Add an image
                    </>
                )}
                { !isEditing && initialData.imageUrl && (
                    <>
                    <Pencil  className='h-4 w-4' />
                    Edit Image
                    </>
                )}
                
            </Button>
            
        </div>
        {!isEditing && (
            !initialData.imageUrl ? (
                <div className='flex items-center justify-center h-60'>
                    <ImageIcon className='h-3 w-3'/>
                </div>
            ) : (
                <div className='relative aspect-video mt-2'>
                    <Image
                    alt="Upload"
                    fill
                    className="object-cover rounded-md"
                    src={initialData.imageUrl}
                    />
                </div>
            )
        )}
        {isEditing && (
            <div>
                <FileUpload
                    endpoint="courseImage"
                    
                    onChange={(url) => {
                        if(url) {
                            onSubmit({imageUrl: url});
                        }
                    }}
                />
                <div>
                    16:9 ratio recommended
                </div>
            </div>
        )}
        {/* --- {initialData.title} --- {courseId} */}
    </div>
  )
}

export default ImageForm