import exp from "constants"
import { CategoryItem } from "./_components/category-items";
import { Categories } from "./_components/categories";
import { db } from "@/lib/db";


const SearchPage = async () => {

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return (
        <div>
            <Categories items={categories} />
        </div>
    )
}

export default SearchPage;