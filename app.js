const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({ path: './src/config/.env' });
// ---
const indexRouter = require('./src/routers/indexRouter');
// db connection
require('./src/config/dbConnection');
// app setting
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './src/views'));
// router
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(PORT, ' is active'));