document.addEventListener("DOMContentLoaded", function () {
  // Estado do usuário
  let usuarioAtual = {
    nome: "Visitante",
    email: "Não cadastrado",
    inscrito: false,
  };

  // Elementos DOM
  const userNameDisplay = document.getElementById("userNameDisplay");
  const userEmailDisplay = document.getElementById("userEmailDisplay");
  const contaUserName = document.getElementById("contaUserName");
  const contaUserEmail = document.getElementById("contaUserEmail");
  const contaStatus = document.getElementById("contaStatus");

  // Função para atualizar todos os elementos da interface
  function atualizarInterface() {
    // Atualizar header
    if (userNameDisplay) userNameDisplay.textContent = usuarioAtual.nome;
    if (userEmailDisplay) userEmailDisplay.textContent = usuarioAtual.email;

    // Atualizar modal de conta
    if (contaUserName) contaUserName.textContent = usuarioAtual.nome;
    if (contaUserEmail) contaUserEmail.textContent = usuarioAtual.email;

    if (contaStatus) {
      if (usuarioAtual.inscrito) {
        contaStatus.textContent = "Confirmada ✓";
        contaStatus.style.color = "#10b981";
      } else {
        contaStatus.textContent = "Não inscrito";
        contaStatus.style.color = "#ef4444";
      }
    }
  }

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = document.body.getAttribute("data-theme") || "light";
      const newTheme = current === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);

      const icon = newTheme === "dark" ? "dark_mode" : "light_mode";
      this.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
    });
  }

  // Modal de cadastro - abrir
  const openCadastroBtns = document.querySelectorAll('[id^="openCadastroBtn"]');
  openCadastroBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      document.getElementById("cadastroModal").style.display = "flex";
    });
  });

  // Modal de conta - abrir
  const openAccountBtn = document.getElementById("openAccountBtn");
  if (openAccountBtn) {
    openAccountBtn.addEventListener("click", function () {
      atualizarInterface();
      document.getElementById("contaModal").style.display = "flex";
    });
  }

  // Fechar modais
  const closeCadastroModal = document.getElementById("closeCadastroModal");
  const closeContaModal = document.getElementById("closeContaModal");

  if (closeCadastroModal) {
    closeCadastroModal.addEventListener("click", function () {
      document.getElementById("cadastroModal").style.display = "none";
    });
  }

  if (closeContaModal) {
    closeContaModal.addEventListener("click", function () {
      document.getElementById("contaModal").style.display = "none";
    });
  }

  // Fechar modais ao clicar fora
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // Formulário de cadastro
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("cadastroNome");
      const email = document.getElementById("cadastroEmail");
      const password = document.getElementById("cadastroPassword");
      const toast = document.getElementById("toast");

      let isValid = true;

      // Resetar estilos de erro
      [nome, email, password].forEach((field) => {
        if (field) field.style.borderColor = "";
      });

      // Validação
      if (!nome || !nome.value.trim()) {
        if (nome) nome.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (!email || !email.value.trim() || !email.value.includes("@")) {
        if (email) email.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (!password || password.value.length < 6) {
        if (password) password.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (isValid) {
        // Salvar dados do usuário
        usuarioAtual = {
          nome: nome.value.trim(),
          email: email.value.trim(),
          inscrito: true,
        };

        // Atualizar toda a interface
        atualizarInterface();

        // Mostrar toast
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }

        // Fechar modal e resetar formulário
        document.getElementById("cadastroModal").style.display = "none";
        this.reset();
      }
    });
  }

  // Navegação suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Inicializar interface
  atualizarInterface();
});
