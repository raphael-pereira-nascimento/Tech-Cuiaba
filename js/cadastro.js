// js/cadastro.js
document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('cadastroNome').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const password = document.getElementById('cadastroPassword').value;

  if (registerUser(nome, email, password)) {
    setTimeout(() => window.location.href = 'index.html', 1500);
  }
});