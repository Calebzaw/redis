import session from "express-session";
import connectRedis from 'connect-redis';
import redisClient from '../Banco/redis.js'

const RedisStore = connectRedis(session);

export default session({
    store: new RedisStore({client: redisClient}),
    secret: "MAMACO",
    saveUninitialized: false, 
    resave:false,
    name: 'sessionId',
    cookie:{
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2
    }
})