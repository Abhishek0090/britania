import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
      },
    }), 
  ],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },

  define: {
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
    global: "window",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    commonjsOptions: {
      include: ["node_modules/**"],
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        format: "esm",
        manualChunks: {
          react: ["react", "react-dom"], 
        },
      },
    },
  },
  server: {
    port: 3000,
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
