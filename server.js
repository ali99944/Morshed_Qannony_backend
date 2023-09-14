require('dotenv').config()
require('./utils/mongodb_connection')
const http = require('http');
const socketIo = require('socket.io');

const express = require('express')
const app = express()
const port = process.env.port || 5000

const server = http.createServer(app);
const io = socketIo(server);

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle messages from the client
    socket.on('message', (data) => {
        console.log('Received message:', data);
        // You can broadcast the message to all connected clients
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const cors = require('cors')
app.use(
    cors({origin: '*'})
)

app.set('view engine', 'ejs')
app.use(express.static('./public'))

const consultationApi = require('./routes/api/consultation')
app.use('/api',consultationApi)

// const userUi = require('./routes/ui/')
// app.use(userUi)

app.get('/',(req,res) =>{
    return res.status(200).render('index')
})

app.get('*', (req,res) => {
    return res.status(404).render('handlers/404')
})

// app.listen(port, () => console.log(`running on port ${port}`))
//
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});