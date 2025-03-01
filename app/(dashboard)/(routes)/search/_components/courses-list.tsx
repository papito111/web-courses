import { Category, Course } from "@prisma/client";


type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: {id: string}[];
    progress: number | null;
};

interface CourseListProps {
    items: CourseWithProgressWithCategory
}

export const CourseList = () => {

    return(
        <div>
        {items.map((item)=>
        <div key={item.id}>
            {item.title}
        </div>
        )}
        </div>
    )
}