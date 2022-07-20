import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import apiRouter from './api/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log('app is listening on port ' + port);
});
