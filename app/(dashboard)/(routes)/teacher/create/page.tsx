"use client"
import React from 'react'
import * as z from "zod";
import Link from 'next/link'
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {Form,FormItem, FormControl,FormDescription,FormField,FormLabel,FormMessage} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Router from 'next/navigation';
import toast from 'react-hot-toast';
const formSchema  = z.object({
  title: z.string().min(1,{
    message: "Title is required",
  }),
});


const CreatePage = () => {

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title: "",
    }
  })

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses",values);
      router.push(`/teacher/courses/${response.data.id}`)
      toast.success("Course created successfully");


    } catch {
      toast.error("Failed to create course")
    }
  }

  return (
    <div className='max-w-5xl mx-auto flex md:items-center justify-center h-full p-5'>
      <div>
      <h1 className='text-2xl font-semibold'>Name your course</h1>
      <p className='text-sm text-slate-500 my-1'>What s your course name?</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-5'>
          <FormField 
          control = {form.control}
          name="title"
          render={({field})=>(
            <FormItem>
              <FormLabel>
                Course Title
              </FormLabel>
              <FormControl>
                <Input
                disabled={isSubmitting}
                placeholder="Enter course title"
                {...field}
                />
              </FormControl>
              <FormDescription>
                What you will teach in this course?
              </FormDescription>
            </FormItem>
          )}
          />
          <div className='flex items-center justify-center gap-x-5'>
            <Link href='/'>
              <Button
              type='button'
              variant='secondary'
              >Cancel</Button>
            </Link>
            <Button
            type="submit"
            variant='secondary'

            disabled={!isValid || isSubmitting}
            >
              Create Course   
            </Button>

          </div>
        </form>
      </Form>
      </div>
    </div>
    
  )
}

export default CreatePage