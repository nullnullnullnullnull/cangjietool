import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		files: {
			routes: 'src/routes',
			serviceWorker: 'src/service-worker.js'
		}
	}
};

export default config;
