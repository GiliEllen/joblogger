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
  Checkbox,
  FormControlLabel,
  Stack,
  InputAdornment,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Status } from "./LinearProgressStatus";
import SearchIcon from "@mui/icons-material/Search";

interface FilterProps {
  filterList: Job[];
  setFilterList: CallableFunction;
  jobsList: any[];
}

const Filter: FC<FilterProps> = ({ filterList, setFilterList, jobsList }) => {
  const [filter, setFilter] = useState();
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [hideArchive, setHideArchive] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const [filterExist, setFilterExist] = useState<boolean>();
  const [statusFilterExist, setStatusFilterExist] = useState<boolean>();

  const filterByList = ["title", "company"];

  const statusList = [
    Status.APPLIED,
    Status.CV,
    Status.DENIED,
    Status.HIRED,
    Status.IP,
    Status.IV,
    Status.TEST,
    "All",
  ];

  const handleChange = (ev: any) => {
    setFilter(ev.target.value);
    if (filter) {
      setFilterExist(true);
    } else {
      setFilterExist(false);
    }
  };
  const handleChangeStatus = (ev: any) => {
    setStatusFilter(ev.target.value);
    if (statusFilter) {
      setStatusFilterExist(true);
    } else {
      setStatusFilterExist(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    const regExp = new RegExp(searchString, "i");
    console.log(searchString);
    if (searchString === "") {
      setFilterList(jobsList);
      console.log("here");
    } else if (filter === "title") {
      let newFilterList = filterList.filter((item) => {
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

  const toggleHideArchive = () => {
    if (hideArchive) {
      //@ts-ignore
      const list = filterList.filter((item) => item.job.archive === false);
      setFilterList(list);
    } else if (!hideArchive) {
      setFilterList(jobsList);
    }
  };

  const filterByStatus = () => {
    if (statusFilter) {
      if (statusFilter === "All") {
        setFilterList(jobsList);
      } else {
        const list = filterList.filter(
          //@ts-ignore
          (item) => item.job.status === statusFilter
        );
        setFilterList(list);
      }
    } else if (!statusFilter) {
      setFilterList(jobsList);
    }
  };

  useEffect(() => {
    if (hideArchive) {
      //@ts-ignore
      const list = filterList.filter((item) => item.job.archive === false);
      setFilterList(list);
    } else if (!hideArchive) {
      setFilterList(jobsList);
    }
  }, [hideArchive]);

  useEffect(() => {
    filterByStatus();
  }, [statusFilter]);

  useEffect(() => {
    handleSubmit();
  }, [searchString]);

  // useEffect(() => {
  //   if (statusFilterExist) {
  //     filterByStatus();
  //   }
  //   if (hideArchive) {
  //     toggleHideArchive();
  //   }
  //   // if (searchString || searchString === "") {
  //   //   handleSubmit();
  //   // }
  // }, [searchString, statusFilter, hideArchive]);

  return (
    <Paper>
      <Box>
        <Stack
          spacing={3}
          direction={"row"}
          alignItems={"center"}
          sx={{ padding: 2 }}
        >
          <Box onClick={handleOpen}>
            <FilterListIcon />
          </Box>
          <FormControl>
            <InputLabel id="select-label-status">Status</InputLabel>
            <Select
              labelId="select-label-status"
              id="select-status"
              label="Status"
              onChange={handleChangeStatus}
              sx={{ width: "150px" }}
              value={statusFilter}
            >
              {statusList.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-label">Filter</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              label="Filter"
              onChange={handleChange}
              sx={{ width: "150px" }}
              value={filter}
              // open={open}
              // onClose={handleClose}
              // onOpen={handleOpen}
            >
              {filterByList.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchString}
              type="search"
              onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
                setSearchString(ev.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label="Hide Archived"
              onClick={(ev: any) => {
                setHideArchive(ev.target.checked);
              }}
            />
          </FormControl>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Filter;
