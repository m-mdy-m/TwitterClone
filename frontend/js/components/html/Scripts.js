export function Scripts(scriptPaths, isModule = false) {
  let template = "";
  scriptPaths.forEach((script) => {
    if (isModule) {
      template += `<script type="module" src="${script}"></script>`;
    } else {
      template += `<script src="${script}"></script>`;
    }
  });
  return template;
}
