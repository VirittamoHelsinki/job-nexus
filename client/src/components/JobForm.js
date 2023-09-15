import React, { useState } from 'react';

const initialSkills = ['React', 'MongoDB', 'Node.js', 'Express', 'Python', 'C#'];

function JobForm() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillButtonClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(item => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     // Check for empty fields
    if (!company || !role || !link || !deadline || selectedSkills.length === 0) {
      alert('Please fill in all fields and select at least one skill.');
      return;
    }
    
    const newJob = {
      company: company,
      role: role,
      link: link,
      deadline: deadline,
      skills: selectedSkills
    };

    console.log('Data to be posted:', newJob);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="Yritys">Yrityksen nimi: </label>
      <input type="text" placeholder="" value={company} onChange={(e) => setCompany(e.target.value)} />
      <label for="Rooli">Työtehtävä/Rooli: </label>
      <input type="text" placeholder="" value={role} onChange={(e) => setRole(e.target.value)} />
      <label for="Ilmoituslinkki">Ilmoituksen URL-osoite: </label>
      <input type="text" placeholder="" value={link} onChange={(e) => setLink(e.target.value)} />
      <label>Viimeinen hakupäivä: </label>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <label>Valitse taidot: </label><br/>
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
      <br/><br/>
      <button type="submit" className="button green-button">Lisää työpaikka</button>
    </form>
  );
}

export default JobForm;