import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const readFileSync = (filePath) => fs.readFileSync(resolve(filePath), 'utf8');

const resolve = (filePath) => path.resolve(__dirname, filePath);

export default defineConfig({
	root: resolve('src'),
	base: '/',
	plugins: [
		{
			name: 'html-partials',
			transformIndexHtml: {
				
				handler(html, ctx) {
					const pageName = path.basename(ctx.path, '.html');

					const head = readFileSync('./src/partials/head.html');
					let header = readFileSync('./src/partials/header.html');
					const footer = readFileSync('./src/partials/footer.html');

					header = header.replace(
						`<a href="/${pageName}" >`,
						`<a href="/${pageName}" class="active">`,
					);

					return html
						.replace('<!-- @head -->', head)
						.replace('<!-- @header -->', header)
						.replace('<!-- @footer -->', footer);
				},
			},
		},
	],
	build: {
		outDir: path.join(__dirname, 'dist'),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve('./src/index.html'),
				pension: resolve('./src/pension.html'),
				slapen: resolve('./src/slapen.html'),
				privacy: resolve('./src/privacy-policy.html'),
				zorgboerderij: resolve('./src/zorgboerderij.html'),
			},
		},
	},
});
