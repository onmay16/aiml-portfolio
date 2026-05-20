// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Update `site` and `base` when deploying to GitHub Pages:
// - User site (username.github.io): base: '/'
// - Project site (username.github.io/repo-name): base: '/repo-name/'
export default defineConfig({
  site: 'https://onmay16.github.io',
  base: '/aiml-portfolio/',
  integrations: [react()],
  output: 'static',
});
