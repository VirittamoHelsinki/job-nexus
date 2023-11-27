import React, { useState, useEffect } from 'react';
import config from '../config';

//const initialSkills = ['React', 'MongoDB', 'Node.js', 'Express', 'Python', 'C#'];

function JobForm() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [newSkill, setNewSkill] = useState('');

  //const [availableSkills, setAvailableSkills] = useState(initialSkills);
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + '/api/jobs')
      .then(response => response.json())
      .then(jobs => {
        const skillCounts = {};
        
        jobs.forEach(job => {
          // Include job's skills only if the team matches or if no team is selected
          if (selectedTeam === '' || job.team === selectedTeam) {
            job.skills.forEach(skill => {
              skillCounts[skill] = (skillCounts[skill] || 0) + 1;
            });
          }
        });

        const sortedSkills = Object.entries(skillCounts)
          .sort((a, b) => b[1] - a[1])
          .map(entry => entry[0]);

        setAvailableSkills(sortedSkills);
      })
      .catch(error => console.error('Error fetching skills:', error));
  }, [selectedTeam]); // Dependency array includes selectedTeam

  const handleSkillButtonClick = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setAvailableSkills(availableSkills.filter(item => item !== skill));
  };

  const handleAddNewSkill = () => {
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkill(''); // Clear the input field after adding
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(item => item !== skill));
    if (availableSkills.includes(skill)) {
      setAvailableSkills([...availableSkills, skill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!company || !role || !link || !deadline || selectedSkills.length === 0 || !selectedTeam) {
      alert('Please fill in all fields, select at least one skill, and choose a team.');
      return;
    }

    const newJob = {
      company: company,
      role: role,
      link: link,
      deadline: deadline,
      skills: selectedSkills,
      team: selectedTeam,
    };

    fetch(config.apiUrl + '/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data posted successfully:', data);
        // Optionally, reset the form fields here
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Team">Tiimi: </label>
      <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">Valitse tiimi</option>
        <option value="ICT">ICT</option>
        <option value="Media">Media</option>
        <option value="Softa">Softa</option>
      </select>
      <label htmlFor="Yritys">Yrityksen nimi: </label>
      <input type="text" placeholder="" value={company} onChange={(e) => setCompany(e.target.value)} />
      <label htmlFor="Rooli">Työtehtävä/Rooli: </label>
      <input type="text" placeholder="" value={role} onChange={(e) => setRole(e.target.value)} />
      <label htmlFor="Ilmoituslinkki">Ilmoituksen URL-osoite: </label>
      <input type="text" placeholder="" value={link} onChange={(e) => setLink(e.target.value)} />
      <label>Viimeinen hakupäivä: </label>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <label htmlFor="newSkill">Lisää uusi taito: </label>
      <input
        type="text"
        id="newSkill"
        placeholder="Kirjoita uusi taito"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
      />
      <button type="button" className="button blue-button" onClick={handleAddNewSkill}>Lisää</button>
      
      <br/><label>Valitse taidot: </label><br/>
      {availableSkills.map((skill, index) => (
        <button
          type="button"
          key={index}
          className="button gray-button"
          onClick={() => handleSkillButtonClick(skill)}
        >
          {skill}
        </button>
      ))}
      
      <br/><label>Valitut taidot:</label><br/>
      {selectedSkills.map((skill, index) => (
        <button
          type="button"
          key={index}
          className="button blue-button"
          onClick={() => removeSkill(skill)}
        >
          {skill}
        </button>
      ))}

      <br/><br/>
      <button type="submit" className="button green-button">Lisää työpaikka</button>
      </form>
  );
}

export default JobForm;


/*
import React, { useState } from 'react';
import config from '../config';

const initialSkills = ['React', 'MongoDB', 'Node.js', 'Express', 'Python', 'C#'];

function JobForm() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleSkillButtonClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(item => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddNewSkill = () => {
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkill(''); // Clear the input field after adding
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!company || !role || !link || !deadline || selectedSkills.length === 0 || !selectedTeam) {
      alert('Please fill in all fields, select at least one skill, and choose a team.');
      return;
    }

    const newJob = {
      company: company,
      role: role,
      link: link,
      deadline: deadline,
      skills: selectedSkills,
      team: selectedTeam,
    };

    fetch(config.apiUrl + '/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data posted successfully:', data);
        // Optionally, reset the form fields here
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Team">Tiimi: </label>
      <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        <option value="">Valitse tiimi</option>
        <option value="ICT">ICT</option>
        <option value="Media">Media</option>
        <option value="Softa">Softa</option>
      </select>
      <label htmlFor="Yritys">Yrityksen nimi: </label>
      <input type="text" placeholder="" value={company} onChange={(e) => setCompany(e.target.value)} />
      <label htmlFor="Rooli">Työtehtävä/Rooli: </label>
      <input type="text" placeholder="" value={role} onChange={(e) => setRole(e.target.value)} />
      <label htmlFor="Ilmoituslinkki">Ilmoituksen URL-osoite: </label>
      <input type="text" placeholder="" value={link} onChange={(e) => setLink(e.target.value)} />
      <label>Viimeinen hakupäivä: </label>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <label htmlFor="newSkill">Lisää uusi taito: </label>
      <input
        type="text"
        id="newSkill"
        placeholder="Kirjoita uusi taito"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}/>
      <button type="button" className="button blue-button" onClick={handleAddNewSkill}>Lisää</button>
      <br></br><label>Valitse taidot: </label><br/>
      {initialSkills.map((skill, index) => (
                <button
                type="button"
                key={index}
                className={`button ${selectedSkills.includes(skill) ? 'blue-button' : 'gray-button'}`}
                onClick={() => handleSkillButtonClick(skill)}
              >
                {skill}
              </button>
      ))}
      <br></br><label>Valitut taidot:</label><br></br>
      {selectedSkills.map((skill, index) => (
        <button
          type="button"
          key={index}
          className="button blue-button"
        >
          {skill}
        </button>
      ))}

      <br/><br/>
      <button type="submit" className="button green-button">Lisää työpaikka</button>
      </form>
  );
}

export default JobForm;
*/