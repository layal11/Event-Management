import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Separator from "../../components/separator/separator";
import { URL } from "../../URL";
import icon from "./man.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
  const [inputElement, setInputElement] = useState(null);
  const [fileImage, SetFileImage] = useState([]); // To send File
  const user = useSelector((state) => state.user);
  const _id = user._id;
  useEffect(() => {
    setFirstName(user.name);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setCity(user.address?.city);
    setCountry(user.address?.country);
    setLongitude(user.location?.coordinates[0]);
    setLatitude(user.location?.coordinates[1]);
  }, [user]);
  const onFileChange = (event) => {
    // Update the state
    // console.log(global.URL.createObjectURL(event.target.files[0]));
    SetFileImage(event.target.files);
    setImage(global.URL.createObjectURL(event.target.files[0]));
  };
  const handleUpdate = async (event) => {
    const location = { coordinates: [longitude, latitude] };
    const formData = new FormData();
    const address = { city: city, country: country };

    formData.append("_id", _id);
    formData.append("name", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("location", JSON.stringify(location));
    formData.append("phone", phone);
    formData.append("address", JSON.stringify(address));
    formData.append("user-image", fileImage[0]);
    console.log(formData);
    const result = await axios.post(`${URL}user/update`, formData, {
      headers: {
        Accept: "application/json",
      },
    });
  };

  return (
    <Grid container>
      <Grid item xs={5}>
        <Grid container style={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <TextField
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              label="First Name"
              value={firstName}
              variant="standard"
            />
          </Grid>
          <Separator space="10px" />
          <Grid item xs={12}>
            <TextField
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              label="Last Name"
              value={lastName}
              variant="standard"
            />
          </Grid>
          <Separator space="10px" />
          <Grid item xs={12}>
            <TextField
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              label="Email"
              value={email}
              variant="standard"
            />
          </Grid>
          <Separator space="10px" />
          <Grid item xs={12}>
            <TextField
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              label="Phone"
              value={phone}
              variant="standard"
            />
          </Grid>
          <Separator space="10px" />
          <Grid item xs={12}>
            <TextField
              onChange={(event) => {
                setCity(event.target.value);
              }}
              label="City"
              value={city}
              variant="standard"
            />
          </Grid>
          <Separator space="10px" />
          <Grid item xs={12}>
            <TextField
              onChange={(event) => {
                setCountry(event.target.value);
              }}
              label="Country"
              value={country}
              variant="standard"
            />
          </Grid>
          <Separator space="10px" />
          <Grid item xs={12}>
            <Button
              onClick={(e) => {
                navigator.geolocation.getCurrentPosition((data) => {
                  const { coords } = data;
                  //   const coords = data.coords;
                  if (coords) {
                    // const { latitude, longitude } = coords;
                    setLongitude(coords.longitude);
                    setLatitude(coords.latitude);
                  }
                });
              }}
            >
              Get Current Location
            </Button>

            <Typography>
              Long: {longitude} Lat: {latitude}
              {/* {longitude && latitude ? (
                <div>Location fetched successfully </div>
              ) : (
                <div> Can't get location </div>
              )} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Avatar style={{ width: "8rem", height: "8rem" }}>
          <img
            src={!image ? icon : image}
            style={{ width: "100%" }}
            onClick={(e) => {
              inputElement.click();
            }}
          />
        </Avatar>
        <input
          ref={(input) => {
            //trigger click
            // get the element ref to use it inorder to trigger the click event inputElement.click();
            setInputElement(input);
          }}
          type="file"
          onChange={onFileChange}
          style={{ display: "none" }}
        ></input>
        <br />
        <Button onClick={handleUpdate}>Save</Button>
      </Grid>
    </Grid>
  );
};
export default Profile;
