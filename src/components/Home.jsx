import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <Image w={"full"} h={"full"} objectFit={"cover"} src={"https://images.pexels.com/photos/14902678/pexels-photo-14902678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}/>

      <Text fontSize={"6xl"} textAlign={"center"} fontWeight={'thin'} color={"whiteAlpha.700"} bgColor={'blackAlpha.900'}>Crypto</Text>
    </Box>
  )
}

export default Home