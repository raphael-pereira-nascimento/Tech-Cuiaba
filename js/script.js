function applyTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-toggle .material-symbols-outlined').forEach(el => {
    el.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  updateThemeIcons(newTheme);
}

// Função de toast reutilizável
function showToast(message, isError = false) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="material-symbols-outlined">${isError ? 'error' : 'check'}</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
  }
  toast.querySelector('span:last-child').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Verifica se está logado
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Logout
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  showToast('Você saiu da sua conta.');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
});