import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes/dist/esm/components/callout.js";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const PageCount = Math.ceil(itemCount / pageSize);

  if (PageCount <= 1) return null;
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        {" "}
        Page {currentPage} of {PageCount}{" "}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon></DoubleArrowLeftIcon>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon></ChevronLeftIcon>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === PageCount}>
        <DoubleArrowRightIcon></DoubleArrowRightIcon>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === PageCount}>
        <ChevronRightIcon></ChevronRightIcon>
      </Button>
    </Flex>
  );
};

export default Pagination;
