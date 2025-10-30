import React from "react";
import dayjs from "dayjs";
import {Group, Select, UnstyledButton} from "@mantine/core";
import {Calendar} from "@mantine/dates";
import {BsFillCalendarFill} from "react-icons/bs";
import {DatePickerInput} from "@mantine/dates";
import {useStyles} from "../HomeSection/HeroSection/style";
import {Box, Container, Grid, Text, Menu, Input} from "@mantine/core";
import TicketCard from "../Cards/TicketCard/TicketCard";
const MakeBooking = () => {
  const [selected, setSelected] = React.useState([]);
  const {classes} = useStyles();

  const handleSelect = (date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };
  return (
    <Container my={20}>
      <Grid>
        <Grid.Col span={12} md={6}>
          <TicketCard />
        </Grid.Col>
        <Grid.Col span={12} md={6}>
          <Box>
            <Group position="center">
              <DatePickerInput
                sx={(theme) => ({
                  width: "100%",
                })}
                // mt="md"
                popoverProps={{withinPortal: true}}
                label="SELECT DATE"
                placeholder="When will you leave?"
                // classNames={classes}
                clearable={false}
              />
            </Group>
          </Box>

          {/* Select dest&origin */}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "11px",
            }}
          >
            <Select
              label="Origin"
              placeholder="Pick one"
              data={[
                {value: "react", label: "React"},
                {value: "ng", label: "Angular"},
                {value: "svelte", label: "Svelte"},
                {value: "vue", label: "Vue"},
              ]}
            />
            <Select
              label="Destination"
              placeholder="Pick one"
              data={[
                {value: "react", label: "React"},
                {value: "ng", label: "Angular"},
                {value: "svelte", label: "Svelte"},
                {value: "vue", label: "Vue"},
              ]}
            />
          </Box>
          {/* Bus Types */}
          <Select
            label="Bus Types"
            placeholder="Pick one"
            data={[
              {value: "react", label: "React"},
              {value: "ng", label: "Angular"},
              {value: "svelte", label: "Svelte"},
              {value: "vue", label: "Vue"},
            ]}
          />
          <UnstyledButton
            sx={(theme) => ({
              backgroundColor: "gainsboro",
              width: "100%",
              textAlign: "center",
              fontSize: "19px",
              padding: "12px 5px",
              borderRadius: theme.radius.sm,
              marginTop: "11px",
              ":hover": {
                backgroundColor: "red",
              },
            })}
          >
            Search
          </UnstyledButton>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default MakeBooking;
