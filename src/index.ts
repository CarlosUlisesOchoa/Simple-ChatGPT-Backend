import express, { Request, Response } from 'express'
import { validateEnvTypes } from './utils'
import startServer from './server'
import openAIHandler from './api/openai'
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from './config/swagger'

validateEnvTypes() // Validate environment variables

console.log(`Trying to start server at port: ${process.env.PORT}...`)

const app = express()
app.use(express.json())

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

const port = Number(process.env.PORT) || 3001

startServer(app, port)

/* //////////////////////////
//
//
// Routes */

// This should be for example: localhost:3001/api/openai
app.post('/api/openai', openAIHandler)

app.get('/', (req, res) => {
  res.send(`Hello, TypeScript in Express! NODE_ENV: ${process.env.NODE_ENV}`)
})
