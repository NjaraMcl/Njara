let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.   body.classList.remove("resize-animation-stopper");
  }, 400);
});

// Function to capitalize the first letter of each word
function capitalizeFirstLetter(text) {
  return text.replace(/\b\w/g, firstChar => firstChar.toUpperCase());

}