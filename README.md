<a name="readme-top"></a>
<div align="center">
<h1>Simple ChatGPT Backend</h1>
<p align="center">
<a href="#!"><img src="https://github.com/CarlosUlisesOchoa/Simple-ChatGPT-Backend/assets/26280134/c26c0eba-6565-4175-a3b9-07022f8aff33" width="350" /></a>
</p>
<a href="#!"><img src="https://img.shields.io/badge/latest%20release-v0.3-blue" /></a>
<a href="#!"><img src="https://img.shields.io/tokei/lines/github/CarlosUlisesOchoa/Simple-ChatGPT-Backend" /></a>
<a href="#!"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen" /></a>
</div>

<br/>

Simple ChatGPT Backend is a basic Express.js app built with TypeScript. It provides an interface between a client applications and OpenAI's API.

<hr/>
<br/>

<details>
<summary>Table of Contents</summary>
<ul>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#how-to-run">How to Run</a></li>
<li><a href="#environment-variables">Environment Variables</a></li>
<li><a href="#how-to-get-openai-api-key-value">How to get OpenAI API key value</a></li>
<li><a href="#about-developer">About Developer</a></li>
</ul>
</details>

<br/>

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

The server will start and listen for requests on the port specified in your environment variables.

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
