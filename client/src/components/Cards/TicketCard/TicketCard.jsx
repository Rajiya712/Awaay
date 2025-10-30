import React from "react";
import { Box, Card, Text, Title } from "@mantine/core";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiSolidRightArrow } from "react-icons/bi";

const TicketCard = () => {
  return (
    <Card shadow="md" padding="lg">
      <Card.Section
        sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        mb={10}
      >
        <AiFillInfoCircle color="#b6b6b6" />
        <Title order={3}>Ticket Details</Title>
      </Card.Section>
      <Box component="div">
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Description:{" "}
        </Text>
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Name Of Bus:{" "}
        </Text>
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Bus Number:{" "}
        </Text>
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Depature:{" "}
        </Text>
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Arrival:{" "}
        </Text>
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Prices:{" "}
        </Text>
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Depature Date:{" "}
        </Text>
        <Text mb={10}>
          <BiSolidRightArrow color="#b6b6b6" /> Please select a seat:{" "}
        </Text>
        <Text>
          <BiSolidRightArrow color="#b6b6b6" />
          Select a maximum of 2 seats
        </Text>
      </Box>
    </Card>
  );
};

export default TicketCard;
