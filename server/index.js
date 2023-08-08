import app from './app.js'; 
import connectDB from './config/db.js';

app.listen(app.get('port'), ()=> { 
    console.log(`The server is running in => http://localhost:${app.get('port')}/`);
    connectDB();
});

