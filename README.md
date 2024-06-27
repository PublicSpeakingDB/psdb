# Public Speaking Dashboard
Public Speaking Dashboard is an open-source public speaking tool. 

It is shared under a Creative Commons license. Please feel free to copy and use the source code. Also, please feel free to remix and experiment. 

---
[![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg
---

Find instructions below for cloning your own instance of Public Speaking Dashboard. 

---
<details>
<summary><h2>✨ Getting Started: Create Your Own Instance on Netlify</h2></summary>

This guide will walk you through the steps for setting up your own instance of Public Speaking Dashboard on Netlify.

### 1. **Create a Mistral AI Account**

- **Create an account:** [Mistral AI](https://mistral.ai/)
- This will be the AI "back end" of your application.
- **Generate a Mistral AI API Key:** [Instructions](https://docs.mistral.ai/getting-started/quickstart/#account-setup) 
- Store this key in a safe place.
- **Important Note:** Mistral is a "pay as you go" service, meaning that everytime a user runs the app, it will result in a charge to your Mistral account. Share the link only with intended audiences. 

### 2. **(Optional) Create a DeepGram Account**

- **Create an account:** [DeepGram](https://deepgram.com/)
- This is for voice transcription on Android mobile devices (transcription will not work on Android without this service)
- **Generate a DeepGram API Key:** [Instructions](https://developers.deepgram.com/docs/create-additional-api-keys)
- Store this key in a safe place.
- **Important Note:** The way that Public Speaking Dashboard is configured, this API key is exposed to whoever has access to the the App when it is deployed on Netlify. The DeepGram service is free, but, even so, share the link only with intended audiences. 

### 3. **GitHub Account**

- **Create an account:** [GitHub](https://github.com/)
- This gives you access to the Public Speaking Dashboard source code.

### 4. **Fork the Repository**

- While logged into GitHub, navigate to the publicspeakingdashboard/psd repository.
- Click "Fork" to create your copy.

### 5. **Netlify Account**

- **Create an account:** [Netlify](https://www.netlify.com/)
- This will host your application.

### 6. **Deploy on Netlify**

1. Go to your GitHub dashboard.
2. Click "Add new site" and select "Import an existing project."
3. Choose "GitHub" and select your forked "/psd" repository.
4. Name your site and leave other settings as default.
5. Under "Add environment variables", add the following (use your actual keys):
VUE_APP_ROOT_API2=yourMistralAPIKeyCode
VUE_APP_ROOT_API3=yourDeepGramAPIKeyCode
6. Click "Deploy" and then go to "Site configuration".
7. In "Build & deploy", go to "Dependency management" and select "Node 16.x".
8. Save and go to "Deploys", then click "Clear cache and deploy site".
9. After a few minutes, your dashboard will be live at a URL like: yourreallygreatsite.netlify.app.

**🎉 Congratulations!** 

</details>


<details>
<summary><h2>🚀 Running Locally</h2></summary>

This app is built with Vue.js and requires Node.js 16.

1. **Create a `.env` File**

In the app's root directory, create a `.env` file with:
VUE_APP_ROOT_API2=yourMistralAPIKey
VUE_APP_ROOT_API3=yourDeepGramAPIKey
2. **Project Setup**
```npm install
3. **Development**
npm run serve
4. **Production**
npm run build
5. **Linting**
npm run lint

For configuration details: Vue CLI Configuration

</details>

# [Attribution Credits and Dependencies for Public Speaking Dashboard](https://raw.githubusercontent.com/PublicSpeakingDB/PSD/main/package-lock.json)
