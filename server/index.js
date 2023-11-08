const express = require('express');
const app = express();
const port = 8081;
const routes = require('./routes');


const cors = require('cors');

app.use(cors());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
