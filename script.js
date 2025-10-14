document.addEventListener("DOMContentLoaded", function () {
  // Aplicar tema salvo
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  // Atualizar ícone do tema
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const icon = savedTheme === "dark" ? "dark_mode" : "light_mode";
    themeToggle.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
  }

  // Alternar tema
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = document.body.getAttribute("data-theme") || "light";
      const newTheme = current === "light" ? "dark" : "light";

      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      const icon = newTheme === "dark" ? "dark_mode" : "light_mode";
      this.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
    });
  }
});
