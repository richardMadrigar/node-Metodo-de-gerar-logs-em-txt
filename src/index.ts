import express from 'express';

import morgan from 'morgan';
import cors from 'cors';
import morganBody from 'morgan-body';

import 'dotenv/config';

import moment from 'moment';
import fs from 'fs';
import path from 'path';
import logger from './config/configLogger';
import indexRoutes from './routes/Login.routers';

const app = express();

const createLogs = fs.createWriteStream(path.join(__dirname, './logs', `express -${moment().format(' DD-MM-YYYY')}.log`), { flags: 'a' });

morganBody(app, {
  noColors: true,
  stream: createLogs,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use(indexRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => logger.info(`Servidor rodando na porta: ${PORT}`));
