import React from "react";
import Layout from "../components/Layout";
import {Center, Container, Grid} from "@mantine/core";

const ContactUsPage = () => {
  return (
    <Container size="xl" >
      
      <Grid mt={26} mb={26}v>
        <Grid.Col span={12} md={6} 
        >
          <img
            src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-1850.jpg?w=996&t=st=1692821763~exp=1692822363~hmac=b3461a087d8ccbcbb550569b1672d457d6d3c068d99356b4ce527da4b03375ee"
            alt=""
            style={{
              width:"450px"
            }}
          />
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <h2 style={{textAlign:"center", textDecoration:"underline", color:"#f04935"}}>CONTACT US</h2>
         <div style={{textAlign:"center"}}>
         <h3>
            Thank you for choosing Web Based Bus Ticket Booking System for your bus ticketing needs. We
            value your trust and are committed to providing exceptional customer
            service. If you have any questions, or concerns, or need assistance,
            our friendly and knowledgeable support team is here to help you.
          </h3>
          <h4>Phone: 01835859540</h4>
          <h4 >Email: support@eticket.com</h4>
          <h3 >
            Our customer support team is available 24/7 to address any inquiries
            or issues you may encounter. Whether you need help booking a ticket,
            have questions about our services, or require assistance during your
            journey, don't hesitate to contact us. we are passionate about
            providing you with the best travel experience.
          </h3>
          <h3>
            Your satisfaction is our priority, and we are dedicated to assisting
            you at every step of your journey. Feel free to contact us anytime,
            and let us make your bus travel as smooth and enjoyable as possible.
            Thank you for choosingWeb Based Bus Ticket Booking System Safe travels,Web Based Bus Ticket Booking System Team.
          </h3>
         </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default ContactUsPage;
