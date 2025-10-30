import React from "react";
import {Box, Button, Grid, Group, Input, Modal, Table} from "@mantine/core";
import swal from "sweetalert";
import {useDisclosure} from "@mantine/hooks";
import ScheduleModal from "../ScheduleModal";
import axios from "axios";

const apiUri = "http://localhost:5000/api";

function ListSchedule({scheduleListsData}) {
  const [opened, {open, close}] = useDisclosure(false);

  const [data, setData] = React.useState([]);
  const [editElementData, setEditElementData] = React.useState(null);

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
        .delete(apiUri + `/bus/${element._id}`)
        .then((res) => {
          setData((prev) => prev.filter((item) => item._id !== element._id));
          swal("Poof! Your Bus schedule has been deleted!", {
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("request to delete");
    });
  };

  const handleUpdateSchedule = (data) => {
    swal({
      title: "Are you sure want to update?",
      text: "Once updated, you will not be able to recover this ticket!",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Update"],
    }).then((willUpdate) => {
      if (!willUpdate) return;
      axios
        .put(apiUri + `/bus`, data)
        .then((res) => {
          setData((prev) =>
            prev.map((item) => (item._id === data._id ? data : item))
          );
          swal("Poof! Your Bus schedule has been updated!", {
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("request to update");
    });
  };

  React.useEffect(() => {
    setData(scheduleListsData);
  }, [scheduleListsData]);

  const handleEditButton = (element) => {
    setEditElementData(element);
    open();
  };

  const rows = data.map((element) => (
    <tr key={element.busId}>
      <td>{element.busId}</td>
      <td>{element.busType}</td>
      <td>{element.origin}</td>
      <td>{element.destination}</td>
      <td>{element.departureTime}</td>
      <td>৳{element.seatPrice}.00</td>
      <td>৳{element.totalSeats}.00</td>
      <td>
        <Box
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            style={{backgroundColor: "#238BE6"}}
            onClick={() => handleEditButton(element)}
            size="xs"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteButton(element)}
            style={{backgroundColor: "coral"}}
            size="xs"
          >
            Delete
          </Button>
        </Box>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Bus Type</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Ticket Price</th>
            <th>Available seat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ScheduleModal
        editElementData={editElementData}
        opened={opened}
        close={close}
        handleAction={handleUpdateSchedule}
      />
    </React.Fragment>
  );
}

export default ListSchedule;
