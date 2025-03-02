import { Categories } from "./_components/categories";
import { db } from "@/lib/db";
import { SearchInput } from "./_components/search-input";
import { GetCourses } from "@/actions/get-courses";
import { NextRequest, NextResponse } from "next/server";
import { auth, getAuth } from "@clerk/nextjs/server";
import { title } from "process";
import { redirect } from "next/navigation";
import { CourseList } from "./_components/courses-list";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/")
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const courses = await GetCourses({
        userId,
        title: searchParams.title,
        categoryId: searchParams.categoryId || undefined
    });

    return (
        <div className="p-5 w-full mx-auto">
            <div className="flex items-center mb-6">
                <SearchInput />
            </div>
            <div className="px-3 space-x-2 mb-6 overflow-x-auto whitespace-nowrap">
                <Categories items={categories} />
            </div>
            <div>
                <CourseList items={courses} />
            </div>
        </div>
    );
}

export default SearchPage;