import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./global.css";

import router from "./router";
import {RouterProvider} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import {BusProvider} from "./contexts/BusContext";
import {MantineProvider} from "@mantine/core";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider theme={{primaryColor: "red"}}>
      <BusProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </BusProvider>
    </MantineProvider>
  </React.StrictMode>
);
