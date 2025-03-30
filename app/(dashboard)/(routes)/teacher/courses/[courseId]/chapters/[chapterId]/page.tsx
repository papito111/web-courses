
import { useAuth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import ChapterDescriptionForm from './_components/chapter-description-form';
import ChapterTitle from './_components/chapter-title-form';
import { ArrowLeft, Camera, CameraIcon, Video } from 'lucide-react';
import Link from 'next/link';
import { LayoutDashboard, Eye } from 'lucide-react';
import { ChapterActions } from './_components/chapter-actionx';
import { Chapter } from '@prisma/client';
import { IconBadge } from '@/components/icon-badge';
import ChapterAccessForm from './_components/chapter-access-form';
import ChapterVideoForm from './_components/chapter-video-form';

import { Banner } from '@/components/banner';
import { useRouter } from 'next/navigation';

const EditChapterPage = async ({ params }:
    {
        params: { courseId: string; chapterId: string }
    }) => {
    const reqHeaders = headers();
    // const { userId } = getAuth(Request);

    // const { userId } = auth({ headers: reqHeaders });
    // console.log(userId)


    const chapter = await db.chapter.findUnique({
      where:{
        id:params.chapterId,
        courseId: params.courseId
      },
      include: {
        muxData: true
      }
    },
  )
 
    const requiredFields = [
      chapter?.title,
      chapter?.description,
      chapter?.videoUrl,
      

    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText =`(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);

    
    return (
      <div>
        {!chapter?.isPublished && (
          <Banner 
        label=' This chapter is unpublished. It will note be visible in the course'
        
        />
        )}
      
      <div className='p-1 w-11/12 mx-auto'>
        
        <div className='flex items-center justify-between py-2'>
          <Link className="flex items-center text-base hover:opacity-50" href={`/teacher/courses/${params.courseId}`}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to chapter setup
          </Link>
        </div>
        <div>
          <h1 className='font-bold text-3xl py-2 text-center'>Chapter Creation</h1>
        
        <div className='text-center italic text-sm py-2'>
          Complete all fields {completionText}
        </div>
        <ChapterActions 
          disabled={!isComplete}
          courseId = {params.courseId}
          chapterId = {params.chapterId}
          isPublished = {chapter?.isPublished ?? false}

          />
        
        
        <div>
          
        </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <div className='flex mt-5 items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard} />
              <h2 className='text-xl'>
                Customize your chapter
              </h2>
            </div>
            <ChapterTitle
              initialData={chapter ?? { title: '' }}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <ChapterDescriptionForm
              initialData={chapter ?? { id: '', title: '', description: null, isPublished: false, createdAt: new Date(), updatedAt: new Date(), courseId: '', videoUrl: null, position: 0, isFree: false }}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <div className='flex mt-5 items-center gap-x-2'>
              <IconBadge icon={Eye} />
              <h2 className='text-xl'>
                Access Settings
              </h2>
            </div>
            <ChapterAccessForm
              initialData={chapter ?? { id: '', title: '', description: null, isPublished: false, createdAt: new Date(), updatedAt: new Date(), courseId: '', videoUrl: null, position: 0, isFree: false }}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
          <div>
            <div className='flex mt-5 items-center gap-x-2'>
              <IconBadge icon={Video} />
              <h2 className='text-xl'>
                Add your Video
              </h2>
            </div>
            <ChapterVideoForm
              initialData={chapter ?? { id: '', title: '', description: null, isPublished: false, createdAt: new Date(), updatedAt: new Date(), courseId: '', videoUrl: null, position: 0, isFree: false, muxData: null }}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default EditChapterPage;