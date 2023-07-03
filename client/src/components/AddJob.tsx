import { Container, Paper, Typography } from "@mui/material";
import DrawerMenue from "./DrawerMenue";
import JobForm from "./JobForm";
import formImage from "../assets/images/formImage.jpg";

const AddJob = () => {
  return (
    <>
      <DrawerMenue />
      <Container sx={{ height: "100vh" }}>
        <Typography
          variant="h2"
          sx={{ my: 4, textAlign: "center", color: "primary.main" }}
        >
          JobLogger
        </Typography>
        <Typography variant="h2">Add Job</Typography>
        <Container>
          <Paper sx={{ padding: 5, my: 5, position: "relative" }}>
            <JobForm type="add" />
            <img
              src={formImage}
              alt="cv files"
              style={{
                width: "450px",
                position: "absolute",
                top: "0",
                right: "0",
              }}
            />
          </Paper>
        </Container>
      </Container>
    </>
  );
};

export default AddJob;
