import React, {createContext} from "react";

export const BusContext = createContext([]);

export const BusProvider = ({children}) => {
  const [buses, setBuses] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState(null);
  const [departureDate, setDepartureDate] = React.useState();
  const [busType, setBusType] = React.useState("");
  const [origin, setOrigin] = React.useState("");
  const [dest, setDest] = React.useState("");

  return (
    <BusContext.Provider
      value={{
        buses,
        setBuses,
        setSearchResult,
        searchResult,
        setBusType,
        busType,
        setOrigin,
        origin,
        setDest,
        dest,
        setDepartureDate,
        departureDate,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};
