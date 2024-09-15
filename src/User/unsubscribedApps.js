import React from "react";
import { Box,  Grid, Text,GridItem} from "@chakra-ui/react";
import SubscritionAppItem from "./subscritionAppItem";

const UnsubscribedApps = ({ unsubscribedApps, handleAddSubscription }) => {
  return (
    <Box my={8} p={4}>
      <Text fontSize="2xl" fontWeight="semibold" mb={4} color="teal.600">
        Apps you might want to subscribe
      </Text>

      <Grid templateColumns={{base : "1fr", sm : "repeat(2,1fr)", md : "repeat(3,1fr)", lg: "repeat(4,1fr)",xl:"repeat(5,1fr)"}} gap={4}>
        {unsubscribedApps.length > 0 ? (
          unsubscribedApps.map((ottApp) => (
            <GridItem key={ottApp.id}>
            <SubscritionAppItem
              ottApp={ottApp}
              handleAddSubscription={handleAddSubscription}
            />
            </GridItem>
          ))
        ) : (
          <Text fontSize="lg" color="gray.600" mt={6}>
            You've subscribed to all available apps!
          </Text>
        )}
      </Grid>
    </Box>
  );
};

export default UnsubscribedApps;
