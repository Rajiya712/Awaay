import React, {useEffect, useState} from "react";
import {Box, Button, Container, Table} from "@mantine/core";

import {BusContext} from "../../contexts/BusContext";
import {useNavigate} from "react-router-dom";
import moment from "moment";
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

const SearchResult = () => {
  const {searchResult} = React.useContext(BusContext);

  const navigate = useNavigate();

  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    const callBookingList = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/booking-lists"
      );
      if (response.data) setBookingList(response.data);
    };
    callBookingList();
  }, []);

  const handleViewSeats = (item) => {
    navigate(
      `/make-booking/bus-id=${item._id}/departure-time=${moment(
        item.departureDate
      ).format("X")}`
    );
  };

  return searchResult !== null ? (
    <Box component="section" py={40}>
      <h2 style={{textAlign:"center",  mb :15, textDecoration:"underline", color:"#f04935",}}>
        Available Bus Schedule
      </h2>
      <Container size="xl">
        <Table style={{minWidth: 700, width: "100%", overflow: "auto"}}>
          <thead>
            <tr>
              <th>Origin</th>
              <th>Destination</th>
              <th>Bus Type</th>
              <th>Departure Time</th>
              <th>Seats Available</th>
              <th>Seat Price</th>
              <th>
                <Box style={{display: "flex", justifyContent: "flex-end"}}>
                  <span style={{marginRight: 76}}>Action</span>
                </Box>
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult.length > 0
              ? searchResult.map((item) => {
                  const filterBusId = bookingList?.filter(
                    (bus) => bus.busId === item?.busId
                  );

                  const timestamp = moment(item.departureDate).format("X");
                  const filterDepartureDate = filterBusId?.filter(
                    (bus) => bus.departureDate === timestamp
                  );

                  return (
                    <tr key={item._id}>
                      <td>{item.origin}</td>
                      <td>{item.destination}</td>
                      <td>{item.busType}</td>
                      <td>{convertToAMPM(item.departureTime)}</td>
                      <td>
                        {filterDepartureDate
                          ? item.totalSeats - filterDepartureDate.length
                          : item.totalSeats}
                      </td>
                      <td>৳{item.seatPrice}.00</td>
                      <td>
                        <Box
                          style={{display: "flex", justifyContent: "flex-end"}}
                        >
                          <Button
                            onClick={() => handleViewSeats(item)}
                            style={{
                              textTransform: "uppercase",
                              backgroundColor: "#FA5352",
                            }}
                          >
                            Book Ticket
                          </Button>
                        </Box>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>
      </Container>
    </Box>
  ) : (
    <></>
  );
};

export default SearchResult;
