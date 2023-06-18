import React, { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import JobForm from "./JobForm";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";

interface JobItemProps {
  item: any;
  cv: any
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

  const [file, setFile] = useState<any>()

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

  const handleDownloadResume = async () => {
    const fileId = cv.fileId
    fetch(`/api/cv/download/${fileId}`)
      .then(res => res.blob())
      .then(data => {
        setFile(data);
      })
  }

  return (
    <div>
      <h1>{title}</h1>
      <h3>at {company_name}</h3>
      <p>{company_description}</p>
      <h3>My description of th job:</h3>
      <p>{title_description}</p>
      <h3>through?</h3>
      <p>{connection}</p>
      <h3>CV sent on:</h3>
      <p>{date_CV_sent}</p>
      <h3>notes</h3>
      <p>{notes}</p>
      <h3>Cv file</h3>
      {cv ? <div>
        <p>{cv.fileName}</p>
        <p>{cv.fileDescription}</p>
        <button onClick={handleDownloadResume}>download file</button>
        {file ? <a href="" download/> : null}
      </div>: <p>No file was uploaded</p>}
      <FontAwesomeIcon icon={faEllipsisVertical} />
      <button onClick={() => setVisibleEdit(!visibleEdit)}>Edit Job</button>
      <button onClick={() => handleGetConsent()}>Delete</button>
      <button onClick={() => handleArchive(_id)}>Archive</button>
      {visibleEdit ? (
        <JobForm
          type="edit"
          jobId={_id}
          archivedJob={archivedJob}
          setArchivedJob={setArchivedJob}
        />
      ) : null}
      {visibleConsent ? (
        <div>
          <h5>Are you sure you want to delete this job?</h5>
          <p>This action is not permennt</p>
          <p>
            If you are sure, please write "Yes" below, then click the button
          </p>
          <input
            type="text"
            value={deleteConsent}
            onInput={(ev: any) => setDeleteConsent(ev.target.value)}
          />
          <button
            onClick={() => {
              handleDeleteJob(_id);
            }}
            disabled={deleteConsent === "Yes" ? false : true}
          >
            DELETE
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default JobItem;
