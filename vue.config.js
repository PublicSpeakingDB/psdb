module.exports = {
  publicPath: "/",
  devServer: {
    proxy: {
      "/\\.netlify\\/functions/": {
        target: "http://localhost:8888", // Replace with your Netlify Dev server port
        pathRewrite: { "^/\\.netlify\\/functions/": "" },
        changeOrigin: true, 
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      args[0]["process.env"].VUE_APP_ROOT_API2 = JSON.stringify(
        "" // Set a placeholder or an empty string
      );
      return args;
    });
  },
};