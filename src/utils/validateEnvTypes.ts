import { DotenvConfigOutput } from 'dotenv'

export function validateEnvTypes(envValues: DotenvConfigOutput) {
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
    const value = envValues.parsed?.[variable] || ''
    if (value.length === 0) {
      throw new Error(`${variable} is not set, check your .env file`)
    }

    if (envVariables[variable] === 'number' && isNaN(Number(value))) {
      throw new Error(`${variable} must be a number, check your .env file`)
    }
  }
}
