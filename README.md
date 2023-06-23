<a name="readme-top"></a>
<div align="center">
<h1>Simple ChatGPT Backend</h1>
<p align="center">
<a href="#!"><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/c26c0eba-6565-4175-a3b9-07022f8aff33" width="350" /></a>
</p>
<a href="#!"><img src="https://img.shields.io/badge/latest%20release-v0.8-blue" /></a>
<a href="#!"><img src="https://img.shields.io/tokei/lines/github/CarlosUlisesOchoa/Simple-ChatGPT-Backend" /></a>
<a href="#!"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen" /></a>
</div>

<br/>

Simple ChatGPT Backend is a server-side Node.js application that uses Express.js. It serves as a bridge between client-side applications and the OpenAI API, securely handling sensitive API keys.

This can be useful for those who wish to utilize the OpenAI's API without the risk of exposing their secret API keys.

Please note: Although our API key will be secure, our endpoint could potentially be subject to misuse. To enhance security, you could consider implementing features such as usage limitations, IP-based access controls, or user authentication. These measures can help to prevent unauthorized or excessive use of our service.

<hr/>
<br/>

<details>
<summary>Table of Contents</summary>
<br>
<ul>
<li><a href="#screenshots">Screenshots</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#how-to-run">How to Run</a></li>
<li><a href="#environment-variables">Environment Variables</a></li>
<li><a href="#how-to-get-openai-api-key-value">How to get OpenAI API key value</a></li>
<li><a href="#about-developer">About Developer</a></li>
</ul>
</details>

<br/>

## Screenshots

<p>All the parameters that the OpenAI API receives are available, except for the "stream" parameter.</p>

<p>You can send a simple or more complex request since all the parameters are optional, except for the "messages" parameter, of course.</p>

<p><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/127c438c-b285-4561-bda7-a72c9362985b" alt="image"></p>

```javascript
const response = await fetch('http://localhost:3001/api/shane-gpt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: 'Who are you?',
  }),
})

const responseData = await response.json()

console.log(responseData.data) // output: "I am an AI language model created by OpenAI."
```

<br/><br/><br/>

<p><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/683db5cd-2b99-403d-8292-de11f68354f8" alt="image"></p>

```
curl -X POST -H "Content-Type: application/json" -d "{\"messages\": \"Who are you?\"}" http://localhost:3001/api/shane-gpt
```

<hr>

<details>
<summary>Example of complex request</summary>
<br>
<p><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/a43b1228-a4e0-4ba3-b625-7da563b6ac1b" alt="image"></p>

```javascript
const response = await fetch('http://localhost:3001/api/shane-gpt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Who are you?' }],
    max_tokens: 500,
    temperature: 0.25,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  }),
})

const responseData = await response.json()

console.log(responseData.data) // output: "I am an AI language model created by OpenAI."
```

<br/><br/><br/>

<p><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/76efe824-76c8-4fb8-9f8a-56893f55c1c1" alt="image"></p>

```
curl -X POST -H "Content-Type: application/json" -d "{\"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"user\", \"content\": \"Who are you?\"}], \"max_tokens\": 500, \"temperature\": 0.25, \"top_p\": 1, \"frequency_penalty\": 0.5, \"presence_penalty\": 0.5}" http://localhost:3001/api/shane-gpt
```
</details>



<br/><br/><br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Prerequisites

In order to run this application, you will need:

- Node.js 12 or higher
- An OpenAI API key ([How to get it?](#how-to-get-openai-api-key-value))

<br/><br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to run

1. Rename `.env.template` to `.env`
2. Inside `.env` set the value to environment variables ([How to do that?](#environment-variables))
3. Install the required Node.js packages using your preferred package manager (I suggest you pnpm).

```
npm install
```

4. Run the server:

```
npm run dev
```

The server will start and listen for requests on the port specified in your environment variables. (default port is 3001)

<br/><br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Environment Variables

- `PORT`: Port where your server will run. <i>(Optional, default is 3001)</i>

- `OPENAI_API_KEY`: Your OpenAI's API Key. <i>(Required)</i>

- `OPENAI_API_DEFAULT_MODEL`: This key specifies the default model to use when making API requests. In this case, the value is set to "gpt-3.5-turbo," which indicates that the GPT-3.5 Turbo model will be used by default. This model is optimized for performance and cost-effectiveness. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_MAX_TOKENS`: This key determines the maximum number of tokens that can be generated in a single API response. Tokens are chunks of text, and the total number of tokens affects the cost and duration of an API call. The value "4000" sets the default maximum tokens to 4000, meaning the generated response will not exceed this token limit. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_TEMPERATURE`: This key controls the randomness of the generated text. A higher temperature value, such as 1.0, produces more random and creative responses, while a lower value, like 0.25, generates more focused and deterministic responses. The value "0.25" sets the default temperature to 0.25. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_TOP_P`: This key determines the diversity of the generated text. It uses the top-p sampling technique, where the model only considers the most probable tokens that add up to a cumulative probability (p). A higher value, like 1.0, allows more options and can lead to more varied responses. The value "1" sets the default top-p to 1. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_FREQUENCY_PENALTY`: This key adjusts the frequency penalty during text generation. A higher penalty discourages the model from repeating the same phrases or tokens. The value "0.5" sets the default frequency penalty to 0.5. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_PRESENCE_PENALTY`: This key controls the presence penalty during text generation. It discourages the model from focusing on specific phrases or words by reducing their likelihood. The value "0.5" sets the default presence penalty to 0.5. <i>(Optional, check default value in: .env.template)</i>

Note: Instructions on how to get the OpenAI API key value can be found in the [How to get OpenAI API key value](#how-to-get-openai-api-key-value) section.

<br/><br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to get OpenAI API key value

1. Go to the OpenAI platform website [https://platform.openai.com](https://platform.openai.com/).
2. Create your account (you will need an email and a phone number to verify your account)
4. Once you have created and verified your account, click on the option 'View API keys'
5. Click on the 'Create new secret key' button
6. Copy the API key and you got the value for OPENAI_API_KEY

<br/><br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## About developer

Visit my web [Carlos Ochoa](https://carlos8a.com)

<br/>

---

**Note:** If you encounter any issues with the server, please report them [here](https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/issues). Contributions are welcome!
