import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Spacer,
  Divider,
} from "@chakra-ui/react";

function SalaryEmployee() {
  const { userID } = useParams(); // Get userID from the URL parameter
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSalaryRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://energetic-ruby-sockeye.cyclic.cloud/api/employee/salary/${userID}`
      );
      setSalaryRecords(response.data.salaryRecords);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const calculateSalary = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://energetic-ruby-sockeye.cyclic.cloud/api/employee/salary`,
        { userID }
      );
      fetchSalaryRecords(); // Refresh the records after calculation
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSalaryRecords();
  }, [userID]);

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(value);
  };

  return (
    <Box>
      <Box>
        <Box width="100%" rounded="xl" boxShadow="xl">
          <Flex mb={'2'} mx={'2'}>
          <Heading fontSize="xl" >
            Salary Reports
          </Heading> <Spacer/>
            <Button onClick={calculateSalary} textColor="#FF0080" variant="outline" size="sm" borderColor="gray.400" _hover={{ bgGradient: "linear(to-l, #7928CA,#FF0080)", color: "white",}}>
              Calculate Salary
            </Button>
          </Flex>
          <Divider/>
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" height="300px">
              <Spinner size="xl" speed='0.35s' />
            </Flex>
          ) : (
            <Box>
              {error ? (
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  Error: {error}
                </Alert>
              ) : (
                <Table vvariant="striped" colorScheme="gray" size="md">
                  <Thead>
                    <Tr>
                      <Th>Total Salary</Th>
                      <Th>Total Deduction</Th>
                      <Th>Month</Th>
                      <Th>Year</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {salaryRecords.map((record) => (
                      <Tr key={record.id}>
                        <Td>{formatCurrency(record.TotalSalary)}</Td>
                        <Td>{formatCurrency(record.TotalDeduction)}</Td>
                        <Td textAlign="center">{record.Month}</Td>
                        <Td>{record.Year}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SalaryEmployee;
