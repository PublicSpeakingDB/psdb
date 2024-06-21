# Creating your own instance of Public Speaking Dashboard on Netlify

## 1. Create a Mistral AI Account (this will be the AI "back end" of the app)
[Mistral AI](https://mistral.ai/)
⬇️

## 2. Generate a Mistral AI API Key 
[Instructions](https://docs.mistral.ai/getting-started/quickstart/#account-setup)
Save the key somewhere safe. 
⬇️

## 3. Create a DeepGram Account (this is used for voice transcription on mobile)
[DeepGram](https://deepgram.com/)
Save the key somewhere safe. 
⬇️

## 4. Generate a DeepGram API Key
[Instructions](https://developers.deepgram.com/docs/create-additional-api-keys) 
⬇️

## 5. Create a GitHub Account (this is how you will access the source code of Public Speaking Dashboard)
[GitHub](https://github.com/)
⬇️

## 6. "Fork" the PSDB Repository

### a. While signed into your GitHub account, navigate to the publicspeakingDB/psdb repository (linked at the upper left of the page)
⬇️

### b. Click "Fork" (you should now see the /psdb repository in the list of repositories on your account)
⬇️

## 7. Create a Netlify Account (this will be used to serve the app)
[Netlify](https://www.netlify.com/)
⬇️

## . Deploy Public Speaking Dashboard to Netlify

### a. While signed into GitHub, navigate to dashboard
⬇️

### b. Click "Add new site"
⬇️

### c. Select "Import an existing project" 
⬇️

### d. Select "Github"
⬇️

### e. Select the "/psdb" repository 
⬇️

### f. Name the site whatever you wish
⬇️

### g. Leave all other settings at their default values
⬇️

### h. Click "Add environment variables" and "Add" two variables

Do not edit the key name--copy it verbatim. For the value, copy and paste your Mistral and DeepGram API keys accordingly

```
VUE_APP_ROOT_API2=yourMistralAPIKeyCode
VUE_APP_ROOT_API3=yourDeepGramAPIKeyCode
```
⬇️

### i. Click "Deploy"

### j. Navigate back to the main dashboard

### k. Click "Site configuration" 

### l. Click "Build & deploy" 

### m. Click "Dependency management"

### n. Select "Node 16.x"

### 0. Click "Save" 

### p. Navigate to "Deploys" 

### q. Click "Clear cache and deploy site" 

### r. Navigate to "Site overview" 

### s. After a few minutes, your instance of Public Speaking Dashboard will be available at the link
The linke will be somethign like yourreallygreatsite.netlify.app

_It is important to note that deploying the app like this exposes your API keys to anyone who is using the app. Be sure to only share the link with intended audiences, and set "spend limits" on your API keys that you are comfortable with, should someone get ahold of your keys._






---

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
