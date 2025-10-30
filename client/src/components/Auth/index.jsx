import {Box, Card, TextInput, PasswordInput, Button, Text} from "@mantine/core";
import React from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {BsFillEnvelopeAtFill} from "react-icons/bs";
import axios from "axios";
import swal from "sweetalert";

const AuthPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isHaveAccount, setIsHaveAccount] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {setUser} = React.useContext(AuthContext);

  const handleHaveAnAccount = () => {
    setIsHaveAccount((prev) => !prev);
  };

  const handleAuth = async () => {
    setIsLoading(true);

    if (isHaveAccount) {
      // login functionality
      const data = {
        email,
        password,
      };

      axios
        .post("http://localhost:5000/api/auth/login", data)
        .then((res) => {
          if (res.data?.user) {
            navigate("/");
            setIsLoading(false);
            setUser(res.data?.user);
            localStorage.setItem("user", JSON.stringify(res.data?.user));
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      // register functionality
      const data = {
        firstName,
        lastName,
        email,
        password,
      };

      axios
        .post("http://localhost:5000/api/auth/register", data)
        .then((res) => {
          if (res.data.message == "user all ready exist") {
            swal("user all ready exist", "try to Login", "error");
          } else {
            if (res.data?.user) {
              navigate("/");
              setIsLoading(false);
              setUser(res.data?.user);
              localStorage.setItem("user", JSON.stringify(res.data?.user));
            }
          }
        })
        .catch((error) => {
          console.log("error on sign up", error.message);
        });
    }
  };

  return (
    <Box style={{padding: "8rem 0"}}>
      <Card
        sx={(theme) => ({
          position: "relative",
          [theme.fn.largerThan("sm")]: {
            width: "40%",
            margin: "0 auto",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            marginTop: "11px",
            paddingBottom: "20px",
          },
        })}
      >
        {isHaveAccount ? (
          <Text size={33} align="center">
            Sign In
          </Text>
        ) : (
          <Text size={33} align="center">
            Sign Up
          </Text>
        )}
        {isHaveAccount ? null : (
          <Box
            sx={(theme) => ({
              [theme.fn.largerThan("sm")]: {
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginBottom: "6px",
              },
            })}
          >
            <TextInput
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              style={{width: "100%"}}
              placeholder="First Name:"
              label="First Name"
              withAsterisk
            />
            <TextInput
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              style={{width: "100%"}}
              placeholder="Last Name:"
              label="Last Name:"
              withAsterisk
            />
          </Box>
        )}
        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Your email"
          placeholder="Your email"
          icon={<BsFillEnvelopeAtFill size="0.8rem" />}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          my={6}
          placeholder="Password"
          label="Password"
          description="Password must be at least 6 charecter and maximum 12 character"
          withAsterisk
        />
        {isHaveAccount ? null : (
          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            withAsterisk
          />
        )}
        <Button
          // loading={isLoading ? true : false}
          onClick={handleAuth}
          sx={(theme) => ({
            width: "100%",
            textAlign: "center",
            [theme.fn.largerThan("sm")]: {
              backgroundColor: " #F04935",
              padding: "9px 6px",
              margin: "11px 0px",
              color: "white",
              borderRadius: theme.radius.sm,
              "&:hover": {
                backgroundColor: "coral",
              },
            },
          })}
        >
          {isHaveAccount ? "Sign In" : "Sign Up"}
        </Button>
        {isHaveAccount ? (
          <Text
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              textAlign: "center",
              color: "black",
            }}
            onClick={handleHaveAnAccount}
          >
            <h4>Don't have account ? Sign up</h4>
          </Text>
        ) : (
          <Text
            onClick={handleHaveAnAccount}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              textAlign: "center",
              color: "black",
            }}
          >
            <h4>All ready have an account?</h4>{" "}
          </Text>
        )}
      </Card>
    </Box>
  );
};

export default AuthPage;
