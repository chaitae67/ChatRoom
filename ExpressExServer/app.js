const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysqlConnection = require('./config/mysqlConnection');
require('dotenv').config();
app.use(cors());
app.use(express.json({ limit: '5gb' }));
app.use(express.urlencoded({ limit: '5gb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB 연결 (업데이트된 코드)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
// MySQL 연결
mysqlConnection.connect((err) => {
  if (err) {
    console.error("MySQL connection error: " + err.stack);
  } else {
    console.log("Connected to MySQL as ID " + mysqlConnection.threadId);
  }
});


module.exports = app;