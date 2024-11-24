import { Flex } from '@radix-ui/themes'
import { Text } from '@radix-ui/themes/dist/esm/components/callout.js'
import React from 'react'

interface Props {
    itemCount : number,
    pageSize : number ,
    currentPage : number 
}

const Pagination = ({itemCount , pageSize , currentPage}: Props) => {
    const PageCount = Math.ceil(itemCount / pageSize );
  return (
        <Flex>
            <Text> Page {currentPage} of {PageCount} </Text>
        </Flex>
  )
}

export default Pagination
