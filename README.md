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

Find instructions below for cloning your own instance of Public Speaking Dashboard. <br><br>Please feel free to copy and use the source code as well as to remix and experiment with it. 

---
<details>
<summary><h2 style="display: inline-block;">✨ Instructions for Cloning the App</h2></summary>

<div style="padding-left: 20px;">

This guide will walk you through the steps for setting up your own instance of Public Speaking Dashboard on Netlify.
<br><br>

<details>
<summary><h3 style="display: inline-block;">1. Generate a Mistral AI API Key</h3><br></summary>

<ul style="list-style-type: disc;">
<li><strong>Create an account:</strong> <a href="https://mistral.ai/"> Mistral AI</a>. (This will be the AI "back end" of your application.)</li>
<li><strong>Generate a Mistral AI API Key:</strong><a href="https://docs.mistral.ai/getting-started/quickstart/#account-setup"> Instructions</a>. (Store this key in a safe place.)</li></ul>
<p><i><strong>Important Note:</strong> Mistral is "pay per service," meaning that everytime a user runs the app, it will result in a charge to your Mistral account. Share the link only with intended audiences. </i></p>
</details>

<details>
<summary><h3 style="display: inline-block;">2. Generate a DeepGram API KEY (Optional)</h3></summary>

<ul style="list-style-type: disc;">
<li><strong>Create an account:</strong><a href="https://deepgram.com/"> DeepGram</a>.(This is for voice transcription on Android mobile devices. Transcription will not work on Android without this service.</li>
<li><strong>Generate a DeepGram API Key:</strong> <a href="https://developers.deepgram.com/docs/create-additional-api-keys"> Intructions</a>. (Store this key in a safe place.)</li></ul>
<p><i><strong>Important Note:</strong> The way that Public Speaking Dashboard is configured, this API key is exposed to whoever has access to the the App when it is deployed on Netlify. The DeepGram service is free, but, even so, share the link only with intended audiences. </i></p>
</details>

<details>
<summary><h3 style="display: inline-block;">3. Copy the PSD Repository on GitHub</h3></summary>

<ul style="list-style-type: disc;">
<li><strong>Create an account:</strong><a href="https://github.com"> GitHub</a> (This gives you access to the Public Speaking Dashboard source code.)</li>
<li><strong>Fork the /psd repository:</strong> While logged into your GitHub account, navigate to the publispeakingdashboard/psd repository (linked at the top left of the page) and click "Fork."</li>
</ul>
</details>

<details>
<summary><h3 style="display: inline-block;">4. Deploy the Code on Netlify</h3></summary>

<ul style="list-style-type: disc;">
<li><strong>Create an account:</strong><a href="https://github.com"> Netlify</a> (This will be used to serve the Public Speaking Dashboard app.)</li>
<li><strong>Deploy the code: </strong> While logged into your GitHub account, navigate to your Netlify dashboard:
  <ul>
    <li>Click "Add new site".
      <ul>
        <li>Select "Import existing project".</li>
        <li>Select "GitHub".</li>
        <li>Select the "/psd" repository from the list.</li>
      </ul>
  </li>
    <li>Name the site whatever you want.</li>
    <li>Leave all other settings at their default values.</li>
    <li>Click "Add environment variables".
      <ul>
        <li>"Add" two variables:   
          <br>VUE_APP_ROOT_API2=yourMistralAPIKeyCode
          <br>VUE_APP_ROOT_API3=yourDeepGramAPIKeyCode<br>
          <p>
            <strong>Do not edit the key names</strong>--copy them verbatim. For the value, copy and paste                  your Mistral and DeepGram API keys from the steps above. In the case that you                 are not using DeepGram, you can enter placeHolder as the VUE_APP_ROOT_API3 value.
          </p>
        </li>
      </ul>
    </li>
    <li>Click "Deploy". (The build will say "Failed.")</li>
    <li>Navigate back to the Netlify dashboard.</li>
    <li>Click "Site configuration".</li>
    <li>Click "Build & deploy".</li>
    <li>Click "Dependency management".
      <ul>
        <li>Select "Node 16.x" and "Save".</li>
      </ul>
    </li>
    <li>Navigate to "Deploys"
      <ul>
        <li>Click "Clear cache and deploy site".</li>
      </ul>
    </li>
    <li>Navigate to "Site overview".<br><br>
      After a few minutes, your instance of Public Speaking Dashboard will be available at          the link.<br><br>The link will be something like: <br><br><i>yourreallygreatsite.netlify.app</i>
      <h2>🎉</h2> 
    </li>
  </ul>
</li>
</ul>
<details>
<summary><h4 style="display: inline-block;">🚀 For the Code-Inclined: You Can Also Run Public Speaking Dashboard Locally</h4></summary>

<div style="padding-left: 20px;">

This app is built with Vue.js and requires Node.js 16.
<br><br>
<h3 style="display: inline-block;">1. Create a .env File</h3>

<ul style="list-style-type: disc;">
<li><strong>In the app's root directory, create a .env file with:</strong><br>VUE_APP_ROOT_API2=yourMistralAPIKey<br>VUE_APP_ROOT_API3=yourDeepGramAPIKey</li></ul>

<h3 style="display: inline-block;">2. Run Project Setup</h3>

<ul style="list-style-type: disc;">
<li><strong>In the app's root directory, run the install command:</strong><br>npm install</li></ul>

<h3 style="display: inline-block;">3. Run Development Server</h3>

<ul style="list-style-type: disc;">
<li><strong>In the app's root directory, run the serve command:</strong><br>npm run serve</li></ul>

<h4 style="display: inline-block;">3.a Build for Production</h4>

<ul style="list-style-type: disc;">
<li><strong>In the app's root directory, run the build command:</strong><br>npm run build</li></ul>

<h4 style="display: inline-block;">3.a. Running the Linter</h4>

<ul style="list-style-type: disc;">
<li><strong>In the app's root directory, run the lint command:</strong><br>npm run lint</li></ul>

</div>
</details>
</details>
</div>
</details>

---

<h2 style="display: inline-block;">🔥 <a href="https://psd-demo.netlify.app/">Live Demo</a> (Without AI Feedback)</h2>
<br>
<div>
<a href="https://raw.githubusercontent.com/PublicSpeakingdashboard/PSD/main/package-lock.json">Attribution Credits and Dependencies for Public Speaking Dashboard</a>
</div>
