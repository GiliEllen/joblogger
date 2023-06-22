import React, { FC, useState } from "react";
import { Job } from "../features/jobs/jobModel";
import {
  Paper,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface FilterProps {
  filterList: Job[];
  setFilterList: CallableFunction;
}

const Filter: FC<FilterProps> = ({ filterList, setFilterList }) => {
  const [filter, setFilter] = useState();
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState("");

  const filterByList = ["title", "company", "All"];

  const handleChange = (ev: any) => {
    setFilter(ev.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    console.log("submitted");

    setSearchString(ev.target.value);

    const regExp = new RegExp(searchString);

    const newFilterList = filterList.filter((item) => {
      if (regExp.test(item.title)) return item;
    });
    console.log(newFilterList);
  };

  return (
    <Paper>
      <Box>
        <FormControl
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box onClick={handleOpen}>
            <FilterListIcon />
          </Box>

          <InputLabel sx={{ paddingLeft: "30px" }} id="select-label">
            Filter
          </InputLabel>
          <Select
            labelId="select-label"
            id="simple-select"
            label="Filter"
            onChange={handleChange}
            sx={{ width: "150px" }}
            value={filter}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
          >
            {filterByList.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchString}
            onInput={handleSubmit}
          />
          <Button type="submit">Filter</Button>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default Filter;
