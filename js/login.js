document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  if (email && email.includes("@")) {
    showToast("Login realizado com sucesso!");
    setTimeout(() => (window.location.href = "index.html"), 1500);
  } else {
    showToast("E-mail inválido!", "error");
  }
});

document
  .querySelector(".forgot-password-link")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    showToast("Instruções enviadas para seu e-mail!");
  });
