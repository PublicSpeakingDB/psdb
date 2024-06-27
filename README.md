# Public Speaking Dashboard
Public Speaking Dashboard is an open-source public speaking tool. 

---
[![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg
---

Find instructions below for cloning your own instance of Public Speaking Dashboard. Please feel free to copy and use the source code as well as to remix and experiment with it. 

<details>
<summary><h2 style="display: inline-block;">✨ Clone Your Own Instance of Public Speaking Dashboard</h2></summary>

<div style="padding-left: 20px;">

This guide will walk you through the steps for setting up your own instance of Public Speaking Dashboard on Netlify.
<br>
<h3 style="display: inline-block;">1. **Create a Mistral AI Account**</h3><br>

<ul style="list-style-type: disc;">
<li><strong>Create an account:</strong> [Mistral AI](https://mistral.ai/)</li>
<li>This will be the AI "back end" of your application.</li>
<li><strong>Generate a Mistral AI API Key:</strong> [Instructions](https://docs.mistral.ai/getting-started/quickstart/#account-setup) </li>
<li>Store this key in a safe place.</li>
<li><strong>Important Note:</strong> Mistral is a "pay as you go" service, meaning that everytime a user runs the app, it will result in a charge to your Mistral account. Share the link only with intended audiences. </li>
</ul>
<h3 style="display: inline-block;">2. **(Optional) Create a DeepGram Account**</h3>

<ul style="list-style-type: disc;">
<li><strong>Create an account:</strong> [DeepGram](https://deepgram.com/)</li>
<li>This is for voice transcription on Android mobile devices (transcription will not work on Android without this service)</li>
<li><strong>Generate a DeepGram API Key:</strong> [Instructions](https://developers.deepgram.com/docs/create-additional-api-keys)</li>
<li>Store this key in a safe place.</li>
<li><strong>Important Note:</strong> The way that Public Speaking Dashboard is configured, this API key is exposed to whoever has access to the the App when it is deployed on Netlify. The DeepGram service is free, but, even so, share the link only with intended audiences. </li>
</ul>

<h3 style="display: inline-block;">3. **GitHub Account**</h3>

<ul style="list-style-type: disc;">
<li><strong>Create an account:</strong> [GitHub](https://github.com/)</li>
<li>This gives you access to the Public Speaking Dashboard source code.</li>
</ul>
</div>
</details>


<details>
<summary><h2 style="display: inline-block;">🚀 Running Public Speaking Dashboard Locally</h2></summary>

<div style="padding-left: 20px;">

This app is built with Vue.js and requires Node.js 16.
<br>
<h3 style="display: inline-block;">1. **Create a .env File**</h3>
-In the app's root directory, create a `.env` file with:<br>
`VUE_APP_ROOT_API2=yourMistralAPIKey`<br>
`VUE_APP_ROOT_API3=yourDeepGramAPIKey`<br>
<h3 style="display: inline-block;">2. **Project Setup**</h3>
`npm install`<br>

<h3 style="display: inline-block;">3. **Development**</h3>
`npm run serve`<br>

<h3 style="display: inline-block;">4. **Production**</h3>
`npm run build`<br>

<h3 style="display: inline-block;">5. **Linting**</h3>
`npm run lint`<br>

</div>
</details>

<h2 style="display: inline-block;">🔥 Live Demo (Without AI Feedback)</h2>
<iframe width="100%" height="800px%" src="https://psd-demo.netlify.app/"></iframe>
<br>
<div style="padding-left: 20px;">
<a href="https://raw.githubusercontent.com/PublicSpeakingdashboard/PSD/main/package-lock.json">Attribution Credits and Dependencies for Public Speaking Dashboard</a>
</div>

