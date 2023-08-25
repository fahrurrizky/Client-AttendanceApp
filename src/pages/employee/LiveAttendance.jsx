import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  Container,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Stack,
  Avatar,
  Divider,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import CurrentDate from "../employee/DateClock";



const DashboardEmployee = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockedOut, setClockedOut] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [loggedInUserFullName, setLoggedInUserFullName] = useState("");
  const [users, setUsers] = useState([]);
  const [isClockInDisabled, setIsClockInDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("https://energetic-ruby-sockeye.cyclic.cloud/api/auth");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
    // ... (other useEffect dependencies)
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      fetchAttendanceHistory();

      // Find the user with the matching id and set their fullName
      const loggedInUser = users.find(user => user.id === decodedToken.id);
      if (loggedInUser) {
        setLoggedInUserFullName(loggedInUser.fullName);
      }
    }
  }, [userId, users]); // Include users in the dependency array
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      fetchAttendanceHistory();
    }
  }, [userId]);

  useEffect(() => {
    // Check if clocked in
    const userIsClockedIn = attendanceHistory.some((entry) => !entry.ClockOut);
    setClockedIn(userIsClockedIn);

    // Check if clocked out
    const userIsClockedOut = attendanceHistory.some((entry) => entry.ClockOut !== null);
    setClockedOut(userIsClockedOut);
    

    // Disable Clock In button if clocked in
    setIsClockInDisabled(userIsClockedIn);
  }, [attendanceHistory]);

  const fetchAttendanceHistory = async () => {
    try {
      const response = await axios.get(
        `https://energetic-ruby-sockeye.cyclic.cloud/api/employee/attendance-history/${userId}`
      );
      setAttendanceHistory(response.data.history);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClockIn = async () => {
    try {
      const response = await axios.post(
        "https://energetic-ruby-sockeye.cyclic.cloud/api/employee/clock-in",
        {
          userID: userId,
        }
      );

      if (response.status === 200) {
        setClockInTime(new Date());
        alert("Clock In Successful");
        fetchAttendanceHistory();
      }
    } catch (error) {
      alert("Clock in Failed, because already clocked in");
      console.error("Error:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await axios.post(
        "https://energetic-ruby-sockeye.cyclic.cloud/api/employee/clock-out",
        {
          userID: userId,
        }
      );

      if (response.status === 200) {
        setClockOutTime(new Date());
        alert("Clock Out Successful");
        fetchAttendanceHistory();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  return (
    <Container maxW="5xl">
        <Heading size="md" textAlign="center" mb={'2'}>
          Live Attendance
        </Heading>
      <Stack
        w="17rem"
        spacing={2}
        p={4}
        border="1px solid"
        borderColor={useColorModeValue("gray.400", "gray.600")}
        rounded="md"
        boxShadow="xl"
        margin="0 auto"
        _hover={{
          boxShadow: useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.4)"
          ),
        }}
      >
            <Box alignSelf="center">
              <Avatar
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                name="Muhammad Ahmad"
                size="xl"
                borderRadius="md"
              />
            </Box>
        <chakra.h1 fontSize="lg" alignSelf="center">
        {loggedInUserFullName}
        </chakra.h1>
        <Text fontSize="lg" color="black" textAlign="center" fontWeight={'bold'}>
            {/* {currentTime.toLocaleTimeString()} */}
        </Text>
        <CurrentDate />
        <Divider />
        <Text fontSize="sm" color="gray.500" textAlign="center">
            Don't forget to clock in and don't forget to clock out when you're going home🤗
        </Text>
          <Flex>
            <Button
              onClick={handleClockIn}
              disabled={isClockInDisabled}
              variant={"outline"}
              size={'sm'}
              borderColor={'gray.400'}
              textColor="#0ED2F7"
              _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white" }}
            >
              Clock In
            </Button>
            <Spacer/>
            <Button
              onClick={handleClockOut}
              disabled={!isClockInDisabled}
              variant={"outline"}
              size={'sm'}
              borderColor={'gray.400'}
              textColor="#FF0080"
              _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white" }}
            >
              Clock Out
            </Button>
          </Flex>     
      </Stack>
      <Stack mt={'2'} align={'center'} mb={'-4'}>
      <Text textAlign={'center'} color="gray.500" fontSize={'sm'} fontWeight="bold" >
        Detailed record of your attendance,<br/>click👇
      </Text>
      <Button onClick={() => setIsModalOpen(!isModalOpen)} size={'sm'} variant={"outline"} _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white" }}>
        Attendance Recorded
      </Button>
            {clockedIn && clockedOut && clockInTime && (
                <Flex fontSize={'xs'}>
                <Text><u>In Time:</u> {clockInTime.toLocaleTimeString("id")}</Text> &nbsp;  &nbsp; &nbsp; &nbsp;
                <Text><u>Out Time:</u> {clockOutTime !== null ? clockOutTime.toLocaleTimeString("id") : "-"}</Text>
                </Flex>
            )}
      </Stack>
      <Box w={"100%"} bg="white">
        <VStack align="stretch">
          {isModalOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="9999"
        >
          <Box
            width="80%"
            maxWidth="800px"
            backgroundColor="white"
            padding="20px"
            rounded="md"
            boxShadow="xl"
            maxHeight={'500px'} overflowX={'scroll'}
          >
            <Flex>
            <Heading size="md">
              Attendance History
            </Heading>
            <Spacer/>
            <Button textColor="#FF0080" onClick={() => setIsModalOpen(false)} variant="outline" size="sm" borderColor="gray.400" _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white",}}>
              Close
            </Button>
            </Flex>
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead>
                <Tr>
                  <Th>Clock In</Th>
                  <Th>Clock Out</Th>
                  <Th>Hourly Work</Th>
                  <Th>Day Salary</Th>
                  <Th>Deduction</Th>
                  <Th>Month</Th>
                </Tr>
              </Thead>
              <Tbody>
                {attendanceHistory
                  .slice()
                  .sort((a, b) => new Date(b.ClockIn) - new Date(a.ClockIn))
                  .map((entry) => (
                    <Tr key={entry.id}>
                      <Td>{new Date(entry.ClockIn).toLocaleString("id")}</Td>
                      <Td>{entry.ClockOut !== null ? new Date(entry.ClockOut).toLocaleString("id") : "-"}</Td>
                      <Td>{entry.HourlyWorks.toFixed(4)} Hour</Td>
                      <Td>{formatCurrency(entry.DaySalary)}</Td>
                      <Td>{formatCurrency(entry.Deduction)}</Td>
                      <Td textAlign="center">{entry.Month}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table >
          </Box>
        </Box>
      )}
        </VStack>
      </Box>
    </Container>
  );
};

export default DashboardEmployee;
