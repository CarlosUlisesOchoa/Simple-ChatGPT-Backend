import { Request, Response } from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({
  // Don't worry apiKey and organization will be read automatically from .env file
  // apiKey: process.env.OPENAI_API_KEY,
  // organization: process.env.OPENAI_ORG_ID,
  baseURL: process.env.OPENAI_BASE_URL,
  // logLevel: process.env.OPENAI_API_LOG_LEVEL as any, // Cast to any to avoid type issues if the SDK types are strict
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

    let model = process.env.OPENAI_API_DEFAULT_MODEL || 'gpt-4o-mini'
    const reasoningEffort = process.env.OPENAI_API_DEFAULT_REASONING_EFFORT || 'medium'

    const completionParams: any = {
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
    }

    // Add reasoning_effort only if the model supports it (e.g., o1, o3)
    // For simplicity, we can add it if the env var is set, but ideally we check the model name.
    // However, the SDK might throw if we send it for unsupported models.
    // Let's assume the user knows what they are doing if they set the model to an 'o' series model.
    if (model.startsWith('o')) {
       completionParams.reasoning_effort = reasoningEffort
    }

    const response = await openai.chat.completions.create(completionParams)
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

/**
 * @swagger
 * /api/openai:
 *   post:
 *     summary: Send a message to OpenAI
 *     tags: [OpenAI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message to send to OpenAI
 *     responses:
 *       200:
 *         description: The response from OpenAI
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 response:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
export default async function openAIHandler(req: Request, res: Response): Promise<void> {
  if (req.method === 'POST') {
    await handlePostRequest(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
