import { Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfileTabs from '../../components/Profile/ProfileTabs'
import ProfilePosts from '../../components/Profile/ProfilePosts'
import useGetProfileByUsername from '../../hooks/useGetProfileByUsername'
import { Link as RouterLink} from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function ProfilePage() {
  const {username} = useParams();
  const {isLoading, userProfile} = useGetProfileByUsername(username);
  
  const userNotFound = !isLoading || !userProfile;
  if(userNotFound){
    <UserNotFound />
  }
  return (
    <Container maxW={'container.lg'} py={5}>
        <Flex flexDirection={'column'} w={'full'} py={10} px={4} mx={'auto'} pl={{base:4, md:10}}>
            {!isLoading && userProfile && <ProfileHeader/>}
            {isLoading && <ProfileHeaderSkeleton/>}
        </Flex>
        <Flex direction={'column'} px={{base: 2, sm:4}} w={'full'} maxW={'auto'} borderTop={'1px solid'} borderColor={'whitwAlpha.300'}>
            <ProfileTabs/>
            <ProfilePosts/>
        </Flex>
    </Container>
  )
}

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};

const UserNotFound = () => {
  return (
    <Flex flexDir={'column'} textAlign={'center'} mx={'auto'}>
      <Text fontSize={"2x1"}>User Not Found</Text>
      <Link as={RouterLink} to={'/'} color={'blue.500'} w={'max-content'} mx={'auto'}>Go Home</Link>
    </Flex>
  )
}