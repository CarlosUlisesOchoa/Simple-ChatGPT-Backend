import express, { Request, Response } from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { config } from 'dotenv'
import { ChatCompletionParameters } from './types' // this is the interface for the expected data

config() // Load environment variables from .env file

const app = express()
app.use(express.json())

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
})

const openai = new OpenAIApi(openaiConfig)

app.post('/api/shane-gpt', async (req: Request, res: Response) => {
  try {
    const {
      model,
      messages,
      stream,
      max_tokens,
      temperature,
      top_p,
      frequency_penalty,
      presence_penalty,
    } = req.body as ChatCompletionParameters

    const response = await openai.createChatCompletion({
      model: model,
      messages: messages,
      stream: stream,
      max_tokens: max_tokens,
      temperature: temperature,
      top_p: top_p,
      frequency_penalty: frequency_penalty,
      presence_penalty: presence_penalty,
    })

    return res.status(200).json({
      success: true,
      data: response.data ?? null,
      // data: response.data?.choices[0]?.message?.content,
    })
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : 'There is a problem on the server, bro :(',
    })
  }
})

app.get('/', (req, res) => {
  res.send(`Hello, TypeScript in Express! NODE_ENV: ${process.env.NODE_ENV}`)
})

if (!openaiConfig.apiKey) {
  throw new Error('OPENAI_API_KEY is not set, check your .env file')
}

const port: number = Number(process.env.PORT) || 3000

console.log(`Trying to start server at port: ${port}...`)
if (process.env.NODE_ENV === 'production') {
  app.listen(port, () => console.log(`Server running at port: ${port}`))
} else if (process.env.NODE_ENV === 'development') {
  app.listen(port, () =>
    console.log(`Server running at: http://localhost:${port}`)
  )
} else {
  console.error(
    'Cannot set NODE_ENV, check your package.json file in scripts section'
  )
}
