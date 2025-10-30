import React from "react";
import { Card, Image, Text, Title } from "@mantine/core";

const WideCard = ({ data }) => {
  const { title, desc, src } = data;
  return (
    <Card shadow="sm" padding="xl">
      <Image src={src} alt={title} width={60} height={60} />
      <Title mt={20} mb={10} order={3}>
        {title}
      </Title>
      <Text component="p">{desc}</Text>
    </Card>
  );
};

export default WideCard;
