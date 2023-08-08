import mongoose from 'mongoose';
import Config from "./config.js";

const connectDB = async() => { 
    try{ 
        const db = await mongoose.connect(Config.MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
        console.log(`Database is connect to: ${db.connection.name}`);
    } catch(error) { 
        console.error(error);
    }
}

export default connectDB;
