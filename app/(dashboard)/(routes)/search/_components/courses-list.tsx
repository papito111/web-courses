import { Category, Course } from "@prisma/client";
import CourseCard from "./course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id: string}[];
    progress: number | null;
};

interface CourseListProps {
    items: CourseWithProgressWithCategory[];
}

export const CourseList = ({items}: CourseListProps) => {

    return(
        <div>
            <div className="grid sm-grid-cold-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {items.map((item)=>(
            <CourseCard
            key = {item.id}
            id = {item.id}
            title = {item.title}
            imageUrl = {item.imageUrl!}
            chaptersLength = {item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!} 
            />
        
        ))}
        </div>
        {items.length === 0 &&(
            <div className="text-center text-gray-500 mt-4">
                <p className="text-lg">Brak dostępnych kursów</p>
                <p className="text-sm">Wróć tu za jakiś czas, lub sprawdź inne kategorie.</p>
            </div>
        )}
        </div>
    )
}