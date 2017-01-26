import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import api from './routes';
import './configdb';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', api);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
