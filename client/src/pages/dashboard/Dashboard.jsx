import {Badge, Box, Button, Card, Grid, Group, Text} from "@mantine/core";
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {HiDocumentDuplicate} from "react-icons/hi";
import {AiOutlineSchedule} from "react-icons/ai";
import {FiUsers} from "react-icons/fi";

const columnIconContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const columnIcon = {
  width: "60px",
  height: "60px",
  background: "#FFF6F5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50px",
};

const apiUri = "http://localhost:5000/api";

function Dashboard() {
  const [bookingLists, setBookingLists] = useState([]);
  const [scheduleListsData, setScheduleListsData] = useState([]);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const getBookingLists = async () => {
      const response = await axios(apiUri + `/booking-lists`);
      setBookingLists(response.data);
    };
    getBookingLists();
    return () => {};
  }, []);

  useEffect(() => {
    const getScheduleListsData = async () => {
      const response = await axios(apiUri + `/bus`);
      setScheduleListsData(response.data);
    };
    getScheduleListsData();
    return () => {};
  }, []);

  useEffect(() => {
    const getUserLists = async () => {
      const response = await axios(apiUri + `/getAll-user`);
      setUserLists(response.data);
    };
    getUserLists();
    return () => {};
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <Grid>
        <Grid.Col xs={12} sm={6} md={4}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            sx={{height: 188}}
          >
            <Box sx={columnIconContainer}>
              <Box sx={columnIcon}>
                <HiDocumentDuplicate color="#FB5252" size={30} />
              </Box>
            </Box>
            <Group
              position="center"
              sx={{display: "flex", flexDirection: "column"}}
              spacing={0}
            >
              <Text weight={500} sx={{color: "#777", fontSize: 20}}>
                Number of Booking
              </Text>
              {bookingLists.length ? (
                <Text style={{fontSize: 36, fontWeight: 700}} color="#FB5252">
                  {bookingLists.length}
                </Text>
              ) : (
                "Loading..."
              )}
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} sm={6} md={4}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            sx={{height: 188}}
          >
            <Box sx={columnIconContainer}>
              <Box sx={columnIcon}>
                <AiOutlineSchedule color="#FB5252" size={30} />
              </Box>
            </Box>
            <Group
              position="center"
              sx={{display: "flex", flexDirection: "column"}}
              spacing={0}
            >
              <Text weight={500} sx={{color: "#777", fontSize: 20}}>
                Number of Schedule
              </Text>

              {scheduleListsData.length ? (
                <Text style={{fontSize: 36, fontWeight: 700}} color="#FB5252">
                  {" "}
                  {scheduleListsData.length}
                </Text>
              ) : (
                "Loading..."
              )}
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} sm={6} md={4}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            sx={{height: 188}}
          >
            <Box sx={columnIconContainer}>
              <Box sx={columnIcon}>
                <FiUsers color="#FB5252" size={30} />
              </Box>
            </Box>
            <Group
              position="center"
              sx={{display: "flex", flexDirection: "column"}}
              spacing={0}
            >
              <Text weight={500} sx={{color: "#777", fontSize: 20}}>
                Number of User
              </Text>

              {userLists.length ? (
                <Text style={{fontSize: 36, fontWeight: 700}} color="#FB5252">
                  {" "}
                  {userLists.length}
                </Text>
              ) : (
                "Loading..."
              )}
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Dashboard;
