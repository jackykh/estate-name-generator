import { defineConfig } from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
    plugins: [
        createHtmlPlugin({
            minify: true,
            /**
             * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
             * @default src/main.js
             */
            entry: "src/main.js",
            /**
             * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
             * @default index.html
             */
            template: 'index.html',

            /**
             * Data that needs to be injected into the index.html ejs template
             */
            inject: {},
        }),
    ],
})