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

// Function to create a fontawesome element
function createFaElement(className1, className2) {
  const icon = document.createElement('i');
  icon.classList.add("fa", className1);
  if (className2) {
    icon.classList.add(className2);
  }
  return icon;
}

// Function to create a header cell
function createSpan(text, className) {
  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add(className);
  return span;
}
// Function to create a button element
function createButton(className, clickHandler, iconClassName, buttonText) {
  const button = document.createElement('button');
  button.classList.add(className);
  button.addEventListener('click', clickHandler);               
  const icon = createFaElement(iconClassName);
  const iconSpan = createSpan('', 'btn-icon');
  iconSpan.appendChild(icon);                       
  const textSpan = createSpan(buttonText, 'btn-name');                       
  button.appendChild(iconSpan);
  button.appendChild(textSpan);                        
  return button;
}