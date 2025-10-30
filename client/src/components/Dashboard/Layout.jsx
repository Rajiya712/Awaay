import {AdminHeader} from "./AdminHeader";
import {Navbar} from "./Navbar";
import {
  AppShell,
  Burger,
  Container,
  Footer,
  MediaQuery,
  Text,
} from "@mantine/core";
import {useState} from "react";
import {Outlet} from "react-router-dom";

// react icons
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {MdOutlineManageHistory} from "react-icons/md";
import {AiOutlineUnorderedList} from "react-icons/ai";
import {MdOutlineManageAccounts} from "react-icons/md";

export default function DashboardLayout({children}) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      fixed
      navbar={
        <Navbar
          data={[
            {
              icon: MdOutlineSpaceDashboard,
              label: "Dashboard",
              link: "/dashboard",
              initiallyOpened: true,
              links: "",
            },
            {
              icon: MdOutlineManageHistory,
              label: "Manage Schedule",
              link: "manage-schedule",
              initiallyOpened: false,
              links: "",
            },
            {
              icon: AiOutlineUnorderedList,
              label: "List Bookings",
              link: "list-bookings",
              initiallyOpened: false,
              links: "",
            },
            {
              icon: MdOutlineManageAccounts,
              label: "User Management",
              link: "user-management",
              initiallyOpened: false,
              links: "",
            },
          ]}
          hidden={!opened}
        />
      }
      navbarOffsetBreakpoint="md"
      header={
        <AdminHeader
          burger={
            <MediaQuery largerThan="md" styles={{display: "none"}}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
          }
        />
      }
      // footer={
      //   <Footer height={50} p="md">
      //     <Text w="full" size="sm" align="center" color="gray">
      //       CopyRight © 2023 Jotyy
      //     </Text>
      //   </Footer>
      // }
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
        minHeight: "100vh",
      })}
    >
      <Container fluid>
        <Outlet />
      </Container>
    </AppShell>
  );
}
