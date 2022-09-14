const { createServer } = require('node:http');

function createApp() {
return createServer((request, response) => {
    response.statusCode = 200;

    response.setHeader('Content-type', 'text/html');

    response.end('<html><body><p>Welcome to the World Wide Web!</p></body></html>');
});
}

module.exports = createApp;