import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import path from "path"
import lucideRegistryPlugin from "./vite.plugins/lucideRegistry"
import { cssIndexPlugin } from "./vite.plugins/css-index"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    lucideRegistryPlugin(),
    cssIndexPlugin({
      componentsDir: "./tailwind-system/components",
      outputFile: "./tailwind-system/components.css",
      tokensImport: "./tokens.css",
      componentImportPath: (fileName) => `./components/${fileName}`,
    }),
    Components({
      dirs: ["src/components"],
      extensions: ["vue"],
      directoryAsNamespace: false,
      dts: true,
    }),
  ],
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
  },
})
