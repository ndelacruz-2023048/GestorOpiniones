import mongoose from "mongoose"

export const connect =async ()=>{
    try {
        mongoose.connection.on('error',()=>{
            console.log('MongoDB | Could not be connect to mongodb')
        })
        mongoose.connection.on('connection',()=>{
            console.log('MongoDB | try connecting');
        })
        mongoose.connection.on('connected',()=>{
            console.log('MongoDB | Connected to mongoDB');
        })
        mongoose.connection.on('open',()=>{
            console.log('MongoDB | Connected to database');
        })
        mongoose.connection.on('reconnected',()=>{
            console.log('MongoDB | Reconnected to mongodb')
        })
        mongoose.connection.on('Disconnected',()=>{
            console.log('MongoDB | Disconnected');
        })
        await mongoose.connect(`${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{
            maxPoolSize:50,
            serverSelectionTimeoutMS:5000
        })
    } catch (error) {
        console.log('Database connection failed',error)
    }
}