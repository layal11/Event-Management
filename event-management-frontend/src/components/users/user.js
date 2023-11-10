import { Avatar, Button, Grid, Paper } from "@mui/material";
import React from "react";
import image from "./../../Pages/profile/man.png";
const User = (props) => {
  const { data } = props;
  return (
    <Paper style={{ textAlign: "center", padding: "20px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Avatar style={{ margin: "auto", height: "100px", width: "100px" }}>
            <img
              src={
                data.image && data.image != ""
                  ? "http://localhost:5000/" +
                    data.image.replace("uploads/", "")
                  : image
              }
              style={{ width: "100%", height: "100px" }}
            ></img>
          </Avatar>
        </Grid>
        <Grid item xs={12} style={{ padding: "20px" }}>
          {`${data.name} ${data.lastName}`}
        </Grid>
        <Grid item xs={12}>
          {/* <Button>Connect</Button> */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default User;
