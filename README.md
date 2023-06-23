<a name="readme-top"></a>
<div align="center">
<h1>Simple ChatGPT Backend</h1>
<p align="center">
<a href="#!"><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/c26c0eba-6565-4175-a3b9-07022f8aff33" width="350" /></a>
</p>
<a href="#!"><img src="https://img.shields.io/badge/latest%20release-v0.5-blue" /></a>
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

<p>Request and response examples:</p>

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

<p><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/76efe824-76c8-4fb8-9f8a-56893f55c1c1" alt="image" xwidth=1106></p>

```
curl -X POST -H "Content-Type: application/json" -d "{\"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"user\", \"content\": \"Who are you?\"}], \"max_tokens\": 500, \"temperature\": 0.25, \"top_p\": 1, \"frequency_penalty\": 0.5, \"presence_penalty\": 0.5}" http://localhost:3001/api/shane-gpt
```

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

- `OPENAI_API_KEY`: Your OpenAI's API Key. <i>(Required)</i>
- `PORT`: Port where your server will run. <i>(Optional, default is 3001)</i>

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
