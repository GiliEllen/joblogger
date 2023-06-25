import React, { FC, useEffect, useState } from "react";
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
  jobsList: any[];
}

const Filter: FC<FilterProps> = ({ filterList, setFilterList, jobsList }) => {
  const [filter, setFilter] = useState();
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState("");

  const filterByList = ["title", "company"];

  const handleChange = (ev: any) => {
    setFilter(ev.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    console.log(searchString);
    const regExp = new RegExp(searchString, "g");

    if (searchString === "") {
      setFilterList(jobsList);
    } else if (filter === "title") {
      const newFilterList = jobsList.filter((item) => {
        //@ts-ignore
        if (regExp.test(item.job.title)) {
          return item;
        }
      });
      setFilterList(newFilterList);
    } else if (filter === "company") {
      const newFilterList = jobsList.filter((item) => {
        //@ts-ignore
        if (regExp.test(item.job.company_name)) {
          return item;
        }
      });
      setFilterList(newFilterList);
    }
  };

  const resetSearch = () => {
    setSearchString("");
    setFilterList(jobsList);
  };

  useEffect(() => {
    handleSubmit()
  },[searchString])

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
            onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
              setSearchString(ev.target.value);
            }}
          />
        </FormControl>
      </Box>
    </Paper>
  );
};

export default Filter;
