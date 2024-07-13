import React from 'react';

const Profile = () => {
    const username = localStorage.getItem('username');
    return (
        <div>
          <h2>Profile Page</h2>
          <p>Welcome, {username}!</p>
        </div>
    );
};

export default Profile;
