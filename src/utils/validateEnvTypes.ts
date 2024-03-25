export function validateEnvTypes() {
  const envVariables = {
    OPENAI_API_KEY: 'string',
    OPENAI_API_DEFAULT_MODEL: 'string',
    OPENAI_API_DEFAULT_MAX_TOKENS: 'number',
    OPENAI_API_DEFAULT_TEMPERATURE: 'number',
    OPENAI_API_DEFAULT_TOP_P: 'number',
    OPENAI_API_DEFAULT_FREQUENCY_PENALTY: 'number',
    OPENAI_API_DEFAULT_PRESENCE_PENALTY: 'number',
    PORT: 'number',
  }

  for (let variable in envVariables) {
    const value = process.env[variable]
    if (!value) {
      throw new Error(`${variable} is not set, check your .env file`)
    }
    if (envVariables[variable] === 'string') {
      let valuePreview = value
      if (valuePreview.length > 16) {
        valuePreview = valuePreview.slice(0, 16) + '...'
      }
      console.log(`${variable}: ${valuePreview}`) // tetemp
    } else if (envVariables[variable] === 'number') {
      const numericValue = Number(value)
      console.log(`${variable}: ${value}`) // tetemp
      if (isNaN(numericValue)) {
        throw new Error(`${variable} must be a number, check your .env file`)
      }
    }
  }
}
