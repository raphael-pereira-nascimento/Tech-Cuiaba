// Simular carregamento de dados
document.addEventListener("DOMContentLoaded", function () {
  const name = document.getElementById("contaUserName");
  const email = document.getElementById("contaUserEmail");
  const status = document.getElementById("contaStatus");
  if (name) name.textContent = "João Silva";
  if (email) email.textContent = "joao.silva@email.com";
  if (status) {
    status.textContent = "Inscrito ✓";
    status.style.color = "#10b981";
  }
});