document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  // Tema inicial (sem localStorage para funcionar localmente)
  let currentTheme = "light";

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      currentTheme = currentTheme === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", currentTheme);

      const icon = currentTheme === "dark" ? "dark_mode" : "light_mode";
      this.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
    });
  }

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu.classList.contains("show")) {
          navMenu.classList.remove("show");
        }
      }
    });
  });
});
