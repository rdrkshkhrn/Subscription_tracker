// import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
// import React, { useState,useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./UserContext";
// function Signin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const {setUser} = useContext(UserContext);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //localStorage.removeItem(email);
//     const storedUser = localStorage.getItem(email);
//     if(storedUser){
//         const userData = JSON.parse(storedUser);

//         if(userData.password === password){
//             console.log(userData);
//             setUser(userData);
//             localStorage.setItem("currentUser",JSON.stringify(userData));
//             navigate(`/home/${userData.id}`);

//         }
//         else
//             console.log("wrong password");
//     }
//     else
//         console.log("Invalid email");
//   };

//   return (
//     <Box>
//       <form onSubmit={handleSubmit}>
//         <FormControl id="email">
//           <FormLabel>Enter email address</FormLabel>
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormControl>
//         <FormControl id="passwords">
//           <FormLabel>Enter password</FormLabel>
//           <Input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormControl>
//         <Button type="submit">signin</Button>
//       </form>
//     </Box>
//   );
// }

// export default Signin;

import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For showing error messages
  const { setUser } = useContext(UserContext); // Using context to set user data
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedUser = localStorage.getItem(email);
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);

      if (userData.password === password) {
        setUser(userData); 
        localStorage.setItem("currentUser", JSON.stringify(userData)); 
        navigate(`/home/${userData.id}`); 
      } else {
        setErrorMessage("Wrong password. Please try again.");
      }
    } else {
      setErrorMessage("Invalid email. Please check your credentials.");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Enter email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4} id="passwords" isRequired>
          <FormLabel>Enter password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {errorMessage && <Text color="red">{errorMessage}</Text>} 
        
        <Button type="submit" mt={4}>
          Sign In
        </Button>
      </form>
    </Box>
  );
}

export default Signin;

