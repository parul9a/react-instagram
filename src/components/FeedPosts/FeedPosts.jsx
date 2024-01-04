import { Container, Skeleton, SkeletonCircle, VStack, Flex, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'

function FeedPosts() {
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    })
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {loading && [0,1,2,3].map((_,index)=> (
            <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
                <Flex gap={2}>
                    <SkeletonCircle size={10}></SkeletonCircle>
                    <VStack>
                        <Skeleton height={'10px'} w={'200px'}></Skeleton>
                        <Skeleton height={'10px'} w={'200px'}></Skeleton>
                    </VStack>
                </Flex>
                <Skeleton w={"full"}>
                    <Box h={'500px'}>Content Wrapped</Box>
                </Skeleton>
            </VStack>
        ))}
        {!loading && (
            <>
                <FeedPost img='/img1.png' username='testing' avatar='/img1.png'/>
                <FeedPost img='/img2.png' username='testing' avatar='/img2.png'/>
                <FeedPost img='/img3.png' username='testing' avatar='/img3.png'/>
                <FeedPost img='/img4.png' username='testing' avatar='/img4.png'/>
            </>
        )}
        
    </Container>
  )
}

export default FeedPosts