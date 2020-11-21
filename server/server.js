const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {dirname} = require('path');

const app = express();
const port = 3000;

app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

module.exports = app.listen(port, () =>
  console.log(`server is listening at ${port}`)
);
