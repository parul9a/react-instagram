import { Box, Tooltip, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import React from 'react'

import { SearchLogo } from '../../assets/constants'

function Search() {
      const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        <Tooltip  hasArrow label="search" placement='right' ml={1} openDelay={500} display={{base:"block",md: "none"}}>
            <Flex alignItems={"center"} gap={4} _hover={{bg:"whiteAlpha.400"}} borderRadius={6} p={2} w={{base:10,md:"full"}} justifyContent={{base:"center", md: "flex-start"}} onClick={onOpen}>
                <SearchLogo/>
                <Box display={{base:"none", md: "block"}}>
                    Search
                </Box>
            </Flex>
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay/>
            <ModalContent bg={"black"} border={"1px solid grey"} maxW={'400px'}>
                <ModalHeader>Search User</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form >
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='asaprogrammer'  />
                        </FormControl>

                        <Flex w={"full"} justifyContent={"flex-end"}>
                            <Button type='submit' ml={"auto"} size={"sm"} my={4}>
                                Search
                            </Button>
                        </Flex>
                    </form>
                    
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default Search