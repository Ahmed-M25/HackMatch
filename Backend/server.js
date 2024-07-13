import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import fs from 'fs';
import { exec } from 'child_process';

const app = express();

app.use(cors());

const mongoURI = 'mongodb+srv://ahmedm25085:ZB1k9e43l87fUEDt@cluster0.suaxm1l.mongodb.net/';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/auth', authRoutes);

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

app.get('/api/generate_and_form_teams', (req, res) => {
  exec('source ../../venv/bin/activate && python Embeddings.py > embeddings.log 2>&1', { cwd: './Backend/VectorSearch', shell: '/bin/bash' }, (error, stdout, stderr) => {
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

      exec('source ../../venv/bin/activate && python FormingTeams.py > formingteams.log 2>&1', { cwd: './Backend/VectorSearch', shell: '/bin/bash' }, (error, stdout, stderr) => {
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
});

// Get teams
app.get('/api/teams', (req, res) => {
  res.status(200).json(teams);
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});