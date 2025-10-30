import {
  ActionIcon,
  Box,
  Drawer,
  Header,
  Stack,
  TextInput,
  createStyles,
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconSearch, IconSettings} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    gap: theme.spacing.md,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export function AdminHeader({burger}) {
  const {classes} = useStyles();
  const [opened, {close, open}] = useDisclosure(false);

  return (
    <Header height={60} withBorder={false} className={classes.header}>
      {burger && burger}
      <Link to="/" style={{
        textDecoration:"none",
        color:"coral"
      }}>
        <h2>Web Based Bus Ticket Booking System</h2>
      </Link>
      <Box sx={{flex: 1}} />
    </Header>
  );
}

// <TextInput
//   placeholder="Search"
//   variant="filled"
//   icon={<IconSearch size="0.8rem" />}
//   sx={(theme) => ({
//     [theme.fn.smallerThan("md")]: {
//       display: "none",
//     },
//   })}
// />
// <ActionIcon onClick={open}>
//   <IconSettings size="1.25rem" />
// </ActionIcon>

// <Drawer
//   opened={opened}
//   onClose={close}
//   title="Settings"
//   position="right"
//   transitionProps={{duration: 0}}
// >
//   <Stack spacing="lg">
//     {/* <ThemeSwitcher /> */}
//     {/* <DirectionSwitcher /> */}
//   </Stack>
// </Drawer>
