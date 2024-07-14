import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import { exec } from 'child_process';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';
import User from './models/User.js';  // Import the User model

const app = express();

app.use(cors());

const mongoURI = 'mongodb+srv://ahmedm25085:ZB1k9e43l87fUEDt@cluster0.suaxm1l.mongodb.net/';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/auth', authRoutes);

let sampleUserProfiles = [
  {'user': 'Alice', 'tech_stack': 'Python, ML', 'interests': 'Data Science', 'preferences': ['Bob', 'Charlie', 'ant'], 'contact': 'alice@example.com'},
  {'user': 'Bob', 'tech_stack': 'JavaScript, React', 'interests': 'Web Development', 'preferences': ['Alice', 'Charlie', 'ant'], 'contact': 'bob@example.com'},
  {'user': 'Charlie', 'tech_stack': 'Python, Data Science', 'interests': 'AI', 'preferences': ['Alice', 'Bob', 'ant'], 'contact': 'charlie@example.com'},
  {'user': 'David', 'tech_stack': 'Java, Spring', 'interests': 'Backend Development', 'preferences': [], 'contact': 'david@example.com'},
  {'user': 'Eve', 'tech_stack': 'JavaScript, Node.js', 'interests': 'Full Stack', 'preferences': [], 'contact': 'eve@example.com'},
  {'user': 'Frank', 'tech_stack': 'C++, Unreal Engine', 'interests': 'Game Development', 'preferences': [], 'contact': 'frank@example.com'},
  {'user': 'Grace', 'tech_stack': 'Ruby on Rails', 'interests': 'Web Development', 'preferences': [], 'contact': 'grace@example.com'},
  {'user': 'Hannah', 'tech_stack': 'Python, Django', 'interests': 'Web Development', 'preferences': [], 'contact': 'hannah@example.com'},
  {'user': 'Ivan', 'tech_stack': 'Go, Kubernetes', 'interests': 'Cloud Engineering', 'preferences': [], 'contact': 'ivan@example.com'},
  {'user': 'Judy', 'tech_stack': 'Swift, iOS', 'interests': 'Mobile Development', 'preferences': [], 'contact': 'judy@example.com'}
];


let userProfiles = [];
let teams = {};

// Load existing profiles and teams if available
fs.readFile('./Backend/VectorSearch/user_profiles.json', (err, data) => {
  if (!err) {
      userProfiles = JSON.parse(data);
  }
});

fs.readFile('./Backend/VectorSearch/teams.json', (err, data) => {
  if (!err) {
      teams = JSON.parse(data);
  }
});

app.get('/api/generate_and_form_teams', async (req, res) => {
  try {
    // Fetch data from MongoDB
    const users = await User.find().lean();
    
    // Extract hackerStats and transform to match sampleUserProfiles format
    const mongoUserProfiles = users.map(user => {
      const { username, hackerStats } = user;
      if (!hackerStats) return null;
      return {
        user: username,
        tech_stack: hackerStats.techStack,
        interests: hackerStats.desiredRole,
        preferences: hackerStats.preferences,
        contact: hackerStats.contact
      };
    }).filter(profile => profile !== null);
    
    // Combine MongoDB data with sample user profiles
    const combinedUserProfiles = [...sampleUserProfiles, ...mongoUserProfiles];

    // Write the combined data to user_profiles.json
    fs.writeFileSync('./Backend/VectorSearch/user_profiles.json', JSON.stringify(combinedUserProfiles, null, 2));

    // Execute the Python script to generate embeddings
    exec('source ../../venv/bin/activate && python3 Embeddings.py > embeddings.log 2>&1', { cwd: './Backend/VectorSearch', shell: '/bin/bash' }, (error, stdout, stderr) => {
      console.log("Running Embeddings.py...");
      if (error) {
          console.error(`Error generating embeddings: ${stderr}`);
          console.error(`Embeddings.py log: ${fs.readFileSync('./Backend/VectorSearch/embeddings.log', 'utf8')}`);
          return res.status(500).send(`Error generating embeddings: ${stderr}`);
      }
      console.log("Embeddings.py output:", stdout);
      console.log("Embeddings.py error (if any):", stderr);

      // Check if embeddings file exists before proceeding
      if (!fs.existsSync('./Backend/VectorSearch/embeddings.npy')) {
          console.error('embeddings.npy file not found');
          return res.status(500).send('embeddings.npy file not found');
      }

      exec('source ../../venv/bin/activate && python3 FormingTeams.py > formingteams.log 2>&1', { cwd: './Backend/VectorSearch', shell: '/bin/bash' }, (error, stdout, stderr) => {
          console.log("Running FormingTeams.py...");
          if (error) {
              console.error(`Error forming teams: ${stderr}`);
              console.error(`FormingTeams.py log: ${fs.readFileSync('./Backend/VectorSearch/formingteams.log', 'utf8')}`);
              return res.status(500).send(`Error forming teams: ${stderr}`);
          }
          console.log("FormingTeams.py output:", stdout);
          console.log("FormingTeams.py error (if any):", stderr);

          fs.readFile('./Backend/VectorSearch/teams.json', (err, data) => {
              if (err) {
                  console.error(`Error reading teams file: ${err}`);
                  return res.status(500).send('Error reading teams');
              }
              teams = JSON.parse(data);
              res.status(200).json(teams);
          });
      });
    });
  } catch (err) {
    console.error(`Error generating and forming teams: ${err}`);
    res.status(500).send(`Error generating and forming teams: ${err}`);
  }
});  

// Get User's Team
app.get('/api/team', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const userId = decoded.id;

    console.log('Decoded user ID:', userId);

    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const username = user.username;

    console.log('Looking for teams for user:', username);

    fs.readFile('./Backend/VectorSearch/teams.json', (err, data) => {
      if (err) {
        console.error(`Error reading teams file: ${err}`);
        return res.status(500).send('Error reading teams');
      }

      const teams = JSON.parse(data);
      for (const teamId in teams) {
        if (teams[teamId].some(member => member.user === username)) {
          console.log(`Found team for user ${username}:`, teams[teamId]);
          return res.status(200).json(teams[teamId]);
        }
      }

      console.log(`No team found for user ${username}`);
      res.status(404).send('Team not found');
    });
  } catch (err) {
    console.error(`Error finding team: ${err}`);
    res.status(500).send(`Error finding team: ${err}`);
  }
});

// Get all teams
app.get('/api/teams', (req, res) => {
  fs.readFile('./Backend/VectorSearch/teams.json', (err, data) => {
    if (err) {
        console.error(`Error reading teams file: ${err}`);
        return res.status(500).send('Error reading teams');
    }
    const teams = JSON.parse(data);
    res.status(200).json(teams);
  });
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
