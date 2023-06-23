import { GPTMessage } from '../types'

export function isGPTMessage(obj: any): obj is GPTMessage {
  return (
    'role' in obj &&
    'content' in obj &&
    (obj.role === 'system' ||
      obj.role === 'user' ||
      obj.role === 'assistant') &&
    obj.content.length > 0
  )
}
