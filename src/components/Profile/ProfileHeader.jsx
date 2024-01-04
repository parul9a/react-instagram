import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useProfileStore from '../../store/useProfileStore'
import useAuthStore from '../../store/authStore';
import EditProfileModal from './EditProfileModal';

function ProfileHeader() {
    const {userProfile} = useProfileStore();
    const authUser = useAuthStore((state)=> state.user);
    const userVisitingOwunProfile = authUser && authUser.username === userProfile.username;
    const userVisitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex gap={{base:4, sm: 10}} py={10} direction={{base:'column', sm: 'row'}}>
        <AvatarGroup size={{ base:'xl', md:'2xl'}} justifySelf={'center'} alignSelf={'flex-start'} mx={'auto'}>
            <Avatar  src={userProfile.profilePicUrl} alt='as a programmer'/>
        </AvatarGroup>
        
        <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
            <Flex gap={4} direction={{base: 'column', sm: 'row'}}>
                <Text>{userProfile.username}</Text>
                {userVisitingOwunProfile && (
                    <Flex alignItems={'center'} gap={4} justifyContent={'center'}>
                        <Button bg={'white'} color={'black'} size={{base:'xs', md:'sm'}} _hover={{bg:'whiteAlpha.800'}} onClick={onOpen}>Edit Profile</Button>
                    </Flex>
                )}
                {userVisitingAnotherProfileAndAuth && (
                    <Flex alignItems={'center'} gap={4} justifyContent={'center'}>
                        <Button bg={'blue.500'} color={'white'} size={{base:'xs', md:'sm'}} _hover={{bg:'blue.400'}}>Follow</Button>
                    </Flex>
                )}
                
            </Flex>

            <Flex alignItems={'center'} gap={{base:2, sm:'4'}}>
                <Text fontSize={{base:'xs',md: 'sm'}}><Text as='span' fontWeight={'bold'} mr={1}>{userProfile.posts.length}</Text>Posts</Text>
                <Text fontSize={{base:'xs',md: 'sm'}}><Text as='span' fontWeight={'bold'} mr={1}>{userProfile.followers.length}</Text>followers</Text>
                <Text fontSize={{base:'xs',md: 'sm'}}><Text as='span' fontWeight={'bold'} mr={1}>{userProfile.following.length}</Text>Following</Text>
            </Flex>
            <Flex alignItems={'center'} gap={4}>
                <Text fontSize={'sm'} fontWeight={'bold'}>{userProfile.fullName}</Text>
            </Flex>
            <Text fontSize={'sm'}>{userProfile.bio}</Text>
        </VStack>
        {isOpen && <EditProfileModal isOpen={isOpen} onClose={onClose}/>}
    </Flex>
  )
}

export default ProfileHeader