export default defineNuxtPlugin(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      document.body.classList.add('standalone');
    }
  });