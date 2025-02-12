export default defineNuxtPlugin(() => {
    if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
      document.body.classList.add('standalone');
    }
  });