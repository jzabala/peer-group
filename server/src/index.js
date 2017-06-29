import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import api from './routes';
import config from './config';
import schema from './graphql/schema';

// Mongodb config
mongoose.Promise = Promise;
mongoose.connect(config.database);

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api', api);
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
})));
app.use(express.static(path.resolve(__dirname, 'static')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'static', 'index.html')));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
