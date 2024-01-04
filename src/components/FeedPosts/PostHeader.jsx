import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function PostHeader({username, avatar}) {
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar src={avatar} alt='use profile pic' size="sm"></Avatar>
            <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                {username}
                <Box color={"gray.500"}>.1w</Box>
            </Flex>
        </Flex>
        <Box cursor={"pointer"}>
            <Text fontSize={12} color={"blue.500"} fontWeight={"bold"} _hover={{color:"white"}}>Unfollow</Text>
        </Box>
    </Flex>
  )
}

export default PostHeader