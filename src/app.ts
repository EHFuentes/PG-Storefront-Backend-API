import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import api from './api';

const app: express.Application = express();

// enable cors for all routes
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/v1', api);

export default app;
