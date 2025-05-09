
import React from 'react'
import { db } from '@/lib/db'
import { auth } from "@clerk/nextjs/server";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { IconBadge } from '@/components/icon-badge';
import { CircleDollarSign, LayoutDashboard, ListChecks, File } from 'lucide-react';
import TitleForm from './_components/title-form';
import DescriptionForm from './_components/description-form';
import ImageForm from './_components/image-form';
import CategoryForm from './_components/category-form';
import { getAuth } from '@clerk/nextjs/server';
import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
import PriceForm from './_components/price-form';
import AttachmentsForm from './_components/attachments-form';
import ChapterForm from './_components/chapters-form';
import { boolean } from 'zod';
import { Banner } from '@/components/banner';

import { Actions } from './_components/actions';

const CourseIdPage = async ({ params }:
    {
        params: { courseId: string }
    }) => {
    const reqHeaders = headers();
    // const { userId } = getAuth({ headers: reqHeaders });
    const { userId } = await auth();
    
    // to powyzej nie dziala
    // console.log(userId);

    if (!userId) {
        redirect("/sign-in");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include:{

            chapters:{ orderBy: {
                position: "asc",
            },

            },
            attachments:{
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });

    if (!course) {
        redirect("/");
    }
    const requiredFields = [
     course.title,
     course.description,   
     course.imageUrl,   
     course.price,   
     course.categoryId,  
     course.chapters.some(chapter => chapter.isPublished), 
    ]

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
    // console.log(categories)

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length; //tu bedzie lista tych requiered field ktora nie jest falszem
    const completionText = `${completedFields}/${totalFields}`

    const isComplete = requiredFields.every(Boolean);
    return (
        <>


          
        <div className='p-1  w-auto md:w-11/12 '>
        {!course.isPublished &&(
            <Banner 
            label='This course is unpublished. It will not be visible for the students'
            />
        )}
         <div className='flex text-center items-center py-3 justify-center'>
                <div className='flex flex-col  gap-y-2'>
                    <h1 className='text-2xl font-semibold'>
                        Course setup: {course.title}
                    </h1>
                    <span className='text-sm text-center text-slate-700'>
                        Complete all fields({completionText})
                    </span>
                    <div className='flex'>
                <Actions 
                disabled={!isComplete}
                courseId={params.courseId}
                isPublished={course.isPublished} />
                </div>
                </div>
                
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'> 

                 {/* //tu moge zmienic bo teraz mi grid cols na 1 lub 2 troche ucieka na lewoo */}
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm 
                        initialData = {course}
                        courseId = {course.id}
                    
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm 
                     initialData={course}
                     courseId={course.id}
                    
                    
                    />
                    <CategoryForm
                    initialData={course}
                    courseId={course.id}
                    options={categories.map((category)=>({
                    label: category.name,
                    value: category.id
                    })
                    )}
                    />
                    
                </div>
                <div>
                    <div className='spac-y-y6'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <IconBadge icon={ListChecks} />
                                <h2 className='text-xl '>
                                    Course chapters
                                </h2>
                            </div>
                            <ChapterForm 
                            initialData={course}
                            courseId={course.id}
                            />
                            
                        </div>
                        <div>
                            <div className='flex items-center mt-2 gap-2'>
                                <IconBadge icon={CircleDollarSign} />
                                <h2>
                                    Sell your course
                                </h2>

                            </div>
                            <PriceForm
                            initialData={course}
                            courseId={course.id}
                            />


                        </div>
                        <div>
                        <div className='flex items-center mt-2 gap-2'>
                                <IconBadge icon={File} />
                                <h2>
                                    Add attachments for your course
                                </h2>

                            </div>
                            <AttachmentsForm
                            initialData={course}
                            courseId={course.id}
                            />

                        </div>
                    </div>
                </div>
                
                
            </div>           
        </div>
        </>
    )
}

export default CourseIdPage