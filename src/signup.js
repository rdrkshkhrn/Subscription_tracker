import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Signup({ setIsSignin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setValidationError(true);
      setError("Fill the required fields");
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      setError("Email already used");
      setValidationError(false);
      return;
    }

    const id = uuidv4();
    const userData = {
      id: id,
      name: name,
      email: email,
      password: password,
    };
    localStorage.setItem(email, JSON.stringify(userData));

    const defaultSubscription = {
      id: id,
      noOfSubscribedApps: 0,
      subscribedApps: [],
      totalCost: 0
    };

    let subscriptionTable = JSON.parse(localStorage.getItem("subscriptionTable")) || [];
    subscriptionTable.push(defaultSubscription);
    localStorage.setItem("subscriptionTable", JSON.stringify(subscriptionTable));

    setSuccess(true);
    setError("");
    setValidationError(false);

    setTimeout(() => setIsSignin(true), 2000);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired isInvalid={validationError && !name}>
          <FormLabel>Enter your name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="email" isRequired isInvalid={validationError && !email} mt={4}>
          <FormLabel>Enter email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <Text color="red.500">{error}</Text>}
        </FormControl>

        <FormControl id="password" isRequired isInvalid={validationError && !password} mt={4}>
          <FormLabel>Enter password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          mt={4}
          isDisabled={success}  // Prevent further clicks after success
        >
          Signup
        </Button>

        {validationError && <Text color="red.500" mt={2}>Fill the required fields</Text>}
        {success && <Text color="green.500" mt={2}>Account created! Redirecting to sign-in...</Text>}
      </form>
    </Box>
  );
}

export default Signup;
