export function saveContainer(htmlContent) {
  const TemplateContainer = Object.prototype.constructor.container= function(){
    this.template = htmlContent
  }
  const tm = new TemplateContainer().template.outerHTML
  localStorage.setItem('profile',tm)
}
export function getTemplate() {
  return localStorage.getItem('profile')
}
  