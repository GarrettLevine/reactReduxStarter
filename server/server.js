const express = require('express');
const session = require('express-session');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const port = 8080 : process.env.PORT;
const app = express.app();

app.listen(port, () => {
  console.log('App running on port', port);
});