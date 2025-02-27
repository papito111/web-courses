import { Categories } from "./_components/categories";
import { db } from "@/lib/db";
import { SearchInput } from "./_components/search-input";

const SearchPage = async () => {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return (
        <div className="p-5 w-full mx-auto">
            <div className="flex items-center mb-4">
                <SearchInput />
            </div>
            <div>
                <Categories items={categories} />
            </div>
        </div>
    );
}

export default SearchPage;