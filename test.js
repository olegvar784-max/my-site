// Простые проверки сайта: обязательные файлы и блоки страницы
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const checks = [
  ['есть заголовок h1', /<h1>[^<]+<\/h1>/.test(html)],
  ['есть изображение с alt', /<img [^>]*alt="[^"]+"/.test(html)],
  ['есть блок «Обо мне»', html.includes('id="about"')],
  ['подключены style.css и script.js', html.includes('href="style.css"') && html.includes('src="script.js"')],
  ['есть кнопка переключения темы', html.includes('id="theme"')],
  ['файлы сайта на месте', ['style.css', 'script.js', 'img/avatar.svg'].every((f) => fs.existsSync(f))]
];
let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}`);
  if (!ok) failed++;
}
if (failed) { console.error(`Не пройдено проверок: ${failed}`); process.exit(1); }
console.log('Tests passed');
