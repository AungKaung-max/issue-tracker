import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.user.findMany({
        orderBy:{
            name:"asc"
        }
    });
    return NextResponse.json(data, { status: 200 })
}