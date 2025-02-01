import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAuth } from "@clerk/nextjs/server";
const f = createUploadthing();

const getauth = (req: Request) => ({ id: "fakeId" }); 

const handleAuth = () => {
  const { userId } = getAuth(req);
  if (!userId) throw new Error("Unauthorized");
  return {userId};
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }})
    // .middleware(()=> handleAuth())
    .onUploadComplete(() => {}),

  courseAttachment: f(["text","image","video","audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() =>{}),
    
  chapterVideo: f({video: {maxFileCount: 1, maxFileSize:"64GB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
 
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
