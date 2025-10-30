import React from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Box, Card, Container, Grid, Text} from "@mantine/core";
import axios from "axios";
import moment from "moment";

const MyTickets = () => {
  const [myTickets, setMyTickets] = React.useState([]);

  const {user} = React.useContext(AuthContext);
  React.useEffect(() => {
    if (!user) {
      return;
    }
    axios
      .get(`http://localhost:5000/api/my-ticket/${user._id}`)
      .then((res) => {
        console.log("res", res);
        setMyTickets(res.data.ticket);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [user]);

  console.log("myTickets", myTickets);

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        position: "relative",
        overflow: "hidden",
      })}
    >
      <Container size="xl">
        <h1 style={{textAlign: "center"}}>TICKET COLLECTION</h1>
        <Grid>
          {myTickets.map(
            ({
              _id,
              date,
              destination,
              origin,
              busNumber,
              seatNumber,
              ticketPrice,
              departureTime,
              departureDate,
            }) => {
              return (
                <Grid.Col span={12} md={3} key={_id}>
                  <Card
                    style={{
                      marginBottom: 12,
                      padding: "10px 20px",
                      backgroundColor: "#fff",
                      borderRadius: "15px",
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      fontWeight:"bolder"
                    }}
                  >
                    {/* <Divider my="xs" /> */}
                    <Box style={{display: "flex", gap: 11}}>
                      <Box>
                        <Text size={13}>Ticket ID: </Text>
                      </Box>
                      <Box>
                        <Text size={13}>{_id}</Text>
                      </Box>
                    </Box>
                    <Box style={{display: "flex", gap: 11}}>
                      <Box>
                        <Text size={13}>Departure Date: </Text>
                      </Box>
                      <Box>
                        <Text size={13}>{moment.unix(departureDate).format("Do MMM  YY")}</Text>
                      </Box>
                    </Box>
                    <Box style={{display: "flex", gap: 11}}>
                      <Box>
                        <Text size={13}>Origin: </Text>
                      </Box>
                      <Box>
                        <Text size={13}>{origin}</Text>
                      </Box>
                    </Box>
                    <Box style={{display: "flex", gap: 11}}>
                      <Box>
                        <Text size={13}>Destination: </Text>
                      </Box>
                      <Box>
                        <Text size={13}>{destination}</Text>
                      </Box>
                    </Box>
                    {/* <Divider my="xs" /> */}
                    
                    <Box style={{display: "flex", gap: 11, marginTop: 3}}>
                      <Box>
                        <Text size={13}>Departure Time: </Text>
                      </Box>
                      <Box>
                        <Text size={13}>{departureTime}</Text>
                      </Box>
                    </Box>
                    <Box style={{display: "flex", gap: 11, marginTop: 3}}>
                      <Box>
                        <Text size={13}>Ticket Price: </Text>
                      </Box>
                      <Box>
                        <Text size={13}>{ticketPrice}</Text>
                      </Box>
                    </Box>
                    <Box style={{display: "flex", gap: 11, marginTop: 3}}>
                      <Box>
                        <Text size={13}>Seat Number: </Text>
                      </Box>
                      <Box style={{display: "flex", gap: 8}}>
                        {seatNumber.map((number, index) => {
                          return (
                            <Box key={index}>
                              <Text size={13}>{number}</Text>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>

                    {/* <Divider my="xs" /> */}
                    <Box style={{display: "flex", gap: 11, marginTop: 3}}>
                      <Box>
                        <Text size={13}>Total Price: </Text>
                      </Box>
                      <Box>
                        <Text size={13}>{seatNumber.length * ticketPrice}</Text>
                      </Box>
                    </Box>
                  </Card>
                </Grid.Col>
              );
            }
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default MyTickets;
