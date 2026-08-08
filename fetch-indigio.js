const fs = require('fs');
const https = require('https');

const url = 'https://indigio.club';

https.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => { data += chunk; });
    response.on('end', () => {
        fs.writeFileSync('indigio-home.html', data);
        console.log('✅ Success! HTML saved to indigio-home.html');
        console.log('👉 Open that file in your browser and copy the text you need.');
    });
}).on('error', (err) => {
    console.error('❌ Error fetching the site:', err.message);
});