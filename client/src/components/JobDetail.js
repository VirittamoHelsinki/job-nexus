import React from 'react';
import { formatDate, getColorClass } from '../utils/dateUtils';

const JobDetail = ({ job, onClose }) => {

  const ColorClass = getColorClass(job.deadline);

  return (
    <div className={`job-modal`}>
      <h2>{job.company}</h2>
      <span className="close-button" onClick={onClose}>
        X
      </span>
      <div>
        <h4>Rooli: {job.role}</h4>
        <p>{job.skills.join(', ')}</p>
        <p>
          <a href={job.link} target="_blank" rel="noopener noreferrer">
            Ilmoituslinkki
          </a>
        </p>
        <p>
          Viimeinen hakupäivä:{" "}
          <span className={ColorClass}>{formatDate(job.deadline)}</span>
        </p>
      </div>
    </div>
  );
};

export default JobDetail;