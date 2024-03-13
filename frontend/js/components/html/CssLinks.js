export function CssLinks({ paths }) {
  let template = "";
  paths.forEach(path => {
    template += `<link rel="stylesheet" href="/css/${path}"> `;
  });
  return template;
}
