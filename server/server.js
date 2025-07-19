import dotenv from 'dotenv';
dotenv.config(); // ✅ Move this to the top

import express from 'express';
import connectDb from './utils/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adRouter from './routes/AdRoute.js';
import newsRouter from './routes/NewsRoute.js';
import authRouter from './routes/authRoute.js';
import cronRouter from './routes/CronRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use("/api/ads", adRouter);
app.use("/api/news", newsRouter);
app.use("/api/admin", authRouter);
app.use("/api/cron", cronRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
