import React, { useEffect } from "react";
import AddJob from "../../components/AddJob";
import JobContainer from "../../components/JobContainer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";
import { userSelector } from "../../features/user/userSlice";
import { Container, Typography } from "@mui/material";
import DrawerMenue from "../../components/DrawerMenue";


const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  return (
    <>
    <DrawerMenue/>
      <Container sx={{ height: "100vh" }}>
        <Typography
          variant="h2"
          sx={{ my: 4, textAlign: "center", color: "primary.main" }}
        >
          JobLogger
        </Typography>
        <Typography variant="h2">Current Jobs</Typography>

        <JobContainer/>
      </Container>
      {/* {user?.firstName}
      <div>
        <h1>home</h1>
        to implament: add job archive job edit job
        <AddJob />
      </div>
      <div>
        <JobContainer/>
      </div> */}
    </>
  );
};

export default Home;
