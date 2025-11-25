// js/auth.js
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

function registerUser(name, email, password) {
  if (!name || !email.includes('@') || password.length < 6) return false;
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[email]) {
    showToast('E-mail já cadastrado!', true);
    return false;
  }
  users[email] = { name, password };
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', JSON.stringify({ name, email }));
  showToast('Cadastro realizado com sucesso!');
  return true;
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[email];
  if (user && user.password === password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email }));
    showToast('Login realizado com sucesso!');
    return true;
  }
  showToast('E-mail ou senha incorretos.', true);
  return false;
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  showToast('Você saiu da sua conta.');
}