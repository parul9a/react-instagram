import {
  Container,
  Skeleton,
  SkeletonCircle,
  VStack,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import useGetFeedPost from "../../hooks/useGetFeedPost";

function FeedPosts() {
  const { isLoading, posts } = useGetFeedPost();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10}></SkeletonCircle>
              <VStack>
                <Skeleton height={"10px"} w={"200px"}></Skeleton>
                <Skeleton height={"10px"} w={"200px"}></Skeleton>
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>Content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={"md"} color={"red.400"}>
            Looks Like you don't have any new posts
          </Text>
        </>
      )}
    </Container>
  );
}

export default FeedPosts;
