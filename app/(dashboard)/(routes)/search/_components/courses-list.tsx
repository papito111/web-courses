import { Category, Course } from "@prisma/client";


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
            <div>
        {items.map((item)=>(
            <CourseCard
            key = {item.id}
            id = {item.id}
            title = {item.title}
            imageUrl = {item.imageUrl}
            chaptersLength = {item.chapters.length}
            price={item.price}
            progress={item.progress}
            category={item?.category?.name} 
            />
        <div key={item.id}>
            {item.title}
        </div>
        ))}
        </div>
        {items.length === 0 &&(
            <div>
                No courses
            </div>
        )}
        </div>
    )
}