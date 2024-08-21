import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
	},
	resolve: {
		alias: {
			components: "/src/components",
			hooks: "/src/hooks",
			pages: "/src/pages",
			services: "/src/services",
			slices: "/src/slices",
			store: "/src/store",
			src: "/src",
			types: "/src/types",
			utils: "/src/utils",
		},
	},
});
