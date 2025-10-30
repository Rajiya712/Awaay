import React, {useEffect, useState} from "react";
import {Button, Table} from "@mantine/core";
import swal from "sweetalert";
import axios from "axios";

function UserLists({userLists}) {
  const [users, setUsers] = useState([]);

  const handleMakeAdminButton = (id) => {
    swal({
      title: "Are you sure?",
      text: "Admin will access all the dashboard functionality!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willMakeAdmin) => {
      if (!willMakeAdmin) return;
      axios
        .put(`http://localhost:5000/api/auth/make-admin`, {
          isAdmin: true,
          _id: id,
        })
        .then((res) => {
          setUsers((prev) =>
            prev.map((user) => {
              if (user._id === id) {
                return {...user, isAdmin: true};
              }
              return user;
            })
          );
          swal("Successfully added!", {
            icon: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  const handleRemoveAdminButton = (id) => {
    swal({
      title: "Are you sure want to remove Admin?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willRemoveAdmin) => {
      if (!willRemoveAdmin) return;
      axios
        .put(`http://localhost:5000/api/auth/make-admin`, {
          isAdmin: false,
          _id: id,
        })
        .then((res) => {
          setUsers((prev) =>
            prev.map((user) => {
              if (user._id === id) {
                return {...user, isAdmin: false};
              }
              return user;
            })
          );
          swal("Remove Admin", {
            icon: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  useEffect(() => {
    if (!userLists) return;
    setUsers(userLists);
  }, [userLists]);

  const rows = users?.map((element) => (
    <tr key={element._id}>
      <td>
        <p style={{textTransform: "capitalize"}}>
          {element.firstName} {element.lastName}
        </p>
      </td>
      <td>{element.email}</td>
      <td>
        {element.isAdmin ? (
          <Button onClick={() => handleRemoveAdminButton(element._id)}>
            Remove Admin
          </Button>
        ) : (
          <Button onClick={() => handleMakeAdminButton(element._id)}>
            Make Admin
          </Button>
        )}
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default UserLists;
