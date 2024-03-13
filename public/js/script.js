import { ScriptTemplate } from "./components/html/ScriptTemplate.js";
const body = document.body;
body.innerHTML += ScriptTemplate({
  scriptPaths: ["nav/nav-mobile.js", "home.js"],
  isModule: true,
});
