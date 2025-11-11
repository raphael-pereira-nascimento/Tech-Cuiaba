// js/auth.js — Sistema de autenticação com localStorage

/**
 * Registra um novo usuário
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {boolean}
 */
function registerUser(name, email, password) {
if (!name || !email || !password) return false;
if (!email.includes("@")) return false;
if (password.length < 6) return false;

const users = JSON.parse(localStorage.getItem("users")) || {};
if (users[email]) {
showToast("E-mail já cadastrado!", "error");
return false;
}

users[email] = {
name: name.trim(),
password: password, // ⚠️ Em produção, use hash (ex: bcrypt)
};

localStorage.setItem("users", JSON.stringify(users));
showToast("Conta criada com sucesso! Faça login.");
return true;
}

/**
 * Faz login do usuário
 * @param {string} email
 * @param {string} password
 * @returns {boolean}
 */
function loginUser(email, password) {
if (!email || !password) return false;

const users = JSON.parse(localStorage.getItem("users")) || {};
const user = users[email];

if (user && user.password === password) {
localStorage.setItem(
    "currentUser",
    JSON.stringify({
    email: email,
    name: user.name,
    })
);
localStorage.setItem("isLoggedIn", "true");
showToast("Login realizado com sucesso!");
return true;
} else {
showToast("E-mail ou senha incorretos.", "error");
return false;
}
}

/**
 * Verifica se o usuário está logado
 * @returns {boolean}
 */
function isLoggedIn() {
return localStorage.getItem("isLoggedIn") === "true";
}

/**
 * Faz logout
 */
function logout() {
localStorage.removeItem("currentUser");
localStorage.removeItem("isLoggedIn");
showToast("Você saiu da sua conta.");
}

/**
 * Redireciona se já estiver logado (para login/cadastro)
 */
function redirectIfLoggedIn() {
if (isLoggedIn()) {
window.location.href = "index.html";
}
}

/**
 * Redireciona se NÃO estiver logado (para conta)
 */
function redirectIfNotLoggedIn() {
if (!isLoggedIn()) {
window.location.href = "login.html";
}
}

// Função de toast reutilizável (caso script.js não esteja presente)
function showToast(message, type = "success") {
let toast = document.getElementById("auth-toast");
if (!toast) {
toast = document.createElement("div");
toast.id = "auth-toast";
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

// Inicialização automática em páginas específicas
document.addEventListener("DOMContentLoaded", () => {
const path = window.location.pathname.split("/").pop();

if (path === "login.html" || path === "cadastro.html") {
redirectIfLoggedIn();
} else if (path === "conta.html") {
redirectIfNotLoggedIn();
}
});

// Sistema de autenticação com localStorage
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
  } else {
    toast.querySelector('span:last-child').textContent = message;
    toast.querySelector('.material-symbols-outlined').textContent = isError ? 'error' : 'check';
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Registrar usuário
function registerUser(name, email, password) {
  if (!name || !email.includes('@') || password.length < 6) return false;
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[email]) {
    showToast('E-mail já cadastrado!', true);
    return false;
  }
  users[email] = { name, password };
  localStorage.setItem('users', JSON.stringify(users));
  showToast('Conta criada com sucesso!');
  return true;
}

// Fazer login
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[email];
  if (user && user.password === password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email }));
    showToast('Login realizado com sucesso!');
    return true;
  } else {
    showToast('E-mail ou senha incorretos.', true);
    return false;
  }
}

// Verificar login
function checkAuth(redirectIfNotLoggedIn = false) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  if (!isLoggedIn && redirectIfNotLoggedIn) {
    if (confirm('Você precisa estar logado para acessar esta página. Ir para login?')) {
      window.location.href = 'login.html';
    } else {
      window.location.href = 'index.html';
    }
    return null;
  }

  return isLoggedIn ? currentUser : null;
}

// Logout
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  showToast('Você saiu da sua conta.');
}

// js/auth.js — sistema centralizado de autenticação

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
  } else {
    toast.querySelector('span:last-child').textContent = message;
    toast.querySelector('.material-symbols-outlined').textContent = isError ? 'error' : 'check';
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Registrar usuário
function registerUser(name, email, password) {
  if (!name || !email.includes('@') || password.length < 6) {
    showToast('Preencha todos os campos corretamente.', true);
    return false;
  }
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[email]) {
    showToast('E-mail já cadastrado!', true);
    return false;
  }
  users[email] = { name, password };
  localStorage.setItem('users', JSON.stringify(users));
  showToast('Conta criada com sucesso!');
  return true;
}

// Fazer login
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const user = users[email];
  if (user && user.password === password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email }));
    showToast('Login realizado com sucesso!');
    return true;
  } else {
    showToast('E-mail ou senha incorretos.', true);
    return false;
  }
}

// Verificar se está logado
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Logout
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  showToast('Você saiu da sua conta.');
}

// Lógica inteligente para o botão "Minha Conta"
function handleAccountButtonClick(event) {
  event.preventDefault(); // impede comportamento padrão (se for <a>)
  if (isLoggedIn()) {
    window.location.href = 'conta.html'; // vai direto para a conta
  } else {
    window.location.href = 'login.html'; // pede login primeiro
  }
}

// js/auth.js — sistema de autenticação com toast

// Função reutilizável de toast
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
  } else {
    toast.querySelector('span:last-child').textContent = message;
    toast.querySelector('.material-symbols-outlined').textContent = isError ? 'error' : 'check';
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Verifica se usuário está logado
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Logout correto
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  // Opcional: limpar todos os usuários (não recomendado em produção real)
  // localStorage.removeItem('users');
  showToast('Você saiu da sua conta.');
}

// Ação inteligente para botões de login/cadastro
function handleAuthButton(event, targetPage) {
  event.preventDefault();
  if (isLoggedIn()) {
    showToast('Você já está logado!', false);
    return;
  }
  window.location.href = targetPage;
}

// Em auth.js
function sendPasswordReset(email) {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[email]) {
    showToast('Link de redefinição enviado para seu e-mail!');
    return true;
  } else {
    showToast('E-mail não encontrado.', true);
    return false;
  }
}