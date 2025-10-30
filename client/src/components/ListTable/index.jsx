import React from "react";
import {Button, Table} from "@mantine/core";
import swal from "sweetalert";
import moment from "moment";
import axios from "axios";

const apiUri = "http://localhost:5000/api";

function ListTable({bookingLists}) {
  const [data, setData] = React.useState([]);

  const handleDeleteButton = (element) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this ticket!",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"],
    }).then((willDelete) => {
      if (!willDelete) return;
      axios
        .delete(apiUri + `/booking-lists/${element._id}`)
        .then((res) => {
          setData((prev) => prev.filter((item) => item._id !== element._id));
          swal("Poof! Your ticket has been deleted!", {
            icon: "success",
          });
        })
        .catch((err) => {
          swal("Oops! Something went wrong!", {
            icon: "error",
          });
        });
    });
  };

  React.useEffect(() => {
    setData(bookingLists);
  }, [bookingLists]);

  const rows = data.map((element) => (
    <tr key={element._id + "93ud"}>
      <td>{moment.unix(element.departureDate).format("MMMM Do YYYY")}</td>
      <td>
        <p style={{textTransform: "capitalize"}}>{element.userDetails?.name}</p>
      </td>
      <td>{element.origin}</td>
      <td>{element.destination}</td>
      <td>
        <span style={{fontWeight: "bold"}}>0{element.seatNumber.length}</span>
      </td>
      <td>
        <Button
          onClick={() => handleDeleteButton(element)}
          style={{backgroundColor: "coral"}}
          size="xs"
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Departure Date</th>
          <th>Customer Name</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Seat Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default ListTable;
