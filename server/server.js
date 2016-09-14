const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 8080;
const app = express();

app.listen(port, () => {
  console.log('App running on port', port);
});