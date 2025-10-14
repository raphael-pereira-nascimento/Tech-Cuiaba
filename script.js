// Theme management
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  // Update icon
  updateThemeIcon(savedTheme);

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";

      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const icon = theme === "dark" ? "dark_mode" : "light_mode";
    themeToggle.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
  }
}
