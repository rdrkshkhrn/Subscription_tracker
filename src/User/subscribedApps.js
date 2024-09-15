import React from "react";
import { Box, Flex, Text, Image, Button,Grid,GridItem, Tag, VStack, HStack, Card, Divider } from "@chakra-ui/react";
import { PlanType } from "./subscritionAppItem";

const SubscribedApps = ({ subscribedApps, handleRemoveSubscription, totalMonthlyCost, totalYearlyCost }) => {
  return (
    <Box mt={4} p={4}>
      <Flex flexDirection={{base:'column-reverse', sm:'row'}} gap={4}  justifyContent={'space-between'} mb={6} alignItems={{base:'flex-start',sm:'center'}}>
      <Text fontSize="2xl" fontWeight="semibold" color="teal.600">Subscribed apps</Text>
        <Card w={{base:'full', sm:'auto'}} justifyContent={"flex-start"} p={4}>
          <VStack alignItems="flex-start">
            <Text fontWeight={"semibold"} fontSize={'18px'}>Cost</Text>
            <Divider mb={2}/>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Text mr={2.5}>Annual app </Text>
              <Tag>₹{totalYearlyCost}</Tag>
            </HStack>
            <HStack  w={'full'} justifyContent={'space-between'}>
              <Text>Monthly app</Text>
              <Tag>₹{totalMonthlyCost}</Tag>
            </HStack>
          </VStack>
        </Card>
      </Flex>



      <Grid templateColumns={{base: "1fr",sm:"repeat(2,1fr)", md:'1fr 1fr 1fr', lg: "repeat(4,1fr)",xl:"repeat(5,1fr)"}}  gap={4}>
        {subscribedApps.length > 0 ? (
          subscribedApps.map((app, index) => (
            <GridItem
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              shadow="lg"
              textAlign="center"
              mb={2}
              _hover={{ transform: "scale(1.05)", transition: "all 0.3s ease" }}
              bg={app.planType === PlanType.MONTH ? "blue.50" : "green.50"}
            >
              <Image
                src={app.image_link}
                alt={app.name}
                boxSize="80px"
                mx="auto"
                mb={4}
                borderRadius="full"
              />
              <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray.800">
                {app.name}
              </Text>

              {app.planType === PlanType.MONTH ? (
                <Text fontSize="md" color="blue.600" mb={2}>
                  Monthly Charges: <Text as="span" fontWeight="bold">₹{app.monthly_charges}</Text>
                </Text>
              ) : (
                <Text fontSize="md" color="green.600" mb={2}>
                  Annual Charges: <Text as="span" fontWeight="bold">₹{app.yearly_charges}</Text>
                </Text>
              )}

              <Button
                colorScheme="red"
                mt={4}
                w="full"
                _hover={{ bg: "red.600", color: "white" }}
                onClick={() => handleRemoveSubscription(app)}
              >
                Remove
              </Button>
            </GridItem>
          ))
        ) : (
          <Text fontSize="lg" color="gray.600" mt={6}>No subscribed apps found.</Text>
        )}
      </Grid>
    </Box>
  );
};

export default SubscribedApps;
