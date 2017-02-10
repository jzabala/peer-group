import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import api from './routes';
import config from './config';

// Mongodb config
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', api);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
