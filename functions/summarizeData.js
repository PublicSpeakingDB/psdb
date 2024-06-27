
const axios = require("axios");
require("dotenv").config();
const withCors = require("./cors.js"); // Import the custom CORS middleware

exports.handler = withCors(async (event, context) => {
  try {
    const { dataSample, referenceTime } = JSON.parse(event.body);
    const API_KEY = process.env.VUE_APP_ROOT_API2;

    const params = {
      model: "open-mistral-7b",
      messages: [
        {
          role: "user",
          content: "Read the following data and give a summary that describes some key take-aways from it. The data contains information about an isolated section of a speech. Describe to the speaker their speech dynamics while quoting, if available, the content of the section. When refering to facial emotions, refer to them as their corresponding emotions. Report only the numbers in the data. Do not assign units of measure to them. Do not offer advice for improvement. Do not offer evaluations of whether the speaker delivered well or poorly. Do not analyze the data for the speaker. Do not conjecture about what the speaker's intentions are. Do not give an overall statement about the speaker's dynamics. Do not make commentary on data that is not present. Omit from the summary any sentences that include the words, 'the data does not provide' or 'is not provided'. Note only the included data. Do not mention anything beyond what is included in the data. Keep the response under seventy five words. Data: " +
        dataSample,
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
      body: JSON.stringify({ 
        result: rawResultA, 
        referenceTime: referenceTime // Send referenceTime back to the client
      }),
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


