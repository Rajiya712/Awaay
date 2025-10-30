import React from "react";
import {Box, Card, Container, Grid, Text, Title} from "@mantine/core";
import {busRoute} from "../../../data/data";

const AvailableSection = () => {
  return (
    <Box component="section" py={40}>
      <Container size="xl">
        <Title order={2} size={35} mb={30} align="center">
          Available Bus Routes
        </Title>
        <Grid>
          <Grid.Col sm={12} md={3}>
            {busRoute.fromDhaka.slice(0, 6).map((item) => (
              <Card key={item.id} ta="center" bg="#fa725c" mb={10}>
                <Text color="#fff">
                  {item.start} - {item.end}
                </Text>
              </Card>
            ))}
          </Grid.Col>
          <Grid.Col sm={12} md={3}>
            {busRoute.toDhaka.slice(0, 6).map((item) => (
              <Card key={item.id} ta="center" bg="#fa725c" mb={10}>
                <Text color="#fff">
                  {item.start} - {item.end}
                </Text>
              </Card>
            ))}
          </Grid.Col>
          <Grid.Col sm={12} md={3}>
            {busRoute.fromDhaka.slice(6, 12).map((item) => (
              <Card key={item.id} ta="center" bg="#fa725c" mb={10}>
                <Text color="#fff">
                  {item.start} - {item.end}
                </Text>
              </Card>
            ))}
          </Grid.Col>
          <Grid.Col sm={12} md={3}>
            {busRoute.toDhaka.slice(6, 12).map((item) => (
              <Card key={item.id} ta="center" bg="#fa725c" mb={10}>
                <Text color="#fff">
                  {item.start} - {item.end}
                </Text>
              </Card>
            ))}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default AvailableSection;
