import autoprefixer from 'autoprefixer';
import { readFile, writeFile } from 'node:fs';
import postcss from 'postcss';
import importPlugin from 'postcss-import';
import nestingPlugin from 'postcss-nesting';

readFile('./src/css/main.css', (err, css) => {
	postcss([autoprefixer, nestingPlugin, importPlugin])
		.process(css, { from: './src/css/main.css', to: './style.css' })
		.then((result) => {
			writeFile('./style.css', result.css, () => true);
		});
});
