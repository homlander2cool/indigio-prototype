import * as fs from 'fs';
const url = 'https://indigio.club';
const response = await fetch(url);
const html = await response.text();
fs.writeFileSync('indigio-home.html', html);
console.log('✅ HTML saved to indigio-home.html! Open it to copy your text.');