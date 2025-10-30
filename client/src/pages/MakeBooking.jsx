import React from "react";
import {BusContext} from "../contexts/BusContext";
import {
  Box,
  Text,
  Grid,
  Container,
  Card,
  Divider,
  Button,
  Tooltip,
} from "@mantine/core";
import {AuthContext} from "../contexts/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {TbArmchair} from "react-icons/tb";
import moment from "moment";
import swal from "sweetalert";
import axios from "axios";

function convertToAMPM(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours < 12 ? "AM" : "PM";
  let hours12 = hours % 12;
  if (hours12 === 0) {
    hours12 = 12;
  }
  const timeAMPM = `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  return timeAMPM;
}

const MakeBooking = () => {
  const {busId, date} = useParams();

  const {buses} = React.useContext(BusContext);
  const {user} = React.useContext(AuthContext);

  const [selectSeat, setSelectSeat] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false);
  const [busDetails, setBusDetails] = React.useState(null);
  const [bookingList, setBookingList] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const id = busId.replace(/bus-id=/, "");
    const timestamp = date.replace(/departure-time=/, "");
    const result = buses.find((bus) => bus._id === id);

    if (!result) {
      return;
    }
    setBusDetails({...result, departureDate: timestamp});
  }, [busId, buses]);

  const handleSeatSelect = (index) => {
    if (selectSeat.includes(index)) {
      setSelectSeat((prevSelect) =>
        prevSelect.filter((seatIndex) => seatIndex !== index)
      );
    } else {
      if (selectSeat.length >= 4) {
        swal("You can't select more than 4 seats");
      } else {
        setSelectSeat((prevSelect) => [...prevSelect, index]);
      }
    }
  };

  const handleBuyTicket = () => {
    if (user === null) {
      swal("Please login first");
      return;
    }

    if (selectSeat.length === 0) {
      swal("Please select seat");
      return;
    }

    axios
      .post("http://localhost:5000/api/booking-ticket", {
        userId: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        busId: busDetails.busId,
        seatNumber: selectSeat,
        origin: busDetails.origin,
        destination: busDetails.destination,
        departureDate: busDetails.departureDate,
        departureTime: busDetails.departureTime,
        ticketPrice: busDetails.seatPrice,
      })
      .then((res) => {
        console.log("res", res);
        navigate(`/confirm-booking/${res.data.ticketId}`);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking-lists")
      .then((res) => {
        setBookingList(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const filterBusId = bookingList?.filter(
    (bus) => bus.busId === busDetails?.busId
  );

  const filterDepartureDate = filterBusId?.filter(
    (bus) => bus.departureDate === busDetails?.departureDate
  );

  const checkSeatIsBooked = (index) => {
    const isSeatTaken = filterDepartureDate?.some((ticket) => {
      return ticket.seatNumber.includes(index);
    });
    return isSeatTaken;
  };

  return (
    <Container size="xl">
      {!!busDetails && (
        <Grid
          mt={26}
          mb={26}
          style={{
            justifyContent: "center",
          }}
        >
          <Grid.Col
            span={12}
            md={4}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={(theme) => ({
                maxWidth: "400px",
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "20px 20px 60px #d3d3d3",
                "-20px -20px 60px": "#ffffff",
              })}
            >
              <Text mb={8} size={21} align="center" fw={900}>
                SELECT SEAT
              </Text>
              <Divider />

              <Box
                sx={(theme) => ({
                  display: "grid",
                  gridTemplateColumns: "18% 29% 18% 18%",
                  height: "80%",
                  gridGap: 20,
                  marginTop: 16,
                })}
              >
                <Box
                  style={{
                    gridColumn: "1 / span 3",
                    gridRow: "1 / span 1",
                  }}
                ></Box>
                <Tooltip label=" Driver Seat ">
                  <Box
                    style={{
                      display: "flex",
                      gap: 7,
                      cursor: "not-allowed",
                    }}
                  >
                    <Text>{""}</Text>

                    <TbArmchair
                      style={{
                        marginLeft:"16px",
                        color: "red",
                      }}
                      size={25}
                    />
                  </Box>
                </Tooltip>
                {Array.from({length: busDetails?.totalSeats}).map(
                  (_, index) => {
                    const seatNumber = index + 0;
                    return (
                      <Box
                        key={seatNumber}
                        sx={(theme) => ({
                          display: "flex",
                          gap: 8,
                          cursor: "pointer",
                        })}
                      >
                        {checkSeatIsBooked(seatNumber) ? (
                          <Tooltip label=" Already Booked ">
                            <Box
                              style={{
                                display: "flex",
                                gap: 7,
                                cursor: "not-allowed",
                              }}
                            >
                              <Text>
                                {seatNumber > 9 ? seatNumber : "0" + seatNumber}{" "}
                              </Text>

                              <TbArmchair
                                style={{
                                  color: "red",
                                }}
                                size={25}
                              />
                            </Box>
                          </Tooltip>
                        ) : (
                          <Box style={{display: "flex", gap: 5}}>
                            <Text>
                              {seatNumber > 9 ? seatNumber : "0" + seatNumber}{" "}
                            </Text>

                            <TbArmchair
                              style={{
                                color: selectSeat.includes(index)
                                  ? "green"
                                  : "",
                              }}
                              size={25}
                              onClick={() => handleSeatSelect(index)}
                            />
                          </Box>
                        )}
                      </Box>
                    );
                  }
                )}
              </Box>
            </Card>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Card
              sx={(theme) => ({
                width: "100%",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "20px 20px 60px #d3d3d3",
                "-20px -20px 60px": "#ffffff",
              })}
            >
              <Text mb={8} size={21} align="center" fw={900}>
                TICKET INFORMATION
              </Text>
              <Divider />
              <Container
                style={{
                  fontWeight: "bold",
                }}
              >
                <Text>Origin: {busDetails.origin}</Text>
                <Text>Destination: {busDetails?.destination}</Text>
                <Text>Bus Type: {busDetails?.busType}</Text>
                <Text>Ticket Price: {busDetails?.seatPrice} Taka</Text>
                <Text>
                  Departure Date:{" "}
                  {moment
                    .unix(date.replace(/departure-time=/, ""))
                    .format(" Do MMM YYYY")}
                </Text>
                <Text>
                  Departure Time : {convertToAMPM(busDetails?.departureTime)}
                </Text>
              </Container>
            </Card>

            <Button
              loading={loading}
              onClick={handleBuyTicket}
              style={{
                fontWeight: "600",
                width: "100%",
                marginTop: 25,
                borderRadius: "5px",
                boxShadow: "20px 20px 60px #d3d3d3",
                "-20px -20px 60px": "#ffffff",
              }}
            >
              Book Ticket
            </Button>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};

export default MakeBooking;