import React, { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface JobItemProps {
  item: any;
}

const JobItem: FC<JobItemProps> = ({ item }) => {
  const {
    company_name,
    title,
    company_description,
    title_description,
    connection,
    date_CV_sent,
    notes,
  } = item;
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
      <button>Edit Job</button>
      <button>Delete</button>
      <button>Archive</button>
    </div>
  );
};

export default JobItem;
