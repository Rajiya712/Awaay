import React, {useEffect, useState} from "react";
import axios from "axios";
import UserLists from "../../components/UserLists";

function ListBooking() {
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const uri = "http://localhost:5000/api";
    const getUserLists = async () => {
      const response = await axios(uri + `/getAll-user`);
      setUserLists(response.data);
    };
    getUserLists();
    return () => {};
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <UserLists userLists={userLists} />
    </div>
  );
}

export default ListBooking;
