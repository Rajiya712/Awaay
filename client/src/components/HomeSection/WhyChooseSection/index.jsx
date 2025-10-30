import React from "react";
import {Box, Container, Grid, Title} from "@mantine/core";
import {whyChooseData} from "../../../data/data";
import WideCard from "../../Cards/WideCard/WideCard";

const WhyChooseSection = () => {
  return (
    <Box component="section" py={40}>
      <Container size="xl">
        <Title order={2} size={35} align="center" mb={30}>
          Why ChooseWeb Based Bus Ticket Booking System
        </Title>
        <Grid>
          {whyChooseData.map((whyChoose) => (
            <Grid.Col xs={12} sm={6} md={4} key={whyChoose.id}>
              <WideCard data={whyChoose} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseSection;
