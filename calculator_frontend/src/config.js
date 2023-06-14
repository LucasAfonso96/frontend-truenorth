// config.js

const config = {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://calculator-truenorth.herokuapp.com/' : 'http://localhost:8000',
  };
  
  export default config;
  