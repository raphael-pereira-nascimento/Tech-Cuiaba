document
  .getElementById("cadastroForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("cadastroNome")?.value;
    const email = document.getElementById("cadastroEmail")?.value;
    if (nome && email && email.includes("@")) {
      showToast("Cadastro realizado com sucesso!");
      setTimeout(() => (window.location.href = "index.html"), 1500);
    } else {
      showToast("Preencha todos os campos corretamente.", "error");
    }
  });
