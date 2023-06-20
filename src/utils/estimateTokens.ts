export function estimateTokens(text: string): number {
  const cleanedText = text.trim().replace(/(\r\n|\n|\r)/gm, ' ')

  const word_count: number = cleanedText.split(' ').length
  const char_count: number = cleanedText.length

  const tokens_count_word_est: number = word_count / 0.75
  const tokens_count_char_est: number = char_count / 4.0

  const output = Math.max(tokens_count_word_est, tokens_count_char_est)

  return Math.floor(output)
}
