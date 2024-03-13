export function generateScriptTags(scriptPaths, isModule = false) {
  let template = "";
  if (Array.isArray(scriptPaths)) {
    scriptPaths.forEach((script) => {
      if (isModule) {
        template += `<script type="module" src="/js/${script}"></script>`;
      } else {
        template += `<script src="/js/${script}"></script>`;
      }
    });
  } else if (typeof scriptPaths === "string") {
    if (isModule) {
      template += `<script type="module" src="/js/${scriptPaths}"></script>`;
    } else {
      template += `<script src="/js/${scriptPaths}"></script>`;
    }
  }
  return template;
}