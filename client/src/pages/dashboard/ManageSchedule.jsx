import React, {useEffect, useState} from "react";
import axios from "axios";
import ListSchedule from "../../components/ListSchedule";
import {Box, Button, Grid} from "@mantine/core";
import ScheduleModal from "../../components/ScheduleModal";
import {useDisclosure} from "@mantine/hooks";
import swal from "sweetalert";
import {v4 as uuidv4} from "uuid";

function generateShortId() {
  const uuid = uuidv4().replace(/-/g, ""); // Generate UUID and remove dashes
  const shortId = uuid.substr(0, 6); // Extract first 6 characters
  return shortId;
}

function ManageSchedule() {
  const [opened, {open, close}] = useDisclosure(false);

  const [scheduleListsData, setScheduleListsData] = useState([]);

  useEffect(() => {
    const uri = "http://localhost:5000/api";
    const getScheduleListsData = async () => {
      const response = await axios(uri + `/bus`);
      setScheduleListsData(response.data);
    };
    getScheduleListsData();
    return () => {};
  }, []);

  const handleAddSchedule = () => {
    open();
  };

  const handleAction = (data, clearInput) => {
    const {busType, departureTime, origin, destination, seatPrice, totalSeats} =
      data;

    if (
      !busType ||
      !departureTime ||
      !origin ||
      !destination ||
      !seatPrice ||
      !totalSeats
    ) {
      swal("Please fill all the fields", "", "error");
      return;
    }
    const newData = {
      busId: generateShortId(),
      busType,
      departureTime,
      origin,
      destination,
      seatPrice,
      totalSeats,
    };
    axios
      .post("http://localhost:5000/api/bus", newData)
      .then((res) => {
        setScheduleListsData((prev) => [...prev, newData]);
        clearInput();
        swal("Poof! Your Bus schedule has been added!");
      })
      .catch((err) => {
        console.log(err);
        swal("Something went wrong!", "", "error");
      });
  };
  return (
    <React.Fragment>
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h2>Manage Schedule</h2>
          <Button onClick={handleAddSchedule}>Add Schedule</Button>
        </Box>
        <ListSchedule scheduleListsData={scheduleListsData} />
      </div>
      <ScheduleModal
        handleAction={handleAction}
        opened={opened}
        close={close}
        isNew={true}
      />
    </React.Fragment>
  );
}

export default ManageSchedule;
