# Creating your own instance of Public Speaking Dashboard on Netlify

## 1. Create a Mistral AI Account (this will be the AI "back end" of the app)
[Mistral AI](https://mistral.ai/)
⬇️

## 2. Generate a Mistral AI API Key 
[Instructions](https://docs.mistral.ai/getting-started/quickstart/#account-setup)
⬇️

## 3. Create a DeepGram Account (this is used for voice transcription on mobile)
[DeepGram](https://deepgram.com/)
⬇️

## 4. Generate a DeepGram API Key
[Instructions](https://developers.deepgram.com/docs/create-additional-api-keys) 
⬇️

## 5. Create a GitHub Account (this is how you will access the source code of Public Speaking Dashboard)
[GitHub](https://github.com/)

## 6. "Fork" the PSDB Repository
### a. While signed into your GitHub account, navigate to the publicspeakingDB/psdb repository (linked at the upper left of the page)
### b. Click "fork" 

## 7. Create a Netlify Account (this will be used to serve the app)
[Netlify](https://www.netlify.com/)
⬇️

## . Deploy Public Speaking Dashboard to Netlify

# a. Navigate to dashboard
⬇️

# b. Click "Add new site"
⬇️

# c. Select "Import an existing project" 
⬇️

# d. Select "Github"
⬇️

# e. Select the "/psdb" repository 
⬇️

npm run build
```
```
VUE_APP_ROOT_API2=yourMistralAPIKey
VUE_APP_ROOT_API3=yourDeepGramAPIKey
```

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
