import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

const Home = async () => {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5" >
        <IssueSummary
          open={open}
          closed={closed}
          inProgress={inProgress}
        ></IssueSummary>
        <IssueChart
          open={open}
          closed={closed}
          inProgress={inProgress}
        ></IssueChart>
      </Flex>
      <LatestIssues></LatestIssues>
    </Grid>
  );
};

export default Home;
