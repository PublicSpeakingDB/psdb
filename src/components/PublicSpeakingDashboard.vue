<template>
  <div id="body" class="dashboard">
    <p v-if="!loading" id="loadingContainer">
      Initializing <br /><section id="loader"></section><br /><span
        id="initialMessage"
        >(Make sure your webcam is facing you.)</span
      >
    </p>
    <span id="container"
 ><div id="video-container" class="video-container">
   <video id="video" autoplay width="150" height="150"></video></div
></span>
    <h1 v-if="showProcess" id="mainTitle">
      <img
        id="talking"
        alt="image of voice waves leaving someone's mouth. Attribution: Speak Icon, by Voysla, 'https://www.flaticon.com/free-icons/speak'"
        src="talking.png"
      />
      {{ msg }}
    </h1>
    <p v-if="showProcess" id="messageTwo">
      {{ msg2 }}
    </p>
    
    <p v-if="showProcess" id="messageThree">
      {{ msg3 }}
    </p>
    <span id="timeHolder">Time: </span>
    <!--<span><button  v-bind:style="{ backgroundColor: WPMColor}" v-if="!show" v-on:click="selectWPM" class="optionsButton" id="optionWPM"> Words Per Minute</button><button v-bind:style="{ backgroundColor: textEmotionColor}" v-if="!show" v-on:click="selectTextEmotion" class="optionsButton" id="optionEmotionsText"> Emotions in Text</button></span>
		<span><button v-bind:style="{ backgroundColor: voiceEmotionColor}" v-if="!show" v-on:click="selectVoiceEmotion" class="optionsButton" id="optionEmotionVoice"> Emotions in Voice</button><button v-bind:style="{ backgroundColor: faceEmotionColor}" v-if="!show" v-on:click="selectFaceEmotion" class="optionsButton" id="optionEmotionsFace"> Emotions in Face</button></span><br>-->
    <span
      ><span v-if="!show3" id="dropdownWrapper">
        <label for="speakingTime" alt="Choose Desired Speech Length:"></label>
        <select name="speakingTime" id="speakingTime">
          <option value="nope" selected>
            Choose Target Speaking Time - (Gives 30 and 15 Sec Warnings Before
            Selected Time)
          </option>
          <option value="60000">1 Min</option>
          <option value="120000">2 Min</option>
          <option value="180000">3 Min</option>
          <option value="300000">5 Min</option>
          <option value="360000">6 Min</option>
          <option value="420000">7 Min</option>
          <option value="480000">8 Min</option>
          <option value="540000">9 Min</option>
          <option value="600000">10 Min</option>
          <!-- <option value="900000">15 Min</option>
          <option value="1200000">20 Min</option>
          <option value="1500000">25 Min</option>
          <option value="1800000">30 Min</option>
          <option value="2700000">45 Min</option>
          <option value="3600000">60 Min</option> -->
        </select>
      </span>
      <button
        id="begin"
        v-if="showBegin"
        v-on:click="
          begin();
          selectWPM();
          selectTextEmotion();
          selectVoiceEmotion();
          selectFaceEmotion();
        "
      >
        Begin</button
      ><button id="start" v-if="!showStart" v-on:click="begin3">Start</button
      ><button id="stop" v-if="!showStop" v-on:click="stopVoiceControl">
        Stop</button
      ><button id="reset" v-if="!show3" v-on:click="reset">Reset</button
      ><button id="pdf" v-if="!show5" v-on:click="pdfResults">
        Save
      </button></span
    >
    
    <!--<br><button id="next" v-if="!show" v-on:click="next">Next</button>--><br />
    <span id="rawData"></span>
    <button v-if="!showTime" class="title" id="timer">{{ time }}</button>
    <span v-if="!show3" id="volume-visualizer-wrapper"
      ><button id="volume-visualizer"></button
    ></span>
    <ul v-if="!show3" id="output"></ul>
    <span
      ><button v-if="!show3" id="dataShowButton" v-on:click="unhideData">
        View Raw Data</button
      ><button v-if="!show3" id="dataHideButton" v-on:click="hideData">
        Hide Raw Data
      </button></span
    >
<section><button v-if="!showVolume" v-on:click="Overallmodal" class="modalButton" id="modalButtonOverall">How Public Speaking Dashboard Works</button></section>
<span id="container"
 ><div id="video-container" class="video-container">
   <video id="video" autoplay width="150" height="150"></video></div
></span>
<!-- The Modal -->
<div id="modalBoxSave" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
   
    <h2>Be Sure to Save!</h2>
    <p>Public Speaking Dashboard does not save user content.<br><br>Clicking the "back" button will clear any dashboard results/analysis. <br><br>To keep a copy of your results, click "save."</p>
    <span id="modalBoxCloseSave" class="close2">Got It</span>
  </div>
</div>

<!-- The Modal -->
<div id="modalBoxOverall" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span id="modalBoxCloseOverall" class="close">&times;</span>
    <h2>How Public Speaking Dashboard Works</h2>
    <p>Public Speaking Dashboard analyzes the user's rate of speech, volume, expressions in face, and word complexity. Then, that data is summarized by bots (short for "software-based robots") to help you think about your speech performance.<br><br>Use the data output and feedback to identify successes and opportunities for growth in your speaking performance. <br><br><b>Important note about transcription</b>: Public Speaking Dashboard is <i>mostly</i> correct in its transcriptions, but will unavoidably return erroneous results (this is a limitation inherent to automated transcription in general). As such, it is important to reflect on the results of Public Speaking Dashboard not with an eye for specific "blunders" but rather larger patterns in your public speaking.</p>
    
  </div>
</div>
<span id="container"
 ><div id="video-container" class="video-container">
   <video id="video" autoplay width="150" height="150"></video></div
></span>

    <!--FEEDBACK SECTION-->

    <!--WPM-->
    <span v-if="!showWPM" id="wpmChart"></span><br>
    <section><button v-if="!showVolume" v-on:click="WPMmodal" class="modalButton" id="modalButtonWPM">More About Rate of Speech</button></section>

<!-- The Modal -->
<div id="modalBoxWPM" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span id="modalBoxCloseWPM" class="close">&times;</span>
    <h2>Rate of Speech</h2>
    <p>Rate of speech is calculated by taking the latest registered "chunk" of transcribed speech and dividing it by the time passed since the previous chunk was registered.<br><br>Use this data to think about your own impact and understandability.<br><br>Speaking quickly might add energy but reduce comprehension for the audience. And, speaking slowly might add clarity but lose energy. The ideal is to strike a balance based on your own unique speaking style and character.</p>
    
  </div>

</div>

    <span v-if="!showVolume" id="volumeChart"></span><br>
    <section><button v-if="!showVolume" v-on:click="Volumemodal" class="modalButton" id="modalButtonWPM">More About Volume</button></section>

<!-- The Modal -->
<div id="modalBoxVolume" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span id="modalBoxCloseVolume" class="close">&times;</span>
    <h2>Volume</h2>
    <p>Volume is captured by sampling the microphone volume once a second.<br><br>Use this data to think about your speech "dynamics," the ups and downs throughout your speech. <br><br>While it is true that a speech can be too quiet or too loud, variance in volume can also enhance a speech by adding texture to it.</p>
    
  </div>

</div>
    <span v-if="!showFaceEmotion" id="faceEmotionChart"></span>
    <section><button v-if="!showVolume" v-on:click="Facemodal" class="modalButton" id="modalButtonFace">More About Expressions in Face</button></section>

<!-- The Modal -->
<div id="modalBoxFace" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span id="modalBoxCloseFace" class="close">&times;</span>
    <h2>Expressions in Face</h2>
    <p>This data is captured by assessing key areas of the face to register a given emotional state once a second.<br><br>Use this data to think about the "congruence" (or not) between your words spoken and your facial expressions.<br><br>Much of the time we want our facial expressions to be congruent with our content. But there are also occasions where incongruence is desirable--in humorous speech, for instance. Keep in mind that a "neutral" facial expression is not negative; it can be a desirable expression in many speaking contexts.<br><br>It is important to keep in mind that, because the system samples your facial expressions once a second, it can sometimes register "micro-expressions," or flashes of expression that do not necessarily represent the emotional state perceptible by our audiences.</p>
    
  </div>

</div>
    <span v-if="!showTextEmotion" id="readabilityChart"></span>
        <section><button v-if="!showVolume" v-on:click="Wordsmodal" class="modalButton" id="modalButtonWords">More About Complexity of Words Spoken</button></section>

<!-- The Modal -->
<div id="modalBoxWords" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span id="modalBoxCloseWords" class="close">&times;</span>
    <h2>Complexity of Words Spoken</h2>
    <p>Word complexity is calcuated by dividing words by number of syllables--the more syllables per word, the higher the complexity score.<br><br>Use this data to think about your understandability and impact.<br><br>Language that is too "chewy" for your audience might impact their ability to understand. But, language that isn't chewy enough might be less impactful.</p>
    
  </div>

</div>
    <h1 v-if="!showFeedback" id="specificAndOverallFeedback">
      Specific Feedback
    </h1>
    <p v-if="!showFeedback" class="feedback">{{ feedback }}</p>
    <h1 v-if="!showFeedback2" id="specificAndOverallFeedback">
      Overall Feedback
    </h1>
    <p v-if="!showFeedback2" class="feedback">{{ feedback2 }}</p>
    
    
    <section><button v-if="!showVolume" v-on:click="Feedbackmodal" class="modalButton" id="modalButtonFeedback">More About Feedback</button></section>

<!-- The Modal -->
<div id="modalBoxFeedback" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span id="modalBoxCloseFeedback" class="close">&times;</span>
    <h2>Feedback</h2>
    <p>Feedback is generated by having a bot summarize the data in 20 or 30 second "chunks." (20 second chunks for speeches under 3 minutes, and 30 second chunks for speeches longer than 3 minutes.)<br><br>From here, another bot summarizes those specific feedback points to give overall feedback.<br><br>It is important to keep in mind that the bots can sometimes give inaccurate feedback (they're bots after all).<br><br>Use the feedback to better understand your own data, but don't take the bots' assessments as absolutely correct.</p>
    
  </div>

</div>
    <!-- 
		<span v-if="!showTextEmotion" id="textEmotionChart"></span>
 -->

 
    <footer id="footer" v-if="showFooter">
      <section id="version">
        Version 0.1 (Beta)
        
        <div id="bugs">
          <br />
          <section v-if="showModal" id="modal">
            Public Speaking Dashboard does not collect user data or use cookies.
            However, third party services are used for transcription and analysis.
            Terms of use for those third party services can be found
            <a href="https://deepgram.com/terms">here</a> and
            <a href="https://mistral.ai/terms/">here</a>.
          </section><br>
          <b>Known Bugs and Limitations:</b> <br />
          <section>
            - Current version of app works best on the latest Google Chrome browser on
            desktop. Other browsers are unstable.
          </section>
          <section>
            - App will work on Google Chrome browser on iOS and Android. Other
            browsers are unstable.
          </section>
          <section>
            - User needs to speak for at least 30 seconds before meaningful
            results are produced.
          </section>
          <section>
            - System will only reliably give an overall summary for speeches shorter
            than 10 minutes.
          </section>
          <section>
            <br />
            If you find a bug please report it here:
            <a
              href="https://rowan.co1.qualtrics.com/jfe/form/SV_8AhIsft05UgIUqW"
              >Bug/Error Report Form</a
            >
            
          </section>
          <br /><br />
        </div>
      </section>
    </footer>
    <!--<p v-if="!showWPM" id="wpm">{{ wpm }} <br><b>Overall Average Words Per Minute</b></p><br>-->
  </div>
</template>

<script>
//import paralleldots from 'paralleldots'
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
      //analyzingFace: true,
      faceAngry: 0,
      faceDisgusted: 0,
      faceFearful: 0,
      faceHappy: 0,
      faceNeutral: 0,
      faceSad: 0,
      faceSurprised: 0,
      continuous: true,
      speechAgain: false,
      API: process.env.VUE_APP_ROOT_API2,
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
      dataSummaryTime: 20000
    };
  },

  created() {
    var isAndroid = /(android)/i.test(navigator.userAgent);
    if (isAndroid) {
      this.android = true;
      console.log("using alternate speech recognition");
    } else {
      if (
        "SpeechRecognition" in window ||
        "webkitSpeechRecognition" in window
      ) {
        console.log("Landing page loaded");
        console.log("Speech recognition supported");
      } else {
        console.log("Landing page loaded");
        console.log("Speech recognition not supported.");
        this.msg2 =
          "Public Speaking Dashboard is not supported by this browser and/or device. Currently, Public Speaking Dashboard only works on desktop and in the Chrome browser.";
        this.showBegin = false;
      }
    }
  },

  methods: {
    begin3: function () {
      this.msg=""
      this.showStart = true;
      this.showStop = false;
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


    

    Savemodal: function () {
        // Get the modal
        var modal = document.getElementById("modalBoxSave");

        // Get the button that opens the modal
        // Get the <span> element that closes the modal
        var span = document.getElementById("modalBoxCloseSave");


          modal.style.display = "block";


        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
      },
    
    Feedbackmodal: function () {
        // Get the modal
var modal = document.getElementById("modalBoxFeedback");

// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementById("modalBoxCloseFeedback");


  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

      
    }, 
    Overallmodal: function () {
        // Get the modal
var modal = document.getElementById("modalBoxOverall");

// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementById("modalBoxCloseOverall");


  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

      
    }, 
    Wordsmodal: function () {
        // Get the modal
var modal = document.getElementById("modalBoxWords");

// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementById("modalBoxCloseWords");


  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

      
    }, 
Facemodal: function () {
        // Get the modal
var modal = document.getElementById("modalBoxFace");

// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementById("modalBoxCloseFace");


  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

      
    }, 
    WPMmodal: function () {
        // Get the modal
var modal = document.getElementById("modalBoxWPM");

// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementById("modalBoxCloseWPM");


  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

      
    }, 

    Volumemodal: function () {
        // Get the modal
var modal = document.getElementById("modalBoxVolume");

// Get the button that opens the modal
// Get the <span> element that closes the modal
var span = document.getElementById("modalBoxCloseVolume");


  modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

      
    }, 

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
              // if (this.analyzingFace == false){this.analyzeFace()}
            }
          } else {
            this.msg2 =
              "No input data selected. Try selecting words per minute or another parameter.";
          }
        } catch (error) {
          alert(error);
        }
      }
    },

    startStreaming: function () {
      this.mediaRecorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0 && this.socket.readyState == 1) {
          this.socket.send(event.data);
        }
      });

      this.mediaRecorder.start(50); // Start recording in chunks of 250ms
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
      //initiate speech recognition and ask for microphone permission
      this.analyzeFace();
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      let recognition = new window.SpeechRecognition();
      recognition.start();
      this.show = false;
      this.msg3 =
        "Choose a desired speech length. Click start. Then, click stop when finished.";
      this.showModal = false;
      console.log("Dashboard page loaded");
      setTimeout(() => {
      document.getElementById("container").style.display = "inline";
    }, "2000");
    },

    startVolumeMeter: function () {
      (async () => {
        const volumeVisualizer = document.getElementById("volume-visualizer");
        // Initialize
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
            },
          });

          const audioContext = new AudioContext();
          const audioSource = audioContext.createMediaStreamSource(audioStream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 512;
          analyser.minDecibels = -127;
          analyser.maxDecibels = 0;
          analyser.smoothingTimeConstant = 0.4;
          audioSource.connect(analyser);
          const volumes = new Uint8Array(analyser.frequencyBinCount);
          this.volumeCallback = () => {
            analyser.getByteFrequencyData(volumes);
            let volumeSum = 0;
            for (const volume of volumes) volumeSum += volume;
            const averageVolume = volumeSum / volumes.length;
            // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
            volumeVisualizer.style.setProperty(
              "--volume",
              (averageVolume * 100) / 127 + "%"
            );
            this.volumeNumber = averageVolume;
            this.showVolume = false;
          };
        } catch (e) {
          console.error(
            "Failed to initialize volume visualizer, simulating instead...",
            e
          );
          let lastVolume = 50;
          this.volumeCallback = () => {
            const volume = Math.min(
              Math.max(Math.random() * 100, 0.8 * lastVolume),
              1.2 * lastVolume
            );
            lastVolume = volume;
            volumeVisualizer.style.setProperty("--volume", volume + "%");
          };
        }
        // Use

        if (this.volumeCallback !== null && this.volumeInterval === null)
          this.volumeInterval = setInterval(this.volumeCallback, 100);
      })();
    },

    setVolume: function () {
      this.volumeValue = Math.round(this.volumeNumber);
    },

    selectWPM: function () {
      if (this.WPMSelected == false) {
        this.msg2 = "";
        this.WPMSelected = true;
        this.WPMColor = "#f48d79";
        if (this.WPMSelected == true) {
          this.showWPM = false;
        }
      } else {
        this.WPMSelected = false;
        this.WPMColor = "#CBC3E3";
        if (this.WPMSelected == false) {
          this.showWPM = true;
        }
      }
    },

    selectTextEmotion: function () {
      if (this.textEmotionSelected == false) {
        this.msg2 = "";
        this.textEmotionSelected = true;
        this.textEmotionColor = "#f48d79";
        if (this.textEmotionSelected == true) {
          this.showTextEmotion = false;
        }
      } else {
        this.textEmotionSelected = false;
        this.textEmotionColor = "#CBC3E3";
        if (this.textEmotionSelected == false) {
          this.showTextEmotion = true;
        }
      }
    },

    selectVoiceEmotion: function () {
      if (this.voiceEmotionSelected == false) {
        this.msg2 = "";
        this.voiceEmotionSelected = true;
        this.voiceEmotionColor = "#f48d79";
        if (this.voiceEmotionSelected == true) {
          this.showVoiceEmotion = false;
        }
      } else {
        this.voiceEmotionSelected = false;
        this.voiceEmotionColor = "#CBC3E3";
        if (this.voiceEmotionSelected == false) {
          this.showVoiceEmotion = true;
        }
      }
    },

    selectFaceEmotion: function () {
      if (this.faceEmotionSelected == false) {
        this.msg2 = "";
        this.faceEmotionSelected = true;
        this.faceEmotionColor = "#f48d79";
        if (this.faceEmotionSelected == true) {
          this.showFaceEmotion = false;
        }
      } else {
        this.faceEmotionSelected = false;
        this.faceEmotionColor = "#CBC3E3";
        if (this.faceEmotionSelected == false) {
          this.showFaceEmotion = true;
        }
      }
    },

    initiateVoiceControl: function () {
      //start listening for words and making a transcript of detected words
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
        //this.voiceInterval = window.setInterval(this.voiceInstance.start(), 25000);

        this.startVolumeMeter();
        document.getElementById("container").style.display = "inline";
        this.showStop = false;
        this.visualizeData();
        console.log("app started");
        this.show5 = true;

        // if (this.analyzingFace == false){this.analyzeFace()}
      }
    },

    analyzeFace: function () {
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
      //keep  of time in both milliseconds as well as minutes and seconds

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
      }
      if (this.placeHolderForTimeCheck >= selectedTimeFifteen) {
        element.style.backgroundColor = "yellow";
      }
      if (this.placeHolderForTimeCheck >= selectedTime) {
        element.style.backgroundColor = "red";
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
      //count how many words are in the transcript of detected words
      const arr = str.split(" ");
      return arr.filter((word) => word !== "").length;
    },

    registerWPM: function () {
      //calculate number of words per minute--at one second intervals
      this.wpm = Math.round((this.wordCount / (this.timeElapsed / 1000)) * 60);
    },

    //getEmotionStats: function () {
    //send transcript data to be evaluated as per emotional content
    // const pd = require('paralleldots' || paralleldots)
    // 			pd.apiKey = "hL7rOIhghKLZtrI6w04cFjxVvAOHQ7BiNhjMLAVnMPw";
    // 			pd.emotion(this.workingOutput,"en")
    // 			.then((response) => {
    // 				let obj = JSON.parse(response)
    // 				this.textEmotionData = response.slice(1)
    // 				this.anger = Math.round(obj.emotion.Angry * 100)
    // 				this.fear = Math.round(obj.emotion.Fear * 100)
    // 				this.excitement = Math.round(obj.emotion.Excited * 100)
    // 				this.boredom = Math.round(obj.emotion.Bored * 100)
    // 				this.sadness = Math.round(obj.emotion.Sad * 100)
    // 				this.happiness = Math.round(obj.emotion.Happy * 100)
    // 			})
    // 				.catch((error) => {
    // 				console.log(error);
    // 			})

    //},

    getReadabilityStats: function () {
      this.readability = rs.gunningFog(this.workingOutput);
    },

    stopVoiceControl: function () {
      //reset speech recognition so it can stop and clear original timers
      this.showStart = false;
      this.showStop = true;
      this.stop = true;
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
        //clearInterval(this.voiceInterval);
        this.showTime = false;
        this.stop = true;
        this.show5 = false;
        this.showTime = false;
        this.show5 = false;
        if (this.android == false) {
          this.voiceInstance.stop();
        }

        if (this.android == true) {
          this.mediaRecorder.stop();
          console.log("android app stopped");
        }
        setTimeout(() => {
          this.summarizeData();
          setTimeout(() => {
          this.getFeedback();
        }, 2000);
        }, 3000);

        this.cancelCall = true;
      }

      //clearInterval(this.analyzeFaceInterval)
      //this.analyzingFace = false
    },

    reset: function () {
      location.reload();
    },

    unhideData: function () {
      document.getElementById("rawData").style.display = "inline-block";
    },

    hideData: function () {
      document.getElementById("rawData").style.display = "none";
    },

    renderData: function () {
      const promise1 = new Promise((resolve, reject) => {
        this.setVolume();
        //this.getEmotionStats()
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

    summarizeData: function () {
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
        //dataSource[numberOfObjects2 - 1].time;
      }

      if (instance.firstSummary == true) {
        instance.dataSample = dataSource;
        instance.referenceTime = overallSlicedDataArray[workingValue].time;
        instance.firstSummary = false;
      }

      const client = axios.create({
        headers: {
          Authorization: "Bearer " + instance.API,
        },
      });

          const params = {
            model: 'open-mistral-7b',
            messages: [{role: 'user', content: "Read the following data and give a summary that describes some key take-aways from it. Keep the summary under seventy five words. The data contains information about an isolated section of a speech. Describe to the speaker their speech dynamics while quoting, if available, the content of the section. When refering to facial emotions, refer to them as their corresponding emotions. Report only the numbers in the data. Do not assign units of measure to them. Do not offer advice for improvement. Do not offer evaluations of whether the speaker delivered well or poorly. Do not analyze the data for the speaker. Do not conjecture about what the speaker's intentions are. Do not give an overall statement about the speaker's dynamics. Do not make commentary on data that is not present. Omit from the summary any sentences that include the words, 'the data does not provide' or 'is not provided'. Note only the included data. Do not mention anything beyond what is included in the data. Keep the response under seventy five words. Data: " +
            instance.dataSample}],
            temperature: 0,
      };

      client
        .post("https://api.mistral.ai/v1/chat/completions", params)
        .then((result) => {
          console.log(result.data)
          instance.showFeedback = false;
          const rawResultA = result.data.choices[0].message.content + " ";
          instance.dataSummary = instance.dataSummary +=
            "#" + "00:" + actualTime + " " + rawResultA + "\n\n";
          instance.feedback = instance.dataSummary;
          // let div = document.getElementById("feedback");
          // let p = document.createElement("p");
          // p.innerText = instance.workingTime + ": " + rawResultA;
          // div.appendChild(p);
        })
        .catch((error) => {
          console.log(error);
          this.msg = error;
        });
    },

    getFeedback: function () {
      const instance = this;
      console.log("final input" + instance.feedback);
      const client = axios.create({
        headers: {
          Authorization: "Bearer " + instance.API,
        },
      });

          const params = {
            model: 'open-mistral-7b',
            messages: [{role: 'user', content: "Give a brief overall summary of the following statements about a specific speech. The statements represent descriptions of data chunks about the speech. Keep the summary under two hundred words. Include overall averages for numbers and ranges reported in the statements. Refer to the speech as 'the speech'. Do not offer advice or suggestions for improvement. If there are no statements respond with 'not enough data to return overall feedback'. Note only the included data. Do not mention anything beyond what is included in the data. Statements: " +
          instance.dataSummary}],
            temperature: 0,
            
      };

      client
        .post("https://api.mistral.ai/v1/chat/completions", params)
        .then((result) => {
          console.log(result)
          instance.showFeedback2 = false;
          const rawResultA = result.data.choices[0].message.content;
          instance.feedback2 = rawResultA;
          console.log("final output" + rawResultA);
        })
        .catch((error) => {
          console.log(error);
          this.msg = error;
        });
    },

    resetWorkingOutput: function () {
      this.workingOutput = "";
    },

    pdfResults: function () {

      var feedBackEls = document.getElementsByClassName("feedback");
      document.getElementById("container").style.position = "static"

      document.querySelector('[data-title="Autoscale"]').click()

      for(var i=0;i<feedBackEls.length;i++){
        feedBackEls[i].style.height = 100+"%";
      }

      window.print();

      for(var i2=0;i2<feedBackEls.length;i2++){
        feedBackEls[i2].style.height = 200+"px";
      }
       document.getElementById("container").style.position = "fixed"
       document.querySelector('[data-title="Autoscale"]').click()

    },

    visualizeData: function () {
      var overallRawData = document.getElementById("rawData").innerHTML;
      var overallSlicedDataArray = "[" + overallRawData.slice(0, -1) + "]";
      var data = JSON.parse(overallSlicedDataArray);

      //Words Per Minute
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

        var WPMChart = document.getElementById("wpmChart");
        Plotly.newPlot(WPMChart, [wordsPerMinute], layout);
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
        Plotly.newPlot(volumeChart, [volume], layout3);
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
        Plotly.newPlot(readabilityChart, [word_complexity], layout5);
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
          layout4
        );
      }

      // Emotions in Text
      // 			if (this.textEmotionSelected == true) {
      //
      // 				let Anger = {
      // 					x: [],
      // 					y: [],
      // 					mode: "lines",
      // 					name: 'Anger',
      // 					line: {
      // 						color: '#ff6961',
      // 						width: 2
      // 					}
      // 				};
      //
      // 				let Fear = {
      // 					x: [],
      // 					y: [],
      // 					mode: "lines",
      // 					name: 'Fear',
      // 					line: {
      // 						color: '#fdfd96',
      // 						width: 2
      // 					}
      // 				};
      //
      // 				let Excitement = {
      // 					x: [],
      // 					y: [],
      // 					mode: "lines",
      // 					name: 'Excitement',
      // 					line: {
      // 						color: '#ffb347',
      // 						width: 2
      // 					}
      // 				};
      //
      // 				let Boredom = {
      // 					x: [],
      // 					y: [],
      // 					mode: "lines",
      // 					name: 'Boredom',
      // 					line: {
      // 						color: '#cfcfc4',
      // 						width: 2
      // 					}
      // 				};
      //
      // 				let Sadness = {
      // 					x: [],
      // 					y: [],
      // 					mode: "lines",
      // 					name: 'Sadness',
      // 					line: {
      // 						color: '#85A1F2',
      // 						width: 2
      // 					}
      // 				};
      //
      // 				let Happiness = {
      // 					x: [],
      // 					y: [],
      // 					mode: "lines",
      // 					name: 'Happiness',
      // 					line: {
      // 						color: '#77dd77',
      // 						width: 2
      // 					}
      // 				};
      //
      // 				data.forEach(function(val) {
      // 				Anger.x.push(val["time"]);
      // 				Anger.y.push(val["Angry"]);
      // 				Fear.x.push(val["time"]);
      // 				Fear.y.push(val["Fear"]);
      // 				Excitement.x.push(val["time"]);
      // 				Excitement.y.push(val["Excited"]);
      // 				Boredom.x.push(val["time"]);
      // 				Boredom.y.push(val["Bored"]);
      // 				Sadness.x.push(val["time"]);
      // 				Sadness.y.push(val["Sad"]);
      // 				Happiness.x.push(val["time"]);
      // 				Happiness.y.push(val["Happy"]);
      // 				});
      //
      // 				var layout2 = {
      // 				paper_bgcolor: "#222831",
      // 				plot_bgcolor: "#222831",
      // 				title: {
      // 					text:'  Emotions in Words Spoken',
      // 					font: {
      // 					family: 'Arial, sans-serif',
      // 					size: 20,
      // 					color: '#fdfd96',
      // 				},
      // 					xref: 'paper',
      // 					automargin: true,
      // 					x: 0.6,
      // 					xanchor: 'center',
      // 					y: 0.88,
      // 					yanchor: 'top'
      // 				},
      // 				autosize: true,
      // 					xaxis: {
      // 						tickfont : {
      // 							size : 16,
      // 							color : '#fdfd96'
      // 						},
      // 						tickcolor: '#36454f',
      // 						title: {
      // 							text: 'Time',
      // 							font: {
      // 							family: 'Arial, sans-serif',
      // 							size: 18,
      // 							color: '#fdfd96',
      // 							}
      // 						},
      // 					},
      // 					yaxis: {
      // 						margin: {
      // 							autoexpand: true,
      // 						},
      // 						automargin: true,
      // 						tickfont : {
      // 							size : 16,
      // 							color : '#fdfd96'
      // 						},
      // 						tickcolor: '#fdfd96',
      // 						title: {
      // 						text: 'Emotions',
      // 							font: {
      // 							family: 'Arial, sans-serif',
      // 							size: 18,
      // 							color: '#fdfd96'
      // 							}
      // 						}
      // 					}
      // 				};
      //
      // 				var TEXTEMOTIONChart = document.getElementById('textEmotionChart');
      // 				Plotly.newPlot(TEXTEMOTIONChart, [Anger, Fear, Excitement, Boredom, Sadness, Happiness], layout2);
      //			}
    },
  }, //
}; //
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.cdnfonts.com/css/lcd");
#textEmotion,
#faceEmotion,
#voiceEmotion,
#wpm {
  display: inline-block;
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
  height: 200px;
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
  color: #222831;
  background-color: #222831;
  width: 40%;
  text-align: center;
  height: 30px;
  font-size: 10px;
  margin: 0px;
  border: none;
}

#dataShowButton {
  margin: auto;
  color: #222831;
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
  height: 100px;
  margin-bottom: -20px;
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
  height: 200px;
  margin-top:-60px;
  display: none;
  position: fixed;
  right: -30px; 
  z-index: 1;
}

.video-container {
  position: relative;
  margin-top: 0px;
  background-color: #222831;
  width: 60%;
  display: inline-block;
 
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

#initialMessage {
  font-size: 20px;
  color: #c300ff;
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
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  z-index: 2; 
}

/* Modal Content */
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

/* The Close Button */
.close {
  float: right;
  color: white; 
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: gray; 
  text-decoration: none;
  cursor: pointer;
}

.close2 {
  color: white; 
  font-size: 28px;
  font-weight: bold;
  border-style: solid; 
  padding: 5px; 
  margin: auto;
  width: 50%;
}

.close2:hover,
.close2:focus {
  color: black; 
  text-decoration: none;
  cursor: pointer;
}

.modalButton {
background: rgba(0,0,0,.5);
border: none;
font-size: 12px;
font-weight: bold;
margin-bottom: 2%; 
color: white;
margin-top: .5%;
}


@page {
  size: A3 landscape;
  counter-increment: page;
  margin: none;
}
* {
  -webkit-print-color-adjust: exact !important; /* Chrome, Safari 6 – 15.3, Edge */
  color-adjust: exact !important; /* Firefox 48 – 96 */
  print-color-adjust: exact !important; /* Firefox 97+, Safari 15.4+ */
}

#loader {

  margin: auto;
  width: 50%;
  /* the colors */
  --c1: #71c68b;
  --c2: #f48d79;
  --c3: #c300ff;
  --c4: #fdfd96;
  /**/

  width: 200px; /* control the size */
  aspect-ratio: 8/5;
  --_g: no-repeat radial-gradient(#000 68%, #0000 71%);
  -webkit-mask: var(--_g), var(--_g), var(--_g);
  -webkit-mask-size: 25% 40%;
  background: conic-gradient(var(--c1) 50%, var(--c2) 0) no-repeat,
    conic-gradient(var(--c3) 100%, var(--c4) 0) no-repeat;
  background-size: 200% 50%;
  animation: back 3s infinite steps(1), load 2s infinite;
}

@keyframes load {
  0% {
    -webkit-mask-position: 0% 0%, 50% 0%, 100% 0%;
  }
  16.67% {
    -webkit-mask-position: 0% 100%, 50% 0%, 100% 0%;
  }
  33.33% {
    -webkit-mask-position: 0% 100%, 50% 100%, 100% 0%;
  }
  50% {
    -webkit-mask-position: 0% 100%, 50% 100%, 100% 100%;
  }
  66.67% {
    -webkit-mask-position: 0% 0%, 50% 100%, 100% 100%;
  }
  83.33% {
    -webkit-mask-position: 0% 0%, 50% 0%, 100% 100%;
  }
  100% {
    -webkit-mask-position: 0% 0%, 50% 0%, 100% 0%;
  }
}
@keyframes back {
  0%,
  100% {
    background-position: 0% 0%, 0% 100%;
  }
  25% {
    background-position: 100% 0%, 0% 100%;
  }
  50% {
    background-position: 100% 0%, 100% 100%;
  }
  75% {
    background-position: 0% 0%, 100% 100%;
  }
}
</style>
