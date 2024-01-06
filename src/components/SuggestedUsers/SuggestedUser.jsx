import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import React, {useState} from 'react'
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from '../../store/authStore';

function SuggestedUser({user, setUser}) {
    const {isUpdating, isFollowing, handleFollowUser} = useFollowUser(user.uid);
    const authUser = useAuthStore((state)=> state.user);
    const onFollowUser = async() => {
        await handleFollowUser();
		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower.uid !== authUser.uid)
				: [...user.followers, authUser],
		});
        
    }
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
        <Flex alignItems={'center'} gap={2}>
            <Avatar src={user.profilePicUrl} name={user.fullName} size={'md'}/>
            <VStack spacing={2} alignItems={'flex-start'}>
                <Box fontSize={12} fontWeight={'bold'}>{user.fullName}</Box>
                <Box fontSize={11} color={'gray.500'}>{user.followers.length} followers</Box>
            </VStack>
        </Flex>
        {authUser.uid !== user.uid && (
            <Button fontSize={13} bg={'transparent'} color={'blue.400'} p={0} h={'max-content'} fontWeight={'medium'} cursor={'pointer'} _hover={{'color':'white'}} onClick={onFollowUser} isLoading={isUpdating}>
                {isFollowing ? 'Unfollow': 'Follow'} 
            </Button>
        )}
    </Flex>
  )
}

export default SuggestedUser