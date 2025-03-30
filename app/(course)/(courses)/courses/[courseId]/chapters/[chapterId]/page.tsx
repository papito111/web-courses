
import { getChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { Banner } from "@/components/banner";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";


const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  const isLocked = !chapter?.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  console.log(attachments)
  return (
    <main className="md:w-11/12 max-w- mx-auto px-4 py-6 space-y-8">
      <section>
        <VideoPlayer
          chapterId={params.chapterId}
          title={chapter?.title!}
          courseId={params.courseId}
          nextChapterId={nextChapter?.id}
          playbackid={muxData?.playbackid!}
          isLocked={isLocked}
          completeOnEnd={completeOnEnd}
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4">
          <h1 className="text-3xl font-bold  text-gray-800">Opis rozdziału</h1>
          {!purchase ? (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course?.price!}
            />
          ): <CourseProgressButton courseId={params.courseId}
          chapterId={params.chapterId}
          />}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="prose max-w-none text-xl" dangerouslySetInnerHTML={{ __html: chapter?.description ?? "" }} />
        </div>
      </section>

      <section>
        <Separator className="my-4" />
        <h2 className="text-3xl font-semibold text-center py-3">Załączniki</h2>
        <Separator className="my-4" />
        {attachments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg shadow-lg">
            {attachments.map((attachment) => (
              <a
                className="truncate break-words p-3 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                href={attachment.url}
                key={attachment.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attachment.name}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Brak dostępnych załączników.</p>
        )}
        <Separator className="my-4" />
      </section>
    </main>
  );
};

export default ChapterIdPage;
