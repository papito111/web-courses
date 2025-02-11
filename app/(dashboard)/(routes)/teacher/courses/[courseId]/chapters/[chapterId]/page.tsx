
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

import { IconBadge } from '@/components/icon-badge';
import ChapterAccessForm from './_components/chapter-access-form';
import ChapterVideoForm from './_components/chapter-video-form';

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
    }
    )
    return(
      <div className='p-5 w-9/12'>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
          <Link className="flex items-center text-base hover:opacity-50" href={`/teacher/courses/${params.courseId}`}>
          
         <ArrowLeft className='h-4 w-4 mr-2'/>
         Back to chapter setup
         </Link >
         <div>
          <h1 className='font-bold text-3xl py-2 text-center'>Chapter Creation</h1>
         </div>
         <div>
          
         <div className='flex mt-5 items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>
                            Customize your chapter
                        </h2>
                    </div>
                    
         <ChapterTitle
         initialData={chapter}
         chapterId={params.chapterId}
         courseId={params.courseId}
         />
         <ChapterDescriptionForm 
         initialData={chapter}
         chapterId={params.chapterId}
         courseId={params.courseId}
         />
         </div>
         <div>
         <div className='flex mt-5 items-center gap-x-2'>
                        <IconBadge icon={Eye} />
                        <h2 className='text-xl'>
                            Access Settings
                        </h2>
                    </div>
         </div>
         <div>
          <ChapterAccessForm 
          initialData={chapter}
          chapterId={params.chapterId}
          courseId={params.courseId}/>
         </div>
         <div>
         <div className='flex mt-5 items-center gap-x-2'>
                        <IconBadge icon={Video} />
                        <h2 className='text-xl'>
                            Add your Video
                        </h2>
                    </div>
                    <div>
          <ChapterVideoForm 
          initialData={chapter}
          courseId={params.courseId}
          />
         </div>
          </div>
        </div>
        <div>

        </div>

        </div>
      </div>
    )
    }

export default EditChapterPage;