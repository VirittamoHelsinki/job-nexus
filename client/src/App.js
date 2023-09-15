import React, { useEffect, useState } from 'react';
import './style.css';
import Header from './components/Header';
import JobTable from './components/JobTable';
import JobForm from './components/JobForm';
import Analytics from './components/Analytics';
import { fetchData } from './utils/dataService';
import config from './config';

function App() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isJobFormVisible, setIsJobFormVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('All'); // Initialize with 'All' or the default team.

  useEffect(() => {
    fetchData(config.apiUrl + '/api/jobs')
      .then((result) => {
        setData(result);
        console.log(result);
      })
      .catch((error) => {
        // Handle errors
      });
  }, []);

  // Function to filter job ads based on the selected team.
  const filterJobsByTeam = (team) => {
    if (team === 'All') {
      return data; // Return all jobs if 'All' is selected.
    }
    return data.filter((job) => job.team === team);
  };

  // Event handler for team selection.
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const toggleAnalytics = () => {
    setIsAnalyticsOpen((prevState) => !prevState);
  };

  const toggleJobFormVisibility = () => {
    setIsJobFormVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div>
      <Header
        onJobFormToggle={toggleJobFormVisibility}
        onAnalyticsToggle={toggleAnalytics}
        onTeamSelect={handleTeamSelect} // Pass the team selection handler to the Header component.
      />
      <div className="content">
        <div className="flex">
          <div className="left">
            {/* Buttons for team selection */}
            <div>
              <button onClick={() => handleTeamSelect('All')}>All</button>
              <button onClick={() => handleTeamSelect('ICT')}>ICT</button>
              <button onClick={() => handleTeamSelect('Media')}>Media</button>
              <button onClick={() => handleTeamSelect('Softa')}>Softa</button>
            </div>
            <JobTable data={filterJobsByTeam(selectedTeam)} /> {/* Pass the filtered data */}
          </div>
          {isJobFormVisible && <div className="right"><JobForm /></div>}
          {isAnalyticsOpen && <Analytics data={filterJobsByTeam(selectedTeam)} onClose={toggleAnalytics} />}
        </div>
      </div>
    </div>
  );
}

export default App;


/*import React, { useEffect, useState } from 'react';
import "./style.css";
import Header from './components/Header';
import JobTable from './components/JobTable';
import JobForm from './components/JobForm';
import Analytics from './components/Analytics';
import { fetchData } from './utils/dataService';
import config from './config';

function App() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isJobFormVisible, setIsJobFormVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(config.apiUrl + '/api/jobs')
      .then((result) => {
        setData(result);
        console.log(result);
      })
      .catch((error) => {
        // Handle errors
      });
  }, []);
  
    const toggleAnalytics = () => {
      setIsAnalyticsOpen((prevState) => !prevState);
    };

    const toggleJobFormVisibility = () => {
      setIsJobFormVisible((prevVisibility) => !prevVisibility);
    };

    return (
    <div>
       <Header onJobFormToggle={toggleJobFormVisibility} onAnalyticsToggle={toggleAnalytics}/>
      <div className="content">
        <div className="flex">
            <div className="left"><JobTable data={data} /></div>
            {isJobFormVisible && <div className="right"><JobForm /></div>}
            {isAnalyticsOpen && <Analytics data={data} onClose={toggleAnalytics}/>}
        </div>
      </div>
    </div>
    );
}

export default App;
*/