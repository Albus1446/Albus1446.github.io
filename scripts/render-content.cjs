const fs = require('node:fs');
const path = require('node:path');
const marked = require('../static/js/marked.min.js');
const yaml = require('../static/js/js-yaml.min.js');

const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
marked.use({ mangle: false, headerIds: false });

for (const name of ['home', 'research', 'talks', 'awards', 'skills']) {
    const start = '<!-- CONTENT:' + name + ':START -->';
    const end = '<!-- CONTENT:' + name + ':END -->';
    const left = html.indexOf(start);
    const right = html.indexOf(end, left + start.length);
    if (left < 0 || right < 0) throw new Error('Missing content markers: ' + name);
    const markdown = fs.readFileSync(path.join(root, 'contents', name + '.md'), 'utf8');
    html = html.slice(0, left + start.length) + '\n' +
        marked.parse(markdown) + '                    ' + html.slice(right);
}

const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const config = yaml.load(fs.readFileSync(path.join(root, 'contents', 'config.yml'), 'utf8'));
for (const [id, value] of Object.entries(config)) {
    if (typeof value !== 'string') continue;
    const expression = new RegExp('(<([a-z][a-z0-9]*)\\b[^>]*\\bid="' + id + '"[^>]*>)[\\s\\S]*?(<\\/\\2>)', 'i');
    if (!expression.test(html)) throw new Error('Missing configuration target: ' + id);
    html = html.replace(expression, (_, opening, tag, closing) => opening + escape(value) + closing);
}
fs.writeFileSync(indexPath, html);
console.log('Rendered all five content sections and page labels.');
