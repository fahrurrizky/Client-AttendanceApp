import React, { useState, useEffect } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { GiBackwardTime } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
export default function CurrentDate() {
  const [currentSeconds, setCurrentSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const seconds = currentDate.getSeconds(); // Get the seconds (0-59)
      setCurrentSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date();
  const date = currentDate.getDate(); // Get the date (1-31)
  const month = currentDate.getMonth(); // Get the month (0-11)
  const hours = currentDate.getHours(); // Get the hours (0-23)
  const minutes = currentDate.getMinutes(); // Get the minutes (0-59)

  // Function to convert numerical month to Indonesian month name
  const getIndonesianMonthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  };

  // Get the Indonesian month name
  const indonesianMonth = getIndonesianMonthName(month);

  return (
    <Flex gap={"4"}>
      <Button
        variant={"outline"}
        size={"sm"}
        textColor="black"
        w="100%"
        _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white" }}
      >
       <SlCalender/>&nbsp;&nbsp;{date} {indonesianMonth}
      </Button>

      <Button
        variant={"outline"}
        size={"sm"}
        textColor="black"
        w="100%"
        _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white" }}
      >
        <GiBackwardTime size={'25'}/>&nbsp;&nbsp;{hours}:{minutes}:{currentSeconds}
      </Button>
    </Flex>
  );
}
