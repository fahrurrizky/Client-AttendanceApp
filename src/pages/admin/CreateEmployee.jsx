import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Dashbor = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false); // Add state for loading

  const handleCreateEmployee = async (values) => {
    setIsCreatingEmployee(true); // Set loading state to true
    try {
      const response = await axios.post(
        "https://energetic-ruby-sockeye.cyclic.cloud/api/auth",
        {
          email: values.email,
          roleID: values.roleID,
          baseSalary: values.baseSalary,
          daySalary: values.daySalary,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast({
        title: "Created Employee Success,",
        description: "Check the registered email to fill in the complete data",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Create Employee failed, Email Already Registered",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsCreatingEmployee(false); // Reset loading state
    }
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    roleID: Yup.number().required("Role is required"),
    baseSalary: Yup.number().required("Base Salary is required"),
    daySalary: Yup.number().required("Day Salary is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        roleID: "",
        baseSalary: "",
        daySalary: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleCreateEmployee}
    >
      <Form>
        <Box>
          <VStack spacing={2}>
            <Heading size="lg" mb={3}>
              Create New Employee
            </Heading>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Field type="email" name="email" as={Input} />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Field as={Select} name="roleID">
                <option value={0}>Choose role...... </option>
                <option value={1}>Morning Shift</option>
                <option value={2}>Night Shift</option>
                <option value={3}>Admin</option>
              </Field>
              <ErrorMessage name="roleID" component="div" style={{ color: "red" }} />
            </FormControl>
            <FormControl>
              <FormLabel>Base Salary</FormLabel>
              <Field type="number" name="baseSalary" as={Input} />
              <ErrorMessage name="baseSalary" component="div" style={{ color: "red" }} />
            </FormControl>
            <FormControl>
              <FormLabel>Day Salary</FormLabel>
              <Field type="number" name="daySalary" as={Input} />
              <ErrorMessage name="daySalary" component="div" style={{ color: "red" }} />
            </FormControl>
            <Button
              type="submit"
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              color="white"
              _hover={{
                bg: "magenta.500",
              }}
              rounded="md"
              w="100%"
              mt={'3'}
              isLoading={isCreatingEmployee}
              loadingText="Creating..."
              spinner={<Spinner size="sm" />}
            >
              Create Employee
            </Button>
          </VStack>
        </Box>
      </Form>
    </Formik>
  );
};

export default Dashbor;
