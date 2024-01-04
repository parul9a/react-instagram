import { Flex, Box, calc, Spinner } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';

function PageLayout({children}) {
    const {pathname} = useLocation();
    const [user, loading, error] = useAuthState(auth);
    const canRenderSidebar = pathname !== '/auth' && user;
    const canRenderNavbar = !user && !loading && pathname !== '/auth';
    const checkUserIsAuth = !user && loading;
    if (checkUserIsAuth) return <PageLayoutSpinner/>
    return (
      <Flex flexDir={canRenderNavbar?'column':'row'}>
          {/* Sidebar on Left */}
          {canRenderSidebar ? (
              <Box w={{base:"70px",md:"240px"}}>
              <Sidebar/>
          </Box>
          ): null}
          
            {/* Show Navbar */}
            {canRenderNavbar? <Navbar/> : null}


          {/* Content on Right */}
          <Box flex={1} w={{base: "calc(100% - 70px)", md: "calc(100% - 240px)"}} mx={'auto'}>{children}</Box>
      </Flex>
    )
}

export default PageLayout

const PageLayoutSpinner = ()=> {
  return (
    <Flex>
      <Spinner></Spinner>
    </Flex>
  );
}