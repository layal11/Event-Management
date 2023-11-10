import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Fetch from "../../actions/fetch";
import Separator from "../../components/separator/separator";
import Users from "./../../components/users/users";

const Connect = (props) => {
  const [nearbyUser, setNearbyUser] = useState([]);
  const [otherUser, setOther] = useState([]);
  useEffect(async () => {
    const nearbyResponse = await Fetch("GET", "user/getNearbyUsers");
    console.log(nearbyResponse);
    let excludedusers = [];
    if (nearbyResponse && nearbyResponse.success) {
      setNearbyUser(nearbyResponse.users);
      excludedusers = nearbyResponse.users.map((user) => {
        return user._id;
      });
    }
    const otheruser = await Fetch("POST", "user/GetAllUsers", {
      excludeusers: excludedusers,
    });
    setOther(otheruser.users);
  }, []);
  return (
    <>
      <Paper style={{ padding: "20px", background: "#efefef" }}>
        <Users header="Nearby users" users={nearbyUser} />
        <Separator space="20px" />
        <Users header="Other users" users={otherUser} />
      </Paper>
    </>
  );
};
export default Connect;
