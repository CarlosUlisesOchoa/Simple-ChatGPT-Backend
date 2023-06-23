import express, { Request, Response } from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { config } from 'dotenv'
import { ChatCompletionParameters, GPTMessage } from './types' // this is the interface for the expected data
import { ResponseError, validateEnvTypes, isGPTMessage } from './utils'
import startServer from './server'

const envValues = config() // Load environment variables from .env file

validateEnvTypes(envValues) // Validate environment variables

console.log(`Trying to start server at port: ${process.env.PORT}...`)

const app = express()
app.use(express.json())

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
})

const openai = new OpenAIApi(openaiConfig)

const port = Number(envValues.parsed?.PORT) || 3001

startServer(app, port)

/* //////////////////////////
//
//
// Routes */

app.post('/api/shane-gpt', async (req: Request, res: Response) => {
  try {
    const {
      model, // optional, if not provided, it will use the environment variable value (.env file)
      messages, // required, user can send a simple string or an array of GPTMessage (role, content) see types.d.ts (GPTMessage)
      // stream, // we will set this to false due to this is a simple example
      max_tokens, // optional, if not provided, it will use the environment variable value (.env file)
      temperature, // optional, if not provided, it will use the environment variable value (.env file)
      top_p, // optional, if not provided, it will use the environment variable value (.env file)
      frequency_penalty, // optional, if not provided, it will use the environment variable value (.env file)
      presence_penalty, // optional, if not provided, it will use the environment variable value (.env file)
    } = req.body as ChatCompletionParameters

    let finalMessages: Array<GPTMessage> | undefined = undefined

    // lookup for the messages parameter, look for a single plain string or an array of GPTMessage (role, content) see types.d.ts (GPTMessage)
    if (Array.isArray(messages) && messages.every((m) => isGPTMessage(m))) {
      finalMessages = messages
    } else if (typeof messages === 'string' && messages.length > 0) {
      finalMessages = [{ role: 'user', content: messages }]
    } else {
      throw new ResponseError(400, `You sent an invalid "messages" parameter value. Please provide a valid value.`)
    }

    let finalModel = process.env.OPENAI_API_DEFAULT_MODEL || 'gpt-3.5-turbo'

    if (model) {
      finalModel = model
    }

    const response = await openai.createChatCompletion({
      model: finalModel,
      messages: finalMessages,
      stream: false,
      max_tokens: max_tokens || Number(process.env.OPENAI_API_DEFAULT_MAX_TOKENS),
      temperature: temperature || Number(process.env.OPENAI_API_DEFAULT_TEMPERATURE),
      top_p: top_p || Number(process.env.OPENAI_API_DEFAULT_TOP_P),
      frequency_penalty: frequency_penalty || Number(process.env.OPENAI_API_DEFAULT_FREQUENCY_PENALTY),
      presence_penalty: presence_penalty || Number(process.env.OPENAI_API_DEFAULT_PRESENCE_PENALTY),
    })

    if (response.status !== 200) {
      throw new ResponseError(response.status, 'Unexpected error occurred, please try again later.')
    }

    return res.status(200).json({
      success: true,
      data: response.data?.choices[0]?.message?.content ?? `Sorry I can't answer right now.`,
    })
  } catch (error: any) {
    if (error instanceof ResponseError) {
      return res.status(error.statusCode).json({
        success: false,
        error: 'There is a problem on the OpenAI server. Please try again later.',
        // error: error.message,
      })
    } else {
      return res.status(400).json({
        success: false,
        error: 'There is a problem on the server. Please try again later.',
        // error: error.response.data?.error?.message ?? 'There is a problem on the server. Please try again later.',
      })
    }
  }
})

app.get('/', (req, res) => {
  res.send(`Hello, TypeScript in Express! NODE_ENV: ${process.env.NODE_ENV}`)
})
