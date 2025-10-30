import React from "react";
import {Box, Container, Grid, Title} from "@mantine/core";
import {easyStepsData} from "../../../data/data";
import TallCard from "../../Cards/TallCard/TallCard";

const EasyStepSection = () => {
  return (
    <Box component="section" py={25}>
      <Container size="xl">
        <Title order={2} size={35} mb={5} align="center">
          Easy steps to enjoy journey
        </Title>
        <Grid>
          {easyStepsData.map((easyStep) => (
            <Grid.Col xs={12} sm={6} md={4} key={easyStep.id}>
              <TallCard data={easyStep} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default EasyStepSection;
