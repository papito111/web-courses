const { PrismaClient } = require ("@prisma/client");
const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Data science" },
                { name: "Systemy wizyjne" },
                { name: "PLC" },
                { name: "Przemysł 4.0" },
            ]
        })
        console.log("Success");
    } catch (error) {
        console.log("error seeding categories to db", error)
    } finally {
        await database.$disconnect();
    }
}

main();