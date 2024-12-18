import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue | null }) => {
  return (
    <div>
      <Heading> {issue?.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue?.status || "CLOSED"} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkdown>{issue?.description || ''}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
