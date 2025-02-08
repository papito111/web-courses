
import { useAuth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import ChapterDescriptionForm from './_components/chapter-description-form';
import ChapterTitle from './_components/chapter-title-form';
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
      <div>
         {params.courseId}
         <ChapterTitle 
         initialData={chapter}
         chapterId={params.chapterId}
         />
      </div>
    )
    }

export default EditChapterPage;