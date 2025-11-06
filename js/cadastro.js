document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('cadastroNome').value;
  const email = document.getElementById('cadastroEmail').value;
  const password = document.getElementById('cadastroPassword').value;

  if (!nome || !email.includes('@') || password.length < 6) {
    showToast('Preencha todos os campos corretamente.', 'error');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[email]) {
    showToast('E-mail já cadastrado!', 'error');
    return;
  }

  // ✅ Salvar usuário
  users[email] = { name: nome, password: password };
  localStorage.setItem('users', JSON.stringify(users));

  // ✅ MARCAR COMO LOGADO
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', JSON.stringify({ name: nome, email: email }));

  showToast('Cadastro realizado com sucesso!');
  setTimeout(() => window.location.href = 'index.html', 1500);
});