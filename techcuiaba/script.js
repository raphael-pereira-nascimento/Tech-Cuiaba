document.addEventListener("DOMContentLoaded", function () {
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

  // Open modal
  const openCadastro = document.getElementById("openCadastro");
  if (openCadastro) {
    openCadastro.addEventListener("click", function () {
      document.getElementById("cadastroModal").style.display = "flex";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("cadastroModal");
    if (modal && event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Close modal with ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const modal = document.getElementById("cadastroModal");
      if (modal) {
        modal.style.display = "none";
      }
    }
  });

  // Form submission
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("cadastroNome");
      const email = document.getElementById("cadastroEmail");
      const password = document.getElementById("cadastroPassword");
      const toast = document.getElementById("toast");

      let isValid = true;

      // Reset borders
      if (nome) nome.style.borderColor = "";
      if (email) email.style.borderColor = "";
      if (password) password.style.borderColor = "";

      // Validate
      if (nome && !nome.value.trim()) {
        nome.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (email && (!email.value.trim() || !email.value.includes("@"))) {
        email.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (password && password.value.length < 6) {
        password.style.borderColor = "#ef4444";
        isValid = false;
      }

      if (isValid) {
        // Show toast
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }

        // Close modal and reset form
        const modal = document.getElementById("cadastroModal");
        if (modal) {
          modal.style.display = "none";
        }
        this.reset();
      }
    });
  }

  // Smooth scrolling for anchor links
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
});
