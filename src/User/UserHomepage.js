import React, { useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Ott from "../Ott.json";
import { UserContext } from "../UserContext";
import SubscribedApps from "./subscribedApps";
import UnsubscribedApps from "./unsubscribedApps";
import { Box, Flex, Heading,Button, HStack } from "@chakra-ui/react";
import { PlanType } from "./subscritionAppItem";
import { CgProfile } from "react-icons/cg";
function UserHomepage() {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [unsubscribedApps,setUnSubscribedApps] = useState([]);
  const [totalMonthlyCost,setTotalMonthlyCost] = useState(0);
  const [totalYearlyCost,setTotalYearlyCost] = useState(0);
  const { user,setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
      if (user) {
        const subscriptionTable = JSON.parse(
          localStorage.getItem("subscriptionTable")
        );
        if(subscriptionTable) {

          const userSubscription = subscriptionTable.find(
            (sub) => sub.id === user.id
          );

          setSubscriptionData(userSubscription);

          if(userSubscription){
            const subscribedAppsNames = userSubscription.subscribedApps.map(app => app.name);

            const filteredApps = Ott.filter((ottApp) => !subscribedAppsNames.includes(ottApp.name))
            setUnSubscribedApps(filteredApps);

            if(userSubscription.subscribedApps.length>0){
              let monthly_total = 0,yearly_total  = 0;

              for(let i=0;i<userSubscription.subscribedApps.length;i++){

              if(userSubscription.subscribedApps[i].planType === PlanType.MONTH){
                monthly_total += userSubscription.subscribedApps[i].monthly_charges;
                
              }else{
                yearly_total += userSubscription.subscribedApps[i].yearly_charges;
              }
            }
              setTotalMonthlyCost(monthly_total);
              setTotalYearlyCost(yearly_total);
            }
          }
        }
      }

  }, [user, setSubscriptionData]); 

  const handleAddSubscription = (ottApp) => {
    if (subscriptionData) {
      const updatedSubscriptions = [
        ...subscriptionData.subscribedApps,
        ottApp
      ];

      setSubscriptionData((prevData) => ({
        ...prevData,
        subscribedApps: updatedSubscriptions
      }));

      setUnSubscribedApps((prevApps) =>
        prevApps.filter((app) => app.id !== ottApp.id)
      );
      if(ottApp.planType === PlanType.MONTH){
        setTotalMonthlyCost((prevCost) => prevCost + ottApp.monthly_charges);
      }else{
        setTotalYearlyCost((prevCost) => prevCost + ottApp.yearly_charges);
      }


      updateLocalStorage(updatedSubscriptions);
    }
  };

  const handleRemoveSubscription = (ottApp) => {

    if(subscriptionData){

      const updatedSubscriptions = subscriptionData.subscribedApps.filter((app) => app.id !== ottApp.id);
      setSubscriptionData((prevData) => ({
        ...prevData,
        subscribedApps : updatedSubscriptions
      }));

      setUnSubscribedApps((prevApps) => [...prevApps,ottApp]);

      if(ottApp.planType === PlanType.MONTH){
        setTotalMonthlyCost((prevCost) => prevCost - ottApp.monthly_charges);
      }else{
        setTotalYearlyCost((prevCost) => prevCost - ottApp.yearly_charges);
      }

      updateLocalStorage(updatedSubscriptions);
    }
  }

  const updateLocalStorage = (updatedSubscriptions) =>{
    const subscriptionTable = JSON.parse(localStorage.getItem("subscriptionTable"));

    const updatedTable = subscriptionTable.map((sub)=> sub.id === user.id ? {...sub,subscribedApps : updatedSubscriptions} : sub);
    
    localStorage.setItem("subscriptionTable",JSON.stringify(updatedTable));
  };

  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem("currentUser");

    navigate("/");
  };

  return (
    <Box>
    {subscriptionData && (
      <Box mb={4}>
        <Flex justifyContent={"space-between"} bgColor={"cyan.900"} textColor={"white"} alignItems={"center"} py={3} px={4}>
        <HStack>
        <CgProfile size={30} />
          <Heading fontWeight={"normal"} my={2} fontSize={"xl"}>
            {user.name}
          </Heading>
        </HStack>
          <Button colorScheme="red" ml={4} onClick={handleLogout}>
              Logout
          </Button>
        </Flex>

        <SubscribedApps
          subscribedApps={subscriptionData.subscribedApps}
          handleRemoveSubscription={handleRemoveSubscription}
          totalMonthlyCost={totalMonthlyCost}
          totalYearlyCost={totalYearlyCost}
        />
        <UnsubscribedApps
            unsubscribedApps={unsubscribedApps}
            handleAddSubscription={handleAddSubscription}
          />
      </Box>
    )}
  </Box>
  );
}

export default UserHomepage;

