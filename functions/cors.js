module.exports = (handler) => async (event, context) => {
    if (event.httpMethod === "OPTIONS") {
      const origin =
        context.clientContext && context.clientContext.url
          ? context.clientContext.url
          : "http://localhost:8888"; 

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": origin, 
          "Access-Control-Allow-Headers": "Content-Type", 
          "Access-Control-Allow-Methods": "POST", 
        },
      };
    }

    const response = await handler(event, context);
    
    const origin =
        context.clientContext && context.clientContext.url
          ? context.clientContext.url
          : "http://localhost:8888"; 

    return {
      ...response,
      headers: { ...response.headers, "Access-Control-Allow-Origin": origin },
    };
  };