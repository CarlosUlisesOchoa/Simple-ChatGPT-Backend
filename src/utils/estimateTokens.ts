export function estimateTokens(text: string): number {
  const cleanedText = text.trim().replace(/(\r\n|\n|\r)/gm, ' ')

  const wordCount: number = cleanedText.split(' ').length
  const charCount: number = cleanedText.length

  const tokensCountWordEst: number = wordCount / 0.75
  const tokensCountCharEst: number = charCount / 4.0

  const output = Math.max(tokensCountWordEst, tokensCountCharEst)

  return Math.floor(output)
}
