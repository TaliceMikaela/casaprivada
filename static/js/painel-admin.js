(function () {
    'use strict';

    const supabase = window.supabaseClient;

    const loadingScreen =
        document.getElementById('adminLoadingScreen');

    const adminPanel =
        document.getElementById('adminPanel');

    const userName =
        document.getElementById('adminUserName');

    const userRole =
        document.getElementById('adminUserRole');

    const adminSidebarEyebrow =
        document.getElementById('adminSidebarEyebrow');

    const adminTopbarEyebrow =
        document.getElementById('adminTopbarEyebrow');

    const dashboardSummaryTitle =
        document.getElementById('dashboardSummaryTitle');

    const dashboardSummaryDescription =
        document.getElementById('dashboardSummaryDescription');

    const navModelosButton =
        document.getElementById('navModelosButton');

    const navAvaliacoesButton =
        document.getElementById('navAvaliacoesButton');

    const modelosSectionTitle =
        document.getElementById('modelosSectionTitle');

    const statCardFotosCasa =
        document.getElementById('statCardFotosCasa');

    const statLabelTotalModelos =
        document.getElementById('statLabelTotalModelos');

    const statLabelModelosPublicadas =
        document.getElementById('statLabelModelosPublicadas');

    const statLabelFotosModelos =
        document.getElementById('statLabelFotosModelos');

    const pageTitle =
        document.getElementById('adminPageTitle');

    const logoutButton =
        document.getElementById('adminLogoutButton');

    const navigationButtons =
        document.querySelectorAll('.admin-nav-button[data-section]');

    const sections =
        document.querySelectorAll('[data-admin-section]');

    const statTotalModelos =
        document.getElementById('statTotalModelos');

    const statModelosPublicadas =
        document.getElementById('statModelosPublicadas');

    const statFotosModelos =
        document.getElementById('statFotosModelos');

    const statFotosCasa =
        document.getElementById('statFotosCasa');

    const modelosList =
        document.getElementById('modelosList');

    const casaFotosList =
        document.getElementById('casaFotosList');

    const recarregarModeracaoButton =
        document.getElementById('recarregarModeracaoButton');

    const moderacaoFiltroModelo =
        document.getElementById('moderacaoFiltroModelo');

    const moderacaoFiltroStatus =
        document.getElementById('moderacaoFiltroStatus');

    const avaliacoesPendentesCount =
        document.getElementById('avaliacoesPendentesCount');

    const mensagensPendentesCount =
        document.getElementById('mensagensPendentesCount');

    const avaliacoesAdminFeedback =
        document.getElementById('avaliacoesAdminFeedback');

    const mensagensAdminFeedback =
        document.getElementById('mensagensAdminFeedback');

    const avaliacoesAdminList =
        document.getElementById('avaliacoesAdminList');

    const mensagensAdminList =
        document.getElementById('mensagensAdminList');

    const moderacaoTitulo =
        document.getElementById('moderacaoTitulo');

    const moderacaoDescricao =
        document.getElementById('moderacaoDescricao');

    const moderacaoResumo =
        document.getElementById('moderacaoResumo');

    const moderacaoFiltros =
        document.getElementById('moderacaoFiltros');

    const avaliacoesModeracaoCard =
        document.getElementById('avaliacoesModeracaoCard');

    const mensagensModeracaoCard =
        document.getElementById('mensagensModeracaoCard');

    const avaliacoesPendentesCard =
        document.getElementById('avaliacoesPendentesCard');

    const mensagensPendentesCard =
        document.getElementById('mensagensPendentesCard');
    const modeloFotosModal =
        document.getElementById('modeloFotosModal');

    const modeloFotosModalOverlay =
        document.getElementById('modeloFotosModalOverlay');

    const fecharModeloFotosModalButton =
        document.getElementById('fecharModeloFotosModalButton');

    const modeloFotosModalTitle =
        document.getElementById('modeloFotosModalTitle');

    const modeloFotosModalSubtitle =
        document.getElementById('modeloFotosModalSubtitle');

    const modeloFotosModeloId =
        document.getElementById('modeloFotosModeloId');

    const modeloFotosUploadForm =
        document.getElementById('modeloFotosUploadForm');

    const modeloFotosArquivos =
        document.getElementById('modeloFotosArquivos');

    const modeloFotosStatus =
        document.getElementById('modeloFotosStatus');

    const modeloFotosOrdemInicial =
        document.getElementById('modeloFotosOrdemInicial');

    const modeloFotosUploadFeedback =
        document.getElementById('modeloFotosUploadFeedback');

    const enviarModeloFotosButton =
        document.getElementById('enviarModeloFotosButton');

    const modeloFotosList =
        document.getElementById('modeloFotosList');

    const publicarTodasFotosModeloButton =
        document.getElementById('publicarTodasFotosModeloButton');

    const ocultarTodasFotosModeloButton =
        document.getElementById('ocultarTodasFotosModeloButton');

    const modeloFotosUploadSection =
        document.getElementById('modeloFotosUploadSection');

    const modeloFotosLoteActions =
        document.getElementById('modeloFotosLoteActions');

    let modeloFotosCache = [];

    const novaModeloButton =
        document.getElementById('novaModeloButton');

    const modeloModal =
        document.getElementById('modeloModal');

    const modeloModalOverlay =
        document.getElementById('modeloModalOverlay');

    const fecharModeloModalButton =
        document.getElementById('fecharModeloModalButton');

    const cancelarModeloButton =
        document.getElementById('cancelarModeloButton');

    const modeloModalTitle =
        document.getElementById('modeloModalTitle');

    const modeloForm =
        document.getElementById('modeloForm');

    const modeloId =
        document.getElementById('modeloId');

    const modeloNome =
        document.getElementById('modeloNome');

    const modeloSlug =
        document.getElementById('modeloSlug');

    const modeloIdade =
        document.getElementById('modeloIdade');

    const modeloCidade =
        document.getElementById('modeloCidade');

    const modeloSigno =
        document.getElementById('modeloSigno');

    const modeloOrdem =
        document.getElementById('modeloOrdem');

    const modeloStatus =
        document.getElementById('modeloStatus');

    const modeloDestaque =
        document.getElementById('modeloDestaque');

    const modeloDescricao =
        document.getElementById('modeloDescricao');

    const modeloFormFeedback =
        document.getElementById('modeloFormFeedback');

    const modelosFeedback =
        document.getElementById('modelosFeedback');

    const salvarModeloButton =
        document.getElementById('salvarModeloButton');



    const modeloServicosModal =
        document.getElementById('modeloServicosModal');

    const modeloServicosModalOverlay =
        document.getElementById('modeloServicosModalOverlay');

    const fecharModeloServicosModalButton =
        document.getElementById('fecharModeloServicosModalButton');

    const modeloServicosModalTitle =
        document.getElementById('modeloServicosModalTitle');

    const modeloServicosModalSubtitle =
        document.getElementById('modeloServicosModalSubtitle');

    const modeloServicosModeloId =
        document.getElementById('modeloServicosModeloId');

    const modeloServicoForm =
        document.getElementById('modeloServicoForm');

    const modeloServicoFormTitle =
        document.getElementById('modeloServicoFormTitle');

    const modeloServicoId =
        document.getElementById('modeloServicoId');

    const modeloServicoDuracao =
        document.getElementById('modeloServicoDuracao');

    const modeloServicoPreco =
        document.getElementById('modeloServicoPreco');

    const modeloServicoOrdem =
        document.getElementById('modeloServicoOrdem');

    const modeloServicoAtivo =
        document.getElementById('modeloServicoAtivo');

    const modeloServicoObservacao =
        document.getElementById('modeloServicoObservacao');

    const modeloServicoFeedback =
        document.getElementById('modeloServicoFeedback');

    const salvarModeloServicoButton =
        document.getElementById('salvarModeloServicoButton');

    const cancelarEdicaoServicoButton =
        document.getElementById('cancelarEdicaoServicoButton');

    const modeloServicosList =
        document.getElementById('modeloServicosList');

    const usuarioModeloForm =
        document.getElementById('usuarioModeloForm');

    const usuarioModeloFormTitle =
        document.getElementById('usuarioModeloFormTitle');

    const usuarioPerfilId =
        document.getElementById('usuarioPerfilId');

    const usuarioNome =
        document.getElementById('usuarioNome');

    const usuarioEmail =
        document.getElementById('usuarioEmail');

    const usuarioModeloId =
        document.getElementById('usuarioModeloId');

    const usuarioAtivo =
        document.getElementById('usuarioAtivo');

    const permEditarPerfil =
        document.getElementById('permEditarPerfil');

    const permEditarServicosPrecos =
        document.getElementById('permEditarServicosPrecos');

    const permGerenciarFotos =
        document.getElementById('permGerenciarFotos');

    const permExcluirFotos =
        document.getElementById('permExcluirFotos');

    const permPublicarFotos =
        document.getElementById('permPublicarFotos');

    const permPublicarPerfil =
        document.getElementById('permPublicarPerfil');

    const permVisualizarAvaliacoes =
        document.getElementById('permVisualizarAvaliacoes');

    const permVisualizarMensagens =
        document.getElementById('permVisualizarMensagens');

    const permResponderMensagens =
        document.getElementById('permResponderMensagens');

    const usuarioModeloFeedback =
        document.getElementById('usuarioModeloFeedback');

    const salvarUsuarioModeloButton =
        document.getElementById('salvarUsuarioModeloButton');

    const cancelarEdicaoUsuarioButton =
        document.getElementById('cancelarEdicaoUsuarioButton');

    const usuariosModeloList =
        document.getElementById('usuariosModeloList');

    const recarregarUsuariosButton =
        document.getElementById('recarregarUsuariosButton');

    let modelosCache = [];
    let modeloServicosCache = [];
    let avaliacoesModeracaoCache = [];
    let mensagensModeracaoCache = [];
    let usuariosModeloCache = [];
    let perfilAdministrativoAtual = null;
    let slugAlteradoManualmente = false;


    const titulosSecoes = {
        dashboard: 'Visão geral',
        modelos: 'Modelos',
        casa: 'Galeria da casa',
        avaliacoes: 'Avaliações e mensagens',
        usuarios: 'Usuários e permissões'
    };

    function redirecionarParaLogin() {
        window.location.replace('admin.html');
    }

    function esconderCarregamento() {
        if (loadingScreen) {
            loadingScreen.hidden = true;
        }
    }

    function mostrarPainel() {
        if (adminPanel) {
            adminPanel.hidden = false;
        }

        esconderCarregamento();
    }

    function mostrarErroCarregamento(mensagem) {
        if (!loadingScreen) {
            return;
        }

        loadingScreen.innerHTML = `
      <div class="admin-loading-error">
        <strong>Não foi possível abrir o painel.</strong>
        <p>${escaparHtml(mensagem)}</p>
        <a href="admin.html" class="btn btn-primary">
          Voltar ao login
        </a>
      </div>
    `;
    }

    function escaparHtml(valor) {
        return String(valor ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }


function formatarPapel(papel) {
    const papeis = {
        administrador: 'Administrador',
        modelo: 'Modelo'
    };

    return papeis[papel] || papel;
}

function usuarioAtualEhAdministrador() {
    return perfilAdministrativoAtual?.papel === 'administrador';
}

function usuarioAtualEhModelo() {
    return perfilAdministrativoAtual?.papel === 'modelo';
}

function usuarioTemPermissao(nomePermissao) {
    if (usuarioAtualEhAdministrador()) {
        return true;
    }

    return perfilAdministrativoAtual?.[nomePermissao] === true;
}

function modeloPertenceAoUsuario(modeloId) {
    return (
        usuarioAtualEhAdministrador() ||
        perfilAdministrativoAtual?.modelo_id === modeloId
    );
}

function podeEditarDadosModelo() {
    return usuarioTemPermissao('pode_editar_perfil');
}

function podePublicarModelo() {
    return usuarioTemPermissao('pode_publicar_perfil');
}

function podeGerenciarFotos() {
    return usuarioTemPermissao('pode_gerenciar_fotos');
}

function podePublicarFotos() {
    return usuarioTemPermissao('pode_publicar_fotos');
}

function podeExcluirFotos() {
    return usuarioTemPermissao('pode_excluir_fotos');
}

function podeEditarServicosPrecos() {
    return usuarioTemPermissao('pode_editar_servicos_precos');
}
    async function obterSessao() {
        const { data, error } =
            await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        return data.session;
    }


async function obterPerfilAdministrativo(usuarioId) {
    const { data, error } = await supabase
        .from('perfis_administrativos')
        .select(`
            id,
            nome,
            email,
            papel,
            ativo,
            modelo_id,
            pode_editar_perfil,
            pode_editar_servicos_precos,
            pode_gerenciar_fotos,
            pode_excluir_fotos,
            pode_publicar_fotos,
            pode_publicar_perfil,
            pode_visualizar_avaliacoes,
            pode_visualizar_mensagens,
            pode_responder_mensagens
        `)
        .eq('id', usuarioId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
}

async function validarAcessoAdministrativo() {
    const sessao = await obterSessao();

    if (!sessao?.user) {
        redirecionarParaLogin();
        return null;
    }

    const perfil = await obterPerfilAdministrativo(
        sessao.user.id
    );

    if (!perfil) {
        await supabase.auth.signOut();
        redirecionarParaLogin();
        return null;
    }

    if (!perfil.ativo) {
        await supabase.auth.signOut();
        redirecionarParaLogin();
        return null;
    }

    if (
        !['administrador', 'modelo'].includes(perfil.papel)
    ) {
        await supabase.auth.signOut();
        redirecionarParaLogin();
        return null;
    }

    if (
        perfil.papel === 'modelo' &&
        !perfil.modelo_id
    ) {
        await supabase.auth.signOut();
        throw new Error(
            'O usuário da modelo não possui uma modelo vinculada.'
        );
    }

    return {
        sessao,
        perfil
    };
}
    async function contarRegistros(
        tabela,
        filtroCampo = null,
        filtroValor = null
    ) {
        let consulta = supabase
            .from(tabela)
            .select('id', {
                count: 'exact',
                head: true
            });

        if (filtroCampo) {
            consulta = consulta.eq(
                filtroCampo,
                filtroValor
            );
        }

        const { count, error } = await consulta;

        if (error) {
            throw error;
        }

        return count ?? 0;
    }


async function carregarIndicadores() {
    if (usuarioAtualEhAdministrador()) {
        const [
            totalModelos,
            modelosPublicadas,
            fotosModelos,
            fotosCasa
        ] = await Promise.all([
            contarRegistros('modelos'),
            contarRegistros(
                'modelos',
                'status',
                'publicada'
            ),
            contarRegistros('modelo_fotos'),
            contarRegistros('casa_fotos')
        ]);

        statTotalModelos.textContent =
            String(totalModelos);

        statModelosPublicadas.textContent =
            String(modelosPublicadas);

        statFotosModelos.textContent =
            String(fotosModelos);

        statFotosCasa.textContent =
            String(fotosCasa);

        return;
    }

    const modeloIdAtual =
        perfilAdministrativoAtual?.modelo_id;

    const [
        totalModelos,
        modelosPublicadas,
        fotosModelos
    ] = await Promise.all([
        contarRegistros('modelos', 'id', modeloIdAtual),
        contarRegistrosComDoisFiltros(
            'modelos',
            'id',
            modeloIdAtual,
            'status',
            'publicada'
        ),
        contarRegistros(
            'modelo_fotos',
            'modelo_id',
            modeloIdAtual
        )
    ]);

    statLabelTotalModelos.textContent = 'Meu perfil';
    statLabelModelosPublicadas.textContent = 'Perfil publicado';
    statLabelFotosModelos.textContent = 'Minhas fotos';

    statTotalModelos.textContent = String(totalModelos);
    statModelosPublicadas.textContent = String(modelosPublicadas);
    statFotosModelos.textContent = String(fotosModelos);

    if (statCardFotosCasa) {
        statCardFotosCasa.hidden = true;
    }
}

async function contarRegistrosComDoisFiltros(
    tabela,
    campo1,
    valor1,
    campo2,
    valor2
) {
    const { count, error } = await supabase
        .from(tabela)
        .select('id', {
            count: 'exact',
            head: true
        })
        .eq(campo1, valor1)
        .eq(campo2, valor2);

    if (error) {
        throw error;
    }

    return count ?? 0;
}

async function carregarModelos() {
    let consulta = supabase
        .from('modelos')
        .select(`
          id,
          nome,
          slug,
          idade,
          cidade,
          signo,
          descricao,
          status,
          ordem,
          destaque,
          publicado_em,
          criado_em
        `)
        .order('ordem', {
            ascending: true
        })
        .order('criado_em', {
            ascending: false
        });

    if (usuarioAtualEhModelo()) {
        consulta = consulta.eq(
            'id',
            perfilAdministrativoAtual.modelo_id
        );
    }

    const { data, error } = await consulta;

    if (error) {
        throw error;
    }

    modelosCache = data || [];
    popularFiltroModelosModeracao();
    popularSelectModelosUsuarios();

    if (modelosCache.length === 0) {
        modelosList.innerHTML = `
          <div class="admin-empty-state">
            <strong>Nenhuma modelo encontrada.</strong>
            <p>
              ${usuarioAtualEhAdministrador()
                ? 'Clique em “Nova modelo” para realizar o primeiro cadastro.'
                : 'O seu usuário ainda não está vinculado a um perfil disponível.'}
            </p>
          </div>
        `;

        return;
    }

    modelosList.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Cidade</th>
            <th>Status</th>
            ${usuarioAtualEhAdministrador() ? '<th>Ordem</th>' : ''}
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          ${modelosCache.map(function (modelo) {
            const podeEditar =
                usuarioAtualEhAdministrador() ||
                podeEditarDadosModelo() ||
                podePublicarModelo();

            return `
              <tr>
                <td>
                  <strong>${escaparHtml(modelo.nome)}</strong>
                </td>

                <td>${escaparHtml(modelo.idade)}</td>

                <td>${escaparHtml(modelo.cidade || '—')}</td>

                <td>
                  <span class="
                    admin-status
                    admin-status-${escaparHtml(modelo.status)}
                  ">
                    ${escaparHtml(modelo.status)}
                  </span>
                </td>

                ${usuarioAtualEhAdministrador()
                    ? `<td>${escaparHtml(modelo.ordem)}</td>`
                    : ''}

                <td>
                  <div class="admin-action-group">
                    ${podeEditarServicosPrecos()
                        ? `
                          <button
                            class="admin-action-button"
                            type="button"
                            data-servicos-modelo="${modelo.id}"
                          >
                            Tempos e preços
                          </button>
                        `
                        : ''}

                    <button
                      class="admin-action-button"
                      type="button"
                      data-fotos-modelo="${modelo.id}"
                    >
                      Fotos
                    </button>

                    ${podeEditar
                        ? `
                          <button
                            class="admin-action-button"
                            type="button"
                            data-editar-modelo="${modelo.id}"
                          >
                            Editar
                          </button>
                        `
                        : ''}
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
}
    async function carregarFotosCasa() {
        const { data, error } = await supabase
            .from('casa_fotos')
            .select(`
        id,
        titulo,
        descricao,
        caminho_storage,
        bucket,
        status,
        ordem,
        destaque
      `)
            .order('ordem', {
                ascending: true
            })
            .order('criado_em', {
                ascending: false
            });

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            casaFotosList.innerHTML = `
        <div class="admin-empty-state">
          <strong>Nenhuma foto cadastrada.</strong>
          <p>
            Clique em “Adicionar foto” para começar
            a galeria da casa.
          </p>
        </div>
      `;

            return;
        }

        casaFotosList.innerHTML = data
            .map(function (foto) {
                const { data: urlData } = supabase
                    .storage
                    .from(foto.bucket)
                    .getPublicUrl(foto.caminho_storage);

                const imagemUrl =
                    urlData?.publicUrl || '';

                return `
          <article class="admin-gallery-card">

            <img
              src="${escaparHtml(imagemUrl)}"
              alt="${escaparHtml(foto.titulo)}"
              loading="lazy"
            >

            <div class="admin-gallery-card-content">

              <strong>
                ${escaparHtml(foto.titulo)}
              </strong>

              <span class="
                admin-status
                admin-status-${escaparHtml(foto.status)}
              ">
                ${escaparHtml(foto.status)}
              </span>

              <small>
                Ordem: ${escaparHtml(foto.ordem)}
              </small>

              <button
                class="admin-action-button"
                type="button"
                data-editar-foto-casa="${foto.id}"
              >
                Editar
              </button>

            </div>

          </article>
        `;
            })
            .join('');
    }

    function mostrarFeedbackFotosModelo(
        mensagem,
        tipo = ''
    ) {
        modeloFotosUploadFeedback.textContent = mensagem;
        modeloFotosUploadFeedback.className = 'admin-feedback';

        if (tipo) {
            modeloFotosUploadFeedback.classList.add(tipo);
        }
    }

    function obterUrlPublicaFoto(
        bucket,
        caminhoStorage
    ) {
        const { data } = supabase
            .storage
            .from(bucket)
            .getPublicUrl(caminhoStorage);

        return data?.publicUrl || '';
    }

    function obterModeloAtualFotos() {
        const modeloIdAtual =
            modeloFotosModeloId.value.trim();

        return modelosCache.find(function (modelo) {
            return modelo.id === modeloIdAtual;
        }) || null;
    }


function obterStatusInicialFotos(modeloId) {
    if (!podePublicarFotos()) {
        return 'rascunho';
    }

    const modelo = modelosCache.find(function (item) {
        return item.id === modeloId;
    });

    return modelo?.status === 'publicada'
        ? 'publicada'
        : 'rascunho';
}

function atualizarBotoesLoteFotos() {
    const podeAlterarStatus = podePublicarFotos();
    const desabilitado =
        modeloFotosCache.length === 0 ||
        !podeAlterarStatus;

    if (modeloFotosLoteActions) {
        modeloFotosLoteActions.hidden = !podeAlterarStatus;
    }

    publicarTodasFotosModeloButton.disabled = desabilitado;
    ocultarTodasFotosModeloButton.disabled = desabilitado;
}

async function carregarFotosModelo(modeloId) {
    if (!modeloPertenceAoUsuario(modeloId)) {
        throw new Error('Acesso negado à galeria desta modelo.');
    }

    modeloFotosList.innerHTML = `
      <p class="muted">Carregando fotos...</p>
    `;

    publicarTodasFotosModeloButton.disabled = true;
    ocultarTodasFotosModeloButton.disabled = true;

    const { data, error } = await supabase
        .from('modelo_fotos')
        .select(`
          id,
          modelo_id,
          bucket,
          caminho_storage,
          titulo,
          descricao,
          texto_alternativo,
          ordem,
          capa,
          status,
          nome_arquivo_original,
          mime_type,
          tamanho_bytes,
          largura,
          altura,
          criado_em
        `)
        .eq('modelo_id', modeloId)
        .order('capa', {
            ascending: false
        })
        .order('ordem', {
            ascending: true
        })
        .order('criado_em', {
            ascending: true
        });

    if (error) {
        throw error;
    }

    modeloFotosCache = data || [];
    atualizarBotoesLoteFotos();

    if (modeloFotosCache.length === 0) {
        modeloFotosList.innerHTML = `
          <div class="admin-empty-state">
            <strong>Nenhuma foto cadastrada.</strong>
            <p>
              ${podeGerenciarFotos()
                ? 'Use o formulário acima para enviar as primeiras imagens desta modelo.'
                : 'Ainda não existem imagens cadastradas para esta modelo.'}
            </p>
          </div>
        `;

        return;
    }

    modeloFotosList.innerHTML = modeloFotosCache
        .map(function (foto) {
            const imagemUrl = obterUrlPublicaFoto(
                foto.bucket,
                foto.caminho_storage
            );

            const tituloFoto =
                foto.titulo ||
                foto.nome_arquivo_original ||
                'Foto da modelo';

            const botoes = [];

            if (podePublicarFotos()) {
                botoes.push(`
                  <button
                    class="admin-action-button"
                    type="button"
                    data-status-foto-modelo="${foto.id}"
                    data-proximo-status="${foto.status === 'publicada' ? 'oculta' : 'publicada'}"
                  >
                    ${foto.status === 'publicada' ? 'Ocultar' : 'Publicar'}
                  </button>
                `);
            }

            if (podeGerenciarFotos()) {
                botoes.push(`
                  <button
                    class="admin-action-button"
                    type="button"
                    data-capa-foto-modelo="${foto.id}"
                    ${foto.capa ? 'disabled' : ''}
                  >
                    ${foto.capa ? 'Foto de capa' : 'Definir capa'}
                  </button>
                `);
            }

            if (podeExcluirFotos()) {
                botoes.push(`
                  <button
                    class="
                      admin-action-button
                      admin-action-button-danger
                    "
                    type="button"
                    data-excluir-foto-modelo="${foto.id}"
                  >
                    Excluir
                  </button>
                `);
            }

            return `
              <article
                class="
                  admin-modelo-foto-card
                  ${foto.capa ? 'capa' : ''}
                "
              >

                ${foto.capa
                    ? `
                      <span class="admin-modelo-foto-badge">
                        Capa
                      </span>
                    `
                    : ''
                }

                <img
                  src="${escaparHtml(imagemUrl)}"
                  alt="${escaparHtml(
                      foto.texto_alternativo || tituloFoto
                  )}"
                  loading="lazy"
                >

                <div class="admin-modelo-foto-content">
                  <strong title="${escaparHtml(tituloFoto)}">
                    ${escaparHtml(tituloFoto)}
                  </strong>

                  <div class="admin-modelo-foto-meta">
                    <span
                      class="
                        admin-status
                        admin-status-${escaparHtml(foto.status)}
                      "
                    >
                      ${escaparHtml(foto.status)}
                    </span>

                    <small>
                      Ordem: ${escaparHtml(foto.ordem)}
                    </small>
                  </div>

                  ${botoes.length > 0
                    ? `
                      <div class="admin-modelo-foto-actions">
                        ${botoes.join('')}
                      </div>
                    `
                    : `
                      <small class="muted">
                        Visualização permitida. Alterações não autorizadas.
                      </small>
                    `
                  }
                </div>
              </article>
            `;
        })
        .join('');
}

async function abrirModeloFotosModal(modelo) {
    if (!modeloPertenceAoUsuario(modelo.id)) {
        mostrarFeedbackListaModelos(
            'Você não possui acesso a esta modelo.',
            'error'
        );
        return;
    }

    modeloFotosUploadForm.reset();

    modeloFotosModeloId.value = modelo.id;
    modeloFotosModalTitle.textContent = 'Fotos da modelo';
    modeloFotosModalSubtitle.textContent =
        `${modelo.nome} · ${modelo.idade} anos`;

    const podeEnviar = podeGerenciarFotos();

    if (modeloFotosUploadSection) {
        modeloFotosUploadSection.hidden = !podeEnviar;
    }

    modeloFotosStatus.value =
        obterStatusInicialFotos(modelo.id);

    modeloFotosStatus.disabled =
        !podePublicarFotos();

    modeloFotosOrdemInicial.value = 0;

    mostrarFeedbackFotosModelo('');
    modeloFotosModal.hidden = false;

    document.body.classList.add(
        'admin-modal-open'
    );

    try {
        await carregarFotosModelo(modelo.id);
    } catch (error) {
        console.error(
            'Erro ao carregar fotos da modelo:',
            error
        );

        modeloFotosList.innerHTML = `
          <div class="admin-empty-state">
            <strong>Não foi possível carregar as fotos.</strong>
            <p>
              Verifique a conexão e as permissões do usuário.
            </p>
          </div>
        `;
    }
}
    function fecharModeloFotosModal() {
        modeloFotosModal.hidden = true;

        document.body.classList.remove(
            'admin-modal-open'
        );

        modeloFotosUploadForm.reset();

        modeloFotosModeloId.value = '';

        modeloFotosCache = [];

        mostrarFeedbackFotosModelo('');

        modeloFotosList.innerHTML = `
    <p class="muted">
      Selecione uma modelo para carregar as fotos.
    </p>
  `;
    }


    function obterMimeImagem(arquivo) {
        const tipoInformado = String(arquivo.type || '').toLowerCase();

        if (
            tipoInformado === 'image/jpeg' ||
            tipoInformado === 'image/png' ||
            tipoInformado === 'image/webp'
        ) {
            return tipoInformado;
        }

        const nome = String(arquivo.name || '').toLowerCase();

        if (
            nome.endsWith('.jpg') ||
            nome.endsWith('.jpeg') ||
            nome.endsWith('.jfif')
        ) {
            return 'image/jpeg';
        }

        if (nome.endsWith('.png')) {
            return 'image/png';
        }

        if (nome.endsWith('.webp')) {
            return 'image/webp';
        }

        return '';
    }

    function obterExtensaoImagem(arquivo) {
        const mimeType = obterMimeImagem(arquivo);

        const extensoes = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/webp': 'webp'
        };

        return extensoes[mimeType] || '';
    }

    function gerarNomeUnicoArquivo(arquivo) {
        const identificador =
            typeof crypto.randomUUID === 'function'
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random()
                    .toString(16)
                    .slice(2)}`;

        return `${identificador}.${obterExtensaoImagem(arquivo)}`;
    }


function definirUploadFotosCarregando(carregando) {
    const autorizado = podeGerenciarFotos();

    modeloFotosArquivos.disabled =
        carregando || !autorizado;

    modeloFotosStatus.disabled =
        carregando || !podePublicarFotos();

    modeloFotosOrdemInicial.disabled =
        carregando || !autorizado;

    enviarModeloFotosButton.disabled =
        carregando || !autorizado;

    enviarModeloFotosButton.textContent = carregando
        ? 'Enviando...'
        : 'Enviar fotos';
}

async function enviarFotosModelo(event) {
    event.preventDefault();

    if (!podeGerenciarFotos()) {
        mostrarFeedbackFotosModelo(
            'Seu usuário não possui permissão para enviar fotos.',
            'error'
        );
        return;
    }

    const modeloIdAtual =
        modeloFotosModeloId.value.trim();

    if (!modeloPertenceAoUsuario(modeloIdAtual)) {
        mostrarFeedbackFotosModelo(
            'Você não possui acesso a esta modelo.',
            'error'
        );
        return;
    }

    const arquivos =
        Array.from(modeloFotosArquivos.files || []);

    mostrarFeedbackFotosModelo('');

    if (!modeloIdAtual) {
        mostrarFeedbackFotosModelo(
            'A modelo não foi identificada.',
            'error'
        );
        return;
    }

    if (arquivos.length === 0) {
        mostrarFeedbackFotosModelo(
            'Selecione pelo menos uma imagem.',
            'error'
        );
        return;
    }

    const arquivoInvalido = arquivos.find(function (arquivo) {
        return !obterMimeImagem(arquivo);
    });

    if (arquivoInvalido) {
        mostrarFeedbackFotosModelo(
            `O arquivo ${arquivoInvalido.name} não possui um formato permitido.`,
            'error'
        );
        return;
    }

    const tamanhoMaximo = 8 * 1024 * 1024;

    const arquivoMuitoGrande = arquivos.find(function (arquivo) {
        return arquivo.size > tamanhoMaximo;
    });

    if (arquivoMuitoGrande) {
        mostrarFeedbackFotosModelo(
            `O arquivo ${arquivoMuitoGrande.name} ultrapassa 8 MB.`,
            'error'
        );
        return;
    }

    const ordemInicial = Math.max(
        0,
        Number(modeloFotosOrdemInicial.value) || 0
    );

    const statusInicial = podePublicarFotos()
        ? (modeloFotosStatus.value || 'rascunho')
        : 'rascunho';

    let jaPossuiCapa = modeloFotosCache.some(function (foto) {
        return foto.capa;
    });

    let enviados = 0;

    definirUploadFotosCarregando(true);

    mostrarFeedbackFotosModelo(
        `Enviando 0 de ${arquivos.length} arquivo(s)...`
    );

    try {
        for (
            let indice = 0;
            indice < arquivos.length;
            indice += 1
        ) {
            const arquivo = arquivos[indice];
            const mimeType = obterMimeImagem(arquivo);
            const nomeStorage = gerarNomeUnicoArquivo(arquivo);
            const caminhoStorage =
                `modelos/${modeloIdAtual}/${nomeStorage}`;

            const { error: uploadError } = await supabase
                .storage
                .from('galeria-publica')
                .upload(
                    caminhoStorage,
                    arquivo,
                    {
                        cacheControl: '3600',
                        contentType: mimeType,
                        upsert: false
                    }
                );

            if (uploadError) {
                throw new Error(
                    `Falha ao enviar ${arquivo.name}: ${uploadError.message}`
                );
            }

            const definirComoCapa =
                !jaPossuiCapa && indice === 0;

            const { error: bancoError } = await supabase
                .from('modelo_fotos')
                .insert({
                    modelo_id: modeloIdAtual,
                    bucket: 'galeria-publica',
                    caminho_storage: caminhoStorage,
                    titulo: null,
                    descricao: null,
                    texto_alternativo: null,
                    ordem: ordemInicial + indice,
                    capa: definirComoCapa,
                    status: statusInicial,
                    nome_arquivo_original: arquivo.name,
                    mime_type: mimeType,
                    tamanho_bytes: arquivo.size
                });

            if (bancoError) {
                const { error: remocaoError } = await supabase
                    .storage
                    .from('galeria-publica')
                    .remove([caminhoStorage]);

                if (remocaoError) {
                    console.error(
                        'Não foi possível remover o arquivo sem cadastro:',
                        remocaoError
                    );
                }

                throw new Error(
                    `A imagem ${arquivo.name} foi enviada, mas o cadastro falhou: ${bancoError.message}`
                );
            }

            if (definirComoCapa) {
                jaPossuiCapa = true;
            }

            enviados += 1;

            mostrarFeedbackFotosModelo(
                `Enviando ${enviados} de ${arquivos.length} arquivo(s)...`
            );
        }

        modeloFotosUploadForm.reset();
        modeloFotosStatus.value =
            obterStatusInicialFotos(modeloIdAtual);
        modeloFotosOrdemInicial.value = 0;

        mostrarFeedbackFotosModelo(
            `${enviados} foto(s) enviada(s) com sucesso.`,
            'success'
        );

        await Promise.all([
            carregarFotosModelo(modeloIdAtual),
            carregarIndicadores()
        ]);

    } catch (error) {
        console.error(
            'Erro ao enviar fotos da modelo:',
            error
        );

        const complemento =
            enviados > 0
                ? ` ${enviados} foto(s) foram enviadas antes da falha.`
                : '';

        mostrarFeedbackFotosModelo(
            `${error.message || 'Não foi possível enviar as fotos.'}${complemento}`,
            'error'
        );

        await Promise.all([
            carregarFotosModelo(modeloIdAtual),
            carregarIndicadores()
        ]);

    } finally {
        definirUploadFotosCarregando(false);
    }
}
    async function alterarStatusFotoModelo(fotoId, novoStatus) {
        if (!podePublicarFotos()) {
            mostrarFeedbackFotosModelo(
                'Seu usuário não possui permissão para publicar ou ocultar fotos.',
                'error'
            );
            return;
        }

        const foto = modeloFotosCache.find(function (item) {
            return item.id === fotoId;
        });

        if (!foto) {
            mostrarFeedbackFotosModelo(
                'A foto selecionada não foi encontrada.',
                'error'
            );
            return;
        }

        mostrarFeedbackFotosModelo(
            novoStatus === 'publicada'
                ? 'Publicando foto...'
                : 'Ocultando foto...'
        );

        const { error } = await supabase
            .from('modelo_fotos')
            .update({ status: novoStatus })
            .eq('id', fotoId);

        if (error) {
            throw error;
        }

        const modelo = modelosCache.find(function (item) {
            return item.id === foto.modelo_id;
        });

        const avisoModelo =
            novoStatus === 'publicada' && modelo?.status !== 'publicada'
                ? ' A foto está publicada, mas a modelo também precisa estar com status “publicada” para aparecer no site.'
                : '';

        mostrarFeedbackFotosModelo(
            `${novoStatus === 'publicada' ? 'Foto publicada' : 'Foto ocultada'} com sucesso.${avisoModelo}`,
            'success'
        );

        await Promise.all([
            carregarFotosModelo(foto.modelo_id),
            carregarIndicadores()
        ]);
    }

    async function definirCapaFotoModelo(fotoId) {
        if (!podeGerenciarFotos()) {
            mostrarFeedbackFotosModelo(
                'Seu usuário não possui permissão para gerenciar fotos.',
                'error'
            );
            return;
        }

        const foto = modeloFotosCache.find(function (item) {
            return item.id === fotoId;
        });

        if (!foto) {
            mostrarFeedbackFotosModelo(
                'A foto selecionada não foi encontrada.',
                'error'
            );
            return;
        }

        mostrarFeedbackFotosModelo('Alterando a foto de capa...');

        const { error: limparCapaError } = await supabase
            .from('modelo_fotos')
            .update({ capa: false })
            .eq('modelo_id', foto.modelo_id)
            .eq('capa', true);

        if (limparCapaError) {
            throw limparCapaError;
        }

        const { error: novaCapaError } = await supabase
            .from('modelo_fotos')
            .update({ capa: true })
            .eq('id', fotoId);

        if (novaCapaError) {
            throw novaCapaError;
        }

        mostrarFeedbackFotosModelo(
            'Foto de capa alterada com sucesso.',
            'success'
        );

        await carregarFotosModelo(foto.modelo_id);
    }

    async function excluirFotoModelo(fotoId) {
        if (!podeExcluirFotos()) {
            mostrarFeedbackFotosModelo(
                'Seu usuário não possui permissão para excluir fotos.',
                'error'
            );
            return;
        }

        const foto = modeloFotosCache.find(function (item) {
            return item.id === fotoId;
        });

        if (!foto) {
            mostrarFeedbackFotosModelo(
                'A foto selecionada não foi encontrada.',
                'error'
            );
            return;
        }

        const confirmou = window.confirm(
            'Deseja excluir esta foto definitivamente? Esta ação não poderá ser desfeita.'
        );

        if (!confirmou) {
            return;
        }

        mostrarFeedbackFotosModelo('Excluindo foto...');

        const { error: bancoError } = await supabase
            .from('modelo_fotos')
            .delete()
            .eq('id', fotoId);

        if (bancoError) {
            throw bancoError;
        }

        const { error: storageError } = await supabase
            .storage
            .from(foto.bucket || 'galeria-publica')
            .remove([foto.caminho_storage]);

        if (storageError) {
            console.error(
                'O registro foi excluído, mas o arquivo não pôde ser removido do Storage:',
                storageError
            );
        }

        const restantes = modeloFotosCache.filter(function (item) {
            return item.id !== fotoId;
        });

        if (foto.capa && restantes.length > 0 && podeGerenciarFotos()) {
            const proximaCapa = restantes
                .slice()
                .sort(function (a, b) {
                    return (a.ordem ?? 0) - (b.ordem ?? 0);
                })[0];

            const { error: capaError } = await supabase
                .from('modelo_fotos')
                .update({ capa: true })
                .eq('id', proximaCapa.id);

            if (capaError) {
                console.error(
                    'A foto foi excluída, mas não foi possível definir uma nova capa:',
                    capaError
                );
            }
        }

        mostrarFeedbackFotosModelo(
            storageError
                ? 'Foto removida da galeria. O arquivo físico precisa ser revisado no Storage.'
                : 'Foto excluída com sucesso.',
            storageError ? 'error' : 'success'
        );

        await Promise.all([
            carregarFotosModelo(foto.modelo_id),
            carregarIndicadores()
        ]);
    }

    async function alterarStatusTodasFotosModelo(novoStatus) {
        if (!podePublicarFotos()) {
            mostrarFeedbackFotosModelo(
                'Seu usuário não possui permissão para publicar ou ocultar fotos.',
                'error'
            );
            return;
        }

        const modeloIdAtual =
            modeloFotosModeloId.value.trim();

        if (!modeloIdAtual || modeloFotosCache.length === 0) {
            mostrarFeedbackFotosModelo(
                'Não existem fotos para alterar.',
                'error'
            );
            return;
        }

        const acao = novoStatus === 'publicada'
            ? 'Publicando'
            : 'Ocultando';

        publicarTodasFotosModeloButton.disabled = true;
        ocultarTodasFotosModeloButton.disabled = true;

        mostrarFeedbackFotosModelo(
            `${acao} todas as fotos...`
        );

        try {
            const { error } = await supabase
                .from('modelo_fotos')
                .update({ status: novoStatus })
                .eq('modelo_id', modeloIdAtual);

            if (error) {
                throw error;
            }

            const modelo = obterModeloAtualFotos();
            const avisoModelo =
                novoStatus === 'publicada' &&
                modelo?.status !== 'publicada'
                    ? ' A modelo também precisa estar publicada para aparecer no site.'
                    : '';

            mostrarFeedbackFotosModelo(
                `${novoStatus === 'publicada'
                    ? 'Todas as fotos foram publicadas'
                    : 'Todas as fotos foram ocultadas'} com sucesso.${avisoModelo}`,
                'success'
            );

            await Promise.all([
                carregarFotosModelo(modeloIdAtual),
                carregarIndicadores()
            ]);
        } catch (error) {
            console.error(
                'Erro ao alterar todas as fotos da modelo:',
                error
            );

            mostrarFeedbackFotosModelo(
                'Não foi possível alterar todas as fotos.',
                'error'
            );

            atualizarBotoesLoteFotos();
        }
    }

    async function executarAcaoFotoModelo(event) {
        const statusButton = event.target.closest(
            '[data-status-foto-modelo]'
        );

        const capaButton = event.target.closest(
            '[data-capa-foto-modelo]'
        );

        const excluirButton = event.target.closest(
            '[data-excluir-foto-modelo]'
        );

        try {
            if (statusButton) {
                await alterarStatusFotoModelo(
                    statusButton.dataset.statusFotoModelo,
                    statusButton.dataset.proximoStatus
                );
                return;
            }

            if (capaButton && !capaButton.disabled) {
                await definirCapaFotoModelo(
                    capaButton.dataset.capaFotoModelo
                );
                return;
            }

            if (excluirButton) {
                await excluirFotoModelo(
                    excluirButton.dataset.excluirFotoModelo
                );
            }
        } catch (error) {
            console.error('Erro ao administrar foto da modelo:', error);

            const mensagem = String(error?.message || '').toLowerCase();

            mostrarFeedbackFotosModelo(
                mensagem.includes('row-level security')
                    ? 'Seu usuário não possui permissão para executar esta ação.'
                    : 'Não foi possível concluir a operação com a foto.',
                'error'
            );
        }
    }


    function gerarSlug(valor) {
        return String(valor || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function mostrarFeedbackModelo(mensagem, tipo = '') {
        modeloFormFeedback.textContent = mensagem;
        modeloFormFeedback.className = 'admin-feedback';

        if (tipo) {
            modeloFormFeedback.classList.add(tipo);
        }
    }

    function mostrarFeedbackListaModelos(mensagem, tipo = '') {
        modelosFeedback.textContent = mensagem;
        modelosFeedback.className = 'admin-feedback';

        if (tipo) {
            modelosFeedback.classList.add(tipo);
        }
    }


function aplicarPermissoesFormularioModelo() {
    if (usuarioAtualEhAdministrador()) {
        [
            modeloNome,
            modeloSlug,
            modeloIdade,
            modeloCidade,
            modeloSigno,
            modeloOrdem,
            modeloStatus,
            modeloDestaque,
            modeloDescricao
        ].forEach(function (campo) {
            campo.disabled = false;
        });

        salvarModeloButton.disabled = false;
        return;
    }

    const podeEditar = podeEditarDadosModelo();
    const podePublicar = podePublicarModelo();

    [
        modeloNome,
        modeloSlug,
        modeloIdade,
        modeloCidade,
        modeloSigno,
        modeloDescricao
    ].forEach(function (campo) {
        campo.disabled = !podeEditar;
    });

    modeloOrdem.disabled = true;
    modeloDestaque.disabled = true;
    modeloStatus.disabled = !podePublicar;

    salvarModeloButton.disabled =
        !podeEditar && !podePublicar;
}

function definirFormularioModeloCarregando(carregando) {
    const campos = modeloForm.querySelectorAll(
        'input, select, textarea, button'
    );

    campos.forEach(function (campo) {
        campo.disabled = carregando;
    });

    salvarModeloButton.textContent = carregando
        ? 'Salvando...'
        : 'Salvar modelo';

    if (!carregando) {
        aplicarPermissoesFormularioModelo();
    }
}

function abrirModeloModal(modelo = null) {
    if (!modelo && !usuarioAtualEhAdministrador()) {
        mostrarFeedbackListaModelos(
            'Somente administradores podem cadastrar novas modelos.',
            'error'
        );
        return;
    }

    if (
        modelo &&
        !modeloPertenceAoUsuario(modelo.id)
    ) {
        mostrarFeedbackListaModelos(
            'Você não possui acesso a esta modelo.',
            'error'
        );
        return;
    }

    modeloForm.reset();
    mostrarFeedbackModelo('');

    if (modelo) {
        modeloModalTitle.textContent = usuarioAtualEhModelo()
            ? 'Editar meu perfil'
            : 'Editar modelo';

        modeloId.value = modelo.id;
        modeloNome.value = modelo.nome || '';
        modeloSlug.value = modelo.slug || '';
        modeloIdade.value = modelo.idade || '';
        modeloCidade.value = modelo.cidade || '';
        modeloSigno.value = modelo.signo || '';
        modeloOrdem.value = modelo.ordem ?? 0;
        modeloStatus.value = modelo.status || 'rascunho';
        modeloDestaque.checked = Boolean(modelo.destaque);
        modeloDescricao.value = modelo.descricao || '';

        slugAlteradoManualmente = true;
    } else {
        modeloModalTitle.textContent = 'Nova modelo';

        modeloId.value = '';
        modeloOrdem.value = 0;
        modeloStatus.value = 'rascunho';
        modeloDestaque.checked = false;

        slugAlteradoManualmente = false;
    }

    aplicarPermissoesFormularioModelo();

    modeloModal.hidden = false;
    document.body.classList.add('admin-modal-open');

    window.setTimeout(function () {
        const primeiroCampoDisponivel = [
            modeloNome,
            modeloStatus
        ].find(function (campo) {
            return !campo.disabled;
        });

        primeiroCampoDisponivel?.focus();
    }, 50);
}
    function fecharModeloModal() {
        modeloModal.hidden = true;
        document.body.classList.remove('admin-modal-open');

        modeloForm.reset();
        modeloId.value = '';
        mostrarFeedbackModelo('');
    }

    function traduzirErroModelo(error) {
        const mensagem = String(error?.message || '').toLowerCase();

        if (
            mensagem.includes('duplicate key') ||
            mensagem.includes('modelos_slug_key')
        ) {
            return 'Já existe uma modelo usando este identificador da URL.';
        }

        if (mensagem.includes('modelos_idade_valida_ck')) {
            return 'A idade deve estar entre 18 e 99 anos.';
        }

        if (mensagem.includes('modelos_slug_formato_ck')) {
            return 'O identificador deve conter somente letras minúsculas, números e hífens.';
        }

        if (mensagem.includes('row-level security')) {
            return 'Seu usuário não possui permissão para realizar esta operação.';
        }

        return 'Não foi possível salvar a modelo.';
    }


async function salvarModelo(event) {
    event.preventDefault();

    mostrarFeedbackModelo('');

    const id = modeloId.value.trim();

    if (usuarioAtualEhModelo()) {
        if (!id || !modeloPertenceAoUsuario(id)) {
            mostrarFeedbackModelo(
                'Você não possui acesso a esta modelo.',
                'error'
            );
            return;
        }

        if (
            !podeEditarDadosModelo() &&
            !podePublicarModelo()
        ) {
            mostrarFeedbackModelo(
                'Seu usuário não possui permissão para alterar o perfil.',
                'error'
            );
            return;
        }
    }

    if (!modeloForm.reportValidity()) {
        return;
    }

    const status = modeloStatus.value;
    const modeloExistente = modelosCache.find(function (modelo) {
        return modelo.id === id;
    });

    let payload;

    if (usuarioAtualEhAdministrador()) {
        payload = {
            nome: modeloNome.value.trim(),
            slug: gerarSlug(modeloSlug.value),
            idade: Number(modeloIdade.value),
            cidade: modeloCidade.value.trim() || null,
            signo: modeloSigno.value || null,
            descricao: modeloDescricao.value.trim() || null,
            status,
            ordem: Number(modeloOrdem.value) || 0,
            destaque: modeloDestaque.checked,
            publicado_em:
                status === 'publicada'
                    ? (
                        modeloExistente?.publicado_em ||
                        new Date().toISOString()
                    )
                    : null
        };
    } else {
        payload = {};

        if (podeEditarDadosModelo()) {
            payload.nome = modeloNome.value.trim();
            payload.slug = gerarSlug(modeloSlug.value);
            payload.idade = Number(modeloIdade.value);
            payload.cidade =
                modeloCidade.value.trim() || null;
            payload.signo = modeloSigno.value || null;
            payload.descricao =
                modeloDescricao.value.trim() || null;
        }

        if (podePublicarModelo()) {
            payload.status = status;
            payload.publicado_em =
                status === 'publicada'
                    ? (
                        modeloExistente?.publicado_em ||
                        new Date().toISOString()
                    )
                    : null;
        }
    }

    if (payload.slug) {
        modeloSlug.value = payload.slug;
    }

    definirFormularioModeloCarregando(true);

    try {
        let resultado;

        if (id) {
            resultado = await supabase
                .from('modelos')
                .update(payload)
                .eq('id', id)
                .select('id')
                .single();
        } else {
            resultado = await supabase
                .from('modelos')
                .insert(payload)
                .select('id')
                .single();
        }

        if (resultado.error) {
            throw resultado.error;
        }

        fecharModeloModal();

        mostrarFeedbackListaModelos(
            id
                ? 'Modelo atualizada com sucesso.'
                : 'Modelo cadastrada com sucesso.',
            'success'
        );

        await Promise.all([
            carregarModelos(),
            carregarIndicadores()
        ]);

    } catch (error) {
        console.error('Erro ao salvar modelo:', error);

        mostrarFeedbackModelo(
            traduzirErroModelo(error),
            'error'
        );

    } finally {
        definirFormularioModeloCarregando(false);
    }
}


function formatarDuracaoServico(minutos) {
    const total = Number(minutos) || 0;

    if (total < 60) {
        return `${total} ${total === 1 ? 'minuto' : 'minutos'}`;
    }

    const horas = Math.floor(total / 60);
    const restante = total % 60;
    const textoHoras = `${horas} ${horas === 1 ? 'hora' : 'horas'}`;

    return restante > 0
        ? `${textoHoras} e ${restante} ${restante === 1 ? 'minuto' : 'minutos'}`
        : textoHoras;
}

function formatarPrecoServico(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(valor) || 0);
}

function mostrarFeedbackServico(mensagem, tipo = '') {
    modeloServicoFeedback.textContent = mensagem;
    modeloServicoFeedback.className = 'admin-feedback';

    if (tipo) {
        modeloServicoFeedback.classList.add(tipo);
    }
}

function limparFormularioServico() {
    modeloServicoForm.reset();
    modeloServicoId.value = '';
    modeloServicoOrdem.value = 0;
    modeloServicoAtivo.checked = true;
    modeloServicoFormTitle.textContent = 'Adicionar tempo e preço';
    salvarModeloServicoButton.textContent = 'Adicionar opção';
    cancelarEdicaoServicoButton.hidden = true;
    mostrarFeedbackServico('');
}

function definirFormularioServicoCarregando(carregando) {
    modeloServicoForm
        .querySelectorAll('input, textarea, button')
        .forEach(function (campo) {
            campo.disabled = carregando;
        });

    salvarModeloServicoButton.textContent = carregando
        ? 'Salvando...'
        : (modeloServicoId.value ? 'Salvar alteração' : 'Adicionar opção');
}

function traduzirErroServico(error) {
    const mensagem = String(error?.message || '').toLowerCase();

    if (
        mensagem.includes('modelo_servicos_modelo_duracao_uk') ||
        mensagem.includes('duplicate key')
    ) {
        return 'Já existe uma opção com esse tempo para esta modelo.';
    }

    if (mensagem.includes('modelo_servicos_duracao_positiva_ck')) {
        return 'O tempo deve ser maior que zero.';
    }

    if (mensagem.includes('modelo_servicos_preco_positivo_ck')) {
        return 'O preço não pode ser negativo.';
    }

    if (mensagem.includes('row-level security')) {
        return 'Seu usuário não possui permissão para alterar tempos e preços.';
    }

    return 'Não foi possível salvar o tempo e o preço.';
}

async function carregarServicosModelo(modeloId) {
    if (!modeloPertenceAoUsuario(modeloId)) {
        throw new Error('Acesso negado aos preços desta modelo.');
    }

    modeloServicosList.innerHTML = `
      <p class="muted">Carregando tempos e preços...</p>
    `;

    const { data, error } = await supabase
        .from('modelo_servicos')
        .select(`
          id,
          modelo_id,
          duracao_minutos,
          preco,
          observacao,
          ordem,
          ativo,
          criado_em,
          atualizado_em
        `)
        .eq('modelo_id', modeloId)
        .order('ordem', { ascending: true })
        .order('duracao_minutos', { ascending: true });

    if (error) {
        throw error;
    }

    modeloServicosCache = data || [];

    if (modeloServicosCache.length === 0) {
        modeloServicosList.innerHTML = `
          <div class="admin-empty-state">
            <strong>Nenhum tempo ou preço cadastrado.</strong>
            <p>Use o formulário acima para adicionar a primeira opção.</p>
          </div>
        `;
        return;
    }

    modeloServicosList.innerHTML = `
      <table class="admin-table admin-servicos-table">
        <thead>
          <tr>
            <th>Tempo</th>
            <th>Preço</th>
            <th>Observação</th>
            <th>Status</th>
            <th>Ordem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${modeloServicosCache.map(function (servico) {
              return `
                <tr>
                  <td><strong>${escaparHtml(formatarDuracaoServico(servico.duracao_minutos))}</strong></td>
                  <td class="admin-servico-preco">${escaparHtml(formatarPrecoServico(servico.preco))}</td>
                  <td>${escaparHtml(servico.observacao || '—')}</td>
                  <td>
                    <span class="admin-status ${servico.ativo ? 'admin-status-publicada' : 'admin-status-oculta'}">
                      ${servico.ativo ? 'ativo' : 'oculto'}
                    </span>
                  </td>
                  <td>${escaparHtml(servico.ordem)}</td>
                  <td>
                    <div class="admin-action-group">
                      <button
                        class="admin-action-button"
                        type="button"
                        data-editar-servico-modelo="${servico.id}"
                      >
                        Editar
                      </button>
                      <button
                        class="admin-action-button"
                        type="button"
                        data-alternar-servico-modelo="${servico.id}"
                      >
                        ${servico.ativo ? 'Ocultar' : 'Ativar'}
                      </button>
                      <button
                        class="admin-action-button admin-action-button-danger"
                        type="button"
                        data-excluir-servico-modelo="${servico.id}"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              `;
          }).join('')}
        </tbody>
      </table>
    `;
}

async function abrirModeloServicosModal(modelo) {
    if (!modeloPertenceAoUsuario(modelo.id)) {
        mostrarFeedbackListaModelos(
            'Você não possui acesso a esta modelo.',
            'error'
        );
        return;
    }

    if (!podeEditarServicosPrecos()) {
        mostrarFeedbackListaModelos(
            'Seu usuário não possui permissão para alterar tempos e preços.',
            'error'
        );
        return;
    }

    limparFormularioServico();
    modeloServicosModeloId.value = modelo.id;
    modeloServicosModalTitle.textContent = 'Tempos e preços';
    modeloServicosModalSubtitle.textContent =
        `${modelo.nome} · opções exibidas no perfil público`;

    modeloServicosModal.hidden = false;
    document.body.classList.add('admin-modal-open');

    try {
        await carregarServicosModelo(modelo.id);
        modeloServicoDuracao.focus();
    } catch (error) {
        console.error('Erro ao carregar tempos e preços:', error);
        modeloServicosList.innerHTML = `
          <div class="admin-empty-state">
            <strong>Não foi possível carregar os valores.</strong>
            <p>Verifique a conexão e as permissões deste usuário.</p>
          </div>
        `;
    }
}

function fecharModeloServicosModal() {
    modeloServicosModal.hidden = true;
    document.body.classList.remove('admin-modal-open');
    modeloServicosModeloId.value = '';
    modeloServicosCache = [];
    limparFormularioServico();
    modeloServicosList.innerHTML = `
      <p class="muted">Selecione uma modelo para carregar os valores.</p>
    `;
}

function iniciarEdicaoServico(servicoId) {
    const servico = modeloServicosCache.find(function (item) {
        return item.id === servicoId;
    });

    if (!servico) {
        return;
    }

    modeloServicoId.value = servico.id;
    modeloServicoDuracao.value = servico.duracao_minutos;
    modeloServicoPreco.value = Number(servico.preco).toFixed(2);
    modeloServicoOrdem.value = servico.ordem ?? 0;
    modeloServicoAtivo.checked = Boolean(servico.ativo);
    modeloServicoObservacao.value = servico.observacao || '';
    modeloServicoFormTitle.textContent = 'Editar tempo e preço';
    salvarModeloServicoButton.textContent = 'Salvar alteração';
    cancelarEdicaoServicoButton.hidden = false;
    mostrarFeedbackServico('');
    modeloServicoDuracao.focus();
}

async function salvarServicoModelo(event) {
    event.preventDefault();
    mostrarFeedbackServico('');

    if (!podeEditarServicosPrecos()) {
        mostrarFeedbackServico(
            'Seu usuário não possui permissão para esta operação.',
            'error'
        );
        return;
    }

    if (!modeloServicoForm.reportValidity()) {
        return;
    }

    const modeloId = modeloServicosModeloId.value.trim();
    const servicoId = modeloServicoId.value.trim();

    if (!modeloId || !modeloPertenceAoUsuario(modeloId)) {
        mostrarFeedbackServico('Modelo inválida ou sem acesso.', 'error');
        return;
    }

    const payload = {
        modelo_id: modeloId,
        duracao_minutos: Number(modeloServicoDuracao.value),
        preco: Number(String(modeloServicoPreco.value).replace(',', '.')),
        observacao: modeloServicoObservacao.value.trim() || null,
        ordem: Number(modeloServicoOrdem.value) || 0,
        ativo: modeloServicoAtivo.checked
    };

    definirFormularioServicoCarregando(true);

    try {
        let resultado;

        if (servicoId) {
            resultado = await supabase
                .from('modelo_servicos')
                .update(payload)
                .eq('id', servicoId)
                .eq('modelo_id', modeloId)
                .select('id')
                .single();
        } else {
            resultado = await supabase
                .from('modelo_servicos')
                .insert(payload)
                .select('id')
                .single();
        }

        if (resultado.error) {
            throw resultado.error;
        }

        limparFormularioServico();
        mostrarFeedbackServico(
            servicoId
                ? 'Tempo e preço atualizados com sucesso.'
                : 'Tempo e preço adicionados com sucesso.',
            'success'
        );
        await carregarServicosModelo(modeloId);
    } catch (error) {
        console.error('Erro ao salvar tempo e preço:', error);
        mostrarFeedbackServico(traduzirErroServico(error), 'error');
    } finally {
        definirFormularioServicoCarregando(false);
    }
}

async function alternarServicoModelo(servicoId) {
    const servico = modeloServicosCache.find(function (item) {
        return item.id === servicoId;
    });

    if (!servico) {
        return;
    }

    const modeloId = modeloServicosModeloId.value.trim();
    const { error } = await supabase
        .from('modelo_servicos')
        .update({ ativo: !servico.ativo })
        .eq('id', servico.id)
        .eq('modelo_id', modeloId);

    if (error) {
        throw error;
    }

    mostrarFeedbackServico(
        servico.ativo
            ? 'Opção ocultada do site público.'
            : 'Opção ativada no site público.',
        'success'
    );
    await carregarServicosModelo(modeloId);
}

async function excluirServicoModelo(servicoId) {
    const servico = modeloServicosCache.find(function (item) {
        return item.id === servicoId;
    });

    if (!servico) {
        return;
    }

    const confirmado = window.confirm(
        `Excluir ${formatarDuracaoServico(servico.duracao_minutos)} por ${formatarPrecoServico(servico.preco)}?`
    );

    if (!confirmado) {
        return;
    }

    const modeloId = modeloServicosModeloId.value.trim();
    const { error } = await supabase
        .from('modelo_servicos')
        .delete()
        .eq('id', servico.id)
        .eq('modelo_id', modeloId);

    if (error) {
        throw error;
    }

    limparFormularioServico();
    mostrarFeedbackServico('Opção excluída com sucesso.', 'success');
    await carregarServicosModelo(modeloId);
}

async function executarAcaoServicoModelo(event) {
    const editarButton = event.target.closest('[data-editar-servico-modelo]');
    const alternarButton = event.target.closest('[data-alternar-servico-modelo]');
    const excluirButton = event.target.closest('[data-excluir-servico-modelo]');

    try {
        if (editarButton) {
            iniciarEdicaoServico(editarButton.dataset.editarServicoModelo);
            return;
        }

        if (alternarButton) {
            await alternarServicoModelo(
                alternarButton.dataset.alternarServicoModelo
            );
            return;
        }

        if (excluirButton) {
            await excluirServicoModelo(
                excluirButton.dataset.excluirServicoModelo
            );
        }
    } catch (error) {
        console.error('Erro ao administrar tempo e preço:', error);
        mostrarFeedbackServico(traduzirErroServico(error), 'error');
    }
}

    function configurarFormularioModelos() {
        novaModeloButton.addEventListener(
            'click',
            function () {
                abrirModeloModal();
            }
        );

        fecharModeloModalButton.addEventListener(
            'click',
            fecharModeloModal
        );

        cancelarModeloButton.addEventListener(
            'click',
            fecharModeloModal
        );

        modeloModalOverlay.addEventListener(
            'click',
            fecharModeloModal
        );

        fecharModeloFotosModalButton.addEventListener(
            'click',
            fecharModeloFotosModal
        );

        modeloFotosModalOverlay.addEventListener(
            'click',
            fecharModeloFotosModal
        );

        fecharModeloServicosModalButton.addEventListener(
            'click',
            fecharModeloServicosModal
        );

        modeloServicosModalOverlay.addEventListener(
            'click',
            fecharModeloServicosModal
        );

        modeloServicoForm.addEventListener(
            'submit',
            salvarServicoModelo
        );

        cancelarEdicaoServicoButton.addEventListener(
            'click',
            limparFormularioServico
        );

        modeloServicosList.addEventListener(
            'click',
            executarAcaoServicoModelo
        );

        modeloNome.addEventListener('input', function () {
            if (!slugAlteradoManualmente) {
                modeloSlug.value = gerarSlug(modeloNome.value);
            }
        });

        modeloSlug.addEventListener('input', function () {
            slugAlteradoManualmente = true;
            modeloSlug.value = gerarSlug(modeloSlug.value);
        });

        modeloForm.addEventListener(
            'submit',
            salvarModelo
        );

        modeloFotosUploadForm.addEventListener(
            'submit',
            enviarFotosModelo
        );

        modeloFotosList.addEventListener(
            'click',
            executarAcaoFotoModelo
        );

        publicarTodasFotosModeloButton.addEventListener(
            'click',
            function () {
                alterarStatusTodasFotosModelo('publicada');
            }
        );

        ocultarTodasFotosModeloButton.addEventListener(
            'click',
            function () {
                alterarStatusTodasFotosModelo('oculta');
            }
        );

        modelosList.addEventListener(
            'click',
            async function (event) {
                const editarButton = event.target.closest(
                    '[data-editar-modelo]'
                );

                if (editarButton) {
                    const modelo = modelosCache.find(
                        function (item) {
                            return (
                                item.id ===
                                editarButton.dataset.editarModelo
                            );
                        }
                    );

                    if (modelo) {
                        abrirModeloModal(modelo);
                    }

                    return;
                }

                const servicosButton = event.target.closest(
                    '[data-servicos-modelo]'
                );

                if (servicosButton) {
                    const modelo = modelosCache.find(
                        function (item) {
                            return (
                                item.id ===
                                servicosButton.dataset.servicosModelo
                            );
                        }
                    );

                    if (modelo) {
                        await abrirModeloServicosModal(modelo);
                    }

                    return;
                }

                const fotosButton = event.target.closest(
                    '[data-fotos-modelo]'
                );

                if (fotosButton) {
                    const modelo = modelosCache.find(
                        function (item) {
                            return (
                                item.id ===
                                fotosButton.dataset.fotosModelo
                            );
                        }
                    );

                    if (modelo) {
                        await abrirModeloFotosModal(modelo);
                    }
                }
            }
        );

        document.addEventListener(
            'keydown',
            function (event) {
                if (event.key !== 'Escape') {
                    return;
                }

                if (!modeloServicosModal.hidden) {
                    fecharModeloServicosModal();
                    return;
                }

                if (!modeloFotosModal.hidden) {
                    fecharModeloFotosModal();
                    return;
                }

                if (!modeloModal.hidden) {
                    fecharModeloModal();
                }
            }
        );
    }




function aplicarInterfacePorPerfil() {
    const elementosSomenteAdministrador =
        document.querySelectorAll('[data-admin-only]');

    if (usuarioAtualEhAdministrador()) {
        document.title =
            'Painel Administrativo | Casa dos Prazeres';

        if (adminSidebarEyebrow) {
            adminSidebarEyebrow.textContent = 'Administração';
        }

        if (adminTopbarEyebrow) {
            adminTopbarEyebrow.textContent = 'Painel administrativo';
        }

        if (dashboardSummaryTitle) {
            dashboardSummaryTitle.textContent =
                'Gerenciamento do site';
        }

        if (dashboardSummaryDescription) {
            dashboardSummaryDescription.textContent =
                'Use o menu lateral para cadastrar modelos, organizar fotografias e controlar o conteúdo publicado no site.';
        }

        elementosSomenteAdministrador.forEach(function (elemento) {
            elemento.hidden = false;
        });

        statLabelTotalModelos.textContent = 'Modelos cadastradas';
        statLabelModelosPublicadas.textContent = 'Modelos publicadas';
        statLabelFotosModelos.textContent = 'Fotos das modelos';

        novaModeloButton.hidden = false;
        navModelosButton.textContent = 'Modelos';
        modelosSectionTitle.textContent = 'Modelos cadastradas';
        titulosSecoes.modelos = 'Modelos';
        return;
    }

    elementosSomenteAdministrador.forEach(function (elemento) {
        elemento.hidden = true;
    });

    document.title =
        'Painel da Modelo | Casa dos Prazeres';

    if (adminSidebarEyebrow) {
        adminSidebarEyebrow.textContent = 'Área da modelo';
    }

    if (adminTopbarEyebrow) {
        adminTopbarEyebrow.textContent = 'Painel da modelo';
    }

    if (dashboardSummaryTitle) {
        dashboardSummaryTitle.textContent =
            'Gerenciamento do meu perfil';
    }

    if (dashboardSummaryDescription) {
        dashboardSummaryDescription.textContent =
            'Use o menu lateral para atualizar seu perfil e organizar suas fotos, conforme as permissões concedidas pelo administrador.';
    }

    novaModeloButton.hidden = true;
    navModelosButton.textContent = 'Meu perfil e fotos';
    modelosSectionTitle.textContent = 'Meu perfil';
    titulosSecoes.modelos = 'Meu perfil e fotos';

    const podeVerAvaliacoes =
        perfilAdministrativoAtual.pode_visualizar_avaliacoes === true;

    const podeVerMensagens =
        perfilAdministrativoAtual.pode_visualizar_mensagens === true;

    navAvaliacoesButton.hidden =
        !podeVerAvaliacoes && !podeVerMensagens;

    avaliacoesModeracaoCard.hidden = !podeVerAvaliacoes;
    mensagensModeracaoCard.hidden = !podeVerMensagens;
    avaliacoesPendentesCard.hidden = !podeVerAvaliacoes;
    mensagensPendentesCard.hidden = !podeVerMensagens;

    moderacaoTitulo.textContent =
        'Avaliações e mensagens da minha página';

    moderacaoDescricao.textContent =
        'Consulta restrita ao conteúdo relacionado ao seu perfil. A aprovação continua sob responsabilidade administrativa.';

    if (moderacaoFiltros) {
        const campoModelo =
            moderacaoFiltroModelo?.closest('.admin-form-field');

        if (campoModelo) {
            campoModelo.hidden = true;
        }
    }
}
    function mostrarFeedbackUsuario(mensagem, tipo = '') {
        if (!usuarioModeloFeedback) {
            return;
        }

        usuarioModeloFeedback.textContent = mensagem;
        usuarioModeloFeedback.className = 'admin-feedback';

        if (tipo) {
            usuarioModeloFeedback.classList.add(tipo);
        }
    }

    function popularSelectModelosUsuarios() {
        if (!usuarioModeloId || !usuarioAtualEhAdministrador()) {
            return;
        }

        const valorAtual = usuarioModeloId.value;
        const opcoes = modelosCache
            .map(function (modelo) {
                return `
                  <option value="${escaparHtml(modelo.id)}">
                    ${escaparHtml(modelo.nome)}
                  </option>
                `;
            })
            .join('');

        usuarioModeloId.innerHTML = `
          <option value="">Selecione uma modelo</option>
          ${opcoes}
        `;

        if (modelosCache.some(function (modelo) {
            return modelo.id === valorAtual;
        })) {
            usuarioModeloId.value = valorAtual;
        }
    }

    function obterNomeModeloPorId(modeloId) {
        const modelo = modelosCache.find(function (item) {
            return item.id === modeloId;
        });

        return modelo?.nome || 'Modelo não encontrada';
    }

    function obterPermissoesFormularioUsuario() {
        return {
            editar_perfil: permEditarPerfil.checked,
            editar_servicos_precos:
                permEditarServicosPrecos.checked,
            gerenciar_fotos: permGerenciarFotos.checked,
            excluir_fotos: permExcluirFotos.checked,
            publicar_fotos: permPublicarFotos.checked,
            publicar_perfil: permPublicarPerfil.checked,
            visualizar_avaliacoes:
                permVisualizarAvaliacoes.checked,
            visualizar_mensagens:
                permVisualizarMensagens.checked,
            responder_mensagens:
                permResponderMensagens.checked
        };
    }

    function preencherPermissoesUsuario(perfil) {
        permEditarPerfil.checked =
            perfil.pode_editar_perfil === true;

        permEditarServicosPrecos.checked =
            perfil.pode_editar_servicos_precos === true;

        permGerenciarFotos.checked =
            perfil.pode_gerenciar_fotos === true;

        permExcluirFotos.checked =
            perfil.pode_excluir_fotos === true;

        permPublicarFotos.checked =
            perfil.pode_publicar_fotos === true;

        permPublicarPerfil.checked =
            perfil.pode_publicar_perfil === true;

        permVisualizarAvaliacoes.checked =
            perfil.pode_visualizar_avaliacoes === true;

        permVisualizarMensagens.checked =
            perfil.pode_visualizar_mensagens === true;

        permResponderMensagens.checked =
            perfil.pode_responder_mensagens === true;
    }

    function limparFormularioUsuario() {
        usuarioModeloForm.reset();
        usuarioPerfilId.value = '';
        usuarioEmail.disabled = false;
        usuarioAtivo.checked = true;
        usuarioAtivo.disabled = true;
        usuarioModeloFormTitle.textContent =
            'Criar usuário para uma modelo';
        salvarUsuarioModeloButton.textContent =
            'Criar usuário e enviar convite';
        cancelarEdicaoUsuarioButton.hidden = true;
        mostrarFeedbackUsuario('');
        popularSelectModelosUsuarios();
    }

    function definirFormularioUsuarioCarregando(carregando) {
        const campos = usuarioModeloForm.querySelectorAll(
            'input, select, button'
        );

        campos.forEach(function (campo) {
            campo.disabled = carregando;
        });

        if (!carregando) {
            const emEdicao = Boolean(usuarioPerfilId.value);
            usuarioEmail.disabled = emEdicao;
            usuarioAtivo.disabled = !emEdicao;
        }

        salvarUsuarioModeloButton.textContent = carregando
            ? 'Salvando...'
            : (
                usuarioPerfilId.value
                    ? 'Salvar permissões'
                    : 'Criar usuário e enviar convite'
            );
    }

    function editarUsuarioModelo(perfil) {
        usuarioPerfilId.value = perfil.id;
        usuarioNome.value = perfil.nome || '';
        usuarioEmail.value = perfil.email || '';
        usuarioEmail.disabled = true;
        usuarioAtivo.disabled = false;
        usuarioModeloId.value = perfil.modelo_id || '';
        usuarioAtivo.checked = perfil.ativo === true;
        preencherPermissoesUsuario(perfil);

        usuarioModeloFormTitle.textContent =
            'Editar usuário e permissões';

        salvarUsuarioModeloButton.textContent =
            'Salvar permissões';

        cancelarEdicaoUsuarioButton.hidden = false;
        mostrarFeedbackUsuario('');

        usuarioModeloForm.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    async function carregarUsuariosModelo() {
        if (!usuarioAtualEhAdministrador()) {
            return;
        }

        usuariosModeloList.innerHTML =
            '<p class="muted">Carregando usuários...</p>';

        const { data, error } = await supabase
            .from('perfis_administrativos')
            .select(`
                id,
                nome,
                email,
                papel,
                ativo,
                modelo_id,
                pode_editar_perfil,
                pode_editar_servicos_precos,
                pode_gerenciar_fotos,
                pode_excluir_fotos,
                pode_publicar_fotos,
                pode_publicar_perfil,
                pode_visualizar_avaliacoes,
                pode_visualizar_mensagens,
                pode_responder_mensagens,
                criado_em
            `)
            .eq('papel', 'modelo')
            .order('nome', { ascending: true });

        if (error) {
            throw error;
        }

        usuariosModeloCache = data || [];

        if (usuariosModeloCache.length === 0) {
            usuariosModeloList.innerHTML = `
              <div class="admin-empty-state">
                <strong>Nenhum usuário de modelo cadastrado.</strong>
                <p>
                  Use o formulário acima para criar o primeiro acesso.
                </p>
              </div>
            `;
            return;
        }

        usuariosModeloList.innerHTML = `
          <table class="admin-table">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Modelo</th>
                <th>Status</th>
                <th>Permissões ativas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              ${usuariosModeloCache.map(function (perfil) {
                const quantidadePermissoes = [
                    perfil.pode_editar_perfil,
                    perfil.pode_editar_servicos_precos,
                    perfil.pode_gerenciar_fotos,
                    perfil.pode_excluir_fotos,
                    perfil.pode_publicar_fotos,
                    perfil.pode_publicar_perfil,
                    perfil.pode_visualizar_avaliacoes,
                    perfil.pode_visualizar_mensagens,
                    perfil.pode_responder_mensagens
                ].filter(Boolean).length;

                return `
                  <tr>
                    <td>
                      <strong>${escaparHtml(perfil.nome)}</strong>
                      <small class="admin-table-secondary">
                        ${escaparHtml(perfil.email)}
                      </small>
                    </td>
                    <td>
                      ${escaparHtml(
                          obterNomeModeloPorId(perfil.modelo_id)
                      )}
                    </td>
                    <td>
                      <span class="
                        admin-status
                        ${perfil.ativo
                            ? 'admin-status-publicada'
                            : 'admin-status-oculta'}
                      ">
                        ${perfil.ativo ? 'ativo' : 'bloqueado'}
                      </span>
                    </td>
                    <td>${quantidadePermissoes} de 9</td>
                    <td>
                      <div class="admin-table-actions">
                        <button
                          class="admin-action-button"
                          type="button"
                          data-editar-usuario-modelo="${perfil.id}"
                        >
                          Editar
                        </button>

                        <button
                          class="admin-action-button"
                          type="button"
                          data-redefinir-senha-modelo="${perfil.id}"
                        >
                          Redefinir senha
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `;
    }

    async function enviarRedefinicaoSenhaModelo(perfil, button) {
        if (!perfil?.email) {
            mostrarFeedbackUsuario(
                'O usuário selecionado não possui e-mail válido.',
                'error'
            );
            return;
        }

        const confirmou = window.confirm(
            `Enviar um link de redefinição de senha para ${perfil.email}?`
        );

        if (!confirmou) {
            return;
        }

        const textoOriginal = button?.textContent || 'Redefinir senha';

        if (button) {
            button.disabled = true;
            button.textContent = 'Enviando...';
        }

        mostrarFeedbackUsuario(
            `Enviando redefinição de senha para ${perfil.email}...`
        );

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(
                perfil.email,
                {
                    redirectTo:
                        'https://casadosprazeresvip.com.br/definir-senha.html'
                }
            );

            if (error) {
                throw error;
            }

            mostrarFeedbackUsuario(
                `E-mail de redefinição enviado para ${perfil.email}.`,
                'success'
            );
        } catch (error) {
            console.error(
                'Erro ao enviar redefinição de senha:',
                error
            );

            mostrarFeedbackUsuario(
                error?.message ||
                'Não foi possível enviar o e-mail de redefinição.',
                'error'
            );
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = textoOriginal;
            }
        }
    }

    async function extrairMensagemErroFuncao(error) {
        try {
            if (
                error?.context &&
                typeof error.context.json === 'function'
            ) {
                const corpo = await error.context.json();
                return corpo?.erro || corpo?.message || error.message;
            }
        } catch (erroLeitura) {
            console.error(
                'Não foi possível ler o erro da Edge Function:',
                erroLeitura
            );
        }

        return error?.message || 'Não foi possível concluir a operação.';
    }

    async function salvarUsuarioModelo(event) {
        event.preventDefault();

        if (!usuarioAtualEhAdministrador()) {
            mostrarFeedbackUsuario(
                'Somente administradores podem gerenciar usuários.',
                'error'
            );
            return;
        }

        mostrarFeedbackUsuario('');

        if (!usuarioModeloForm.reportValidity()) {
            return;
        }

        const perfilId = usuarioPerfilId.value.trim();
        const nome = usuarioNome.value.trim();
        const email = usuarioEmail.value.trim().toLowerCase();
        const modeloId = usuarioModeloId.value;
        const permissoes = obterPermissoesFormularioUsuario();

        definirFormularioUsuarioCarregando(true);

        try {
            if (perfilId) {
                const { error } = await supabase
                    .from('perfis_administrativos')
                    .update({
                        nome,
                        modelo_id: modeloId,
                        ativo: usuarioAtivo.checked,
                        pode_editar_perfil:
                            permissoes.editar_perfil,
                        pode_editar_servicos_precos:
                            permissoes.editar_servicos_precos,
                        pode_gerenciar_fotos:
                            permissoes.gerenciar_fotos,
                        pode_excluir_fotos:
                            permissoes.excluir_fotos,
                        pode_publicar_fotos:
                            permissoes.publicar_fotos,
                        pode_publicar_perfil:
                            permissoes.publicar_perfil,
                        pode_visualizar_avaliacoes:
                            permissoes.visualizar_avaliacoes,
                        pode_visualizar_mensagens:
                            permissoes.visualizar_mensagens,
                        pode_responder_mensagens:
                            permissoes.responder_mensagens
                    })
                    .eq('id', perfilId);

                if (error) {
                    throw error;
                }

                mostrarFeedbackUsuario(
                    'Usuário e permissões atualizados com sucesso.',
                    'success'
                );
            } else {
                const { data, error } = await supabase.functions.invoke(
                    'admin-criar-usuario-modelo',
                    {
                        body: {
                            nome,
                            email,
                            modelo_id: modeloId,
                            permissoes
                        }
                    }
                );

                if (error) {
                    throw error;
                }

                if (!data?.sucesso) {
                    throw new Error(
                        data?.erro ||
                        'A Edge Function não confirmou a criação.'
                    );
                }

                mostrarFeedbackUsuario(
                    data.mensagem ||
                    'Usuário criado e convite enviado.',
                    'success'
                );
            }

            await carregarUsuariosModelo();

            window.setTimeout(function () {
                limparFormularioUsuario();
            }, 900);

        } catch (error) {
            console.error(
                'Erro ao salvar usuário da modelo:',
                error
            );

            mostrarFeedbackUsuario(
                await extrairMensagemErroFuncao(error),
                'error'
            );

        } finally {
            definirFormularioUsuarioCarregando(false);
        }
    }

    function configurarUsuariosModelo() {
        if (!usuarioAtualEhAdministrador()) {
            return;
        }

        usuarioModeloForm.addEventListener(
            'submit',
            salvarUsuarioModelo
        );

        cancelarEdicaoUsuarioButton.addEventListener(
            'click',
            limparFormularioUsuario
        );

        recarregarUsuariosButton.addEventListener(
            'click',
            async function () {
                recarregarUsuariosButton.disabled = true;

                try {
                    await carregarUsuariosModelo();
                } finally {
                    recarregarUsuariosButton.disabled = false;
                }
            }
        );

        usuariosModeloList.addEventListener(
            'click',
            async function (event) {
                const editarButton = event.target.closest(
                    '[data-editar-usuario-modelo]'
                );

                if (editarButton) {
                    const perfil = usuariosModeloCache.find(
                        function (item) {
                            return (
                                item.id ===
                                editarButton.dataset.editarUsuarioModelo
                            );
                        }
                    );

                    if (perfil) {
                        editarUsuarioModelo(perfil);
                    }

                    return;
                }

                const redefinirButton = event.target.closest(
                    '[data-redefinir-senha-modelo]'
                );

                if (!redefinirButton) {
                    return;
                }

                const perfil = usuariosModeloCache.find(
                    function (item) {
                        return (
                            item.id ===
                            redefinirButton.dataset.redefinirSenhaModelo
                        );
                    }
                );

                if (perfil) {
                    await enviarRedefinicaoSenhaModelo(
                        perfil,
                        redefinirButton
                    );
                }
            }
        );

        limparFormularioUsuario();
    }

    function mostrarFeedbackModeracao(elemento, mensagem, tipo = '') {
        if (!elemento) {
            return;
        }

        elemento.textContent = mensagem;
        elemento.className = 'admin-feedback';

        if (tipo) {
            elemento.classList.add(tipo);
        }
    }


function popularFiltroModelosModeracao() {
    if (!moderacaoFiltroModelo) {
        return;
    }

    const valorAtual = moderacaoFiltroModelo.value;
    const modelosDisponiveis = usuarioAtualEhModelo()
        ? modelosCache.filter(function (modelo) {
            return (
                modelo.id ===
                perfilAdministrativoAtual.modelo_id
            );
        })
        : modelosCache;

    const opcoes = modelosDisponiveis
        .map(function (modelo) {
            return `
              <option value="${escaparHtml(modelo.id)}">
                ${escaparHtml(modelo.nome)}
              </option>
            `;
        })
        .join('');

    moderacaoFiltroModelo.innerHTML = usuarioAtualEhModelo()
        ? opcoes
        : `
            <option value="">Todas as modelos</option>
            ${opcoes}
          `;

    if (usuarioAtualEhModelo()) {
        moderacaoFiltroModelo.value =
            perfilAdministrativoAtual.modelo_id;
        return;
    }

    if (modelosCache.some(function (modelo) {
        return modelo.id === valorAtual;
    })) {
        moderacaoFiltroModelo.value = valorAtual;
    }
}
    function obterNomeModeloModeracao(modeloId) {
        const modelo = modelosCache.find(function (item) {
            return item.id === modeloId;
        });

        return modelo?.nome || 'Modelo não encontrada';
    }

    function formatarDataModeracao(valor) {
        if (!valor) {
            return '—';
        }

        const data = new Date(valor);

        if (Number.isNaN(data.getTime())) {
            return '—';
        }

        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(data);
    }

    function renderizarEstrelasModeracao(nota) {
        const valor = Math.max(
            0,
            Math.min(5, Math.round(Number(nota) || 0))
        );

        return `${'★'.repeat(valor)}${'☆'.repeat(5 - valor)}`;
    }


function montarBotoesModeracao(tabela, registro) {
    if (!usuarioAtualEhAdministrador()) {
        return `
          <span class="muted">
            Somente leitura
          </span>
        `;
    }

    const botoes = [];

    if (registro.status !== 'aprovada') {
        botoes.push(`
          <button
            class="admin-action-button"
            type="button"
            data-moderacao-tabela="${tabela}"
            data-moderacao-id="${registro.id}"
            data-moderacao-status="aprovada"
          >
            Aprovar
          </button>
        `);
    }

    if (registro.status !== 'rejeitada') {
        botoes.push(`
          <button
            class="admin-action-button"
            type="button"
            data-moderacao-tabela="${tabela}"
            data-moderacao-id="${registro.id}"
            data-moderacao-status="rejeitada"
          >
            Rejeitar
          </button>
        `);
    }

    if (registro.status !== 'oculta') {
        botoes.push(`
          <button
            class="admin-action-button"
            type="button"
            data-moderacao-tabela="${tabela}"
            data-moderacao-id="${registro.id}"
            data-moderacao-status="oculta"
          >
            Ocultar
          </button>
        `);
    }

    botoes.push(`
      <button
        class="admin-action-button admin-action-button-danger"
        type="button"
        data-moderacao-tabela="${tabela}"
        data-moderacao-id="${registro.id}"
        data-moderacao-excluir="true"
      >
        Excluir
      </button>
    `);

    return `
      <div class="admin-action-group">
        ${botoes.join('')}
      </div>
    `;
}
    function renderizarAvaliacoesModeracao() {
        if (!avaliacoesAdminList) {
            return;
        }

        if (avaliacoesModeracaoCache.length === 0) {
            avaliacoesAdminList.innerHTML = `
        <div class="admin-empty-state">
          <strong>Nenhuma avaliação encontrada.</strong>
          <p>Não existem avaliações para os filtros selecionados.</p>
        </div>
      `;

            return;
        }

        avaliacoesAdminList.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Cliente</th>
            <th>Nota</th>
            <th>Enviada em</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${avaliacoesModeracaoCache.map(function (avaliacao) {
            return `
              <tr>
                <td><strong>${escaparHtml(obterNomeModeloModeracao(avaliacao.modelo_id))}</strong></td>
                <td>${escaparHtml(avaliacao.nome_cliente || 'Cliente')}</td>
                <td>
                  <span class="admin-stars" aria-label="${escaparHtml(avaliacao.nota)} de 5 estrelas">
                    ${renderizarEstrelasModeracao(avaliacao.nota)}
                  </span>
                </td>
                <td>${escaparHtml(formatarDataModeracao(avaliacao.criado_em))}</td>
                <td>
                  <span class="admin-status admin-status-${escaparHtml(avaliacao.status)}">
                    ${escaparHtml(avaliacao.status)}
                  </span>
                </td>
                <td>${montarBotoesModeracao('avaliacoes_modelos', avaliacao)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
    }

    function renderizarMensagensModeracao() {
        if (!mensagensAdminList) {
            return;
        }

        if (mensagensModeracaoCache.length === 0) {
            mensagensAdminList.innerHTML = `
        <div class="admin-empty-state">
          <strong>Nenhuma mensagem encontrada.</strong>
          <p>Não existem mensagens para os filtros selecionados.</p>
        </div>
      `;

            return;
        }

        mensagensAdminList.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Cliente</th>
            <th>Mensagem</th>
            <th>Enviada em</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${mensagensModeracaoCache.map(function (mensagem) {
            return `
              <tr>
                <td><strong>${escaparHtml(obterNomeModeloModeracao(mensagem.modelo_id))}</strong></td>
                <td>${escaparHtml(mensagem.nome_cliente || 'Cliente')}</td>
                <td class="admin-moderation-message">${escaparHtml(mensagem.mensagem)}</td>
                <td>${escaparHtml(formatarDataModeracao(mensagem.criado_em))}</td>
                <td>
                  <span class="admin-status admin-status-${escaparHtml(mensagem.status)}">
                    ${escaparHtml(mensagem.status)}
                  </span>
                </td>
                <td>${montarBotoesModeracao('mensagens_modelos', mensagem)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
    }


function aplicarFiltrosModeracao(consulta) {
    let consultaFiltrada = consulta;

    if (usuarioAtualEhModelo()) {
        consultaFiltrada = consultaFiltrada.eq(
            'modelo_id',
            perfilAdministrativoAtual.modelo_id
        );
    } else {
        const modeloId =
            moderacaoFiltroModelo?.value || '';

        if (modeloId) {
            consultaFiltrada = consultaFiltrada.eq(
                'modelo_id',
                modeloId
            );
        }
    }

    const status =
        moderacaoFiltroStatus?.value || '';

    if (status) {
        consultaFiltrada = consultaFiltrada.eq(
            'status',
            status
        );
    }

    return consultaFiltrada;
}

async function carregarModeracao() {
    if (!avaliacoesAdminList || !mensagensAdminList) {
        return;
    }

    const podeVerAvaliacoes =
        usuarioAtualEhAdministrador() ||
        perfilAdministrativoAtual?.pode_visualizar_avaliacoes === true;

    const podeVerMensagens =
        usuarioAtualEhAdministrador() ||
        perfilAdministrativoAtual?.pode_visualizar_mensagens === true;

    if (!podeVerAvaliacoes && !podeVerMensagens) {
        return;
    }

    mostrarFeedbackModeracao(avaliacoesAdminFeedback, '');
    mostrarFeedbackModeracao(mensagensAdminFeedback, '');

    if (podeVerAvaliacoes) {
        avaliacoesAdminList.innerHTML =
            '<p class="muted">Carregando avaliações...</p>';
    }

    if (podeVerMensagens) {
        mensagensAdminList.innerHTML =
            '<p class="muted">Carregando mensagens...</p>';
    }

    if (recarregarModeracaoButton) {
        recarregarModeracaoButton.disabled = true;
        recarregarModeracaoButton.textContent = 'Atualizando...';
    }

    const resultadoVazio = {
        data: [],
        count: 0,
        error: null
    };

    try {
        const consultaAvaliacoes = podeVerAvaliacoes
            ? aplicarFiltrosModeracao(
                supabase
                    .from('avaliacoes_modelos')
                    .select(
                        'id, modelo_id, nome_cliente, nota, status, criado_em'
                    )
                    .order('criado_em', { ascending: false })
                    .limit(200)
            )
            : Promise.resolve(resultadoVazio);

        const consultaMensagens = podeVerMensagens
            ? aplicarFiltrosModeracao(
                supabase
                    .from('mensagens_modelos')
                    .select(
                        'id, modelo_id, nome_cliente, mensagem, status, criado_em'
                    )
                    .order('criado_em', { ascending: false })
                    .limit(200)
            )
            : Promise.resolve(resultadoVazio);

        const consultaAvaliacoesPendentes = podeVerAvaliacoes
            ? aplicarFiltrosModeracao(
                supabase
                    .from('avaliacoes_modelos')
                    .select('id', {
                        count: 'exact',
                        head: true
                    })
                    .eq('status', 'pendente')
            )
            : Promise.resolve(resultadoVazio);

        const consultaMensagensPendentes = podeVerMensagens
            ? aplicarFiltrosModeracao(
                supabase
                    .from('mensagens_modelos')
                    .select('id', {
                        count: 'exact',
                        head: true
                    })
                    .eq('status', 'pendente')
            )
            : Promise.resolve(resultadoVazio);

        const [
            avaliacoesResultado,
            mensagensResultado,
            avaliacoesPendentesResultado,
            mensagensPendentesResultado
        ] = await Promise.all([
            consultaAvaliacoes,
            consultaMensagens,
            consultaAvaliacoesPendentes,
            consultaMensagensPendentes
        ]);

        if (avaliacoesResultado.error) {
            throw avaliacoesResultado.error;
        }

        if (mensagensResultado.error) {
            throw mensagensResultado.error;
        }

        if (avaliacoesPendentesResultado.error) {
            throw avaliacoesPendentesResultado.error;
        }

        if (mensagensPendentesResultado.error) {
            throw mensagensPendentesResultado.error;
        }

        avaliacoesModeracaoCache =
            avaliacoesResultado.data || [];

        mensagensModeracaoCache =
            mensagensResultado.data || [];

        avaliacoesPendentesCount.textContent = String(
            avaliacoesPendentesResultado.count ?? 0
        );

        mensagensPendentesCount.textContent = String(
            mensagensPendentesResultado.count ?? 0
        );

        if (podeVerAvaliacoes) {
            renderizarAvaliacoesModeracao();
        }

        if (podeVerMensagens) {
            renderizarMensagensModeracao();
        }

    } catch (error) {
        console.error(
            'Erro ao carregar avaliações e mensagens:',
            error
        );

        avaliacoesModeracaoCache = [];
        mensagensModeracaoCache = [];

        if (podeVerAvaliacoes) {
            avaliacoesAdminList.innerHTML = `
              <div class="admin-empty-state">
                <strong>
                  Não foi possível carregar as avaliações.
                </strong>
                <p>
                  Verifique as políticas de acesso desta tabela no Supabase.
                </p>
              </div>
            `;

            mostrarFeedbackModeracao(
                avaliacoesAdminFeedback,
                'O acesso às avaliações ainda precisa ser liberado no banco.',
                'error'
            );
        }

        if (podeVerMensagens) {
            mensagensAdminList.innerHTML = `
              <div class="admin-empty-state">
                <strong>
                  Não foi possível carregar as mensagens.
                </strong>
                <p>
                  Verifique as políticas de acesso desta tabela no Supabase.
                </p>
              </div>
            `;

            mostrarFeedbackModeracao(
                mensagensAdminFeedback,
                'O acesso às mensagens ainda precisa ser liberado no banco.',
                'error'
            );
        }

    } finally {
        if (recarregarModeracaoButton) {
            recarregarModeracaoButton.disabled = false;
            recarregarModeracaoButton.textContent = 'Atualizar';
        }
    }
}
    async function executarAcaoModeracao(event) {
        if (!usuarioAtualEhAdministrador()) {
            return;
        }

        const button = event.target.closest(
            '[data-moderacao-tabela][data-moderacao-id]'
        );

        if (!button) {
            return;
        }

        const tabela = button.dataset.moderacaoTabela;
        const id = button.dataset.moderacaoId;
        const excluir =
            button.dataset.moderacaoExcluir === 'true';
        const status = button.dataset.moderacaoStatus;

        if (![
            'avaliacoes_modelos',
            'mensagens_modelos'
        ].includes(tabela)) {
            return;
        }

        const feedback = tabela === 'avaliacoes_modelos'
            ? avaliacoesAdminFeedback
            : mensagensAdminFeedback;

        if (
            excluir &&
            perfilAdministrativoAtual?.papel !== 'administrador'
        ) {
            mostrarFeedbackModeracao(
                feedback,
                'Somente administradores podem excluir definitivamente.',
                'error'
            );

            return;
        }

        if (
            excluir &&
            !window.confirm('Excluir este conteúdo definitivamente?')
        ) {
            return;
        }

        button.disabled = true;
        mostrarFeedbackModeracao(feedback, 'Salvando alteração...');

        try {
            let resultado;

            if (excluir) {
                resultado = await supabase
                    .from(tabela)
                    .delete()
                    .eq('id', id)
                    .select('id')
                    .single();
            } else {
                resultado = await supabase
                    .from(tabela)
                    .update({ status })
                    .eq('id', id)
                    .select('id')
                    .single();
            }

            if (resultado.error) {
                throw resultado.error;
            }

            const mensagemSucesso = excluir
                ? 'Conteúdo excluído definitivamente.'
                : `Status alterado para ${status}.`;

            await carregarModeracao();

            mostrarFeedbackModeracao(
                feedback,
                mensagemSucesso,
                'success'
            );

        } catch (error) {
            console.error(
                'Erro ao moderar conteúdo:',
                error
            );

            mostrarFeedbackModeracao(
                feedback,
                'Não foi possível salvar a alteração.',
                'error'
            );

        } finally {
            button.disabled = false;
        }
    }

    function configurarModeracao() {
        recarregarModeracaoButton?.addEventListener(
            'click',
            carregarModeracao
        );

        moderacaoFiltroModelo?.addEventListener(
            'change',
            carregarModeracao
        );

        moderacaoFiltroStatus?.addEventListener(
            'change',
            carregarModeracao
        );

        avaliacoesAdminList?.addEventListener(
            'click',
            executarAcaoModeracao
        );

        mensagensAdminList?.addEventListener(
            'click',
            executarAcaoModeracao
        );
    }


    function abrirSecao(nomeSecao) {
        navigationButtons.forEach(function (button) {
            const ativa =
                button.dataset.section === nomeSecao;

            button.classList.toggle('active', ativa);
        });

        sections.forEach(function (section) {
            const ativa =
                section.dataset.adminSection === nomeSecao;

            section.hidden = !ativa;
            section.classList.toggle('active', ativa);
        });

        pageTitle.textContent =
            titulosSecoes[nomeSecao] || 'Painel';
    }


function configurarNavegacao() {
    navigationButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (button.disabled || button.hidden) {
                return;
            }

            const nomeSecao = button.dataset.section;
            abrirSecao(nomeSecao);

            if (nomeSecao === 'avaliacoes') {
                carregarModeracao();
            }

            if (
                nomeSecao === 'usuarios' &&
                usuarioAtualEhAdministrador()
            ) {
                carregarUsuariosModelo();
            }
        });
    });
}
    async function sairDoPainel() {
        logoutButton.disabled = true;
        logoutButton.textContent = 'Saindo...';

        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error(
                'Erro ao encerrar sessão:',
                error
            );
        } finally {
            redirecionarParaLogin();
        }
    }

    function configurarLogout() {
        logoutButton.addEventListener(
            'click',
            sairDoPainel
        );
    }


async function inicializarPainel() {
    if (!supabase) {
        mostrarErroCarregamento(
            'A conexão com o Supabase não foi carregada.'
        );
        return;
    }

    try {
        const acesso =
            await validarAcessoAdministrativo();

        if (!acesso) {
            return;
        }

        perfilAdministrativoAtual =
            acesso.perfil;

        userName.textContent =
            acesso.perfil.nome;

        userRole.textContent =
            formatarPapel(acesso.perfil.papel);

        aplicarInterfacePorPerfil();
        configurarNavegacao();
        configurarLogout();
        configurarFormularioModelos();
        configurarModeracao();
        configurarUsuariosModelo();

        await carregarModelos();

        const carregamentos = [
            carregarIndicadores()
        ];

        if (usuarioAtualEhAdministrador()) {
            carregamentos.push(
                carregarFotosCasa()
            );
        }

        await Promise.all(carregamentos);

        if (usuarioAtualEhAdministrador()) {
            await carregarUsuariosModelo();
        }

        const podeVerModeracao =
            usuarioAtualEhAdministrador() ||
            acesso.perfil.pode_visualizar_avaliacoes === true ||
            acesso.perfil.pode_visualizar_mensagens === true;

        if (podeVerModeracao) {
            await carregarModeracao();
        }

        mostrarPainel();

    } catch (error) {
        console.error(
            'Erro ao inicializar painel:',
            error
        );

        mostrarErroCarregamento(
            error?.message ||
            'Ocorreu um erro ao consultar os dados do painel.'
        );
    }
}

    supabase.auth.onAuthStateChange(
        function (evento, sessao) {
            if (
                evento === 'SIGNED_OUT' ||
                !sessao
            ) {
                redirecionarParaLogin();
            }
        }
    );

    inicializarPainel();
})();