import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
  user: string;
  tech_stack: string;
  interests: string;
  preferences: string[];
}

interface Teams {
  [key: string]: UserProfile[];
}

const Matches: React.FC = () => {
  const [teams, setTeams] = useState<Teams>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/teams');
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Formed Teams</h1>
      {Object.keys(teams).map((teamId) => (
        <div key={teamId}>
          <h2>Team {parseInt(teamId) + 1}</h2>
          <ul>
            {teams[teamId].map((member, index) => (
              <li key={index}>
                <strong>{member.user}</strong> - {member.tech_stack} - {member.interests}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Matches;
