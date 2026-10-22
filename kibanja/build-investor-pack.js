// Builds kibanja-investor-pack.html from kibanja-smartcare.html: the same code and figures, showing only the
// investor sections (pitch, investors to approach, name ideas, underwriting). Run: node kibanja/build-investor-pack.js
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'kibanja-smartcare.html'), 'utf8');
const swap = (text, from, to) => {
  if (!text.includes(from)) throw new Error(`build-investor-pack: "${from}" not found in kibanja-smartcare.html`);
  return text.replace(from, to);
};
let out = swap(src, "const MODE = 'platform';", "const MODE = 'investors';");
out = swap(out, '<title>Kibanja SmartCare</title>', '<title>Kibanja Investor Pack</title>');
fs.writeFileSync(path.join(__dirname, 'kibanja-investor-pack.html'), out);
console.log('wrote kibanja-investor-pack.html');
