import axios from "axios";
import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

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

const TicketConfirm = () => {
  const {bookingId} = useParams();

  const [info, setInfo] = useState(null);

  useEffect(() => {
    // call api to get ticket info
    axios
      .get(`http://localhost:5000/api/ticket/${bookingId}`)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        setInfo(null);
      });
  }, [bookingId]);

  const totalPrice = info?.ticketPrice * info?.seatNumber.length;

  return (
    <div
      style={{
        marginTop: 5,
        marginBottom: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h2
          style={{
            color: "green",
          }}
        >
          Successfully ticket booked
        </h2>
      </div>
      <div
        style={{
          fontWeight:"bolder",
          padding: "10px 20px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
          }}
        >
          YOUR TICKET INFO
        </h3>
        {!!info ? (
          <Fragment>
            <div>
              {/* <div style={{textAlign: "center"}}>
                <h4> Passenger Name</h4>
                <p>{info.userDetails.name} </p>
              </div> */}
              <p>Passenger Name: {info.userDetails.name} </p>
              <p>
                Seat Number:{" "}
                {info.seatNumber.map((item) => {
                  return `${item}, `;
                })}
              </p>
              <p>
                Departure Date:{" "}
                {moment.unix(info.departureDate).format("MMMM Do YYYY")}
              </p>
              <p>Departure Time: {convertToAMPM(info.departureTime)}</p>
              <p>Booking Id: {info._id}</p>
              <p>Origin: {info.origin}</p>
              <p>Destination: {info.destination}</p>
              <p>Price: {totalPrice} Taka</p>
            </div>
          </Fragment>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TicketConfirm;
