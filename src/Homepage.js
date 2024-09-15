// import React,{useState} from 'react'
// import {Box, Button, Flex, Heading} from "@chakra-ui/react"
// import Signup from './signup'
// import Signin from './signin';
// function Homepage() {


//     const [isSignin,setIsSignin] = useState(true);

//     const handleClick = ()=>{
//         setIsSignin((isSignin)=> !isSignin)
//     }

//   return (
//     <Box>
//         <Flex mb={5} mt={4} justifyContent={"center"}>
//             <Heading textDecoration={"underline"}>
//                 Welcome to Subs!!
//             </Heading>
//         </Flex>
//         <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
//             {isSignin ? <Signin/> : <Signup setIsSignin={setIsSignin}/>}
//             <Button onClick={handleClick} bgColor={"white"} _hover={{bgColor : "white",textDecoration : "underline"}}>{isSignin ? "Create an account" : "Already have an account? Sign In"}
//             </Button>
//         </Flex>
//     </Box>
//   )
// }

// export default Homepage

import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading,Text } from "@chakra-ui/react";
import Signup from './signup';
import Signin from './signin';

function Homepage() {
  const [isSignin, setIsSignin] = useState(
    () => JSON.parse(localStorage.getItem('isSignin')) ?? true
  );

  const handleClick = () => {
    setIsSignin((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem('isSignin', JSON.stringify(isSignin));
  }, [isSignin]);

  return (
    <Box bgGradient="linear(to-r, teal.500, green.500)" minHeight="100vh" py={8}>
      <Flex justifyContent="center" alignItems="center" flexDir="column" px={4}>
        {/* Header Section */}
        <Heading
          as="h1"
          textAlign="center"
          textDecoration="underline"
          fontWeight="semibold"
          color="white"
          fontSize={{ base: "2xl", md: "4xl" }}
          mb={10}
          letterSpacing="wider"
        >
          Subscription Tracker
        </Heading>

        {/* Form Section */}
        <Box
          w={{ base: "90%", md: "60%", lg: "40%" }}
          bg="white"
          p={8}
          borderRadius="md"
          shadow="lg"
          transition="all 0.3s"
          _hover={{ shadow: "2xl" }}
        >
          {isSignin ? <Signin /> : <Signup setIsSignin={setIsSignin} />}
        </Box>

        {/* Toggle Button */}
        <Button
          onClick={handleClick}
          bgColor="teal.600"
          color="white"
          mt={4}
          px={6}
          py={4}
          fontSize="lg"
          borderRadius="full"
          transition="all 0.3s"
          _hover={{ bgColor: "teal.700", transform: "scale(1.05)" }}
        >
          {isSignin ? "Create an Account" : "Already have an account? Sign In"}
        </Button>

        {/* Additional Text (Optional) */}
        <Text color="white" mt={4} fontSize="md" textAlign="center">
          Easily manage and track all your subscriptions in one place!
        </Text>
      </Flex>
    </Box>

  );
}

export default Homepage;
