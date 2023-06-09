import React, { FC, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import JobForm from "./JobForm";

interface JobItemProps {
  item: any;
  handleArchive: CallableFunction
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
    _id
  } = item;
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false)
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
      <button>Delete</button>
      <button onClick={() => handleArchive(_id)}>Archive</button>
      {visibleEdit ? <JobForm type="edit" jobId={_id}/> : null}
    </div>
  );
};

export default JobItem;
