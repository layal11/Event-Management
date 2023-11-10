import { Grid } from "@mui/material";
import React from "react";
import User from "./user";

const Users = (props) => {
  const { header, users } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={8}>
          <h2 style={{ marginTop: "0px" }}>{header}</h2>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          {/* <span style={{ height: "fit-content", lineHeight: "27px" }}>
            See all
          </span> */}
        </Grid>
      </Grid>
      <div>
        {users && users.length > 0 ? (
          <Grid container spacing={4}>
            {users.map((user) => {
              return (
                <Grid item xs={3}>
                  <User data={user} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <h3>no {header && header.toLocaleLowerCase()} found</h3>
        )}
      </div>
    </div>
  );
};

export default Users;
