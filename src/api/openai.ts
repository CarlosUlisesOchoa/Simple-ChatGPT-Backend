import { Request, Response } from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({
  // Don't worry apiKey and organization will be read automatically from .env file
  // apiKey: process.env.OPENAI_API_KEY,
  // organization: process.env.OPENAI_ORG_ID,
  // More options:
  // timeout?: number,
  // httpAgent?: any,
  // fetch?: Core.Fetch,
  // maxRetries?: number,
  // defaultHeaders?: Core.Headers,
  // defaultQuery?: Core.DefaultQuery,
  // dangerouslyAllowBrowser?: boolean,
})

async function handlePostRequest(req: Request, res: Response): Promise<void> {
  try {
    const { message } = req.body

    let cleanMessage: string

    try {
      cleanMessage = message.trim()
    } catch (e) {
      throw new Error('Invalid message')
    }

    if (cleanMessage.length === 0) {
      throw new Error('Empty message')
    }

    let model = process.env.OPENAI_API_DEFAULT_MODEL || 'gpt-3.5-turbo'

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: cleanMessage,
        },
      ],
    })
    const content = response?.choices[0]?.message?.content

    if (!content || content.length === 0) {
      throw new Error('Server response is empty')
    }

    res.status(200).json({ success: true, response: content })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message || 'An unknown error occurred' })
    } else {
      // If it's not an Error instance, you might want to handle it differently
      res.status(500).json({ success: false, error: 'An unexpected error occurred' })
    }
  }
}

export default async function openAIHandler(req: Request, res: Response): Promise<void> {
  if (req.method === 'POST') {
    await handlePostRequest(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
