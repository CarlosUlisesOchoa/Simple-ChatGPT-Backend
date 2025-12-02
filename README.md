<a name="readme-top"></a>
<div align="center">
<h1>Simple ChatGPT Backend</h1>
<p align="center">
<a href="#!"><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/c26c0eba-6565-4175-a3b9-07022f8aff33" width="350" /></a>
</p>
<a href="#!"><img src="https://img.shields.io/badge/latest%20release-v1.1.0-blue" /></a>
<a href="#!"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen" /></a>
</div>

<br/>

Simple ChatGPT Backend is a server-side Node.js application that uses Express.js. It serves as a bridge between client-side applications and the OpenAI API, securely handling sensitive API keys.

This can be useful for those who wish to utilize the OpenAI's API without the risk of exposing their secret API keys.

Please note: Although our API key will be secure, our endpoint could potentially be subject to misuse. To enhance security, you could consider implementing features such as usage limitations, IP-based access controls, or user authentication. These measures can help to prevent unauthorized or excessive use of our service.

<hr/>
<br/>

<ul>
<li><a href="#screenshots">Screenshots</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#how-to-run">How to Run</a></li>
<li><a href="#environment-variables">Environment Variables</a></li>
<li><a href="#how-to-get-openai-api-key-value">How to get OpenAI API key value</a></li>
<li><a href="#about-developer">About Developer</a></li>
</ul>

<br/>

## Screenshots

All the parameters that the OpenAI API receives are available, except for the "stream" parameter.

You can send a simple or more complex request since all the parameters are optional, except for the "messages" parameter, of course.

<img width="2940" height="4639" alt="localhost_3001_swagger_(iPhone 14 Pro Max)" src="https://github.com/user-attachments/assets/60042598-d415-4816-8f53-7f15fd5acc4e" />


![image](https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/3abbd30a-0ee9-4766-993d-2c30e955e425)

```javascript
const response = await fetch('http://127.0.0.1:3001/api/openai', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
      message: 'who are u?'
    })
});
const responseData = await response.json();
console.log(responseData);
```

<br/><br/><br/>

<p><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/683db5cd-2b99-403d-8292-de11f68354f8" alt="image" width=928></p>

```
curl -X POST -H "Content-Type: application/json" -d "{\"message\": \"Who are you?\"}" http://localhost:3001/api/openai
```

<br/><br/><br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Prerequisites

In order to run this application, you will need:

- Node.js 20.6 or higher
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

- `OPENAI_API_DEFAULT_MODEL`: Default model to use when making API requests. <i>(Optional, check default value in: .env.template)</i>. See [Available Models](#available-models) for options.

- `OPENAI_API_DEFAULT_MAX_TOKENS`: Determines the maximum number of tokens that can be generated in a single API response. Tokens are chunks of text, and the total number of tokens affects the cost and duration of an API call. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_TEMPERATURE`: This controls the randomness of the generated text. A higher temperature value, such as 1.0, produces more random and creative responses, while a lower value, like 0.25, generates more focused and deterministic responses. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_TOP_P`: Determines the diversity of the generated text. It uses the top-p sampling technique, where the model only considers the most probable tokens that add up to a cumulative probability (p). A higher value, like 1.0, allows more options and can lead to more varied responses. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_FREQUENCY_PENALTY`: This key adjusts the frequency penalty during text generation. A higher penalty discourages the model from repeating the same phrases or tokens. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_API_DEFAULT_PRESENCE_PENALTY`: Controls the presence penalty during text generation. It discourages the model from focusing on specific phrases or words by reducing their likelihood. The value "0.5" sets the default presence penalty to 0.5. <i>(Optional, check default value in: .env.template)</i>

- `OPENAI_BASE_URL`: Override the base URL for the OpenAI API. Useful for using alternative providers like OpenRouter or local proxies. <i>(Optional)</i>

- `OPENAI_API_LOG_LEVEL`: Set the logging level for the OpenAI client (e.g., `debug`, `info`, `warn`, `error`). <i>(Optional, default: info)</i>

- `OPENAI_API_DEFAULT_REASONING_EFFORT`: Set the reasoning effort for supported models (e.g., `o1`, `o3`). Options: `low`, `medium`, `high`. <i>(Optional, default: medium)</i>

Note: Instructions on how to get the OpenAI API key value can be found in the [How to get OpenAI API key value](#how-to-get-openai-api-key-value) section.

<br/><br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Available Models

The following models are commonly used and supported by this backend (though any chat model supported by OpenAI API should work):

- `gpt-4o`: High-intelligence flagship model for complex, multi-step tasks.
- `gpt-4o-mini`: Affordable and intelligent small model for fast, lightweight tasks. (Default)
- `gpt-5.1`: Latest flagship model with improved steerability and agentic capabilities.
- `o3`: High-intelligence reasoning model.
- `o4-mini`: Cost-effective reasoning model.
- `gpt-4-turbo`: Previous high-intelligence model.

For a complete and up-to-date list of models, visit the [OpenAI Models Documentation](https://platform.openai.com/docs/models).

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
