import express from "express"

import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"
import routesPublications from '../src/publications/publications.routes.js'
import routesCategories from '../src/category/category.routes.js'
import routesUser from '../src/user/user.routes.js'
import routesAuth from "../src/auth/auth.routes.js"
import routesComments from '../src/comments/comments.routes.js'

import { defaultCategories } from "../src/category/category.controller.js"
import { defaultAdmin } from "../src/user/user.controller.js"

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
    app.use(routesUser)
    app.use(routesAuth)
    app.use(routesComments)
}


export const initServer=()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        defaultCategories()
        defaultAdmin()
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (error) {
        console.error('Server init failed',error)
    }
}