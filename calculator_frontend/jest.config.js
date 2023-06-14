module.exports = {
    testEnvironment: 'jsdom', // Set the test environment to jsdom for testing in a browser-like environment
    verbose: true, // Enable verbose output for test results
  
    // Define the file patterns to include for testing
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  
    // Set up any additional configuration options or plugins
    // For example, you can use 'babel-jest' for transpiling JavaScript with Babel
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(react-syntax-highlighter)/)'
      ],
    moduleFileExtensions: ['js', 'jsx'],
    
    moduleNameMapper: {
        '^axios$': 'axios',
      },
  };
  