"use client";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes/dist/esm/components/callout.js";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const PageCount = Math.ceil(itemCount / pageSize);    
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page:number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?'+ params.toString())
  }
  if (PageCount <= 1) return null;
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        {" "}
        Page {currentPage} of {PageCount}{" "}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon onClick={() => changePage(1)}></DoubleArrowLeftIcon>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon onClick={() => changePage( currentPage - 1)}></ChevronLeftIcon>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === PageCount}>
        <DoubleArrowRightIcon onClick={() => changePage(PageCount)}></DoubleArrowRightIcon>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === PageCount}>
        <ChevronRightIcon onClick={() => changePage(currentPage + 1)}></ChevronRightIcon>
      </Button>
    </Flex>
  );
};

export default Pagination;
