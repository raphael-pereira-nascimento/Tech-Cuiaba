document.addEventListener("DOMContentLoaded", function () {
  // Estado do usuário
  let usuarioAtual = {
    nome: "Visitante",
    email: "Não cadastrado",
  };
  // Estado do usuário (adicione no início do script)
  let usuarioAtual = {
    nome: "Visitante",
    email: "Não cadastrado",
  };

  // Função para atualizar interface (adicione no início do script)
  function atualizarInterface() {
    const userNameDisplay = document.getElementById("userNameDisplay");
    const userEmailDisplay = document.getElementById("userEmailDisplay");

    if (userNameDisplay) userNameDisplay.textContent = usuarioAtual.nome;
    if (userEmailDisplay) userEmailDisplay.textContent = usuarioAtual.email;
  }

  // Abrir modal de conta
  const openAccountBtn = document.getElementById("openAccountBtn");
  if (openAccountBtn) {
    openAccountBtn.addEventListener("click", function () {
      // Atualizar dados do modal de conta
      const contaUserName = document.getElementById("contaUserName");
      const contaUserEmail = document.getElementById("contaUserEmail");
      const contaStatus = document.getElementById("contaStatus");

      if (contaUserName) contaUserName.textContent = usuarioAtual.nome;
      if (contaUserEmail) contaUserEmail.textContent = usuarioAtual.email;
      if (contaStatus) {
        if (usuarioAtual.email !== "Não cadastrado") {
          contaStatus.textContent = "Inscrito ✓";
          contaStatus.style.color = "#10b981";
        } else {
          contaStatus.textContent = "Não inscrito";
          contaStatus.style.color = "#ef4444";
        }
      }

      document.getElementById("contaModal").style.display = "flex";
    });
  }

  if (isValid) {
    // Salvar dados
    usuarioAtual = {
      nome: nome.value.trim(),
      email: email.value.trim(),
    };

    // Atualizar interface
    atualizarInterface();

    // Resto do código existente...
  }

  // Navegação entre modais
  const contaToLoginBtn = document.getElementById("contaToLoginBtn");
  const loginToCadastroBtn = document.getElementById("loginToCadastroBtn");

  if (contaToLoginBtn) {
    contaToLoginBtn.addEventListener("click", function () {
      document.getElementById("contaModal").style.display = "none";
      document.getElementById("loginModal").style.display = "flex";
    });
  }

  if (loginToCadastroBtn) {
    loginToCadastroBtn.addEventListener("click", function () {
      document.getElementById("loginModal").style.display = "none";
      document.getElementById("cadastroModal").style.display = "flex";
    });
  }

  // Fechar modal de conta
  const closeContaModal = document.getElementById("closeContaModal");
  if (closeContaModal) {
    closeContaModal.addEventListener("click", function () {
      document.getElementById("contaModal").style.display = "none";
    });
  }

  // Fechar modal de conta ao clicar fora
  const contaModal = document.getElementById("contaModal");
  if (contaModal) {
    contaModal.addEventListener("click", function (e) {
      if (e.target === contaModal) {
        contaModal.style.display = "none";
      }
    });
  }


  // Theme toggle functionality
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

  // Account button functionality (básica)
  const openAccountBtn = document.getElementById("openAccountBtn");
  if (openAccountBtn) {
    openAccountBtn.addEventListener("click", function () {
      alert(
        `Conta: ${usuarioAtual.nome}\nE-mail: ${usuarioAtual.email}\n\nEvento: TechCuiabá Summit 2024\nData: 15/11/2024\nLocal: Centro de Convenções de Cuiabá`
      );
    });
  }

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
