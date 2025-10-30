import {Button, Grid, Group, Input, Modal, Select} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {MdDirectionsBusFilled} from "react-icons/md";
import {BiTime} from "react-icons/bi";
import {IoLocationOutline} from "react-icons/io5";
import {MdOutlineEventSeat} from "react-icons/md";

const ScheduleModal = ({
  opened,
  close,
  isNew = false,
  editElementData,
  handleAction = () => {},
}) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [busType, setBusType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [busSeat, setBusSeat] = useState("");

  useEffect(() => {
    if (!editElementData) return;

    setOrigin(editElementData.origin);
    setDestination(editElementData.destination);
    setBusType(editElementData.busType);
    setTicketPrice(editElementData.seatPrice);
    setDepartureTime(editElementData.departureTime);
    setBusSeat(editElementData.totalSeats);

    return () => {};
  }, [editElementData]);

  const clearInput = () => {
    setOrigin("");
    setDestination("");
    setBusType("");
    setTicketPrice("");
    setDepartureTime("");
    setBusSeat("");
  };

  return (
    <Modal
      opened={opened}
      size="lg"
      onClose={close}
      title="Manage Schedule"
      centered
    >
      <Grid>
        <Grid.Col span={6}>
          <Input.Wrapper label="Origin" required>
            <Input
              icon={<IoLocationOutline />}
              placeholder="ex: Dhaka"
              onChange={(e) => {
                setOrigin(e.target.value);
              }}
              value={origin}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Input.Wrapper label="Destination" required>
            <Input
              icon={<IoLocationOutline />}
              placeholder="ex: Chittagong"
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              value={destination}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Input.Wrapper label="Bus Type" required>
            <Select
              icon={<MdDirectionsBusFilled />}
              type="select"
              placeholder="ex: AC"
              data={["AC", "Non-AC", "Coach"]}
              value={busType}
              onChange={(e) => {
                setBusType(e);
              }}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Input.Wrapper label="Ticket Price" required>
            <Input
              icon="৳"
              placeholder="ex: 500"
              onChange={(e) => {
                setTicketPrice(e.target.value);
              }}
              value={ticketPrice}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Input.Wrapper label="Departure Time" required>
            <Input
              icon={<BiTime />}
              placeholder="ex: 10:00 (24 hours format)"
              onChange={(e) => {
                setDepartureTime(e.target.value);
              }}
              value={departureTime}
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6}>
          {<Input.Wrapper label="Bus Seat" required>
            <Input
              icon={<MdOutlineEventSeat />}
              placeholder="ex: 52"
              onChange={(e) => {
                setBusSeat(e.target.value);
              }}
              value={busSeat}
            />
          </Input.Wrapper>}
        </Grid.Col>
        <Grid.Col span={12}>
          <Group position="right">
            <Button onClick={close} variant="light">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleAction(
                  {
                    ...editElementData,
                    origin: origin,
                    destination: destination,
                    busType,
                    seatPrice: ticketPrice,
                    departureTime,
                    totalSeats: busSeat,
                  },
                  clearInput
                );
                close();
              }}
              variant="filled"
            >
              {isNew ? "Save" : "Update"}
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default ScheduleModal;

// {
//     "_id": "64d25844e5a473fb90af92cd",
//     "busNumber": 19356,
//     "totalSeats": 52,
//     "availableSeats": 51,
//     "roadName": "DHAKA-DINAJPUR",
//     "busType": "Non-AC",
//     "seatPrice": 85,
//     "departureTime": "12:24",
//     "passengers": [
//         {
//             "seatNumber": [
//                 17
//             ],
//             "user": "64d3133d3afa269bc560f73b",
//             "boardingPlace": "DHAKA",
//             "destination": "DINAJPUR",
//             "purchaseDate": "2023-08-08T18:00:00.000Z",
//             "_id": "64d3ce8a31069ce70d14c24d"
//         }
//     ],
//     "__v": 1,
//     "createdAt": "2023-08-08T14:59:17.036Z",
//     "updatedAt": "2023-08-09T17:36:10.913Z"
// }
