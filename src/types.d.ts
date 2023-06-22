// define the interface for your expected data
export interface ChatCompletionParameters {
  model: string
  messages: Array<GPTMessage>
  // stream: boolean // this is not taken into account due to this is a simple example
  max_tokens: number
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
}

export type GPTMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}
