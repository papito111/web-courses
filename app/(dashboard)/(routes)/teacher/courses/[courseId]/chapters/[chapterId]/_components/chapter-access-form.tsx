"use client"
import React from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil } from 'lucide-react';
import{
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
    FormDescription,
    
    
} from "@/components/ui/form";

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import{ Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import { Course as PrismaCourse } from '@prisma/client';

interface Course extends PrismaCourse {
    isFree: boolean;
}
import { Editor } from '@/components/editor';
import { cn } from '@/lib/utils';
import { Preview } from '@/components/preview';


interface ChapterAccessFormProps {
    initialData: Course;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    isFree: z.boolean().default(false),
    
});


const ChapterAccessForm = ({initialData, courseId, chapterId} : ChapterAccessFormProps) => {

    const router = useRouter();

    const[isEditing, setisEditing] = React.useState(false);

        defaultValues: { isFree: initialData.isFree ?? false },

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{isFree: !!initialData.isFree },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`,values);
            toast.success("Chapter is updated");
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
            Chapter access
            <Button onClick={toggleEdit} className = "hover:bg-transparent" variant="ghost">
                {isEditing && (
                    <>Cancel</>
                )}
                { !isEditing && (
                    <>
                    <Pencil  className='h-4 w-4 ' />
                    
                    Edit access

                    
                    </>
                )}
                
            </Button>
            
        </div>
        {!isEditing && (
            <div className={cn(
                'text-sm mt-2 text-center',
                 !initialData.isFree && "text-slate-500 italic"
                 )} >
                    
                    {initialData.isFree ? (
                        <>This chapter is free for preview</>
                    ):(
                        <>This chapter is not free</>
                    )}
            </div>
        )}
        {isEditing && (
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2 mt-3'>
                    <FormField
                    control={form.control}
                    name='isFree'
                    render={({field}) => (
                        <FormItem className='flex flex-row items-start spacy-y-0 rounded-md border p-1 space-x-3'>
                            <FormControl>

                            <Checkbox
                            checked = {field.value}
                            onCheckedChange={field.onChange}
                            
                            />
                            
                            
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormDescription className='text-md'>
                                    Check this box if u want to make this chapter free
                                </FormDescription>
                            </div>
                            
                            
                        </FormItem>
                    )}
                    />
                    <div className='flex items-center my-0 justify-center gap-x-5'>
                        <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        >
                            Save
                        </Button>

                    </div>

                </form>
            </Form>
        )}
        {/* --- {initialData.title} --- {courseId} */}
    </div>
  )
}

export default ChapterAccessForm