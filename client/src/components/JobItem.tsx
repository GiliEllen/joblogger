import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faGaugeSimpleMed,
} from "@fortawesome/free-solid-svg-icons";
import JobForm from "./JobForm";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Paper, Typography, Button, Container, Grid } from "@mui/material";
import CardLinesButtons from "./CardLinesButtons";
import { Link } from "react-router-dom";
import ProgressBar from "./LinearProgressStatus";

interface JobItemProps {
  item: any;
  cv: any;
}

const JobItem: FC<JobItemProps> = ({ item, cv }) => {
  const {
    company_name,
    title,
    company_description,
    title_description,
    connection,
    date_CV_sent,
    notes,
    _id,
    archive,
  } = item;
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleConsent, setVisibleConsent] = useState<boolean>(false);
  const [deleteConsent, setDeleteConsent] = useState<string>("");
  const [archivedJob, setArchivedJob] = useState<boolean>(archive);

  const [cardVisibleWrap, setCardVisibleWrap] = useState({
    company_description: true,
    title_description: true,
    notes: true,
  });

  const user = useAppSelector(userSelector);

  const handleGetConsent = () => {
    setVisibleConsent(!visibleConsent);
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      console.log(deleteConsent);
      if (deleteConsent === "Yes") {
        const { data } = await axios.delete(`/api/jobs/job/${jobId}`);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (jobId: string) => {
    try {
      if (user) {
        const userId = user?._id;
        const { data } = await axios.put(`/api/jobs/job/${jobId}`);
        console.log(data);
        setArchivedJob(data.archive);
        if (data.archive) {
          console.log("archived successfully");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLength = (ev: any) => {
    const params = ev.target.id;
    if (params === "company") {
      setCardVisibleWrap({
        ...cardVisibleWrap,
        company_description: !cardVisibleWrap.company_description,
      });
    } else if (params === "notes") {
      setCardVisibleWrap({
        ...cardVisibleWrap,
        notes: !cardVisibleWrap.notes,
      });
    } else if (params === "title") {
      setCardVisibleWrap({
        ...cardVisibleWrap,
        title_description: !cardVisibleWrap.title_description,
      });
    }
  };

  return (
    <Grid item xs={6}>
    <Paper elevation={3} sx={{ p: 3, my: 4, height: "90%"}}>
      <Typography variant="h4">
        {title} {JSON.stringify(archive)}
      </Typography>
      <Container>
        <Typography variant="h5">at {company_name}</Typography>
        <Container sx={styles.sameRow}>
          <CardLinesButtons
            wrapDependency={cardVisibleWrap.company_description}
            text={company_description}
            handleClickLength={handleClickLength}
            id="company"
          />
        </Container>
      </Container>

      <Container>
        <Typography variant="h5">My description of the job:</Typography>
        <Container sx={styles.sameRow}>
          <CardLinesButtons
            wrapDependency={cardVisibleWrap.title_description}
            text={title_description}
            handleClickLength={handleClickLength}
            id="title"
          />
        </Container>
      </Container>
      <Container>
        <Typography variant="h5">Status:</Typography>
        <ProgressBar />
      </Container>
      <Container>
        <Typography variant="h5">Notes:</Typography>
        <CardLinesButtons
          wrapDependency={cardVisibleWrap.notes}
          text={notes}
          handleClickLength={handleClickLength}
          id={"notes"}
        />
      </Container>

      <Link to={`/job-info/${_id}`}>
        <Button sx={{ marginTop: "20px" }} variant="contained">
          More information
        </Button>
      </Link>
    </Paper>
    </Grid>

    // <div>
    //   <h1>{title}</h1>
    //   <h3>at {company_name}</h3>
    //   <p>{company_description}</p>
    //   <h3>My description of th job:</h3>
    //   <p>{title_description}</p>
    //   <h3>through?</h3>
    //   <p>{connection}</p>
    //   <h3>CV sent on:</h3>
    //   <p>{date_CV_sent}</p>
    //   <h3>notes</h3>
    //   <p>{notes}</p>
    //   <h3>Cv file</h3>
    //   {cv ? <div>
    //     <p>{cv.fileName}</p>
    //     <p>{cv.fileDescription}</p>
    //   </div>: <p>No file was uploaded</p>}
    //   <FontAwesomeIcon icon={faEllipsisVertical} />
    //   <button onClick={() => setVisibleEdit(!visibleEdit)}>Edit Job</button>
    //   <button onClick={() => handleGetConsent()}>Delete</button>
    //   <button onClick={() => handleArchive(_id)}>Archive</button>
    //   {visibleEdit ? (
    //     <JobForm
    //       type="edit"
    //       jobId={_id}
    //       archivedJob={archivedJob}
    //       setArchivedJob={setArchivedJob}
    //     />
    //   ) : null}
    //   {visibleConsent ? (
    //     <div>
    //       <h5>Are you sure you want to delete this job?</h5>
    //       <p>This action is not permennt</p>
    //       <p>
    //         If you are sure, please write "Yes" below, then click the button
    //       </p>
    //       <input
    //         type="text"
    //         value={deleteConsent}
    //         onInput={(ev: any) => setDeleteConsent(ev.target.value)}
    //       />
    //       <button
    //         onClick={() => {
    //           handleDeleteJob(_id);
    //         }}
    //         disabled={deleteConsent === "Yes" ? false : true}
    //       >
    //         DELETE
    //       </button>
    //     </div>
    //   ) : null}
    // </div>
  );
};

export default JobItem;

const styles = {
  sameRow: {
    display: "flex",
    alignItems: "center",
  },
};
