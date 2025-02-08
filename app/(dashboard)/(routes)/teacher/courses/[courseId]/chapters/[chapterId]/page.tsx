
import { useAuth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import ChapterDescriptionForm from './_components/chapter-description-form';
import ChapterTitle from './_components/chapter-title-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
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
         <ChapterTitle
         initialData={chapter}
         chapterId={params.chapterId}
         />
        </div>
        </div>
      </div>
    )
    }

export default EditChapterPage;