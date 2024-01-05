import { Box, Flex, Image, VStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    
    const navigate = useNavigate();
    const handleAuth = () => {
        if(!inputs.email || !inputs.password ){
            alert("Please enter the fields");
            return;
        }
        navigate("/");
    }
  return (
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src='/logo.png' alt='Instagram Logo' h={24} cursor={"pointer"}/>

            {isLogin? <Login/>: <Signup/>}

            <Flex alignItems={"center"} justifyContent={"center"} my={4} w={"full"} gap={1}>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>
                <Text mx={1} color={"white"}>OR</Text>
                <Box flex={2} h={"1px"} bg={"gray.400"}/>
            </Flex>
            
            <GoogleAuth prefix={isLogin? "Log in": "Sign up"}/>
            <Box border={"1px solid gray"} borderRadius={4} padding={3}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={12}>
                        {isLogin? "Don't have an account?": "Already have an account?"}
                    </Box>
                    <Box onClick={()=> setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        {isLogin? "Sign Up": "Log In"}
                    </Box>
                </Flex>
            </Box>
        </VStack>
    </Box>
  )
}

export default AuthForm