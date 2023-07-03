const nav = document.querySelector(".nj-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const dropdownBtn = document.getElementById("nj-btn-dropdown");
const dropdownMenu = document.getElementById("nj-dropdown");

// Function to open the mobile navigation menu
const openNavMenu = () => {
  nav.setAttribute("data-visible", true);
  navToggle.setAttribute("aria-expanded", true);
};

// Function to close the mobile navigation menu
const closeNavMenu = () => {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
};

// Toggle dropdown function
const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
};

// Toggle navMenu open/close when navToggle button is clicked
navToggle.addEventListener("click", () => {
    const visiblity = nav.getAttribute("data-visible");
    if (visiblity === "false") {
      openNavMenu();
    } else {
      closeNavMenu();
    }
}) 

// Toggle dropdown open/close when dropdown button is clicked
dropdownBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown();
});
  
// Close dropdown when dom element is clicked
document.documentElement.addEventListener("click", function () {
    const visiblity = nav.getAttribute("data-visible");
    if (dropdownMenu.classList.contains("show")) {
      toggleDropdown();
    }
});

document.addEventListener("click", (event) => {
    // Check if the clicked element is outside the navigation menu and its toggle button
    if (!nav.contains(event.target) && event.target !== navToggle) {
      // Hide the navigation menu
      closeNavMenu();
    }
  });