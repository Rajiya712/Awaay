import React from "react";
import { Modal, Group, Stepper, Button } from "@mantine/core";
import { BusContext } from "../../contexts/BusContext";
const BusModal = ({ opened, close, dest, origin, date }) => {
  const dateObject = new Date(date);

  // Get the individual components of the date
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth(); // Note: Months are zero-indexed (0-11)
  const day = dateObject.getDate();

  // Create a new Date object with the extracted components to get rid of the time part
  const extractedDate = new Date(year, month, day);

  // Convert the extractedDate back to a formatted string
  const formattedDate = extractedDate.toDateString();
  const [active, setActive] = React.useState(0);
  const [bus, seBus] = React.useState({});
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div>
      <Modal size="xl" opened={opened} onClose={close} title="" centered>
        {/* Modal content */}
        <h1>dest{dest}</h1>
        <h2>origin:{origin}</h2>
        <h2>date:{formattedDate}</h2>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First step" description="Create an account">
            Step 1 content: Create an account
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            Step 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default BusModal;
