import React, { useState } from "react";
import "./TextAnimation.css";
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
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/authReducer";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
      "Password must contain at least 8 characters, 1 symbol, and 1 uppercase letter"
    )
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post("https://energetic-ruby-sockeye.cyclic.cloud/api/login", {
        email: values.email,
        password: values.password,
      });
      const userID = response.data.user.id;

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.token));
        if (
          response.data.user.roleID === 1 ||
          response.data.user.roleID === 2
        ) {
          navigate(`/menu-employee/${userID}`);
        } else if (response.data.user.roleID === 3) {
          navigate("/menu-admin");
        }
      }
      toast({
        title: "Login Success",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {}
    toast({
      title: "Email and password not match",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
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
              Login in to your account
            </Heading>
            <Text
              fontFamily={"monospace"}
              fontSize={{ base: "sm", sm: "md" }}
              textAlign={"center"}
              className="animated-text"
            >
              We are what we repeatedly do. Excellence, then, is not an act but
              a habit...........
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
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
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
                  <Field name="email">
                    {({ field }) => (
                      <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your email"
                          rounded="md"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }) => (
                      <FormControl id="password" mb={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Your Password"
                            rounded="md"
                          />
                          <InputRightElement>
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
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
                    Login
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

export default LoginForm;
