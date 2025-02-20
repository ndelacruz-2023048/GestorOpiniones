import express from "express"

import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"
import routesPublications from '../src/publications/publications.routes.js'
import routesCategories from '../src/category/category.routes.js'
import { defaultCategories } from "../src/category/category.controller.js"

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(routesPublications)
    app.use(routesCategories)
}


export const initServer=()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        defaultCategories()
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (error) {
        console.error('Server init failed',error)
    }
}