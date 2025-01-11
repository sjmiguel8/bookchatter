const config = {
  apiUrl: import.meta.env.PROD 
    ? 'https://bookchatter.onrender.com'  // Production URL
    : 'http://localhost:5001',            // Development URL
  version: '1.0.1'
};

console.log('Config loaded:', config);

export default config; 