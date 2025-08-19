const http = require('http');

// Test GET all tutorials
function testGetTutorials() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/tutorials',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('GET /api/tutorials Response:');
      console.log('Status:', res.statusCode);
      console.log('Data:', data);
      console.log('---');
      testPostTutorial();
    });
  });

  req.on('error', (error) => {
    console.error('GET Error:', error);
  });

  req.end();
}

// Test POST tutorial
function testPostTutorial() {
  const postData = JSON.stringify({
    title: 'Test Tutorial',
    description: 'This is a test tutorial',
    published: true
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/tutorials',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('POST /api/tutorials Response:');
      console.log('Status:', res.statusCode);
      console.log('Data:', data);
      console.log('---');
      testRootEndpoint();
    });
  });

  req.on('error', (error) => {
    console.error('POST Error:', error);
  });

  req.write(postData);
  req.end();
}

// Test root endpoint
function testRootEndpoint() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('GET / Response:');
      console.log('Status:', res.statusCode);
      console.log('Data:', data);
    });
  });

  req.on('error', (error) => {
    console.error('Root endpoint Error:', error);
  });

  req.end();
}

// Start testing
console.log('Testing API endpoints...');
testGetTutorials();
