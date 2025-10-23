// Estado do usuário (em um ambiente real, viria do backend)
let usuarioAtual = {
  nome: "Visitante",
  email: "Não cadastrado",
};

// Tema management
function setTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const icon = theme === "dark" ? "dark_mode" : "light_mode";
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

// Atualizar interface
function atualizarInterface() {
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
}

// Abrir modais com animação
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    setTimeout(() => {
      const content = modal.querySelector(".modal-content");
      if (content) content.classList.add("show");
    }, 10);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const content = modal.querySelector(".modal-content");
    if (content) content.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  }

  // Modal buttons
  const openCadastroBtns = document.querySelectorAll('[id^="openCadastroBtn"]');
  openCadastroBtns.forEach((btn) => {
    btn.addEventListener("click", () => openModal("cadastroModal"));
  });

  const openLoginBtn = document.getElementById("openLoginBtn");
  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", () => openModal("loginModal"));
  }

  const openAccountBtn = document.getElementById("openAccountBtn");
  if (openAccountBtn) {
    openAccountBtn.addEventListener("click", () => {
      atualizarInterface();
      openModal("contaModal");
    });
  }

  // Close modals
  const closeButtons = [
    "closeContaModal",
    "closeLoginModal",
    "closeCadastroModal",
  ];
  closeButtons.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () =>
        closeModal(id.replace("close", "").replace("Modal", "") + "Modal")
      );
    }
  });

  // Navigation between modals
  const contaToLoginBtn = document.getElementById("contaToLoginBtn");
  if (contaToLoginBtn) {
    contaToLoginBtn.addEventListener("click", () => {
      closeModal("contaModal");
      openModal("loginModal");
    });
  }

  const loginToCadastroBtn = document.getElementById("loginToCadastroBtn");
  if (loginToCadastroBtn) {
    loginToCadastroBtn.addEventListener("click", () => {
      closeModal("loginModal");
      openModal("cadastroModal");
    });
  }

  const cadastroToLoginBtn = document.getElementById("cadastroToLoginBtn");
  if (cadastroToLoginBtn) {
    cadastroToLoginBtn.addEventListener("click", () => {
      closeModal("cadastroModal");
      openModal("loginModal");
    });
  }

  // Form submissions
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("cadastroNome");
      const email = document.getElementById("cadastroEmail");
      const password = document.getElementById("cadastroPassword");

      if (
        email &&
        email.value.includes("@") &&
        password &&
        password.value.length >= 6
      ) {
        usuarioAtual = {
          nome: nome.value,
          email: email.value,
        };
        atualizarInterface();
        alert("Cadastro realizado com sucesso! Bem-vindo ao TechCuiabá!");
        closeModal("cadastroModal");
        this.reset();
      } else {
        alert("Por favor, verifique seus dados e tente novamente.");
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail");

      if (email && email.value.includes("@")) {
        usuarioAtual = {
          nome: email.value.split("@")[0],
          email: email.value,
        };
        atualizarInterface();
        alert("Login realizado com sucesso!");
        closeModal("loginModal");
        this.reset();
      } else {
        alert("E-mail inválido!");
      }
    });
  }

  const esqueciSenhaLink = document.getElementById("esqueciSenhaLink");
  if (esqueciSenhaLink) {
    esqueciSenhaLink.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Instruções de recuperação de senha enviadas para seu e-mail!");
    });
  }

  // Close modals when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      const modalId = e.target.id;
      closeModal(modalId);
    }
  });

  // Smooth scrolling
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

  // Initialize
  initTheme();
  atualizarInterface();
});

// Função para aplicar tema em páginas de autenticação
function initAuthTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  const icon = savedTheme === "dark" ? "dark_mode" : "light_mode";
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;

    themeToggle.addEventListener("click", function () {
      const current = document.body.getAttribute("data-theme") || "light";
      const newTheme = current === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      const newIcon = newTheme === "dark" ? "dark_mode" : "light_mode";
      this.innerHTML = `<span class="material-symbols-outlined">${newIcon}</span>`;
    });
  }
}

// Chamar em páginas de autenticação
if (
  window.location.pathname.includes("login.html") ||
  window.location.pathname.includes("cadastro.html") ||
  window.location.pathname.includes("conta.html")
) {
  document.addEventListener("DOMContentLoaded", initAuthTheme);
}
