import { IssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 401, message: "Unauthorized access" }, { status: 401 });
    const body = await request.json();
    const validate = IssueSchema.safeParse(body);

    if (!validate.success)
        return NextResponse.json(validate.error.format(), { status: 400 })
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    });
    return NextResponse.json(newIssue, { status: 201 })
}