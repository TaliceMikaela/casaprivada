(function () {
  'use strict';

  const supabase = window.supabaseClient;
  const form = document.getElementById('definirSenhaForm');
  const senhaInput = document.getElementById('novaSenha');
  const confirmarInput = document.getElementById('confirmarSenha');
  const salvarButton = document.getElementById('salvarSenhaButton');
  const message = document.getElementById('definirSenhaMessage');
  const loginLink = document.getElementById('irParaLoginLink');

  function mostrarMensagem(texto, tipo = '') {
    message.textContent = texto;
    message.className = 'admin-login-message';

    if (tipo) {
      message.classList.add(tipo);
    }
  }

  function definirCarregamento(carregando) {
    senhaInput.disabled = carregando;
    confirmarInput.disabled = carregando;
    salvarButton.disabled = carregando;
    salvarButton.textContent = carregando
      ? 'Salvando...'
      : 'Salvar senha';
  }

  async function validarConvite() {
    if (!supabase) {
      mostrarMensagem(
        'Não foi possível conectar ao servidor.',
        'error'
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (!data.session?.user) {
        mostrarMensagem(
          'Este convite é inválido, expirou ou já foi utilizado. Solicite um novo convite ao administrador.',
          'error'
        );
        loginLink.hidden = false;
        return;
      }

      form.hidden = false;
      mostrarMensagem('Convite validado. Defina sua senha.', 'success');
      senhaInput.focus();

    } catch (error) {
      console.error('Erro ao validar convite:', error);
      mostrarMensagem(
        'Não foi possível validar o convite.',
        'error'
      );
      loginLink.hidden = false;
    }
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const senha = senhaInput.value;
    const confirmacao = confirmarInput.value;

    if (senha.length < 8) {
      mostrarMensagem(
        'A senha deve ter pelo menos 8 caracteres.',
        'error'
      );
      return;
    }

    if (senha !== confirmacao) {
      mostrarMensagem('As senhas não conferem.', 'error');
      confirmarInput.focus();
      return;
    }

    definirCarregamento(true);
    mostrarMensagem('Salvando sua senha...');

    try {
      const { error } = await supabase.auth.updateUser({
        password: senha
      });

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();

      form.hidden = true;
      loginLink.hidden = false;
      mostrarMensagem(
        'Senha definida com sucesso. Agora entre pelo painel.',
        'success'
      );

    } catch (error) {
      console.error('Erro ao definir senha:', error);
      mostrarMensagem(
        error?.message || 'Não foi possível salvar a senha.',
        'error'
      );

    } finally {
      definirCarregamento(false);
    }
  });

  validarConvite();
})();
