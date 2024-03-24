const {createServer} = require('http');
const app = require('./app');
const {Server} = require('socket.io');
require('dotenv').config();
const cors = require('cors');

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