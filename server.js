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

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.get('/login', (req,res) =>{
    return res.render('auth/login')
})

app.post('/api/login', async (req,res) =>{
    const { username, password } = req.body

    console.log(req.body);
    if(username == "lawyer" && password == "lawyer"){
        res.cookie('isLogged','true',{
            maxAge: 36000000000000, // Cookie expiration time in milliseconds (1 hour in this case)
            httpOnly: true,
        })

        return res.sendStatus(200)
    }else{
        return res.status(500).json({ message: "Error Message"})
    }
})


app.use((req,res,next) =>{
    if(req.url.includes('/api/')){
      return next()
    }

    if(req.cookies.isLogged == "true" && (req.url != "/login" ) ){
        next();
    }else{
        return res.redirect('/login')
    }
})

const consultationApi = require('./routes/api/consulation')
app.use('/api',consultationApi)

const consultationUi = require('./routes/ui/consulations')
const countryUi = require('./routes/ui/country')
const lawyerUi = require('./routes/ui/lawyer');
const { log } = require('console');
app.use(consultationUi,countryUi,lawyerUi)

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