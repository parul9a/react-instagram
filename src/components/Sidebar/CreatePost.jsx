import { Box, Tooltip, Link } from '@chakra-ui/react'
import React from 'react'
import { Link  as RouterLink} from 'react-router-dom'
import { CreatePostLogo } from '../../assets/constants'

function CreatePost() {
  return (
    <Tooltip  hasArrow label="createPost" placement='right' ml={1} openDelay={500} display={{base:"block",md: "none"}}>
        <Link as={RouterLink} to={"" || null} display={'flex'} alignItems={"center"} gap={4} _hover={{bg:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10,md:"full"}} justifyContent={{base:"center", md: "flex-start"}}>
            <CreatePostLogo/>
            <Box display={{base:"none", md: "block"}}>
                Create
            </Box>
        </Link>
    </Tooltip>
  )
}

export default CreatePost