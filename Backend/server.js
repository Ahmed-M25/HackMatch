import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());

const mongoURI = 'mongodb+srv://ahmedm25085:ZB1k9e43l87fUEDt@cluster0.suaxm1l.mongodb.net/';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
