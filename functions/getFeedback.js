const axios = require("axios");
require("dotenv").config();
const withCors = require("./cors.js"); // Import the custom CORS middleware

exports.handler = withCors(async (event, context) => {
  try {
    const { dataSummary } = JSON.parse(event.body);
    const API_KEY = process.env.VUE_APP_ROOT_API2;

    const params = {
      model: "open-mistral-7b",
      messages: [
        {
          role: "user",
          content: "Give a brief overall summary of the following statements about a specific speech. The statements represent descriptions of data chunks about the speech marked by minutes and seconds. Rate of speech is calculated by taking the latest registered chunk of transcribed speech and dividing it by the time passed since the previous chunk was registered. This data is meant to be used to think about one’s own impact and understandability. For example, speaking quickly might add energy but reduce comprehension for the audience. And, speaking slowly might add clarity but lose energy. The ideal is to strike a balance based on one’s own unique speaking style and character. Volume is captured by sampling the microphone volume once a second to output a volume score in decibels. This data is meant to be used to think about one’s speech dynamics, the ups and downs throughout their speech. While it is true that a speech can be too quiet or too loud, variance in volume can also enhance a speech by adding texture to it. Facial emotion data is captured by assessing key areas of the face to register a given emotional state once a second. This data is meant to be used to think about the congruence (or not) between the words spoken and one’s facial expressions. Much of the time we want our facial expressions to be congruent with our content. But there are also occasions where incongruence is desirable--in humorous speech, for instance. Neutral facial expressions are not negative; they can be a desirable expressions in many speaking contexts. It is important to keep in mind that, because the system samples facial expressions once a second, it can sometimes register micro-expressions, or flashes of expression that do not necessarily represent the emotional state perceptible by our audiences. Word complexity is calculated by dividing the number of words by the number of syllables. A higher ratio indicates more complex words. Complexity of words spoken can impact the understandability and engagement of one’s audience. This data is meant to be used to reflect on one’s word choices and to consider simplifying your language for better communication. Include overall averages for numbers and ranges reported in the statements. Refer to the speech as 'the speech'. Offer some take aways for the speaker to consider based on the statements while pointing to specific examples from the statements. Do not use evaluative language in the take aways. If there are no statements following 'Statements: ', respond with 'not enough data to return overall feedback'. Note only the included data. Do not mention anything beyond what is included in the data. Keep the response under 400 words. Statements: " +
            dataSummary,
        },
      ],
      temperature: 0,
    };

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      params,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const rawResultA = response.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ result: rawResultA }),
    };
  } catch (error) {
    console.error("Error in Netlify Function:", error);

    if (error.response && error.response.data) {
      const apiErrorMessage =
        error.response.data.error || "Unknown API error"; // Use .error to display specific Mistral API errors
      return {
        statusCode: error.response.status,
        body: JSON.stringify({ error: apiErrorMessage }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to summarize data" }),
      };
    }
  }
});