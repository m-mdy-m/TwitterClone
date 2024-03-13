import { Scripts } from "./gen/scriptTag.js";

export function generateScriptTemplate({ scriptPaths, isModule }) {
  return `<script src="/js/lib/vfyjs/vfyjs.bundle.js"></script>
        <script src="/js/lib/axios/axios.min.js"></script>
        ${Scripts(scriptPaths, isModule)}`;
}
