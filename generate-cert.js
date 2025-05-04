const { execSync } = require('child_process');
const fs = require('fs');
const mkcert = require('mkcert');

async function generateCerts() {
  try {
    console.log('Generating certificates for HTTPS...');
    
    // Create a CA
    const ca = await mkcert.createCA({
      organization: 'Local Development CA',
      countryCode: 'US',
      state: 'State',
      locality: 'Locality',
      validityDays: 365
    });
    
    // Create a certificate signed by that CA
    const cert = await mkcert.createCert({
      domains: ['localhost', '127.0.0.1'],
      validityDays: 365,
      caKey: ca.key,
      caCert: ca.cert
    });
    
    // Save the certificates
    fs.writeFileSync('key.pem', cert.key);
    fs.writeFileSync('cert.pem', cert.cert);
    
    console.log('Certificates generated successfully!');
    console.log('You can now run the server with: npm start');
  } catch (error) {
    console.error('Error generating certificates:', error);
  }
}

generateCerts(); 