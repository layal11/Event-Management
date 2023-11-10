import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown = (props) => {
  const { val, handleChange, items, label } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={val}
        label="Age"
        onChange={handleChange}
      >
        {items.map((item) => {
          return <MenuItem value={item._id}>{item.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
export default Dropdown;
