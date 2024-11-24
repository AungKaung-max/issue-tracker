import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

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
    <>
      {/* <LatestIssues></LatestIssues>
      <IssueSummary
        open={open}
        closed={closed}
        inProgress={inProgress}
      ></IssueSummary> */}
      <IssueChart open={open}
        closed={closed}
        inProgress={inProgress}></IssueChart>
    </>
  );
};

export default Home;
