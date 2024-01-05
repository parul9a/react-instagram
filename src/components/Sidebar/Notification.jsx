import { Box, Tooltip, Link } from '@chakra-ui/react'
import React from 'react'
import { Link  as RouterLink} from 'react-router-dom'
import { NotificationsLogo } from '../../assets/constants'

function Notification() {
  return (
    <Tooltip  hasArrow label="notification" placement='right' ml={1} openDelay={500} display={{base:"block",md: "none"}}>
        <Link as={RouterLink} to={"" || null} display={'flex'} alignItems={"center"} gap={4} _hover={{bg:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10,md:"full"}} justifyContent={{base:"center", md: "flex-start"}}>
            <NotificationsLogo/>
            <Box display={{base:"none", md: "block"}}>
                Notification
            </Box>
        </Link>
    </Tooltip>
  )
}

export default Notification