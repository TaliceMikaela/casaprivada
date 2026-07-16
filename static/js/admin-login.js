(function () {
  'use strict';

  const form = document.getElementById('adminLoginForm');
  const emailInput = document.getElementById('adminEmail');
  const passwordInput = document.getElementById('adminPassword');
  const loginButton = document.getElementById('adminLoginButton');
  const messageElement = document.getElementById('adminLoginMessage');

  const supabase = window.supabaseClient;

  if (!form || !emailInput || !passwordInput || !loginButton) {
    console.error('Elementos do formulário administrativo não encontrados.');
    return;
  }

  if (!supabase) {
    mostrarMensagem(
      'Não foi possível conectar ao servidor.',
      'error'
    );

    loginButton.disabled = true;
    return;
  }

  function mostrarMensagem(mensagem, tipo = '') {
    messageElement.textContent = mensagem;
    messageElement.className = 'admin-login-message';

    if (tipo) {
      messageElement.classList.add(tipo);
    }
  }

  function definirCarregamento(carregando) {
    loginButton.disabled = carregando;
    emailInput.disabled = carregando;
    passwordInput.disabled = carregando;

    loginButton.textContent = carregando
      ? 'Verificando...'
      : 'Entrar';
  }

  function traduzirErroLogin(error) {
    const mensagem = String(error?.message || '').toLowerCase();

    if (mensagem.includes('invalid login credentials')) {
      return 'E-mail ou senha inválidos.';
    }

    if (mensagem.includes('email not confirmed')) {
      return 'O e-mail ainda não foi confirmado.';
    }

    if (
      mensagem.includes('failed to fetch') ||
      mensagem.includes('network')
    ) {
      return 'Falha de conexão. Verifique sua internet.';
    }

    return 'Não foi possível realizar o login.';
  }

  async function consultarPerfilAdministrativo(usuarioId) {
    const { data, error } = await supabase
      .from('perfis_administrativos')
      .select(`
        id,
        nome,
        email,
        papel,
        ativo,
        modelo_id
      `)
      .eq('id', usuarioId)
      .maybeSingle();

    if (error) {
      throw new Error(
        'Não foi possível consultar o perfil administrativo.'
      );
    }

    return data;
  }

  async function encerrarAcessoInvalido() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
    }
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    mostrarMensagem('');
    definirCarregamento(true);

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        throw error;
      }

      if (!data.user || !data.session) {
        throw new Error('Sessão administrativa não criada.');
      }

      const perfil = await consultarPerfilAdministrativo(
        data.user.id
      );

      if (!perfil) {
        await encerrarAcessoInvalido();

        mostrarMensagem(
          'Este usuário não possui acesso ao painel.',
          'error'
        );

        passwordInput.value = '';
        return;
      }

      if (!perfil.ativo) {
        await encerrarAcessoInvalido();

        mostrarMensagem(
          'Este usuário está bloqueado.',
          'error'
        );

        passwordInput.value = '';
        return;
      }

      if (!['administrador', 'modelo'].includes(perfil.papel)) {
        await encerrarAcessoInvalido();

        mostrarMensagem(
          'Este usuário não possui permissão de acesso ao painel.',
          'error'
        );

        passwordInput.value = '';
        return;
      }

      mostrarMensagem(
        `Bem-vindo, ${perfil.nome}.`,
        'success'
      );

      window.setTimeout(function () {
        window.location.replace('painel.html');
      }, 500);

    } catch (error) {
      console.error('Erro no login administrativo:', error);

      mostrarMensagem(
        traduzirErroLogin(error),
        'error'
      );

      passwordInput.value = '';
      passwordInput.focus();

    } finally {
      definirCarregamento(false);
    }
  });
})();