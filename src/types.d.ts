// define the interface for your expected data
export interface ChatCompletionParameters {
  model?: string // optional
  messages: string | Array<GPTMessage> // required, user can send a simple string or an array of GPTMessage (role, content) see types.d.ts (GPTMessage)
  max_tokens?: number // optional
  temperature?: number // optional
  top_p?: number // optional
  frequency_penalty?: number // optional
  presence_penalty?: number // optional
}

export type GPTMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}
