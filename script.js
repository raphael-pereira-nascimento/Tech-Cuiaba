// Estado do usuário
let usuarioAtual = {
  nome: "Visitante",
  email: "Não cadastrado",
};

// Toast management
function showToast(message, type = "success") {
  const existingToast = document.getElementById("toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = `toast toast-${type}`;

  const icon = type === "success" ? "check_circle" : "error";
  const color = type === "success" ? "#10b981" : "#ef4444";

  toast.innerHTML = `
    <span class="material-symbols-outlined" style="color: white;">${icon}</span>
    <span>${message}</span>
  `;

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: color,
    color: "white",
    padding: "16px 24px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
    transform: "translateX(120%)",
    transition: "transform 0.3s ease-out",
    zIndex: "2000",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    toast.style.transform = "translateX(120%)";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

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
  const userNameDisplay = document.getElementById("userNameDisplay");
  const userEmailDisplay = document.getElementById("userEmailDisplay");
  const contaUserName = document.getElementById("contaUserName");
  const contaUserEmail = document.getElementById("contaUserEmail");
  const contaStatus = document.getElementById("contaStatus");

  const nome = usuarioAtual.nome;
  const email = usuarioAtual.email;

  if (userNameDisplay) userNameDisplay.textContent = nome;
  if (userEmailDisplay) userEmailDisplay.textContent = email;
  if (contaUserName) contaUserName.textContent = nome;
  if (contaUserEmail) contaUserEmail.textContent = email;

  if (contaStatus) {
    if (email !== "Não cadastrado") {
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

  // Modal buttons - todos os botões de cadastro abrem o mesmo modal
  const openCadastroBtns = [
    document.getElementById("openCadastroBtn"),
    document.getElementById("openCadastroBtn2"),
    document.getElementById("openCadastroBtn3"),
  ];

  openCadastroBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => openModal("cadastroModal"));
    }
  });

  // Botão de login
  const openLoginBtn = document.getElementById("openLoginBtn");
  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", () => openModal("loginModal"));
  }

  // Botão de conta
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
      btn.addEventListener("click", () => {
        const modalName = id.replace("close", "").replace("Modal", "");
        closeModal(modalName + "Modal");
      });
    }
  });

  // Navigation between modals
  const contaToLoginBtn = document.getElementById("contaToLoginBtn");
  const loginToCadastroBtn = document.getElementById("loginToCadastroBtn");
  const cadastroToLoginBtn = document.getElementById("cadastroToLoginBtn");

  if (contaToLoginBtn) {
    contaToLoginBtn.addEventListener("click", () => {
      closeModal("contaModal");
      openModal("loginModal");
    });
  }

  if (loginToCadastroBtn) {
    loginToCadastroBtn.addEventListener("click", () => {
      closeModal("loginModal");
      openModal("cadastroModal");
    });
  }

  if (cadastroToLoginBtn) {
    cadastroToLoginBtn.addEventListener("click", () => {
      closeModal("cadastroModal");
      openModal("loginModal");
    });
  }

  // Formulário de cadastro com validação melhorada
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("cadastroNome");
      const email = document.getElementById("cadastroEmail");
      const password = document.getElementById("cadastroPassword");
      const confirmPassword = document.getElementById(
        "cadastroConfirmPassword"
      );

      // Resetar bordas
      [nome, email, password, confirmPassword].forEach((field) => {
        if (field) field.style.borderColor = "";
      });

      let isValid = true;

      // Validar nome
      if (!nome.value.trim()) {
        nome.style.borderColor = "#ef4444";
        isValid = false;
      }

      // Validar e-mail
      if (!email.value.trim() || !email.value.includes("@")) {
        email.style.borderColor = "#ef4444";
        isValid = false;
      }

      // Validar senha
      if (password.value.length < 6) {
        password.style.borderColor = "#ef4444";
        isValid = false;
      }

      // Validar confirmação de senha
      if (password.value !== confirmPassword.value) {
        confirmPassword.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (isValid) {
        usuarioAtual = {
          nome: nome.value.trim(),
          email: email.value.trim(),
        };

        atualizarInterface();
        showToast(
          "Cadastro realizado com sucesso! Bem-vindo ao TechCuiabá!",
          "success"
        );
        closeModal("cadastroModal");
        this.reset();
      } else {
        showToast(
          "Por favor, verifique todos os campos e tente novamente.",
          "error"
        );
      }
    });
  }

  // Formulário de login
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
        showToast("Login realizado com sucesso!", "success");
        closeModal("loginModal");
        this.reset();
      } else {
        showToast("E-mail inválido!", "error");
      }
    });
  }

  // Esqueci minha senha
  const esqueciSenhaLink = document.getElementById("esqueciSenhaLink");
  if (esqueciSenhaLink) {
    esqueciSenhaLink.addEventListener("click", function (e) {
      e.preventDefault();
      showToast(
        "Instruções de recuperação de senha enviadas para seu e-mail!",
        "success"
      );
    });
  }

  // Close modals when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
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