import {Card, Image, List, Title} from "@mantine/core";
import React from "react";

const TallCard = ({data}) => {
  const {title, imgSrc, items} = data;
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder>
      <Card.Section>
        <img
          src={imgSrc}
          alt={title}
          height={200}
          style={{objectFit: "contain", width: "100%", height: "22rem"}}
        />
      </Card.Section>
      <Title mt={2} mb={5} order={3}>
        {title}
      </Title>
      <List>
        {items.map((item, ind) => (
          <List.Item key={ind}>{item.list}</List.Item>
        ))}
      </List>
    </Card>
  );
};

export default TallCard;
