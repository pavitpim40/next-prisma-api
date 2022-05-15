import {Request,Response,NextFunction} from "express"
import { PrismaClient } from '@prisma/client'
const express = require('express')
const cors = require('cors')
const app = express()
const prisma = new PrismaClient()

app.use(cors())

app.get('/user', async function (req:Request, res:Response, next:NextFunction) {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.json({users: allUsers})
})

app.get('/user/:id', async function (req:Request, res:Response, next:NextFunction) {
    const user = await prisma.user.findUnique({where:{id:Number(req.params.id)},include: {
        pets:true
    }})
    res.json({user})
})
app.listen(8002, function () {
  console.log('CORS-enabled web server listening on port 8002')
})