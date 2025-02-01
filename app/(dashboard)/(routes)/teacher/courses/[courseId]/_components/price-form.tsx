"use client"
import React from 'react'
import * as z from "zod";
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Pencil } from 'lucide-react';
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
import { formatPrice } from '@/lib/format';

interface PriceFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    price: z.coerce.number(),

});


const PriceForm = ({initialData, courseId} : PriceFormProps) => {

    const router = useRouter();

    const[isEditing, setisEditing] = React.useState(false);

    const toggleEdit = () => setisEditing((current) => !current); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{price: initialData?.price || undefined},
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
            Price
            <Button onClick={toggleEdit} className = "hover:bg-transparent" variant="ghost">
                {isEditing && (
                    <>Cancel</>
                )}
                { !isEditing && (
                    <>
                    <Pencil  className='h-4 w-4' />
                    Edit Course Price
                    </>
                )}
                
            </Button>
            
        </div>
        {!isEditing && (
            <p className='text-sm mt-2 text-center'>
                 {formatPrice(initialData.price)}
            </p>
        )}
        {isEditing && (
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2 mt-3'>
                    <FormField
                    control={form.control}
                    name='price'
                    render={({field}) => (
                        <FormItem>
                            <FormControl>

                            <Input
                            type='number'
                            step='0.01'
                            disabled={isSubmitting}
                            placeholder='Enter course price'
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

export default PriceForm