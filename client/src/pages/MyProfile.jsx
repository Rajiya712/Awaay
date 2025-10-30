import {userProfileStyles} from "../profile.styles";
import {AuthContext} from "../contexts/AuthContext";
import {Box, Card, Divider, Image} from "@mantine/core";
import React, {useEffect} from "react";
import Input from "../components/Input";

const profilePic =
  "https://cdn-icons-png.flaticon.com/256/9218/9218712.png";

const EditUserProfile = () => {
  const {classes} = userProfileStyles({});
  const [fisrtName, setFisrtName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const {user} = React.useContext(AuthContext);

  useEffect(() => {
    user?.firstName && setFisrtName(user.firstName);
    user?.lastName && setLastName(user.lastName);
    user?.email && setEmail(user.email);
  }, [user]);
  return (
    <Box className={classes.container} >
      <Box className={classes.cardContainer}
      style={{
        fontWeight:"bolder",
          padding: "10px 20px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
      >
        <h2 style={{ textAlign:"center"}}>My Profile</h2>
        <Card>
          <Box className={classes.cardHeader}></Box>
          <Box style={{
          textAlign: "center",
          position: "relative",       
        }}>
            <Image
              src={profilePic}
              width={100}
              height={100}
              className={classes.profilePic}
              alt="change Profile pic"
            />
          </Box>
          <Divider my="xs" />
          <Box className={classes.inputBox}>
            <Input
              type="text"
              label="First Name"
              setState={setFisrtName}
              value={fisrtName}
              style={{color: "black"}}
            />
            <Input
              type="text"
              label="Last Name"
              setState={setLastName}
              value={lastName}
            />
          </Box>
          <Box className={classes.inputBox}>
                        
            <Input
              type="email"
              label="Email"
              setState={setEmail}
              value={email}
            />
            <Input
              type="password"
              label="Password"
              setState={setLastName}
              value={lastName}
            />
          </Box>
         
        </Card>
      </Box>
    </Box>
  );
};

export default EditUserProfile;
