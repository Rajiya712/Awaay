import React from "react";
import {Container, Grid} from "@mantine/core";

const AboutPage = () => {
  return (
    <>
      <Container size="xl">       
         <Grid mt={26} mb={26}>
         <Grid.Col span={12} md={6} >
            <img
              src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-669.jpg?w=1380&t=st=1692824755~exp=1692825355~hmac=9dd05cb9684993497799f231e080d3b3011446d90c292ebfd2fb8179c2efb688"
              alt=""
              style={{
                width:"650px"
              }}
            />
          </Grid.Col>
          <Grid.Col span={12} md={6} mt={100}>
           <h2 style={{textAlign:"center"}}>Welcome toWeb Based Bus Ticket Booking System,</h2>
            <h3>
              your one-stop destination for hassle-free and convenient bus
              ticket bookings. We are also available on online based ticket
              booking platform that aims to redefine how you travel by providing
              booked bus tickets and exceptional customer service.
            </h3>
            <h3>
              Our Mission is to revolutionize how you book bus tickets and make
              your travel experience smooth, enjoyable, and affordable.
            </h3>
            </Grid.Col>
         </Grid>
      </Container>
    </>
  );
};

export default AboutPage;
