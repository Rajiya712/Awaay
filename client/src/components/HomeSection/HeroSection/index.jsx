import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, Select, Text, Title} from "@mantine/core";
import {useStyles} from "./style";
import {DatePickerInput} from "@mantine/dates";
import {BusContext} from "../../../contexts/BusContext";
import swal from "sweetalert";

const HeroSection = () => {
  const {classes} = useStyles();
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);

  const {
    buses,
    setSearchResult,
    setOrigin,
    setDest,
    dest,
    origin,
    departureDate,
    setDepartureDate,
  } = React.useContext(BusContext);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!origin) {
      swal("Please select a origin!");
      return;
    }
    if (!dest) {
      swal("Please select a destination!");
      return;
    }
    if (!departureDate) {
      swal("Please select a departure date!");
      return;
    }

    const rodName = `${origin}-${dest}`;
    const cleanedRodName = rodName.replace(/\s*-\s*/g, "-");

    let result = [];
    buses?.forEach((bus) => {
      const busRoadNameArray = `${bus.origin}-${bus.destination}`.split("-");
      const dataRoadArray = cleanedRodName.split("-");
      if (areStringArraysEqual(busRoadNameArray, dataRoadArray)) {
        result.push({...bus, departureDate});
      }
    });
    if (result.length > 0) {
      setSearchResult(result);
    } else {
      swal({
        icon: "info",
        title: "Bus Not Found!",
      });
    }
  };

  const areStringArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every(
      (element, index) => element.trim() === arr2[index].trim()
    );
  };

  const handleDate = (date) => {
    setDepartureDate(date);
  };

  function getUniqueValues(inputArray) {
    // Create a Set from the inputArray to remove duplicates
    const uniqueSet = new Set(inputArray);

    // Convert the Set back to an array
    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
  }

  React.useEffect(() => {
    const newFrom = [];
    buses?.forEach((bus) => {
      newFrom.push(bus.origin);
    });
    const uniqueFrom = getUniqueValues(newFrom);
    setFrom(uniqueFrom);
  }, [buses]);

  React.useEffect(() => {
    const result = buses.filter((bus) => bus.origin === origin);
    const newTo = [];
    result?.forEach((bus) => {
      newTo.push(bus.destination);
    });
    const uniqueTo = getUniqueValues(newTo);
    setTo(uniqueTo);
  }, [buses, origin]);

  return (
    <Box component="section" py={40} className={classes.heroSection}>
      <Container size="xl">
        <Title order={1} size={45}>
          Ticketing made easy!
        </Title>
        <Text size={20} fw="bold">
          Buy tickets online hassle-free.
        </Text>
        <Box mt={50} component="div" className={classes.inputsContainer} p={10}>
          <Grid align="center">
            <Grid.Col xs={12} sm={10}>
              <Grid align="center">
                <Grid.Col xs={12} sm={4} mx={0}>
                  <Select
                    withinPortal
                    onChange={(v) => {
                      setDest(null);
                      setOrigin(v);
                    }}
                    data={from}
                    placeholder="Choose Your Location"
                    label="FROM"
                    classNames={classes}
                    value={origin}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={4} mx={0}>
                  <Select
                    onChange={setDest}
                    withinPortal
                    data={to}
                    placeholder="Choose Your Destination"
                    label="TO"
                    classNames={classes}
                    value={dest}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={4} mx={0}>
                  <DatePickerInput
                    minDate={new Date()}
                    popoverProps={{withinPortal: true}}
                    label="DEPATURE DATE"
                    placeholder="When will you leave?"
                    classNames={classes}
                    clearable={false}
                    value={departureDate}
                    onChange={handleDate}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col sx={12} sm={2} span="auto" ta="center">
              <Button
                onClick={handleSearch}
                mt={20}
                radius="xl"
                size="md"
                color="red"
              >
                Search ticket
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
