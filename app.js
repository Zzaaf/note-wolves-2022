require('dotenv').config();
require('@babel/register');

const express = require('express');
const mainRoute = require('./routes/mainRoute');
const serverConfig = require('./config/serverConfig');

const app = express();
const PORT = process.env.PORT ?? 4000;

serverConfig(app);

app.use('/', mainRoute);

app.listen(PORT, () => console.log(`Work! ${PORT}`));
