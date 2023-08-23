import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from "@chakra-ui/react";

const ListEmployee = () => {
  const [users, setUsers] = useState([]);

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
  }, []);

  const getRoleName = (roleID) => {
    switch (roleID) {
      case 1:
        return "Karyawan Pagi";
      case 2:
        return "Karyawan Malam";
      case 3:
        return "Admin";
      default:
        return "Unknown";
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
    <Box>
        <Heading size="lg" mb={'2'}>
            List Employee
        </Heading>
        <Box boxShadow="xl" rounded="md" maxHeight={'300px'} overflowX={'scroll'}>
          <Table size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Username</Th>
                <Th>Role</Th>
                <Th>Birthday</Th>
                <Th>Base Salary</Th>
                <Th>Day Salary</Th>
                <Th>Income</Th>
                <Th>Join Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.fullName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.username}</Td>
                  <Td>{getRoleName(user.roleID)}</Td>
                  <Td>{new Date(user.birthday).toLocaleDateString("id")}</Td>
                  <Td>{formatCurrency(user.baseSalary)}</Td>
                  <Td>{formatCurrency(user.daySalary)}</Td>
                  <Td>{user.income}</Td>
                  <Td>{new Date(user.createdAt).toLocaleDateString("id")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
    </Box>
  );
};

export default ListEmployee;