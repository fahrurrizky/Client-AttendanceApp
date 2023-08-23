import React, { useState } from "react";
import "../../pages/employee/TextAnimation.css"; // Make sure to include the CSS file for animation styles
import {
  Container,
  Box,
  FormLabel,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  birthday: Yup.date().required("Birthday is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
      "Password must contain at least 8 characters, 1 symbol, and 1 uppercase letter"
    ),
});

const RegisEmployee = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.patch(
        "https://energetic-ruby-sockeye.cyclic.cloud/api/auth",
        {
          fullname: values.fullname,
          birthday: values.birthday,
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/"); // Redirect to homepage after successful registration
      }
    } catch (error) {
      console.error(error)
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      bgGradient="linear(to-l, #7928CA,#36D1DC)"
      className="typing-container"
    >
      <Container
        maxW="5xl"
        p={{ base: 5, md: 10 }}
        className="center-container"
      >
        <Stack
          spacing={4}
          maxW={{ base: "20rem", sm: "25rem" }}
          margin="0 auto"
        >
          <Stack align="center" spacing={2} textColor={"white"}>
            <Heading fontSize={{ base: "xl", sm: "3xl" }}>
              Complete Your Registration
            </Heading>
            <Text
              fontFamily={"body"}
              fontSize={{ base: "sm", sm: "md" }}
              textAlign={"center"}
              className="animated-text"
            >
              Please provide your information below, and make sure you fill in
              the information according to your personal data.
            </Text>
          </Stack>
          <Box pos="relative">
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
            <Formik
              initialValues={{
                fullname: "",
                birthday: "",
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <VStack
                  pos="relative"
                  spacing={5}
                  p={6}
                  bg={useColorModeValue("white", "gray.700")}
                  rounded="lg"
                  boxShadow="lg"
                >
                  <Field name="fullname">
                    {({ field }) => (
                      <FormControl id="fullname">
                        <FormLabel>Full Name</FormLabel>
                        <Input {...field} type="text" rounded="md" />
                        <ErrorMessage
                          name="fullname"
                          component="div"
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="birthday">
                    {({ field }) => (
                      <FormControl id="birthday">
                        <FormLabel>Birthday</FormLabel>
                        <Input {...field} type="date" rounded="md" />
                        <ErrorMessage
                          name="birthday"
                          component="div"
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username">
                    {({ field }) => (
                      <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input {...field} type="text" rounded="md" />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }) => (
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            rounded="md"
                          />
                          <InputRightElement width="4.5rem">
                            <IconButton
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              icon={
                                showPassword ? <ViewOffIcon /> : <ViewIcon />
                              }
                            />
                          </InputRightElement>
                        </InputGroup>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>

                  {error && <Text color="red">{error}</Text>}
                  <Button
                    type="submit"
                    bgGradient="linear(to-l, #7928CA,#FF0080)"
                    color="white"
                    _hover={{
                      bg: "magenta.500",
                    }}
                    rounded="md"
                    w="100%"
                  >
                    Register
                  </Button>
                </VStack>
              </Form>
            </Formik>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default RegisEmployee;
