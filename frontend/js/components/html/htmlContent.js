import { CssLinks } from "./CssLinks";
import { Scripts } from "./Scripts";
import { TITLE } from "./TITLE";

export function htmlContent({ title, cssPaths, scriptPaths, isModule }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${TITLE({ title })}
        ${CssLinks({ paths: cssPaths })}
    </head>
    <body class="bg-body">
        ${Scripts(scriptPaths, isModule)}
    </body>
    </html>`;
}
