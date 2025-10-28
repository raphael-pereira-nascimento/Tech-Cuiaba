document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('cadastroNome').value;
    const email = document.getElementById('cadastroEmail').value;
    const password = document.getElementById('cadastroPassword').value;
    if (nome && email.includes('@') && password.length >= 6) {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', nome);
    showToast('Cadastro realizado com sucesso! Bem-vindo ao TechCuiabá!');
    setTimeout(() => window.location.href = 'index.html', 1500);
    } else {
    showToast('Preencha todos os campos corretamente.', 'error');
    }
});

document.querySelector('.forgot-password-link')?.addEventListener('click', function(e) {
    e.preventDefault();
    showToast('Instruções de recuperação enviadas para seu e-mail!');
});