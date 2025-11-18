// js/login.js
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[email];

  if (user && user.password === password) {
    // ✅ Define como logado
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: email }));
    showToast('Login realizado com sucesso!');
    setTimeout(() => window.location.href = 'index.html', 1500);
  } else {
    showToast('E-mail ou senha incorretos.', true);
  }
});