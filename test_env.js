// Load environment variables from .env file
require('dotenv').config();

// Access environment variables
const API_URL = process.env.API_URL;
const SECRET_KEY = process.env.SECRET_KEY;

// Test logic
console.log("Running test...");
if (!API_URL || !SECRET_KEY) {
    console.error("Environment variables are missing!");
    process.exit(1);
} else {
    console.log(`API URL: ${API_URL}`);
    console.log(`Secret Key: ${SECRET_KEY}`);
    console.log("Test passed!");
}
