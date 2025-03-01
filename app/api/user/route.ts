import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        return NextResponse.json({ userId });
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}