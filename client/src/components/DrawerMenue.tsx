import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/user/userSlice";
import { API_URL } from "../util/util";

const DrawerMenue = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    const {data} = await axios.get(`${API_URL}/api/users/logout`);
    dispatch(logout())
  }

  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      <Grid item>
        <Drawer
          variant={"temporary"}
          // {...props}
          open={open}
          onClose={() => setOpen(false)}
        >
          <List>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link style={{ textDecoration: "none" }} to="/home">
                  Home
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link style={{ textDecoration: "none" }} to="/add-job">
                  Add Job
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemText>
                <Link onClick={handleLogout} style={{ textDecoration: "none" }} to="/">
                  LogOut
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </Grid>

      <Grid item>
        <Button onClick={() => setOpen(!open)}>
          {/* {open ? "Hide" : "Show"} Drawer */}
          <MenuIcon sx={{fontSize: "50px"}}/>
        </Button>
      </Grid>
    </Grid>
  );
};

export default DrawerMenue;
