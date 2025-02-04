"use client"
import React, { useState } from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Pencil, PlusCircle } from 'lucide-react';
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
import { Course, Chapter} from '@prisma/client';

import { cn } from '@/lib/utils';
interface ChapterFormProps {
    initialData: Course & {chapters:Chapter[]};
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1),

});


export const ChapterForm = ({initialData, courseId} : ChapterFormProps) => {

    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false)
    const[isUpdating, setisUpdating] = React.useState(false);

    const toggleCreating = () => setIsCreating  ((current) => !current); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{title: ""},
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.post(`/api/courses/${courseId}/chapters`,values);
            toast.success("Chapter created");
            toggleCreating();
            router.refresh();
        }catch(error) {
            console.log("something went wrong", error)
            toast.error("Failed to update the chapter")
        }
    }



  return (
    <div className='border mt-6 bg-slate-200 rounded-md p-2'>

        <div className='font-medium flex items-center justify-between'>
            Course chapters
            <Button onClick={toggleCreating} className = "hover:bg-transparent" variant="ghost">
                {isCreating ? (
                    <>Cancel</>
                  ):(
                
                    <>
                    <PlusCircle  className='h-4 w-4 ' />
                    
                    Add Chapter

                    
                    </>
                
                )}
                
            </Button>
            
        </div>
        
        {isCreating && (
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2 mt-3'>
                    <FormField
                    control={form.control}
                    name='title'
                    render={({field}) => (
                        <FormItem>
                            <FormControl>

                            <Input
                            disabled={isSubmitting}
                            placeholder='Enter course introduction'
                            {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className='flex items-center my-0 justify-center gap-x-5'>
                        <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        >
                            Create
                        </Button>

                    </div>

                </form>
            </Form>
        )}
        {!isCreating &&(
            <div className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")}>
                {!initialData.chapters.length && "No chapters"}
                
            </div>
        )} { !isCreating &&(
            <p className='text-xs text-muted-foreground mt-2'>
                Drag and drop to reorder the chapters
            </p>
        )

        }
        {/* --- {initialData.title} --- {courseId} */}
    </div>
  )
}

export default ChapterForm