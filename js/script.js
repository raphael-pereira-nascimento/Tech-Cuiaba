// js/script.js — Lógica COMUM entre todas as páginas

// Aplicar tema salvo no localStorage
function applyTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);
}

// Atualiza todos os ícones de tema na página
function updateThemeIcons(theme) {
  const icons = document.querySelectorAll(
    ".theme-toggle .material-symbols-outlined"
  );
  icons.forEach((icon) => {
    icon.textContent = theme === "dark" ? "dark_mode" : "light_mode";
  });
}

// Alternar tema
function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcons(newTheme);
}

// Toast global (opcional, mas útil)
function showToast(message, type = "success") {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast";
    toast.innerHTML = `
      <span class="material-symbols-outlined">${
        type === "error" ? "error" : "check"
      }</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    toast.querySelector("span:last-child").textContent = message;
    toast.querySelector(".material-symbols-outlined").textContent =
      type === "error" ? "error" : "check";
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  showToast('Você saiu da sua conta com sucesso!');
  setTimeout(() => window.location.href = 'index.html', 1500);
}

// Inicialização global
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();

  // Adicionar evento a todos os botões de tema
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
});