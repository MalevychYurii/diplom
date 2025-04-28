module.exports = {
    content: [
        "./src/**/*.html",
        "./src/**/*.js",
        "./*.html"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
/* npm run dev
[style.scss]
      ↓
output.css
      ↓
postcss (tailwind, autoprefixer, cssnano)
      ↓
dist/style.css
      ↓
course.html
*/

/*
Файл | За що відповідає
package.json | Опис скриптів (build, watch, dev) і залежностей
postcss.config.js | Налаштування PostCSS плагінів
tailwind.config.js | Контроль що очищати в Tailwind і кастомізація
src/css/style/courseHTML/style.scss | основний SCSS-файл
dist/style.css | Фінальний мінімізований CSS-файл для сайту
*/