

window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('doSomethingButton');
    if (el) {
      el.addEventListener('click', console.log("test"));
    } 
});