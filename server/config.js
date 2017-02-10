export default {
  jwtSecret: process.env.JWT_SECRET || 'testingmongodbandnodejs',
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017/learningPath',
};
