// cors.js

module.exports = (handler) => async (event, context) => {
    // Handle preflight requests
    if (event.httpMethod === "OPTIONS") {
      // Get the origin from Netlify's context if available
      const origin =
        context.clientContext && context.clientContext.url
          ? context.clientContext.url
          : "http://localhost:8888"; // Fallback for local dev

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": origin, 
          "Access-Control-Allow-Headers": "Content-Type", 
          "Access-Control-Allow-Methods": "POST", 
        },
      };
    }

    // Process the actual request and add CORS headers to the response
    const response = await handler(event, context);
    
    // Get the origin from Netlify's context if available
    const origin =
        context.clientContext && context.clientContext.url
          ? context.clientContext.url
          : "http://localhost:8888"; 

    return {
      ...response,
      headers: { ...response.headers, "Access-Control-Allow-Origin": origin },
    };
  };