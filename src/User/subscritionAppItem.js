import React, { useState } from "react";
import {
  Text,
  Image,
  Button,
  HStack,
  Checkbox,
  VStack,
  Card,
} from "@chakra-ui/react";

export const PlanType = {
  MONTH: "month",
  YEAR: "year",
};

const SubscritionAppItem = ({ ottApp, handleAddSubscription }) => {
  const [planType, setPlanType] = useState(PlanType.MONTH);

  const handlePlanTypeChange = (e, type) => {
    if (type === PlanType.MONTH) {
      if (e.target.checked) {
        setPlanType(PlanType.MONTH);
      } else {
        setPlanType(PlanType.YEAR);
      }
    } else {
      if (e.target.checked) {
        setPlanType(PlanType.YEAR);
      } else {
        setPlanType(PlanType.MONTH);
      }
    }
  };
  return (
      <Card key={ottApp.id} borderRadius="md"  p={4}>
        <VStack>
          <Image
            src={ottApp.image_link}
            alt={ottApp.name}
            boxSize="80px"
            mx="auto"
            mb={4}
            borderRadius="full"
          />
          <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray.800">
            {ottApp.name}
          </Text>
          <HStack gap={4}>
            <VStack align={"start"} gap={0}>
              <Text>Monthly</Text>
              <Text mb={3}>₹{ottApp.monthly_charges}</Text>
              <Checkbox
                isChecked={planType === PlanType.MONTH}
                onChange={(e) => handlePlanTypeChange(e, PlanType.MONTH)}
                size="md"
                colorScheme="green"
              >
                Monthly
              </Checkbox>
            </VStack>
            <VStack align={"start"} gap={0}>
              <Text>Yearly</Text>
              <Text mb={3}>₹{ottApp.yearly_charges}</Text>
              <Checkbox
                isChecked={planType === PlanType.YEAR}
                onChange={(e) => handlePlanTypeChange(e, PlanType.YEAR)}
                size="md"
                colorScheme="green"
              >
                Yearly{" "}
              </Checkbox>
            </VStack>
          </HStack>

          <Button
            colorScheme="green"
            mt={3}
            onClick={() => {
              const userOttApp = { ...ottApp, planType: planType };
              handleAddSubscription(userOttApp);
            }}
            w={"full"}
          >
            Add
          </Button>
        </VStack>
      </Card>
    
  );
};

export default SubscritionAppItem;
