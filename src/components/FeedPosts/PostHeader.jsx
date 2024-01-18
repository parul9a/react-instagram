import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";

function PostHeader({ post, userProfile }) {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    post.createdBy
  );
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        {userProfile ? (
          <Link to={`/${userProfile.username}`}>
            <Avatar
              src={userProfile.profilePicUrl}
              alt="use profile pic"
              size="sm"
            ></Avatar>
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}
        {userProfile ? (
          <Link to={`/${userProfile?.username}`}>
            <Flex fontSize={12} fontWeight={"bold"} gap={2}>
              {userProfile.username}
              <Box color={"gray.500"}> {timeAgo(post.createdAt)}</Box>
            </Flex>
          </Link>
        ) : (
          <Skeleton w={"100px"} h={"10px"} />
        )}
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
}

export default PostHeader;
