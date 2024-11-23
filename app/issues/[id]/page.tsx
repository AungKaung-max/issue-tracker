import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import NotFound from "./not-found";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) NotFound();
  return (
    <Grid
      gap="5"
      columns={{
        initial: "1",
        sm: "5",
      }}
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue}></IssueDetails>
      </Box>
      {session && (
        <Box>
          <Flex gap="4" direction="column">
            <AssigneeSelect issue={issue}></AssigneeSelect>
            <EditIssueButton issueId={issue?.id}></EditIssueButton>
            <DeleteIssueButton issueId={issue?.id}></DeleteIssueButton>
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
