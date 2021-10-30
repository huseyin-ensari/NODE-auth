const mongoose = require('mongoose');

const { DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connection succesfuly'))
  .catch(err => console.log('DB connection error -> ' + err));