# HTTPS Localhost Server

This simple project sets up an HTTPS server to run the embed-example.html file on a secure localhost.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Generate SSL certificates:
   ```
   npm run generate-cert
   ```

3. Start the HTTPS server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   https://localhost:3000
   ```

Note: Your browser may warn about the self-signed certificate. This is normal for local development. You can proceed safely by accepting the certificate warning.

## What This Does

This creates a secure HTTPS connection on your localhost to properly test the embedded script.