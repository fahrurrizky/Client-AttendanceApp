import React from "react";
import "../pages/TextAnimation.css";
import {
  Container,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import LiveAttendance from "../pages/employee/LiveAttendance"
import SalaryEmployee from "../pages/employee/SalaryEmployee"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../redux/reducer/authReducer";

const MenuAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
 const handleLogout = () => {
    dispatch(logoutSuccess(localStorage.token));
    navigate("/");
  };

  return (
    <Box bgGradient="linear(to-l, #7928CA,#36D1DC)" className="typing-container">
      <Container maxW="5xl" p={{ base: 5, md: 10 }} className="center-container">
        <Stack spacing={4} margin="0 auto">
          <Stack align="center" spacing={1} textColor={"white"}>
            <Heading fontSize={{ base: "xl", sm: "3xl" }}>
              Attendance System App
            </Heading>
            <Text
              textAlign="center"
              fontStyle={"italic"}
              fontSize={"xl"}
            >
              Dashboard Employee
            </Text>
            <Text
              fontFamily={"monospace"}
              fontSize={{ base: "sm", sm: "md" }}
              textAlign={"center"}
              className="animated-text"
            >
              We are what we repeatedly do. Excellence, then, is not an act but a habit...........
            </Text>
          </Stack>
          <Box pos={'relative'}  mx="auto" my="auto">
          <Box
              pos="absolute"
              top="-7px"
              right="-7px"
              bottom="-7px"
              left="-7px"
              rounded="lg"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              transform="rotate(-2deg)"
            ></Box>
            <VStack
            pos="relative"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            >
            <Tabs variant="enclosed" m={'5'}>
              <TabList fontFamily={"body"} justifyContent="center" textColor="#7928CA">
                <Tab>Live Attendace</Tab>
                <Tab>Salary Report</Tab>
                <Spacer/>
                <Button
                  variant={"ghost"}
                  textColor="#7928CA"
                  onClick={handleLogout}
                  _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white" }}
                >
                  Sign Out
                </Button>
              </TabList>
              <TabPanels>
                <TabPanel>
                    <LiveAttendance/>
                </TabPanel>
                <TabPanel>
                    <SalaryEmployee/>
                </TabPanel>
              </TabPanels>
            </Tabs>
            </VStack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default MenuAdmin;
