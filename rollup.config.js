import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import typescript from "@rollup/plugin-typescript";
import sveltePreprocess from "svelte-preprocess";

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

const production = true;

export default {
	input: 'src/index.svelte',
	output: [
		{ file: pkg.module, 'format': 'es' },
		{ file: pkg.main, 'format': 'umd', name }
	],
	plugins: [
		typeCheck(),
		typescript({ sourceMap: !production }),
		svelte({
			preprocess: sveltePreprocess(),
			dev: !production
		}),
		resolve()
	]
};

function typeCheck() {
	return {
	  writeBundle() {
		require('child_process').spawn('svelte-check', {
		  stdio: ['ignore', 'inherit', 'inherit'],
		  shell: true
		});
	  }
	}
  }
