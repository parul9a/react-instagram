import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import useLogin from "../../hooks/useLogin"

function Login() {
    const [inputs, setInputs] = useState({
        email:'',
        password: '',
        confirmPassword: ''
    })
    const {login, loading, error} = useLogin();
  return (
    <>
        <Input type='email' placeholder='Email' fontSize={14} size={'sm'} value={inputs.email} onChange={(e)=> setInputs({...inputs, email: e.target.value})} />
        <Input type='password' placeholder='Password' fontSize={14} size={'sm'} value={inputs.password} onChange={(e)=> setInputs({...inputs, password: e.target.value})}/>
        {error && (
            <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                <AlertIcon fontSize={12}/>
                {error.message}
            </Alert>
        )}
        <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} onClick={() => login(inputs)} isLoading={loading}>Login</Button>
    </>
  )
}

export default Login