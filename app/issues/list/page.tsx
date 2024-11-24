import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueAction from "./IssueAction";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery
}
const CreateIssue = async ({ searchParams }: Props) => {
  const statuse = Object.values(Status);
  const status = statuse.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "desc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });
  return (
    <>
      <Flex direction='column' gap="3">
      <IssueAction></IssueAction>
      <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      ></Pagination>
      </Flex>
    </>
  );
};

export const dynamic = "force-dynamic";

export default CreateIssue;
