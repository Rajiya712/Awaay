import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import AboutPage from "./pages/About";
import ContactUsPage from "./pages/ContactUs";
import Auth from "./pages/Auth";
import BookingDetailsPage from "./pages/BookDetails";
import MyProfile from "./pages/MyProfile";
import MakeBooking from "./pages/MakeBooking";
import MyTickets from "./pages/MyTickets";
import Layout from "./components/Layout";
import DashboardLayout from "./components/Dashboard/Layout";
import ManageSchedule from "./pages/dashboard/ManageSchedule";
import ListBooking from "./pages/dashboard/ListBooking";
import UserManagement from "./pages/dashboard/UserManagement";
import TicketConfirm from "./pages/TicketConfirm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: () => <h1>Loading Home Page...</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "sign-up",
        element: <Auth />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "make-booking/:busId/:date",
        element: <MakeBooking />,
      },
      {
        path: "my-tickets",
        element: <MyTickets />,
      },
      {
        path: "book-details",
        element: <BookingDetailsPage />,
      },
      {
        path: "/confirm-booking/:bookingId",
        element: <TicketConfirm />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: () => <h1>Loading Dashboard...</h1>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "manage-schedule",
        element: <ManageSchedule />,
      },
      {
        path: "list-bookings",
        element: <ListBooking />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Route not found</h1>,
  },
]);

export default router;
