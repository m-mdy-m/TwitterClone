import { CssLinks } from "./CssLinks.js";
import { Scripts } from "./Scripts.js";
import { TITLE } from "./TITLE.js";

export function HTML({ title, cssPaths, scriptPaths, isModule }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${TITLE({ title })}
        <link rel="stylesheet" href="/css/base/based.css"> 
        <link rel="stylesheet" href="/css/components/shared.css">
        ${CssLinks({ paths: cssPaths })}
    </head>
    <body class="bg-body">
        <script src="/js/lib/vfyjs/vfyjs.bundle.js"></script>
        <script src="/js/lib/axios/axios.min.js"></script>
        ${Scripts(scriptPaths, isModule)}
    </body>
    </html>`;
}
