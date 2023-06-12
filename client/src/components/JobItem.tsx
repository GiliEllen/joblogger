import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import JobForm from "./JobForm";
import axios from "axios";

interface JobItemProps {
  item: any;
  handleArchive: CallableFunction;
}

const JobItem: FC<JobItemProps> = ({ item, handleArchive }) => {
  const {
    company_name,
    title,
    company_description,
    title_description,
    connection,
    date_CV_sent,
    notes,
    _id,
  } = item;
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleConsent, setVisibleConsent] = useState<boolean>(false);
  const [deleteConsent, setDeleteConsent] = useState<string>("");

  const handleGetConsent = () => {
    setVisibleConsent(!visibleConsent);
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      console.log(deleteConsent);
      if (deleteConsent === "Yes") {
        const { data } = await axios.delete(`/api/jobs/job/${jobId}`);
        console.log(data)
      }
    } catch (error) {
      console.error(error);
    }
  };
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
      <FontAwesomeIcon icon={faEllipsisVertical} />
      <button onClick={() => setVisibleEdit(!visibleEdit)}>Edit Job</button>
      <button onClick={() => handleGetConsent()}>Delete</button>
      <button onClick={() => handleArchive(_id)}>Archive</button>
      {visibleEdit ? <JobForm type="edit" jobId={_id} /> : null}
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
