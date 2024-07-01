<template>
  <div id="body">
    <!-- Initalizing Loader & Modal-->
    <p v-if="!loading" id="loadingContainer" aria-live="polite" aria-busy="true"> Initializing <br /><section id="loader" aria-label="Loading animation"><div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></section><br /><span id="initialMessage">(Make sure your webcam is facing you.)</span> </p> <div id="modalBoxSave" class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modalBoxSaveDescription"> <div class="modal-content" tabindex="-1"> <h2 id="modalBoxSaveLabel">Be Sure to Save!</h2> <p>Public Speaking Dashboard does not save user content.<br><br>Clicking the "back" button will clear any dashboard results/analysis. <br><br>To keep a copy of your results, click "save."</p> <button id="modalBoxCloseSave" tabindex="4" class="close2" aria-label="Close instructions to save modal">Got It</button> </div> </div>
    
    <!-- Video Feed -->
    <span id="container"><div id="video-container" class="video-container"><video id="video" autoplay muted width="150" height="150" alt="Live video feed for facial expression analysis"></video></div></span>

    <!-- Title & Instructions -->
    <h1 v-if="showProcess" id="mainTitle" aria-live="polite"><img id="talking" alt="" aria-hidden="true" src="talking.png" />{{ msg }}</h1> <p v-if="showProcess" id="messageTwo" aria-live="assertive">{{ msg2 }}<a v-if="browserUrl" href="https://support.google.com/chrome/answer/95346?hl=en&ref_topic=7439538&sjid=17703533698318943859-NA">here</a></p> <p v-if="showProcess" id="messageThree" aria-live="assertive">{{ msg3 }}</p>
    
    <!-- Controls -->
    <span id="timeHolder">Time: </span> <span> <span v-if="!show3" id="dropdownWrapper"> <label for="speakingTime" class="sr-only"></label> <select name="speakingTime" id="speakingTime" aria-label="Desired Speaking Time Dropdown Menu" tabindex="0"> <option value="60000" selected>1 Min</option> <option value="120000">2 Min</option> <option value="180000">3 Min</option> <option value="300000">5 Min</option> <option value="360000">6 Min</option> <option value="420000">7 Min</option> <option value="480000">8 Min</option> <option value="540000">9 Min</option> <option value="600000">10 Min</option> </select> </span> <button id="begin" v-if="showBegin" v-on:click="begin(); selectWPM(); selectTextEmotion(); selectVoiceEmotion(); selectFaceEmotion();">Begin</button> <button id="start" v-if="!showStart" v-on:click="begin3">Start</button> <button id="stop" v-if="!showStop" v-on:click="stopVoiceControl">Stop</button> <button id="reset" v-if="!show3" v-on:click="reset">Reset</button> <button id="pdf" v-if="showPrinty" v-on:click="pdfResults">Save</button><div v-if="!show5" id="placeHolderForSaveButton">Preparing Feedback<span class="lds-ellipsis" aria-live="polite" aria-busy="true"><span></span> <span></span ><span></span> <span></span></span></div></span>
    
    <!-- Time, Transcript, Volume, and Raw Data -->
    <span id="rawData" aria-live="polite"></span> <div v-if="!showTime" class="title" id="timer" aria-live="polite">{{ time }}<span aria-hidden="true">{{msgTime}}</span> </div> <span v-if="!show3" id="volume-visualizer-wrapper" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Volume Level" aria-live="polite"><span id="volume-visualizer"></span> <span id="volume-number"></span><span class="sr-only">Visual representation of volume level</span></span> <ul v-if="!show3" id="output" aria-live="polite"></ul> <span><button v-if="!show3" id="dataShowButton" v-on:click="unhideData">View Raw Data</button> <button v-if="!show3" id="dataHideButton" v-on:click="hideData">Hide Raw Data</button></span><br> <section><button v-if="!showVolume" v-on:click="Overallmodal" class="modalButton" id="modalButtonOverall">How Public Speaking Dashboard Works</button></section>
    
    <!-- Charts & Explanation Modals -->
    
        <!-- Modal: How Public Speaking Dashboard Works -->
        <div id="modalBoxOverall" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalBoxOverallDescription"> <div class="modal-content" tabindex="-1"> <button id="modalBoxCloseOverall" class="close" aria-label="Close how public speaking dashboard works modal">&times;</button> <h2 id="modalBoxOverallLabel">How Public Speaking Dashboard Works</h2> <p>Public Speaking Dashboard analyzes the user's rate of speech, volume, expressions in face, and word complexity. Then, that data is summarized by bots (short for "software-based robots") to help you think about your speech performance.<br><br>Use the data output and feedback to identify successes and opportunities for growth in your speaking performance. <br><br><b>Important note about transcription</b>: Public Speaking Dashboard is <i>mostly</i> correct in its transcriptions, but will unavoidably return erroneous results (this is a limitation inherent to automated transcription in general). As such, it is important to reflect on the results of Public Speaking Dashboard not with an eye for specific "blunders" but rather larger patterns in your public speaking.</p> </div> </div>

        <!-- Chart and Modal: Words Per Minute -->
        <span v-if="!showWPM" id="wpmChart" role="img" aria-label="Chart showing words per minute over time"></span><br> <section><button v-if="!showVolume" v-on:click="WPMmodal" class="modalButton" id="modalButtonWPM">More About Rate of Speech</button></section> <div id="modalBoxWPM" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalBoxWPMDescription"> <div class="modal-content" tabindex="-1"> <button id="modalBoxCloseWPM" class="close" aria-label="Close words per minute explanation modal">&times;</button> <h2 id="modalBoxWPMLabel">Rate of Speech</h2> <p>Rate of speech is calculated by taking the latest registered "chunk" of transcribed speech and dividing it by the time passed since the previous chunk was registered.<br><br>Use this data to think about your own impact and understandability.<br><br>Speaking quickly might add energy but reduce comprehension for the audience. And, speaking slowly might add clarity but lose energy. The ideal is to strike a balance based on your own unique speaking style and character.</p> </div> </div>

        <!-- Chart and Modal: Volume -->
        <span v-if="!showVolume" id="volumeChart" role="img" aria-label="Chart showing speaker's microphone volume over time"></span><br> <section><button v-if="!showVolume" v-on:click="Volumemodal" class="modalButton" id="modalButtonVolume">More About Volume</button></section> <div id="modalBoxVolume" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalBoxVolumeDescription"> <div class="modal-content" tabindex="-1"> <button id="modalBoxCloseVolume" class="close" aria-label="Close speaking volume explanation modal">&times;</button> <h2 id="modalBoxVolumeLabel">Volume</h2> <p>Volume is captured by sampling the microphone volume once a second.<br><br>Use this data to think about your speech "dynamics," the ups and downs throughout your speech. <br><br>While it is true that a speech can be too quiet or too loud, variance in volume can also enhance a speech by adding texture to it.</p> </div> </div>

        <!-- Chart and Modal: Facial Emotions -->
        <span v-if="!showFaceEmotion" id="faceEmotionChart" role="img" aria-label="Chart showing facial emotions over time"></span> <section><button v-if="!showVolume" v-on:click="Facemodal" class="modalButton" id="modalButtonFace">More About Expressions in Face</button></section> <div id="modalBoxFace" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalBoxFaceDescription"> <div class="modal-content" tabindex="-1"> <button id="modalBoxCloseFace" class="close" aria-label="Close facial emotions explanation modal">&times;</button> <h2 id="modalBoxFaceLabel">Expressions in Face</h2> <p>This data is captured by assessing key areas of the face to register a given emotional state once a second.<br><br>Use this data to think about the "congruence" (or not) between your words spoken and your facial expressions.<br><br>Much of the time we want our facial expressions to be congruent with our content. But there are also occasions where incongruence is desirable--in humorous speech, for instance. Keep in mind that a "neutral" facial expression is not negative; it can be a desirable expression in many speaking contexts.<br><br>It is important to keep in mind that, because the system samples your facial expressions once a second, it can sometimes register "micro-expressions," or flashes of expression that do not necessarily represent the emotional state perceptible by our audiences.</p> </div> </div>

        <!-- Chart and Modal: Complexity of Words Spoken -->
        <span v-if="!showTextEmotion" id="readabilityChart" role="img" aria-label="Chart showing word complexity over time"></span> <section><button v-if="!showVolume" v-on:click="Wordsmodal" class="modalButton" id="modalButtonWords">More About Complexity of Words Spoken</button></section> <div id="modalBoxWords" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalBoxWordsDescription"> <div class="modal-content" tabindex="-1"> <button id="modalBoxCloseWords" class="close" aria-label="Close word complexity explanation modal">&times;</button> <h2 id="modalBoxWordsLabel">Complexity of Words Spoken</h2> <p>Word complexity is calculated by dividing the number of words by the number of syllables. A higher ratio indicates more complex words.<br><br>Complexity of words spoken can impact the understandability and engagement of your audience. Use this data to reflect on your word choice and consider simplifying your language for better communication.</p> </div> </div><br>

    <!-- AI Feedback -->        

        <!-- Feedback and Modal: Summary & Feedback-->
        <span id="spinner2" v-if="spinner2" class="lds-ellipsis" aria-live="polite" aria-busy="true"><span></span> <span></span ><span></span> <span></span> </span><section v-if="!showFeedback2" class="feedback"><center><h1>Summary & Feedback</h1></center>{{ feedback2 }}<br><br><center><button id="showSpecificFeedbackButton" v-on:click="showFeedback = !showFeedback">Show/Hide Specific Data Summaries</button></center></section> <section v-if="!showFeedback" class="feedback"><center><h1 v-if="!showFeedback" id="specificAndOverallFeedback"><hr>Specific Data Summaries</h1><hr></center>{{ feedback }}</section><br><section> <button v-if="!showFeedback2" v-on:click="Feedbackmodal" class="modalButton" id="modalButtonFeedback" aria-haspopup="true" aria-expanded="false" aria-controls="modalBoxFeedback">More About Feedback</button> </section> <div id="modalBoxFeedback" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalBoxFeedbackDescription"> <div class="modal-content"> <button id="modalBoxCloseFeedback" class="close" aria-label="Close feedback explanation modal">&times;</button> <h2 id="modalBoxFeedbackHeader">Feedback</h2> <p>Feedback is generated based on the analysis of your speech. It includes specific feedback on various aspects of your speech and overall feedback summarizing your performance.<br><br>Use this feedback to improve your public speaking skills and focus on areas that need improvement.</p> </div> </div>
    
    <!-- Footer: Version, Limitations, Updates and Feedback Form -->
    <footer id="footer" v-if="showFooter"> <section id="version"> Version 0.1 (Beta) <div id="bugs"> <br /> <section v-if="showModal" id="modal"> Public Speaking Dashboard does not collect or store user data. However, third-party services are used for transcription and analysis. Terms of use for those third-party services can be found at <a href="https://deepgram.com/terms">DeepGram</a> and <a href="https://mistral.ai/terms/">Mistral</a>. </section><br> <b>Limitations:</b> <br /> <section> - Current version of app works best on the latest Google Chrome browser on desktop. Other browsers are unstable. </section> <section> - App will work on Google Chrome browser on iOS and Android. Other browsers are unstable. </section> <section> - User needs to speak for at least 30 seconds before meaningful results are produced. </section> <section> - System will only reliably give an overall summary for speeches shorter than 10 minutes. </section> <br> <b>Updates: </b><span id="updates">{{updates}}</span><br> <br> If you find a bug or anything that can be improved in the app, please report it here: <a href="https://rowan.co1.qualtrics.com/jfe/form/SV_8AhIsft05UgIUqW">Bug/Improvement Report Form</a> <br><br> </div> </section> </footer>
  </div>
</template>


<script>
import * as rs from "text-readability";
import Plotly from "plotly.js-dist";
import * as faceapi from "face-api.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
export default {
  name: "publicSpeakingDashboard",
  props: {},
  data() {
    return {
      msg: "Public Speaking Dashboard",
      msg2: "An AI-powered tool to help you hone your public speaking skills.",
      msg3: "",
      wordsSpoken: "START",
      output: "Recognized Text",
      workingOutput: "",
      workingTime: 0,
      grabTimeInterval: "",
      registerWPMInterval: "",
      getEmotionStatsInterval: "",
      summarizeDataInterval: "",
      voiceInterval: "",
      deepGramTimeOut: "",
      initialTime: 0,
      time: "00:00",
      timeElapsed: 0,
      timeDifference: 0,
      wordCount: 0,
      totalWords: 0,
      wordCountDividedByTime: 0,
      stop: false,
      wpm: 0,
      anger: 0,
      fear: 0,
      excitement: 0,
      boredom: 0,
      sadness: 0,
      happiness: 0,
      readability: 0,
      show: true,
      show2: true,
      show3: true,
      showProcess: true,
      showBegin: true,
      showStop: true,
      showStart: true,
      loading: true,
      show4: true,
      show5: true,
      showWPM: true,
      showTextEmotion: true,
      showTime: true,
      showData: true,
      showFooter: true,
      showModal: true,
      WPMSelected: false,
      WPMColor: "#CBC3E3",
      textEmotionSelected: false,
      textEmotionColor: "#CBC3E3",
      showVoiceEmotion: true,
      voiceEmotionSelected: false,
      voiceEmotionColor: "#CBC3E3",
      showFaceEmotion: true,
      faceEmotionSelected: false,
      faceEmotionColor: "#CBC3E3",
      textEmotionData: "",
      overallDataObject: "",
      currentDataObject: "",
      dataNamer: 0,
      time1: true,
      time2: false,
      placeHolderForTimeCheck: 0,
      volumeCallback: null,
      volumeInterval: null,
      volumeValue: 0,
      volumeNumber: 0,
      showVolume: true,
      faceEmotionState: "",
      analyzeFaceInterval: "",
      renderDataInterval: "",
      faceAngry: 0,
      faceDisgusted: 0,
      faceFearful: 0,
      faceHappy: 0,
      faceNeutral: 0,
      faceSad: 0,
      faceSurprised: 0,
      continuous: true,
      speechAgain: false,
      API2: process.env.VUE_APP_ROOT_API3,
      feedback: "",
      feedback2: "",
      showFeedback: true,
      showFeedback2: true,
      dataSummary: "",
      referenceTime: "",
      firstSummary: true,
      dataSample: "",
      tickerNumber: 0,
      cancelCall: true,
      android: false,
      mediaRecorder: null,
      socket: null,
      transcripts: [],
      voiceInstance: null,
      dataSummaryTime: 20000, 
      msgTime: "", 
      speakingTimeLabel: "Choose Desired Speech Length (1 Min)", 
      updates: "", 
      updateNumber: 0, 
      browserUrl: false, 
      spinner2: false, 
      showPrinty: false
    };
  },

  
  created() {
    //check for Chrome browser (and for Android; for fallback transcription with DeepGram)
    var isAndroid = /(android)/i.test(navigator.userAgent);
    if (isAndroid && /Chrome/.test(navigator.userAgent)) {
      this.android = true;
      console.log("using alternate speech recognition");
    } else {
      if (/Chrome/.test(navigator.userAgent)) {
        console.log("Landing page loaded");
        console.log("Speech recognition supported in Chrome");
      } 
      else {
        console.log("Landing page loaded");
        console.log("Not Chrome browser.");
        this.showBegin = false;
        this.msg2 = "Public Speaking Dashboard is not supported by this browser. Currently, Public Speaking Dashboard only works in the Chrome browser. You can download and install Chrome  ";
        this.browserUrl = true;
      }
    }
    //check for updates
    axios
        .get("https://raw.githubusercontent.com/publicspeakingdashboard/updates/main/updates.txt")
        .then(json => (

        this.updates = json.data
        
        ));
  },

  mounted() {
    //set current speaking time for screenreader
    const speakingTimeDropdown = document.getElementById('speakingTime');
    speakingTimeDropdown.addEventListener('change', (event) => {
    this.speakingTimeLabel = `Choose Desired Speech Length (${event.target.value / 60000} Min)`;
    this.$announce(`Selected speaking time: ${event.target.value / 60000} minutes`);
    });
    },

  methods: {
    begin3: function () {
      this.showPrinty = false;
      //set up app, while setting desires speaking time
      this.msg=""
      this.showStop = false;
      this.showStart = true;
      var selectedTime = document.getElementById("speakingTime").value;
      if (selectedTime >= 180001)
      {
        this.dataSummaryTime = 30000

      }

      if (selectedTime <= 18000)
      {
        this.dataSummaryTime = 20000

      }

      if (this.android == true) {
        this.stop = false;
        this.deepGramTimeOut = window.setTimeout(this.stopVoiceControl, 30000);
        this.begin2();
      }
      if (this.android == false) {
        this.stop = false;
        this.initiateVoiceControl();
      }
    },

    modalTrap(modalId) {
      //trap focus when tabbing into modals
      const modal = document.getElementById(modalId);

      setTimeout(() => {
        const focusableElements = modal.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        );
        if (focusableElements.length > 0) {
          const firstFocusable = focusableElements[0];
          const lastFocusable = focusableElements[focusableElements.length - 1];

          firstFocusable.focus(); 

          modal.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
              if (!event.shiftKey && document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
              } else if (event.shiftKey && document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
              }
            } else if (event.key === 'Escape') {
              this.closeModal(modalId); 
            }
          });
        } else {
          modal.setAttribute('tabindex', '-1'); 
          modal.focus();
        }
      }, 10); 
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
    }, 
    
//modals
    Savemodal: function () {
        var modal = document.getElementById("modalBoxSave");

        var span = document.getElementById("modalBoxCloseSave");


          modal.style.display = "block";
          this.modalTrap('modalBoxSave');

          setTimeout(() => { document.getElementById("modalBoxCloseSave").focus(); }, 10);

          modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modal.style.display = "none";
            }
          });


        span.onclick = function() {
          modal.style.display = "none";
        }

        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
      },
    
    Feedbackmodal: function () {
      var modal = document.getElementById("modalBoxFeedback");

      var span = document.getElementById("modalBoxCloseFeedback");


        modal.style.display = "block";
        this.modalTrap('modalBoxFeedback');

        setTimeout(() => { document.getElementById("modalBoxCloseFeedback").focus(); }, 10);

        modal.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                  modal.style.display = "none";
              }
          });


      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }, 

    Overallmodal: function () {
      var modal = document.getElementById("modalBoxOverall");

      var span = document.getElementById("modalBoxCloseOverall");


        modal.style.display = "block";
        this.modalTrap('modalBoxOverall');

        

        setTimeout(() => { document.getElementById("modalBoxCloseOverall").focus(); }, 10);

        modal.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                  modal.style.display = "none";
              }
          });


      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }, 

    Wordsmodal: function () {
      var modal = document.getElementById("modalBoxWords");

      var span = document.getElementById("modalBoxCloseWords");


        modal.style.display = "block";
        this.modalTrap('modalBoxWords');

        setTimeout(() => { document.getElementById("modalBoxCloseWords").focus(); }, 10);

        modal.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                  modal.style.display = "none";
              }
          });


      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }, 

    Facemodal: function () {
      var modal = document.getElementById("modalBoxFace");

      var span = document.getElementById("modalBoxCloseFace");


        modal.style.display = "block";
        this.modalTrap('modalBoxFace');

        setTimeout(() => { document.getElementById("modalBoxCloseFace").focus(); }, 10);

        modal.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                  modal.style.display = "none";
              }
          });


      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }  
    }, 

    WPMmodal: function () {
      var modal = document.getElementById("modalBoxWPM");

      var span = document.getElementById("modalBoxCloseWPM");


        modal.style.display = "block";
        this.modalTrap('modalBoxWPM');

        setTimeout(() => { document.getElementById("modalBoxCloseWPM").focus(); }, 10);

        modal.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                  modal.style.display = "none";
              }
          });


      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }, 

    Volumemodal: function () {
      var modal = document.getElementById("modalBoxVolume");

      var span = document.getElementById("modalBoxCloseVolume");


        modal.style.display = "block";
        this.modalTrap('modalBoxVolume');

        setTimeout(() => { document.getElementById("modalBoxCloseVolume").focus(); }, 10);

        modal.addEventListener('keydown', (event) => {
              if (event.key === 'Escape') {
                  modal.style.display = "none";
              }
          });


      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }, 

    //alternate initialization specifically for Android Chrome (to use DeepGram fallback transcription)
    begin2: async function () {
      if (this.stop == false) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          if (!MediaRecorder.isTypeSupported("audio/webm")) {
            alert("Unsupported browser");
            return;
          }
          this.mediaRecorder = new MediaRecorder(stream, {
            mimeType: "audio/webm",
          });

          const DG_URL = "wss://api.deepgram.com/v1/listen?language=en";
          const DG_KEY = this.API2;
          this.socket = new WebSocket(DG_URL, ["token", DG_KEY]);
          this.socket.onopen = () => this.startStreaming();
          this.socket.onmessage = (message) => this.handleResponse(message);
          this.socket.onerror = () => this.errorMessage()

          if (
            this.textEmotionSelected == true ||
            this.WPMSelected == true ||
            this.voiceEmotionSelected == true ||
            this.faceEmotionSelected == true
          ) {
            this.msg3 = "";
            if (this.stop == false) {
              this.cancelCall = false;
              this.showTime = false;
              this.initialTime = Date.now();
              this.grabTimeInterval = window.setInterval(this.grabTime, 1000);              
              this.renderDataInterval = window.setInterval(
                this.renderData,
                1000
              );
              this.summarizeDataInterval = window.setInterval(
                this.summarizeData,
                this.dataSummaryTime
              );

              this.startVolumeMeter();
              document.getElementById("container").style.display = "inline";
              this.showStop = false;
              this.visualizeData();
              console.log("app started");
              this.show5 = true;
              this.stop = true;
            }
          } 
        } catch (error) {
          console.log(error);
        }
      }
    },

    errorMessage: function () {
            var node = document.createElement("li");
            node.appendChild(
              document.createTextNode(
                "No Android transcription available. A full implementation is necessary for transcription to function on Android. Find instructions for implementation at this url: https://publicspeakingdashboard.github.io/psd/" + "\n\n" + "If you are using a full implementation, check the console log."
              )
            );
            document.querySelector("ul").appendChild(node);
            var elem = document.getElementById("output");
            elem.style.fontSize = "14px";
            elem.scrollTop = elem.scrollHeight;
    },

    startStreaming: function () {
      this.mediaRecorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0 && this.socket.readyState == 1) {
          this.socket.send(event.data);
        }
      });
      
      this.mediaRecorder.start(50); 
    },

    handleResponse: function (message) {
      const received = JSON.parse(message.data);
      const alternatives = received.channel && received.channel.alternatives;
      if (alternatives && alternatives.length > 0) {
        const transcript = alternatives[0].transcript;
        if (transcript) {
          this.transcripts.push(transcript);
          console.log("deepgram " + transcript);
          window.clearTimeout(this.deepGramTimeOut);
          this.deepGramTimeOut = window.setTimeout(
            this.stopVoiceControl,
            30000
          );

          if (this.workingTime) {
            this.workingOutput = transcript;
            var node = document.createElement("li");
            node.appendChild(
              document.createTextNode(
                " " + this.workingTime + ": " + this.workingOutput
              )
            );
            document.querySelector("ul").appendChild(node);
            var elem = document.getElementById("output");
            elem.scrollTop = elem.scrollHeight;

            this.wordsSpoken = transcript;
            this.output = this.output += this.wordsSpoken;
            this.wordCount = this.countWords(this.output);
            this.totalWords = this.wordCount;
          }
        }
      }
    },

    begin: function () {
      //main initialization 
      document.getElementById("version").style.fontSize = "10px"
      document.getElementById("bugs").style.fontSize = "10px"
      this.analyzeFace();
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      let recognition = new window.SpeechRecognition();
      recognition.start();
      this.show = false;
      this.msg = ""
      this.msg3 =
        "Choose a desired speech length, then click start. Click stop when finished.";
      this.showModal = false;
      console.log("Dashboard page loaded");
      setTimeout(() => {
      document.getElementById("container").style.display = "inline";
    }, "4000");
    },

    startVolumeMeter: function() {
    //volume calculation and visualization
    (async () => {
      const volumeVisualizer = document.getElementById("volume-visualizer");
      const volumeNumberDisplay = document.getElementById("volume-number");

      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaStreamSource(audioStream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048; 

        audioSource.connect(analyser);
        const volumes = new Uint8Array(analyser.frequencyBinCount);

        this.volumeCallback = () => {
          analyser.getByteFrequencyData(volumes);

          let volumeSum = 0;
          for (const amplitude of volumes) {
            volumeSum += amplitude * amplitude;
          }
          const rms = Math.sqrt(volumeSum / volumes.length);

          const dBFS = 20 * Math.log10(rms / 255);

          const dBSPL = dBFS + 80; 
          const decibelValue = Math.max(0, dBSPL); 

          volumeNumberDisplay.textContent = Math.round(decibelValue) + " dB";
          this.volumeNumber = Math.round(decibelValue)

          const visualizerPercentage = Math.min(100, decibelValue / 80 * 100); 
          volumeVisualizer.style.setProperty("--volume", visualizerPercentage + "%");
          this.showVolume = false;
        }; 
      } catch (e) {
        console.log(e)
      }

      if (this.volumeCallback !== null && this.volumeInterval === null) {
        this.volumeInterval = setInterval(this.volumeCallback, 50); 
      }
    })();
  },


//todo: recode to remove original selection menu functions
    setVolume: function () {
      this.volumeValue = Math.round(this.volumeNumber);
    },

    selectWPM: function () {
      if (this.WPMSelected == false) {
        this.msg2 = "";
        this.WPMSelected = true;
        if (this.WPMSelected == true) {
          this.showWPM = false;
        }
      } else {
        this.WPMSelected = false;
        if (this.WPMSelected == false) {
          this.showWPM = true;
        }
      }
    },

    selectTextEmotion: function () {
      if (this.textEmotionSelected == false) {
        this.msg2 = "";
        this.textEmotionSelected = true;
        if (this.textEmotionSelected == true) {
          this.showTextEmotion = false;
        }
      } else {
        this.textEmotionSelected = false;
        if (this.textEmotionSelected == false) {
          this.showTextEmotion = true;
        }
      }
    },

    selectVoiceEmotion: function () {
      if (this.voiceEmotionSelected == false) {
        this.msg2 = "";
        this.voiceEmotionSelected = true;
        if (this.voiceEmotionSelected == true) {
          this.showVoiceEmotion = false;
        }
      } else {
        this.voiceEmotionSelected = false;
        if (this.voiceEmotionSelected == false) {
          this.showVoiceEmotion = true;
        }
      }
    },

    selectFaceEmotion: function () {
      if (this.faceEmotionSelected == false) {
        this.msg2 = "";
        this.faceEmotionSelected = true;
        if (this.faceEmotionSelected == true) {
          this.showFaceEmotion = false;
        }
      } else {
        this.faceEmotionSelected = false;
        if (this.faceEmotionSelected == false) {
          this.showFaceEmotion = true;
        }
      }
    },

    initiateVoiceControl: function () {
      //transcription of voice using the speech recognition api built into Chrome
      console.log("Voice this.voiceInstance initiated");
      window.SpeechRecognition = window.webkitSpeechRecognition; //|| window.Speechthis.voiceInstance;
      window.SpeechGrammarList = window.webkitSpeechGrammarList; //|| window.SpeechGrammarList;
      window.SpeechRecognitionEvent = window.webkitSpeechRecognitionEvent; //|| window.Speechthis.voiceInstanceEvent;

      let finalTranscript = "";
      this.voiceInstance = new window.SpeechRecognition();
      this.voiceInstance.interimResults = true;
      this.voiceInstance.maxAlternatives = 10;
      this.voiceInstance.continuous = true;
      (this.voiceInstance.onresult = (event) => {
        let interimTranscript = "";
        for (
          let i = event.resultIndex, len = event.results.length;
          i < len;
          i++
        ) {
          let transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            if (this.workingTime) {
              this.workingOutput = transcript;
              var node = document.createElement("li");
              node.appendChild(
                document.createTextNode(
                  " " + this.workingTime + ": " + this.workingOutput
                )
              );
              document.querySelector("ul").appendChild(node);
              var elem = document.getElementById("output");
              elem.scrollTop = elem.scrollHeight;
              console.log("SpeechRecognition: " + this.workingOutput);
            }
          } else {
            interimTranscript += transcript;
          }
        }
        this.wordsSpoken = finalTranscript;
        this.output = this.wordsSpoken += interimTranscript;
        this.wordCount = this.countWords(this.output);
        this.totalWords = this.wordCount;
      }),
        this.voiceInstance.addEventListener("end", () => {
          if (this.stop == true) {
            this.stopVoiceControl();
            console.log("SpeechRecognition app stopped");
          }
          if (this.stop == false) {
            this.voiceInstance.start();
            console.log("SpeechRecognition restarted");
          }
          
        });

      this.msg3 = "";

      if (this.stop == false) {
        this.voiceInstance.start();
        this.cancelCall = false;
        this.showTime = false;
        this.initialTime = Date.now();
        this.grabTimeInterval = window.setInterval(this.grabTime, 1000);
        this.renderDataInterval = window.setInterval(this.renderData, 1000);
        this.summarizeDataInterval = window.setInterval(
          this.summarizeData,
          this.dataSummaryTime
        );

        this.startVolumeMeter();
        document.getElementById("container").style.display = "inline";
        this.showStop = false;
        this.visualizeData();
        console.log("app started");
        this.show5 = true;

      }
    },

    analyzeFace: function () {
      //analysis of face, using faceapi.js
      this.showProcess = false;
      this.showBegin = false;
      const video = document.querySelector("video");
      this.loading = false;
      const videoContainer = document.getElementById("video-container");

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models"),
      ]).then(startVideo);

      function startVideo() {
        var constraints = { audio: false, video: true };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function (mediaStream) {
            //ios attributes
            video.setAttribute("autoplay", "true");
            video.setAttribute("playsinline", "true");
            video.setAttribute("muted", "true");
            video.setAttribute("loop", "true");
            //
            video.srcObject = mediaStream;

            //for ios?
            video.onloadedmetadata = function () {
              video.play();
            };
            //
          })
          .catch(function (err) {
            console.log(err.name + ": " + err.message);
          });
      }

      video.addEventListener("playing", () => {
        console.log("Initializing face recognition");
        const canvas = faceapi.createCanvasFromMedia(video);
        canvas.willReadFrequently = true;
        videoContainer.appendChild(canvas);

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        this.analyzeFaceInterval = window.setInterval(async () => {
          const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

          const resizedResults = faceapi.resizeResults(detections, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetections);

          const minProbability = 0.01;
          faceapi.draw.drawFaceExpressions(
            canvas,
            resizedResults,
            minProbability
          );

          if (resizedDetections && Object.keys(resizedDetections).length > 0) {
            const expressions = resizedDetections.expressions;
            const maxValue = Math.max(...Object.values(expressions));
            const emotion = Object.keys(expressions).filter(
              (item) => expressions[item] === maxValue
            );

            this.faceEmotionState = '"' + `${emotion[0]}` + '"';

            if (this.loading == false) {
              this.loading = true;
              this.show3 = false;
              this.showProcess = true;
              this.showStart = false;
              this.Savemodal();
            }
          }

          this.faceAngry = Math.round(detections.expressions.angry * 100);
          this.faceDisgusted = Math.round(
            detections.expressions.disgusted * 100
          );
          this.faceFearful = Math.round(detections.expressions.fearful * 100);
          this.faceHappy = Math.round(detections.expressions.happy * 100);
          this.faceNeutral = Math.round(detections.expressions.neutral * 100);
          this.faceSad = Math.round(detections.expressions.sad * 100);
          this.faceSurprised = Math.round(
            detections.expressions.surprised * 100
          );
        }, 500);
      });
    },

    grabTime: function () {
      //clock and preferred speaking time warnings
      if (this.time1 == true) {
        this.timeDifference = Date.now() - this.initialTime;
        this.dataNamer = this.timeDifference;
        var div = document.getElementById("timeHolder");
        div.innerHTML = this.dataNamer;
      }

      if (this.time1 == false) {
        this.timeDifference = Date.now() - this.initialTime;
        var middleTime = parseInt(
          document.getElementById("timeHolder").innerHTML
        );
        this.timeDifference = this.timeDifference + middleTime;
        this.time2 = true;
      }

      var formatted = convertTime(this.timeDifference);
      document.getElementById("timer").innerHTML = "" + formatted;
      this.workingTime = formatted;
      console.log(formatted);
      this.timeElapsed = this.timeDifference;
      this.placeHolderForTimeCheck = this.timeDifference;
      var selectedTime = document.getElementById("speakingTime").value;
      var selectedTimeFifteen = selectedTime - 15000;
      var selectedTimeThirty = selectedTime - 30000;
      var element = document.getElementById("timer");
      if (this.placeHolderForTimeCheck >= selectedTimeThirty) {
        element.style.backgroundColor = "green";
        this.msgTime = "30 Seconds Remaining"
      }
      if (this.placeHolderForTimeCheck >= selectedTimeFifteen) {
        element.style.backgroundColor = "yellow";
        this.msgTime = "15 Seconds Remaining"
      }
      if (this.placeHolderForTimeCheck >= selectedTime) {
        element.style.backgroundColor = "red";
        this.msgTime = "Selected Time Reached"
      }

      function convertTime(miliseconds) {
        var totalSeconds = Math.floor(miliseconds / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds - minutes * 60;
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
      }
    },

    countWords: function (str) {
      //calculation of number of words in the overall transcript
      const arr = str.split(" ");
      return arr.filter((word) => word !== "").length;
    },

    registerWPM: function () {
      //calcualtion of number of words per minute
      const elapsedSeconds = this.timeElapsed / 1000;
      this.wpm = elapsedSeconds > 0 ? Math.round((this.wordCount / elapsedSeconds) * 60) : 0; 
    },

    getReadabilityStats: function () {
      //calculate "chewiness" of language choices to output to chart
      this.readability = rs.gunningFog(this.workingOutput);
    },

    stopVoiceControl: function () {
      //reset speech recognition so it can stop and clear original timers
      this.showStop = true;
      this.showStart = false;
      this.stop = true;
      this.spinner2 = true;
      this.time1 = false;
      if (this.time2 == true) {
        this.dataNamer = this.timeDifference;
        var div2 = document.getElementById("timeHolder");
        div2.innerHTML = this.dataNamer;
      }
      if (this.volumeInterval !== null) {
        clearInterval(this.volumeInterval);
        this.volumeInterval = null;
      }
      if (this.cancelCall == false) {
        this.visualizeData();
        clearInterval(this.grabTimeInterval);
        clearInterval(this.renderDataInterval);
        clearInterval(this.summarizeDataInterval);
        this.showTime = false;
        this.stop = true;
        this.show5 = false;
        this.showTime = false;
        this.showPrinty = false;
        if (this.android == false) {
          this.voiceInstance.stop();
        }

        if (this.android == true) {
          this.mediaRecorder.stop();
          console.log("android app stopped");
        }
        setTimeout(() => {
          this.summarizeData();
        }, 1010);
          setTimeout(() => {
          this.getFeedback();
        }, 3500);
        

        this.cancelCall = true;
      }

    },

    reset: function () {
      //reloads app, and clears data
      location.reload();
    },

    unhideData: function () {
      //shows raw data
      document.getElementById("rawData").style.display = "inline-block";
    },

    hideData: function () {
      //hides raw data
      document.getElementById("rawData").style.display = "none";
    },

    renderData: function () {
      //collects data from words per minute, volume, facial emotion, and word complexity functions and writes it to the raw data element in the html
      const promise1 = new Promise((resolve, reject) => {
        this.setVolume();
        this.getReadabilityStats();
        this.registerWPM();
        resolve("Data rendered!");
        reject("Data render failed");
      });

      promise1.then(() => {
        this.constructJSON();
        this.visualizeData();
        this.resetWorkingOutput();
      });
    },

    constructJSON: function () {
      this.currentDataObject =
        '{"time":' +
        '"' +
        this.workingTime +
        '"' +
        "," +
        '"wpm":' +
        '"' +
        this.wpm +
        '"' +
        "," +
        '"content":' +
        '"' +
        this.workingOutput +
        '"' +
        "," +
        '"volume":' +
        this.volumeValue +
        "," +
        '"word_complexity":' +
        this.readability +
        "," +
        '"faceAnger":' +
        this.faceAngry +
        "," +
        '"faceDisgust":' +
        this.faceDisgusted +
        "," +
        '"faceFear":' +
        this.faceFearful +
        "," +
        '"faceHappiness":' +
        this.faceHappy +
        "," +
        '"faceNeutral":' +
        this.faceNeutral +
        "," +
        '"faceSadness":' +
        this.faceSad +
        "," +
        '"faceSurprise":' +
        this.faceSurprised +
        "},";
      var div = document.getElementById("rawData");
      div.innerHTML += this.currentDataObject;
      this.overallDataObject = document.getElementById("rawData").innerHTML;
    },

    async summarizeData() {
      //collects the most recent batch of raw data and sends to large lanugage model for summary
      var overallRawData = document.getElementById("rawData").innerHTML;
      const overallSlicedDataArray = JSON.parse(
        "[" + overallRawData.slice(0, -1) + "]"
      );
      const numberOfObjects = overallSlicedDataArray.length;
      const dataSource = JSON.stringify(overallSlicedDataArray);
      const workingValue = numberOfObjects - 1;
      const instance = this;
      const actualTime = instance.workingTime;

      if (instance.firstSummary == false) {
        instance.dataSample = dataSource.substring(
          dataSource.indexOf(instance.referenceTime)
        );
        instance.referenceTime = overallSlicedDataArray[workingValue].time;
      }

      if (instance.firstSummary == true) {
        instance.dataSample = dataSource;
        instance.referenceTime = overallSlicedDataArray[workingValue].time;
        instance.firstSummary = false;
      }

      try {
        const response = await fetch('/.netlify/functions/summarizeData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dataSample: instance.dataSample, referenceTime: instance.referenceTime }),
        });

        const data = await response.json();
        instance.dataSummary = instance.dataSummary +=
          "#" + "00:" + actualTime + " " + data.result + "\n\n";
        if (data.result){
          instance.feedback = instance.dataSummary;
        }
        else{
          instance.feedback = "No specific feedback available. A full implementation is necessary for feedback to function. Find instructions for implementation at this url: https://publicspeakingdashboard.github.io/psd/" + "\n\n" + "If you are using a full implementation, check the console log."
        }
      } catch (error) {
        console.error('Error summarizing data:', error);
        instance.showFeedback = false;
        instance.feedback = "No overall feedback available. A full implementation is necessary for feedback to function. Find instructions for implementation at this url: https://publicspeakingdashboard.github.io/psd/" + "\n\n" + "If you are using a full implementation, check the console log.";
      }
  },

  async getFeedback() {
    //collects all of the previous summaries of data and sends them to large language model for summary and feedback
    const instance = this;

    try {
      const response = await fetch(`/.netlify/functions/getFeedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataSummary: instance.dataSummary }),
      });
      instance.showFeedback2 = false;
      const data = await response.json();
      
      if (data.result){
        instance.feedback2 = data.result
      }
      else{
        instance.feedback2 = "No overall feedback available. A full implementation is necessary for feedback to function. Find instructions for implementation at this url: https://publicspeakingdashboard.github.io/psd/" + "\n\n" + "If you are using a full implementation, check the console log."
      }
      
      instance.spinner2 = false;
      instance.showPrinty = true;
      instance.show5 = true;
    } catch (error) {
      console.error('Error fetching feedback:', error);
      instance.showFeedback2 = false;
      instance.feedback2 = "No overall feedback available. A full implementation is necessary for feedback to function. Find instructions for implementation at this url: https://publicspeakingdashboard.github.io/psd/" + "\n\n" + "If you are using a full implementation, check the console log."
    }
  },

    resetWorkingOutput: function () {
      //clears transcript between function calls
      this.workingOutput = "";
    },

    pdfResults: function () {
      //set up page for saving data report in .pdf
      this.showFeedback = false
      
      document.getElementById("container").style.position = "static"

      document.getElementById("wpmChart").style.width = "1200px"
      document.getElementById("volumeChart").style.width = "1200px"
      document.getElementById("faceEmotionChart").style.width = "1200px"
      document.getElementById("readabilityChart").style.width = "1200px"
      
      const charts = document.querySelectorAll('[data-title="Autoscale"]');

      charts.forEach((element) => {
      element.click()
      });

      setTimeout(() => {
        window.print();
      },    "50");

      setTimeout(() => {
        this.showFeedback = true
        document.getElementById("container").style.position = "fixed"
        document.getElementById("wpmChart").style.width = "80%"
        document.getElementById("volumeChart").style.width = "80%"
        document.getElementById("faceEmotionChart").style.width = "80%"
        document.getElementById("readabilityChart").style.width = "80%"
      
      const charts = document.querySelectorAll('[data-title="Autoscale"]');

      charts.forEach((element) => {
      element.click()
      });
      },    "1000");

    },

    visualizeData: function () {
      //writes data values for the words per minute, volume, facial emotion, and word complexity functions
      var overallRawData = document.getElementById("rawData").innerHTML;
      var overallSlicedDataArray = "[" + overallRawData.slice(0, -1) + "]";
      var data = JSON.parse(overallSlicedDataArray);

      //Words per minute
      if (this.showWPM == false) {
        let wordsPerMinute = {
          x: [],
          y: [],
          mode: "lines",
          name: "Words Per Minute",
          line: {
            color: "#f48d79",
            width: 2,
          },
        };

        data.forEach(function (val) {
          wordsPerMinute.x.push(val["time"]);
          wordsPerMinute.y.push(val["wpm"]);
        });

        var layout = {
          paper_bgcolor: "#222831",
          plot_bgcolor: "#222831",
          title: {
            text: "Rate of Speech",
            font: {
              family: "Arial, sans-serif",
              size: 20,
              color: "#71c68b",
            },
            xref: "paper",
            automargin: true,
            x: 0.5,
            xanchor: "center",
            y: 0.88,
            yanchor: "top",
          },
          autosize: true,
          xaxis: {
            tickfont: {
              size: 18,
              color: "#71c68b",
            },
            tickcolor: "#36454f",
            title: {
              text: "Time",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#71c68b",
              },
            },
          },
          yaxis: {
            margin: {
              autoexpand: true,
            },
            automargin: true,
            tickfont: {
              size: 18,
              color: "#71c68b",
            },
            tickcolor: "#36454f",
            title: {
              text: "Words Per Minute",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#71c68b",
              },
            },
          },
        };

        var config = {
          displayModeBar: true,
          modeBarButtonsToRemove: ["lasso2d", "select2d", "sendDataToCloud"],
          displaylogo: false,
          responsive: true
        };

        var WPMChart = document.getElementById("wpmChart");
        Plotly.newPlot(WPMChart, [wordsPerMinute], layout, config);
      }

      //Volume
      if (this.showVolume == false) {
        let volume = {
          x: [],
          y: [],
          mode: "lines",
          name: "Volume",
          line: {
            color: "#40D0E0",
            width: 2,
          },
        };

        data.forEach(function (val) {
          volume.x.push(val["time"]);
          volume.y.push(val["volume"]);
        });

        var layout3 = {
          paper_bgcolor: "#222831",
          plot_bgcolor: "#222831",
          title: {
            text: "Volume",
            font: {
              family: "Arial, sans-serif",
              size: 20,
              color: "#c300ff",
            },
            xref: "paper",
            automargin: true,
            x: 0.5,
            xanchor: "center",
            y: 0.88,
            yanchor: "top",
          },
          autosize: true,
          xaxis: {
            tickfont: {
              size: 18,
              color: "#c300ff",
            },
            tickcolor: "#c300ff",
            title: {
              text: "Time",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#c300ff",
              },
            },
          },
          yaxis: {
            margin: {
              autoexpand: true,
            },
            automargin: true,
            tickfont: {
              size: 18,
              color: "#c300ff",
            },
            tickcolor: "#c300ff",
            title: {
              text: "Volume",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#c300ff",
              },
            },
          },
        };

        var volumeChart = document.getElementById("volumeChart");
        Plotly.newPlot(volumeChart, [volume], layout3, config);
      }

      //Readability
      if (this.showVolume == false) {
        let word_complexity = {
          x: [],
          y: [],
          mode: "lines",
          name: "Volume",
          line: {
            color: "#40D0E0",
            width: 2,
          },
        };

        data.forEach(function (val) {
          word_complexity.x.push(val["time"]);
          word_complexity.y.push(val["word_complexity"]);
        });

        var layout5 = {
          paper_bgcolor: "#222831",
          plot_bgcolor: "#222831",
          title: {
            text: "Complexity of Words Spoken",
            font: {
              family: "Arial, sans-serif",
              size: 20,
              color: "#fdfd96",
            },
            xref: "paper",
            automargin: true,
            x: 0.5,
            xanchor: "center",
            y: 0.88,
            yanchor: "top",
          },
          autosize: true,
          xaxis: {
            tickfont: {
              size: 16,
              color: "#fdfd96",
            },
            tickcolor: "#36454f",
            title: {
              text: "Time",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#fdfd96",
              },
            },
          },
          yaxis: {
            margin: {
              autoexpand: true,
            },
            automargin: true,
            tickfont: {
              size: 16,
              color: "#fdfd96",
            },
            tickcolor: "#fdfd96",
            title: {
              text: "Grade Level",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#fdfd96",
              },
            },
          },
        };

        var readabilityChart = document.getElementById("readabilityChart");
        Plotly.newPlot(readabilityChart, [word_complexity], layout5, config);
      }

      //Emotions in Face
      if (this.faceEmotionSelected == true) {
        let Angry = {
          x: [],
          y: [],
          mode: "lines",
          name: "Anger",
          line: {
            color: "#ff6961",
            width: 2,
          },
        };

        let Fearful = {
          x: [],
          y: [],
          mode: "lines",
          name: "Fear",
          line: {
            color: "#fdfd96",
            width: 2,
          },
        };

        let Excited = {
          x: [],
          y: [],
          mode: "lines",
          name: "Surprise",
          line: {
            color: "#ffb347",
            width: 2,
          },
        };

        let Bored = {
          x: [],
          y: [],
          mode: "lines",
          name: "Neutral",
          line: {
            color: "#cfcfc4",
            width: 2,
          },
        };

        let Sad = {
          x: [],
          y: [],
          mode: "lines",
          name: "Sadness",
          line: {
            color: "#85A1F2",
            width: 2,
          },
        };

        let Happy = {
          x: [],
          y: [],
          mode: "lines",
          name: "Happiness",
          line: {
            color: "#77dd77",
            width: 2,
          },
        };

        let Disgusted = {
          x: [],
          y: [],
          mode: "lines",
          name: "Disgust",
          line: {
            color: "##FF5733",
            width: 2,
          },
        };

        data.forEach(function (val) {
          Angry.x.push(val["time"]);
          Angry.y.push(val["faceAnger"]);
          Fearful.x.push(val["time"]);
          Fearful.y.push(val["faceFear"]);
          Excited.x.push(val["time"]);
          Excited.y.push(val["faceSurprise"]);
          Bored.x.push(val["time"]);
          Bored.y.push(val["faceNeutral"]);
          Sad.x.push(val["time"]);
          Sad.y.push(val["faceSadness"]);
          Happy.x.push(val["time"]);
          Happy.y.push(val["faceHappiness"]);
          Disgusted.x.push(val["time"]);
          Disgusted.y.push(val["faceDisgust"]);
        });

        var layout4 = {
          paper_bgcolor: "#222831",
          plot_bgcolor: "#222831",
          title: {
            text: "  Expressions in Face",
            font: {
              family: "Arial, sans-serif",
              size: 20,
              color: "#f48d79",
            },
            xref: "paper",
            automargin: true,
            x: 0.5,
            xanchor: "center",
            y: 0.88,
            yanchor: "top",
          },
          autosize: true,
          xaxis: {
            tickfont: {
              size: 16,
              color: "#f48d79",
            },
            tickcolor: "#f48d79",
            title: {
              text: "Time",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#f48d79",
              },
            },
          },
          yaxis: {
            margin: {
              autoexpand: true,
            },
            automargin: true,
            tickfont: {
              size: 16,
              color: "#f48d79",
            },
            tickcolor: "#f48d79",
            title: {
              text: "Expressions",
              font: {
                family: "Arial, sans-serif",
                size: 18,
                color: "#f48d79",
              },
            },
          },
        };

        var FACEEMOTIONChart = document.getElementById("faceEmotionChart");
        Plotly.newPlot(
          FACEEMOTIONChart,
          [Angry, Fearful, Excited, Bored, Sad, Happy, Disgusted],
          layout4, config
        );
      }
    },
  }, //methods
}; //export
</script>


<style scoped>
@import url("https://fonts.cdnfonts.com/css/lcd");
#textEmotion,
#faceEmotion,
#voiceEmotion,
#wpm {
  display: inline-block;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

div {
  background-color: none;
  color: #71c68b;
}

.chartWindow {
  position: relative;
  display: inline-block;
  width: 80%;
}

.optionsButton {
  height: 50px;
  width: 75px;
  padding: 12px;
  font-size: 10px;
  margin: 5px;
  border: none;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
}

.title {
  color: white;
}

#messageTwo {
  color: #f48d79;
  font-size: 25px;
}

.feedback {
  color: white;
  font-size: 25px;
  text-align: left;
  background-color: #f508f176;
  padding: 50px;
  white-space: pre-wrap;
  overflow: auto;
}

#messageThree {
  color: white;
  font-size: 25px;
}

#begin {
  background-color: #c300ff;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: -20px;
}

#begin:hover {
  background-color: #fdfd96;
}

#start {
  background-color: lightgreen;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#start:hover {
  background-color: #cbc3e3;
}

#start:focus {
  border-style: solid; 
  border-color: white;
  border-width: thick; 
}

#stop {
  background-color: #ff726f;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#stop:hover {
  background-color: #cbc3e3;
}

#reset {
  background-color: lightyellow;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#reset:hover {
  background-color: #cbc3e3;
}

#reset:focus {
  border-style: solid; 
  border-color: white;
  border-width: thick; 
}

#pdf {
  background-color: #c300ff;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
}

#pdf:hover {
  background-color: #00ffc3;
}

#next {
  background-color: #7766c6;
  border: none;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: -20px;
}

#next:hover {
  background-color: #ffc300;
}

#output {
  margin: auto;
  color: #f48d79;
  background-color: #222831;
  width: 80%;
  text-align: left;
  overflow: auto;
  height: 170px;
  font-size: 25px;
  margin-top: 0px;
  margin-bottom: 0px;
}

#wpmChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: 3px;
  margin-bottom: 0px;
}

#readabilityChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: 3px;
  margin-bottom: 0px;
}

#volumeChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: -3px;
}

#textEmotionChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: -3px;
}

#faceEmotionChart {
  overflow: auto;
  width: 80%;
  display: inline-block;
  margin-top: -3px;
}

#rawData {
  display: none;
  margin: auto;
  color: lawngreen;
  background-color: #222831;
  width: 80%;
  text-align: left;
  overflow: scroll;
  height: 100px;
  font-size: 25px;
  margin: 0px;
}

#dataHideButton {
  margin: auto;
  color: #00ffc3;
  background-color: #222831;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

#dataHideButton:hover {
  margin: auto;
  color: black;
  background-color: #19a47f;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

#dataHideButton:focus {
  margin: auto;
  color: #00ffc3;
  background-color: #222831;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
}

#dataShowButton {
  margin: auto;
  color: #00ffc3;;
  background-color: #222831;
  width: 39.55%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

#dataShowButton:hover {
  margin: auto;
  color: black;
  background-color: #19a47f;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

#dataShowButton:focus {
  margin: auto;
  color: #00ffc3;
  background-color: #222831;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

h1 {
  font-size: 50px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0px;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#talking {
  height: 85px;
  margin-bottom: -20px;
  margin-left: -8px;
  -webkit-filter: invert(1);
  filter: invert(1);
}

#timer {
  background: #222831;
  color: white;
  font-size: 50px;
  font-family: "LCD", sans-serif;
  height: 100px;
  width: 80%;
  border: none;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0px;
  margin: auto;
  padding-top: 15px;
}

#timeHolder {
  background-color: #123b52;
  color: white;
  display: none;
  margin-bottom: 0px;
}

#speakingTime {
  background-color: #00ffc3;
  outline: none;
  scroll-behavior: smooth;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 21px;
  margin: 10px;
  text-align: center;
  border: none;
}

#speakingTime:hover {
  background-color: #c300ff;
}

#speakingTime:focus {
  border-style: solid; 
  border-color: white;
  border-width: thick; 
}

#volume-visualizer-wrapper {
  background-color: #222831;
  margin-top: 0px;
  padding: 0px;
  margin-bottom: 0px;
  width: 80%;
  display: inline-block;
  padding-bottom: 10px;
}

#volume-visualizer {
  --volume: 0%;
  position: relative;
  height: 10px;
  background-color: #222831;
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100%;
  border: none;
  display: inline-block;
}

#volume-visualizer::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--volume);
  background-color: #c300ff;
  transition: width 100ms linear;
}

#container {
  display: none;
  position: fixed;
  z-index: 1;
  margin-top: -90px;
  margin-left: 10%;
  pointer-events: none;
}

.video-container {
  position: relative;
  margin-top: 0px;
  background-color: #222831;
  display: inline-block;
  height: 175px;
}

canvas {
  position: absolute;
  left: 0;
  top: 0px;
}

.result-container {
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.result-container > div {
  font-size: 1.3rem;
  padding: 0.5rem;
  margin: 5px 0;
  color: white;
  text-transform: capitalize;
}

video {
  width: 100%;
  margin-bottom: -150px;
  margin-top: 0px;
}

#loading {
  height: 50px;
}

#loadingContainer {
  color: #fdfd96;
  font-size: 50px;
}

#specificAndOverallFeedback {
  color: #71c68b;
}

#specificAndOverallFeedback2 {
  color: #71c68b;
}

#initialMessage {
  font-size: 20px;
  color: #fdfd96;
}

#modal {
  color: white;
}

#footer {
  display: flex;
  position: float;
  bottom: 0;
  margin-top: 5%;
  height: 3rem;
  text-align: left;
}

#bugs {
  color: white;
  font-size: 15px;
}

.modal {
  display: none; 
  position: fixed; 
  z-index: 1; 
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto;
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
  z-index: 2; 
}

.modal-content {
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  background-color: #f48d79; 
  color: black;
  font-size: 25px;
  height: 75%; 
  overflow-y: scroll;
}

.close {
  float: right;
  color: black; 
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black; 
  text-decoration: none;
  cursor: pointer;
  background-color: lightgray;
}

.close2 {
  color: black; 
  font-size: 28px;
  font-weight: bold;
  border-style: solid; 
  padding: 5px; 
  margin: auto;
  width: 100px;
}

.close2:hover,
.close2:focus {
  color: black; 
  text-decoration: none;
  cursor: pointer;
}

.modalButton {
background: #f48d79;
border: none;
font-size: .8em;
margin-bottom: 28px;; 
color: black;
}

#modalButtonOverall{
margin-top: 6px; 
}

#modalButtonFeedback{
  margin-top: 6px;
}

@page {
  size: A3 landscape;
  counter-increment: page;
  margin: none;
}
* {
  -webkit-print-color-adjust: exact !important; 
  color-adjust: exact !important; 
  print-color-adjust: exact !important; 
}

#body {
  -webkit-print-color-adjust: exact;
}

#loader {
  margin: auto;
  width: 50%;
}

@keyframes loading {
  from {color: #f48d79;}
  to {color: #c300ff;}
}

.lds-spinner,
.lds-spinner div,
.lds-spinner div:after {
  box-sizing: border-box;
  animation-name: loading; 
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

.lds-spinner {
  color: currentColor;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}

.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3.2px;
  left: 36.8px;
  width: 6.4px;
  height: 17.6px;
  border-radius: 20%;
  background: currentColor;
}

.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

button, .optionsButton, #begin, #start, #stop, #reset, #pdf, #next, #speakingTime, #dataHideButton, #dataShowButton {
  cursor: pointer;
}

button:focus, .optionsButton:focus, #begin:focus, #start:focus, #stop:focus, #reset:focus, #pdf:focus, #next:focus, #speakingTime:focus, #dataHideButton:focus, #dataShowButton:focus {
   outline: 3px solid #09eb1c;  /* Add a noticeable outline */
}

.lds-ellipsis,
.lds-ellipsis span {
  box-sizing: border-box;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 18px;
}

.lds-ellipsis span {
  position: absolute;
  top: 10.33333px;
  width: 13.33333px;
  height: 13.33333px;
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis span:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis span:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis span:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis span:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

#spinner2 {
  color: white;
}

#showSpecificFeedbackButton{
  background: #c6ee61;
  color: black; 
  font-size: 20px;
  border-style: none; 
}

#placeHolderForSaveButton  {
  padding-top: 5px;
  background-color: #c300ff;
  display: inline-block;
  border: none;
  height: 46px;
  width: 100px;
  font-weight: bold;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 8px;
  margin: 10px;
}

</style>
