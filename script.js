document.addEventListener("DOMContentLoaded", function () {
  // Estado do usuário
  let usuarioAtual = {
    nome: "Visitante",
    email: "Não cadastrado",
  };

  // Elementos DOM
  const userNameDisplay = document.getElementById("userNameDisplay");
  const userEmailDisplay = document.getElementById("userEmailDisplay");

  // Função para atualizar interface
  function atualizarInterface() {
    if (userNameDisplay) userNameDisplay.textContent = usuarioAtual.nome;
    if (userEmailDisplay) userEmailDisplay.textContent = usuarioAtual.email;
  }

  // Abrir modal de cadastro
  const openCadastroBtns = document.querySelectorAll('[id^="openCadastroBtn"]');
  openCadastroBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      document.getElementById("cadastroModal").style.display = "flex";
    });
  });

  // Abrir modal de login
  const openLoginBtn = document.getElementById("openLoginBtn");
  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", function () {
      document.getElementById("loginModal").style.display = "flex";
    });
  }

  // Fechar modais
  const closeCadastroModal = document.getElementById("closeCadastroModal");
  const closeLoginModal = document.getElementById("closeLoginModal");

  if (closeCadastroModal) {
    closeCadastroModal.addEventListener("click", function () {
      document.getElementById("cadastroModal").style.display = "none";
    });
  }

  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", function () {
      document.getElementById("loginModal").style.display = "none";
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

      // Resetar bordas
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
        // Salvar dados
        usuarioAtual = {
          nome: nome.value.trim(),
          email: email.value.trim(),
        };

        // Atualizar interface
        atualizarInterface();

        // Mostrar toast
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }

        // Fechar modal e resetar
        document.getElementById("cadastroModal").style.display = "none";
        this.reset();
      }
    });
  }

  // Formulário de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail");
      const password = document.getElementById("loginPassword");
      const toast = document.getElementById("toast");

      let isValid = true;

      if (!email || !email.value.trim() || !email.value.includes("@")) {
        if (email) email.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (!password || password.value.length < 6) {
        if (password) password.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (isValid) {
        // Simular login
        usuarioAtual = {
          nome: email.value.split("@")[0],
          email: email.value.trim(),
        };

        atualizarInterface();

        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }

        document.getElementById("loginModal").style.display = "none";
        this.reset();
      }
    });
  }

  // Esqueci minha senha
  const esqueciSenhaLink = document.getElementById("esqueciSenhaLink");
  if (esqueciSenhaLink) {
    esqueciSenhaLink.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Instruções de recuperação de senha enviadas para seu e-mail!");
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

  // Inicializar
  atualizarInterface();
});
