document.addEventListener("DOMContentLoaded", function () {
  // Armazenar dados do usuário
  let usuarioAtual = null;

  // Elementos da interface
  const userNameElement = document.querySelector(".user-name");
  const userEmailElement = document.querySelector(".user-email");
  const contaUserName = document.getElementById("userName");
  const contaUserEmail = document.getElementById("userEmail");
  const contaStatus = document.querySelector(".account-status");

  // Função para atualizar todos os elementos da interface
  function atualizarInterfaceUsuario() {
    if (usuarioAtual) {
      // Atualizar header
      if (userNameElement) userNameElement.textContent = usuarioAtual.nome;
      if (userEmailElement) userEmailElement.textContent = usuarioAtual.email;

      // Atualizar modal de conta
      if (contaUserName) contaUserName.textContent = usuarioAtual.nome;
      if (contaUserEmail) contaUserEmail.textContent = usuarioAtual.email;
      if (contaStatus) {
        contaStatus.textContent = "Confirmada ✓";
        contaStatus.style.color = "#10b981";
      }
    } else {
      // Valores padrão
      if (userNameElement) userNameElement.textContent = "Visitante";
      if (userEmailElement) userEmailElement.textContent = "Não cadastrado";
      if (contaUserName) contaUserName.textContent = "Visitante";
      if (contaUserEmail) contaUserEmail.textContent = "Não cadastrado";
      if (contaStatus) {
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

  // Abrir modal de cadastro
  const openCadastro = document.getElementById("openCadastro");
  if (openCadastro) {
    openCadastro.addEventListener("click", function () {
      document.getElementById("cadastroModal").style.display = "flex";
    });
  }

  // Fechar modais ao clicar no botão de fechar
  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

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
      if (!nome.value.trim()) {
        nome.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (!email.value.trim() || !email.value.includes("@")) {
        email.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (password.value.length < 6) {
        password.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (isValid) {
        // Salvar dados do usuário
        usuarioAtual = {
          nome: nome.value.trim(),
          email: email.value.trim(),
        };

        // Atualizar toda a interface
        atualizarInterfaceUsuario();

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

  // Abrir modal de conta
  const accountButtons = document.querySelectorAll(".account-icon-btn");
  accountButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      atualizarInterfaceUsuario(); // Atualizar antes de mostrar
      document.getElementById("contaModal").style.display = "flex";
    });
  });

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
  atualizarInterfaceUsuario();
});
