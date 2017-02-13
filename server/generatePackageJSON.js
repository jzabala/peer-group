/* eslint-disable */
const fs = require('fs');
const path = require('path');
const packageJSON = require('./package.json');

const buildPackageJSON = {
  name: packageJSON.name,
  dependencies: packageJSON.dependencies,
  scripts: {
    start: 'node index.js',
    deploy: "now -e JWT_SECRET=@learningpath-jwt-secret -e MONGODB_URI=@learningpath-mongodb-url"
  },
};

fs.writeFile(
  path.resolve(__dirname, 'build', 'package.json'),
  JSON.stringify(buildPackageJSON),
  err => {
    if (err) {
      console.log(err);
    }
    // The file was saved
  }
);
