Public Speaking Dashboard is an open-source public speaking tool. 

It is shared under a Creative Commons license. Please feel free to copy and use the source code. Also, please feel free to remix and experiment with the base code. 

---
[![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg
---

Find instructions below for cloning your own instance of Public Speaking Dashboard or for running the app locally. 
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
# Creating your own instance of Public Speaking Dashboard on Netlify

## 1. Create a Mistral AI Account (this will be the AI "back end" of the app)
  ### a.[Mistral AI](https://mistral.ai/)<br>
  ⬇️

## 2. Generate a Mistral AI API Key 
  ### a. [Instructions](https://docs.mistral.ai/getting-started/quickstart/#account-setup)<br>
  Save the key somewhere safe. <br>
  ⬇️

## 3. Create a DeepGram Account (this is used for voice transcription on mobile)
  ### a. [DeepGram](https://deepgram.com/)<br>
  Save the key somewhere safe. <br>
  ⬇️

## 4. Generate a DeepGram API Key
  ### a. [Instructions](https://developers.deepgram.com/docs/create-additional-api-keys) <br>
  ⬇️

## 5. Create a GitHub Account (this is how you will access the source code of Public Speaking Dashboard)
  ### a. [GitHub](https://github.com/)<br>
  ⬇️

## 6. "Fork" the PSDB Repository

  ### a. While signed into your GitHub account, navigate to the publicspeakingDB/psdb repository (linked at the upper left of the page)<br>
    ⬇️

  ### b. Click "Fork" (you should now see the /psdb repository in the list of repositories on your account)<br>
    ⬇️

## 7. Create a Netlify Account (this will be used to serve the app)
  ### a. [Netlify](https://www.netlify.com/)<br>
  ⬇️

## 8. Deploy Public Speaking Dashboard to Netlify<br>

  ### a. While signed into GitHub, navigate to dashboard<br>
    ⬇️

  ### b. Click "Add new site"<br>
    ⬇️

  ### c. Select "Import an existing project" <br>
    ⬇️

  ### d. Select "Github"<br>
    ⬇️

  ### e. Select the "/psdb" repository <br>
    ⬇️
  
  ### f. Name the site whatever you wish<br>
    ⬇️
  
  ### g. Leave all other settings at their default values<br>
    ⬇️
  
  ### h. Click "Add environment variables" and "Add" two variables<br>
  
    Do not edit the key name--copy it verbatim. For the value, copy and paste your Mistral and DeepGram API keys accordingly<br>
    
    ```
    VUE_APP_ROOT_API2=yourMistralAPIKeyCode
    VUE_APP_ROOT_API3=yourDeepGramAPIKeyCode
    ```
    ⬇️
  
  ### i. Click "Deploy"<br>
    ⬇️
  
  ### j. Navigate back to the main dashboard<br>
    ⬇️
  
  ### k. Click "Site configuration"<br>
    ⬇️
  
  ### l. Click "Build & deploy"<br>
    ⬇️
  
  ### m. Click "Dependency management"<br>
    ⬇️
  
  ### n. Select "Node 16.x"<br>
    ⬇️
  
  ### 0. Click "Save"<br>
    ⬇️
  
  ### p. Navigate to "Deploys"<br>
    ⬇️
  
  ### q. Click "Clear cache and deploy site"<br>
    ⬇️
  
  ### r. Navigate to "Site overview"<br>
    ⬇️
  
  ### s. After a few minutes, your instance of Public Speaking Dashboard will be available at the link<br>
    The link will be something like: yourreallygreatsite.netlify.app
<br>
<br>
_It is important to note that deploying the app like this exposes your API keys to anyone who is using the app. Be sure to only share the link with intended audiences, and set "spend limits" on your API keys that you are comfortable with, should someone get ahold of your keys._
<br><br><br><br>


---

<br><br><br><br>

# Running the App Locally

The app is built with vue.js (and requires node.js 16)

## Create a .env file with Mistral API Key and a DeepGram API Key and save in root directory of app
```
VUE_APP_ROOT_API2=yourMistralAPIKey
VUE_APP_ROOT_API3=yourDeepGramAPIKey
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

Customize configuration
[Configuration documentation](https://cli.vuejs.org/config/) 
