import { Box, Tooltip, Link, Avatar } from '@chakra-ui/react'
import React from 'react'
import { Link  as RouterLink} from 'react-router-dom'
import useAuthStore from '../../store/authStore'

function ProfileLink() {
    const authUser = useAuthStore((state)=> state.user);
  return (
    <Tooltip  hasArrow label="profile" placement='right' ml={1} openDelay={500} display={{base:"block",md: "none"}}>
        <Link as={RouterLink} to={`/${authUser?.username}`} display={'flex'} alignItems={"center"} gap={4} _hover={{bg:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10,md:"full"}} justifyContent={{base:"center", md: "flex-start"}}>
            <Avatar size={"sm"} src={`/${authUser.profilePicUrl}`} name={`${authUser.fullName}`} />
            <Box display={{base:"none", md: "block"}}>
                Profile
            </Box>
        </Link>
    </Tooltip>
  )
}

export default ProfileLink