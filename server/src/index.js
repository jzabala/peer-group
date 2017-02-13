import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import api from './routes';
import config from './config';

// Mongodb config
mongoose.Promise = Promise;
mongoose.connect(config.database);

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', api);
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'static', 'index.html')));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
