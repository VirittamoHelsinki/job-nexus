import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Analytics = ({ data, onClose }) => {
  const skillChartRef = useRef();
  const companyChartRef = useRef();

  useEffect(() => {
    const skillCtx = skillChartRef.current.getContext('2d');
    const skillCounts = {};

    data.forEach(job => {
      job.skills.forEach(skill => {
        if (skillCounts[skill]) {
          skillCounts[skill]++;
        } else {
          skillCounts[skill] = 1;
        }
      });
    });

    const sortedSkillCounts = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);
    const topSkillTitles = sortedSkillCounts.slice(0, 5).map(entry => entry[0]);
    const topSkillCountsData = sortedSkillCounts.slice(0, 5).map(entry => entry[1]);

    new Chart(skillCtx, {
      type: 'bar',
      data: {
        labels: topSkillTitles,
        datasets: [{
          label: 'Määrä',
          data: topSkillCountsData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const companyCtx = companyChartRef.current.getContext('2d');
    const companyCounts = {};

    data.forEach(job => {
      const companyName = job.company;
      if (companyCounts[companyName]) {
        companyCounts[companyName]++;
      } else {
        companyCounts[companyName] = 1;
      }
    });

    const sortedCompanyCounts = Object.entries(companyCounts).sort((a, b) => b[1] - a[1]);
    const topCompanyTitles = sortedCompanyCounts.slice(0, 5).map(entry => entry[0]);
    const topCompanyCountsData = sortedCompanyCounts.slice(0, 5).map(entry => entry[1]);

    new Chart(companyCtx, {
      type: 'bar',
      data: {
        labels: topCompanyTitles,
        datasets: [{
          label: 'Määrä',
          data: topCompanyCountsData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [data]);

  return (
    <div className="analytics-modal">
      <h2>Analytiikka</h2>
      <span className="close-button" onClick={onClose}>
        X
      </span>
      <div className="charts-container">
        <div className="chart">
          <h4>Taidot</h4>
          <canvas ref={skillChartRef}></canvas>
        </div>
        <div className="chart">
          <h4>Yritykset</h4>
          <canvas ref={companyChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Analytics;