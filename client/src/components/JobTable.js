import React, { useState } from 'react';
import JobDetail from './JobDetail';
import { formatDate, getColorClass } from '../utils/dateUtils';

const JobTable = ({ data }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showExpiredJobs, setShowExpiredJobs] = useState(true);

  const openJobDetail = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetail = () => {
    setSelectedJob(null);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
  };

  // Filter jobs with deadlines that haven't passed
  const filteredData = data.filter((job) => {
    const today = new Date();
    const deadlineDate = new Date(job.deadline);
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    const timeDifference = deadlineDate - today;
    const daysUntilDeadline = timeDifference / (1000 * 3600 * 24);

    // Include jobs with future deadlines or deadlines on the current day
    if (showExpiredJobs) {
      return daysUntilDeadline >= 0;
    } else {
      return true; // Show all jobs regardless of the deadline
    }
  });

  return (
    <div>
      <button className='button blue-button' onClick={() => setShowExpiredJobs(!showExpiredJobs)}>
        {showExpiredJobs ? 'Show Expired Jobs' : 'Hide Expired Jobs'}
      </button>
      <table className="job-table">
        <thead>
          <tr>
            <th>Yritys</th>
            <th>Rooli</th>
            <th>Taitovaatimukset</th>
            <th>Ilmoitus</th>
            <th>Viim. hakupäivä</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((job, index) => (
            <tr key={index} onClick={() => openJobDetail(job)} className={getColorClass(job.deadline)}>
              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>{job.skills.join(', ')}</td>
              <td>
                <a href={job.link} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                  Linkki
                </a>
              </td>
              <td>{formatDate(job.deadline)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedJob && <JobDetail job={selectedJob} onClose={closeJobDetail} />}
    </div>
  );
};

export default JobTable;