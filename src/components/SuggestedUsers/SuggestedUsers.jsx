import React from "react";
import SuggestedUser from "./SuggestedUser";
import { Flex, VStack, Text, Box, Link } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import useAuthStore from "../../store/authStore";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

function SuggestedUsers() {
  const authstore = useAuthStore((state) => state.user);
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  if (isLoading) return null;

  return (
    <VStack gap={4} py={8} px={6}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            cursor={"pointer"}
            _hover={{ color: "gray.400" }}
          >
            See All
          </Text>
        </Flex>
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.uid} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        @ 2023 Built by{" "}
        <Link href="/" target="_blank" color={"blue.500"} fontSize={12}>
          As a programmer
        </Link>
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;
