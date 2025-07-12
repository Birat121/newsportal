import dotenv from 'dotenv';
dotenv.config(); // ✅ Move this to the top

import express from 'express';
import connectDb from './utils/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adRouter from './routes/AdRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api/ads', adRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
