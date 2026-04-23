(function () {
  const STORAGE_KEY = 'casa_dos_prazeres_admin_session';

  // ATENÇÃO:
  // Como isso está no front-end, NÃO é segurança real de servidor.
  // Serve como barreira de acesso visual/local.
  // Troque os logins e hashes abaixo antes de usar.
  const ADMINS = [
    {
      username: 'admin',
      displayName: 'Administrador Master',
      // senha exemplo: Casa@2026
      passwordHash: '4edb400e38a786b26c953dbca01c80195e6c35b6298d7ad9877c8365b69fa5cf'
    },
    {
      username: 'diretoria',
      displayName: 'Diretoria Casa dos Prazeres',
      // senha exemplo: Privelounge@26
      passwordHash: '29ccbb765abd8b70af51e43d613fa07fcbc0036055cac76434cc09c55e14239c'
    }
  ];

  async function sha256(value) {
    const data = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async function login(username, password) {
    const cleanUser = String(username || '').trim().toLowerCase();
    const cleanPass = String(password || '');

    if (!cleanUser || !cleanPass) {
      return { ok: false, message: 'Informe login e senha.' };
    }

    const admin = ADMINS.find((item) => item.username === cleanUser);
    if (!admin) {
      return { ok: false, message: 'Login inválido.' };
    }

    const passwordHash = await sha256(cleanPass);
    if (passwordHash !== admin.passwordHash) {
      return { ok: false, message: 'Senha inválida.' };
    }

    const session = {
      username: admin.username,
      displayName: admin.displayName,
      loggedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { ok: true, session };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function isAuthenticated() {
    return Boolean(getSession());
  }

  window.AuthManager = {
    login,
    logout,
    getSession,
    isAuthenticated,
    sha256
  };
})();
