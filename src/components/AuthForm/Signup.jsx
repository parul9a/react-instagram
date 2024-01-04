import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignupWithEmailAndPassword from '../../hooks/useSignupWithEmailAndPassword';

function Signup() {
    const [inputs, setInputs] = useState({
        fullName:'',
        username:'',
        email:'',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const {loading, error, signup} = useSignupWithEmailAndPassword();
  return (
    <>
        <Input type='email' placeholder='Email' fontSize={14} size={'sm'} value={inputs.email} onChange={(e)=> setInputs({...inputs, email: e.target.value})} />
        <Input type='text' placeholder='Username' fontSize={14} size={'sm'} value={inputs.username} onChange={(e)=> setInputs({...inputs, username: e.target.value})} />
        <Input type='text' placeholder='Full Name' fontSize={14} size={'sm'} value={inputs.fullName} onChange={(e)=> setInputs({...inputs, fullName: e.target.value})} />
        <InputGroup>
            <Input type={showPassword?'text':'password'} placeholder='Password' size={'sm'} fontSize={14} value={inputs.password} onChange={(e)=> setInputs({...inputs, password: e.target.value})}/>
            <InputRightElement h={'full'}>
                <Button variant={'ghost'} size={'sm'} onClick={()=> setShowPassword(!showPassword)}>
                    {showPassword? (<ViewIcon />): <ViewOffIcon />}
                </Button>
            </InputRightElement>
        </InputGroup>
        {error && (
            <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                <AlertIcon fontSize={12}/>
                {error.message}
            </Alert>
        )}
        <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} onClick={()=> signup(inputs)} isLoading={loading}>Sign Up</Button>
    </>
  )
}

export default Signup