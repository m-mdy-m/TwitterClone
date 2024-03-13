import { generateScriptTags } from "./gen/scriptTag.js";

export function ScriptTemplate({ scriptPaths, isModule }) {
  return `<script src="/js/lib/vfyjs/vfyjs.bundle.js"></script>
        <script src="/js/lib/axios/axios.min.js"></script>
        <script type="module" src="/js/body.js"></script>
        ${generateScriptTags(scriptPaths, isModule)}`;
}