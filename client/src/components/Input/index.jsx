import {userProfileStyles} from "../../profile.styles";
import {Box, Text} from "@mantine/core";
import React from "react";

const Input = ({icon, label, value, setState, placeHolder, type}) => {
  const {classes} = userProfileStyles({Icon: icon});

  return (
    <Box style={{position: "relative"}}>
      <Text className={classes.label}>{label}</Text>
      <Text className={classes.icon}>{icon}</Text>
      <input
        className={classes.input}
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setState(e.target.value)}
      />
    </Box>
  );
};

export default Input;
