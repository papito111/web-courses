import { Categories } from "./_components/categories";
import { db } from "@/lib/db";
import { SearchInput } from "./_components/search-input";
import { GetCourses } from "@/actions/get-courses";
import { NextRequest, NextResponse } from "next/server";
import { auth,getAuth } from "@clerk/nextjs/server";
import { title } from "process";
import { redirect } from "next/navigation";

interface SearchPageProps {
    searchParams: {
        title: string;
        categoryId: string;
    }
}

const SearchPage = async ( { searchParams }: SearchPageProps) => {

    // const res = await fetch(`/api/user`, { cache: "no-store" });
    const { userId } = await auth();
    // if (res.status === 401) {
    //     return <p className="text-red-500">Unauthorized</p>;
    // }

    // if (!res.ok) {
    //     return <p className="text-red-500">Error fetching user data</p>;
    // }

    // const { userId } = await res.json();

    if(!userId){
        return redirect("/")
        // return new NextResponse("unathoarize",{status:401})
    }
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });
    const courses = await GetCourses({
        userId, 
        ...searchParams
    })
    return (
        <div className="p-5 w-full mx-auto">
            <div className="flex items-center mb-4">
                <SearchInput />
            </div>
            <p>{userId}, {searchParams.title}, {searchParams.categoryId}</p>
            <div>
                <Categories items={categories} />
            </div>
            {/* <GetCourses /> */}
        </div>
    );
}

export default SearchPage;