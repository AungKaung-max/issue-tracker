import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 401, message: "Unauthorized access" }, { status: 401 });
    const body = await request.json();
    const validate = patchIssueSchema.safeParse(body);
    if (!validate.success) return NextResponse.json(validate.error.format(), { status: 400 })

    const { assignToUserId, title, description } = body;
    if (assignToUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: assignToUserId
            }
        })
        if (!user) return NextResponse.json({ error: "Invalid User" }, { status: 400 })
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) return NextResponse.json({ error: "Invalid Id" }, { status: 404 })

    const updateIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title,
            description,
            assignToUserId
        }
    })

    return NextResponse.json(updateIssue, { status: 201 })

}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 401, message: "Unauthorized access" }, { status: 401 });
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) return NextResponse.json({ error: "Invalid Id" }, { status: 404 })
    await prisma.issue.delete({
        where: { id: issue.id }
    })

    return NextResponse.json({});
}