import express from 'express'; 
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import Config from "./config/config.js";
import Passport from './config/passport.js';
//import router from "./routes/index.routes";

const app = express();

app.set('port', Config.PORT || 3012);

const server = http.createServer(app);
const io = new SocketServer(server, { 
    cors: { 
        origin: "*"
    }
})

app.use(cors({}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: Config.SECRET_KEY,
    key: Config.KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash());

app.use((req, res, next) => { 
    res.locals.user = {...req.user} || null;
    res.locals.messages = req.flash();
    const date = new Date();
    res.locals.year = date.getFullYear();
    next();
});

//app.use('/uniconnect', router);

io.on('connection', (socket)=> { 
    console.log(socket.id);
    console.log("New client connected");
    socket.on('', () => { 
        socket.broadcast.emit()
    })
})

export default app;
