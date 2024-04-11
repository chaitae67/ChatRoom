const express = require('express');
const { createServer } = require('http');
const app = require('./app');
const { Server } = require('socket.io');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('../ExpressExServer/controllers/authController');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
const router = express.Router();

// 라우트 정의
router.post('/login', authController.login);
router.post('/signup', authController.signup);

app.use('/', router);

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

require('./utils/io')(io);

httpServer.listen(process.env.PORT, () => {
  console.log('Server is running');
});
