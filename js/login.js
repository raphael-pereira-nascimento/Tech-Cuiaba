document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    if (email.includes('@')) {
    alert('Login realizado com sucesso!');
    window.location.href = 'index.html';
    } else {
    alert('E-mail inválido!');
    }
});

document.querySelector('.forgot-password-link')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Instruções de recuperação enviadas para seu e-mail!');
});
