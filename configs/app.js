import express from "express"

import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{

}


export const initServer=()=>{
    const app = express()
    try {
        configs(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (error) {
        console.error('Server init failed',error)
    }
}