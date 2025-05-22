const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const nestingPlugin = require('postcss-nesting');
const importPlugin = require('postcss-import');
const fs = require('node:fs');

fs.readFile('css/main.css', (err, css) => {
	postcss([autoprefixer, nestingPlugin, importPlugin])
		.process(css, { from: 'css/main.css', to: 'style.css' })
		.then((result) => {
			fs.writeFile('style.css', result.css, () => true);
		});
});
