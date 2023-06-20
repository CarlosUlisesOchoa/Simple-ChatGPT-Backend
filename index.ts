const express = require('express')
require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const app = express()
app.use(express.json())
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
})
const openai = new OpenAIApi(configuration)

app.post('/try', async (req, res) => {
  try {
    const { prompt } = req.body
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'you are a checklist provider',
        },
        {
          role: 'user',
          content: `which symptom is should check about  ${prompt}`,
        },
      ],
      max_tokens: 1000,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].content, // its should be content here
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : 'There is a problem on server bro :(',
    })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log('server running'))
