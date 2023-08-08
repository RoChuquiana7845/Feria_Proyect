import jwt from 'jsonwebtoken';
import { SECRET_KEY} from "../config/config.js";

const authenticateToken = async (req, res, next) => {
    try { 
        const { token } = req.cookies;
        if (!token) {
            return res.status(404).send({
                message: 'Unauthorized token'
            })
        }
        jwt.verify(token, SECRET_KEY, (error, user) => { 
            if (error) { 
                return res.status(401).send({
                    message: 'Invalid token'
                })
            };
            req.user = user;
            next();
        })
    } catch(error) {
        return res.status(500).send({
            message: error.message
        })
    }
}
