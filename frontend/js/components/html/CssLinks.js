export function CssLinks({ paths }) {
  let template = "";
  if (Array.isArray(paths)) {
    paths.forEach((path) => {
      template += `<link rel="stylesheet" href="/css/${path}"> `;
    });
  } else if (typeof paths === 'string') {
    template += `<link rel="stylesheet" href="/css/${paths}"> `;
  }
  return template;
}
