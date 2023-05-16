import express from 'express';
import api from './routes/api';
import helmet from 'helmet';
import cors from 'cors';

const app: express.Application = express();

// enable cors for all routes
app.use(cors());
app.use(helmet());

app.use('/v1', api);

export default app;
