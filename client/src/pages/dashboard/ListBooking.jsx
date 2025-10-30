import React, {useEffect, useState} from "react";
import axios from "axios";
import ListTable from "../../components/ListTable";

function ListBooking() {
  const [bookingLists, setBookingLists] = useState([]);

  useEffect(() => {
    const uri = "http://localhost:5000/api";
    const getBookingLists = async () => {
      const response = await axios(uri + `/booking-lists`);
      setBookingLists(response.data);
    };
    getBookingLists();
    return () => {};
  }, []);

  return (
    <div>
      <h2>List Bookings</h2>
      <ListTable bookingLists={bookingLists} />
    </div>
  );
}

export default ListBooking;
