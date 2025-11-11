document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginMsg = document.getElementById('login-msg');
  const checkBtn = document.getElementById('check-btn');
  const profilePre = document.getElementById('profile');
  const logoutBtn = document.getElementById('logout-btn');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMsg.textContent = '';
    const form = new FormData(loginForm);
    const data = {
      username: form.get('username'),
      password: form.get('password')
    };
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) {
        loginMsg.textContent = json.error || 'Erro no login';
      } else {
        loginMsg.style.color = 'green';
        loginMsg.textContent = json.message;
        await loadProfile();
      }
    } catch (err) {
      loginMsg.textContent = 'Erro de rede';
    }
  });

  checkBtn.addEventListener('click', loadProfile);

  async function loadProfile() {
    profilePre.textContent = 'Carregando...';
    try {
      const res = await fetch('/api/verifica', { credentials: 'same-origin' });
      const json = await res.json();
      if (!res.ok) {
        profilePre.textContent = json.error || 'Acesso negado';
      } else {
        profilePre.textContent = JSON.stringify(json, null, 2);
      }
    } catch (err) {
      profilePre.textContent = 'Erro de rede';
    }
  }

  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      const json = await res.json();
      if (res.ok) {
        profilePre.textContent = json.message;
        loginMsg.style.color = '#c00';
        loginMsg.textContent = 'Deslogado';
      } else {
        profilePre.textContent = json.error || 'Erro ao deslogar';
      }
    } catch (err) {
      profilePre.textContent = 'Erro de rede';
    }
  });
});
