// js/cadastro.js
document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nome = document.getElementById('cadastroNome').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const password = document.getElementById('cadastroPassword').value;

  // Validação
  if (!nome || !email.includes('@') || password.length < 6) {
    showToast('Preencha todos os campos corretamente.', true);
    return;
  }

  // Carrega usuários existentes
  const users = JSON.parse(localStorage.getItem('users')) || {};
  
  // Verifica duplicidade
  if (users[email]) {
    showToast('E-mail já cadastrado!', true);
    return;
  }

  // ✅ Salva usuário
  users[email] = { name: nome, password: password };
  localStorage.setItem('users', JSON.stringify(users));

  // ✅ Define como logado
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', JSON.stringify({ name: nome, email: email }));

  showToast('Cadastro realizado com sucesso!');
  setTimeout(() => window.location.href = 'index.html', 1500);
});