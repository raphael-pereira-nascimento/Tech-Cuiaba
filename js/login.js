// js/login.js
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (loginUser(email, password)) {
    setTimeout(() => window.location.href = 'index.html', 1500);
  }
});