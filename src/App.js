import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHomepage from "./User/UserHomepage";
import { UserProvider } from "./UserContext";
function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/home/:userId" element={<UserHomepage />} />
          </Routes>
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
