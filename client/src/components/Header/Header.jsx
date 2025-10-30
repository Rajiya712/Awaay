import React, {useState} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Box,
  Text,
  Image,
  Menu,
  Button,
  Indicator,
  Avatar,
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useStyles} from "./style";
import {navLinks} from "../../data/data";
import {Link, useNavigate} from "react-router-dom";
import {
  BsToggleOn,
  BsPersonCircle,
  BsTicketPerforatedFill,
} from "react-icons/bs";
import {MdOutlineSpaceDashboard} from "react-icons/md";

const HEADER_HEIGHT = rem(60);

const Header = () => {
  const navigate = useNavigate();

  const [opened, {toggle, close}] = useDisclosure(false);
  const [active, setActive] = useState(navLinks[0].link);

  const {user, isAuthenticated, login, logout} = React.useContext(AuthContext);
  const {classes, cx} = useStyles();

  const dropdownRenderItems = navLinks.map((link, index) => (
    <Link
      key={index}
      to={link.href}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
    >
      {link.label === "Sign Up" && user ? "" : link.label}
      {/* {link.label} */}
    </Link>
  ));

  const handlelogOut = () => {
    logout();
  };

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header} size="xl">
        <Box style={{cursor: "pointer"}} onClick={() => navigate("/")}>
          <Text size={26} fw={900}>
           Web Based Bus Ticket Booking System
          </Text>
        </Box>
        <Group spacing={5} className={classes.links}>
          {dropdownRenderItems}

          {user ? (
            <Box style={{display: "flex", alignItems: "center", gap: "8px"}}>
              <Text style={{fontWeight: "600"}}>
                Hi, {user?.firstName} {user?.lastName}
              </Text>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Indicator
                    style={{cursor: "pointer"}}
                    inline
                    processing
                    size={12}
                    offset={7}
                  >
                    <Avatar size="md" radius="xl" src={user?.img} alt="user" />
                  </Indicator>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Profile</Menu.Label>
                  <Menu.Item
                    onClick={() => navigate("/my-profile")}
                    icon={<BsPersonCircle size={14} />}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => navigate("/my-tickets")}
                    icon={<BsTicketPerforatedFill size={14} />}
                  >
                    My ticket
                  </Menu.Item>
                  {/* {user.isAdmin && (
                    <Menu.Item
                      onClick={() => navigate("/dashboard")}
                      icon={<MdOutlineSpaceDashboard size={14} />}
                    >
                      Dashboard
                    </Menu.Item>
                  )} */}

                  <Menu.Divider />

                  <Menu.Label>Danger zone</Menu.Label>

                  <Menu.Item
                    onClick={handlelogOut}
                    color="red"
                    icon={<BsToggleOn />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          ) : null}
          {user?.isAdmin ? (
            <Link
              style={{marginLeft: "10px"}}
              to="/dashboard"
              className={cx(classes.link, {
                [classes.linkActive]: active === "dashboard",
              })}
            >
              <Button>Dashboard</Button>
            </Link>
          ) : (
            ""
          )}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {dropdownRenderItems}
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  );
};

export default Header;
