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

    let modelosCache = [];
    let avaliacoesModeracaoCache = [];
    let mensagensModeracaoCache = [];
    let perfilAdministrativoAtual = null;
    let slugAlteradoManualmente = false;


    const titulosSecoes = {
        dashboard: 'Visão geral',
        modelos: 'Modelos',
        casa: 'Galeria da casa',
        avaliacoes: 'Avaliações e mensagens'
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
            editor: 'Editor'
        };

        return papeis[papel] || papel;
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
            .select('id, nome, email, papel, ativo')
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
            !['administrador', 'editor'].includes(perfil.papel)
        ) {
            await supabase.auth.signOut();
            redirecionarParaLogin();
            return null;
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
    }

    async function carregarModelos() {
        const { data, error } = await supabase
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

        if (error) {
            throw error;
        }

        modelosCache = data || [];
        popularFiltroModelosModeracao();

        if (modelosCache.length === 0) {
            modelosList.innerHTML = `
      <div class="admin-empty-state">
        <strong>Nenhuma modelo cadastrada.</strong>
        <p>
          Clique em “Nova modelo” para realizar
          o primeiro cadastro.
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
          <th>Ordem</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        ${modelosCache.map(function (modelo) {
            return `
            <tr>
              <td>
                <strong>
                  ${escaparHtml(modelo.nome)}
                </strong>
              </td>

              <td>
                ${escaparHtml(modelo.idade)}
              </td>

              <td>
                ${escaparHtml(modelo.cidade || '—')}
              </td>

              <td>
                <span class="
                  admin-status
                  admin-status-${escaparHtml(modelo.status)}
                ">
                  ${escaparHtml(modelo.status)}
                </span>
              </td>

              <td>
                ${escaparHtml(modelo.ordem)}
              </td>

              <td>
  <div class="admin-action-group">

    <button
      class="admin-action-button"
      type="button"
      data-fotos-modelo="${modelo.id}"
    >
      Fotos
    </button>

    <button
      class="admin-action-button"
      type="button"
      data-editar-modelo="${modelo.id}"
    >
      Editar
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
        const modelo = modelosCache.find(function (item) {
            return item.id === modeloId;
        });

        return modelo?.status === 'publicada'
            ? 'publicada'
            : 'rascunho';
    }

    function atualizarBotoesLoteFotos() {
        const desabilitado = modeloFotosCache.length === 0;

        publicarTodasFotosModeloButton.disabled = desabilitado;
        ocultarTodasFotosModeloButton.disabled = desabilitado;
    }

    async function carregarFotosModelo(modeloId) {
        modeloFotosList.innerHTML = `
    <p class="muted">
      Carregando fotos...
    </p>
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
          Use o formulário acima para enviar
          as primeiras imagens desta modelo.
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

            <div class="admin-modelo-foto-actions">

              <button
                class="admin-action-button"
                type="button"
                data-status-foto-modelo="${foto.id}"
                data-proximo-status="${foto.status === 'publicada' ? 'oculta' : 'publicada'}"
              >
                ${foto.status === 'publicada' ? 'Ocultar' : 'Publicar'}
              </button>

              <button
                class="admin-action-button"
                type="button"
                data-capa-foto-modelo="${foto.id}"
                ${foto.capa ? 'disabled' : ''}
              >
                ${foto.capa ? 'Foto de capa' : 'Definir capa'}
              </button>

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

            </div>

          </div>

        </article>
      `;
            })
            .join('');
    }

    async function abrirModeloFotosModal(modelo) {
        modeloFotosUploadForm.reset();

        modeloFotosModeloId.value = modelo.id;

        modeloFotosModalTitle.textContent =
            'Fotos da modelo';

        modeloFotosModalSubtitle.textContent =
            `${modelo.nome} · ${modelo.idade} anos`;

        modeloFotosStatus.value =
            obterStatusInicialFotos(modelo.id);
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
        <strong>
          Não foi possível carregar as fotos.
        </strong>

        <p>
          Verifique a conexão com o Supabase
          e tente novamente.
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
        modeloFotosArquivos.disabled = carregando;
        modeloFotosStatus.disabled = carregando;
        modeloFotosOrdemInicial.disabled = carregando;
        enviarModeloFotosButton.disabled = carregando;

        enviarModeloFotosButton.textContent = carregando
            ? 'Enviando...'
            : 'Enviar fotos';
    }

    async function enviarFotosModelo(event) {
        event.preventDefault();

        const modeloIdAtual =
            modeloFotosModeloId.value.trim();

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

        const ordemInicial =
            Math.max(
                0,
                Number(modeloFotosOrdemInicial.value) || 0
            );

        const statusInicial =
            modeloFotosStatus.value || 'rascunho';

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

                const nomeStorage =
                    gerarNomeUnicoArquivo(arquivo);

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

        if (foto.capa && restantes.length > 0) {
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
    }

    function abrirModeloModal(modelo = null) {
        modeloForm.reset();
        mostrarFeedbackModelo('');

        if (modelo) {
            modeloModalTitle.textContent = 'Editar modelo';

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

        modeloModal.hidden = false;
        document.body.classList.add('admin-modal-open');

        window.setTimeout(function () {
            modeloNome.focus();
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

        if (!modeloForm.reportValidity()) {
            return;
        }

        const id = modeloId.value.trim();
        const status = modeloStatus.value;

        const modeloExistente = modelosCache.find(function (modelo) {
            return modelo.id === id;
        });

        const payload = {
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

        modeloSlug.value = payload.slug;

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
        const opcoes = modelosCache
            .map(function (modelo) {
                return `
          <option value="${escaparHtml(modelo.id)}">
            ${escaparHtml(modelo.nome)}
          </option>
        `;
            })
            .join('');

        moderacaoFiltroModelo.innerHTML = `
      <option value="">Todas as modelos</option>
      ${opcoes}
    `;

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

        if (perfilAdministrativoAtual?.papel === 'administrador') {
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
        }

        return `<div class="admin-action-group">${botoes.join('')}</div>`;
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
        const modeloId = moderacaoFiltroModelo?.value || '';
        const status = moderacaoFiltroStatus?.value || '';
        let consultaFiltrada = consulta;

        if (modeloId) {
            consultaFiltrada = consultaFiltrada.eq(
                'modelo_id',
                modeloId
            );
        }

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

        mostrarFeedbackModeracao(avaliacoesAdminFeedback, '');
        mostrarFeedbackModeracao(mensagensAdminFeedback, '');

        avaliacoesAdminList.innerHTML = '<p class="muted">Carregando avaliações...</p>';
        mensagensAdminList.innerHTML = '<p class="muted">Carregando mensagens...</p>';

        if (recarregarModeracaoButton) {
            recarregarModeracaoButton.disabled = true;
            recarregarModeracaoButton.textContent = 'Atualizando...';
        }

        try {
            const consultaAvaliacoes = aplicarFiltrosModeracao(
                supabase
                    .from('avaliacoes_modelos')
                    .select('id, modelo_id, nome_cliente, nota, status, criado_em')
                    .order('criado_em', { ascending: false })
                    .limit(200)
            );

            const consultaMensagens = aplicarFiltrosModeracao(
                supabase
                    .from('mensagens_modelos')
                    .select('id, modelo_id, nome_cliente, mensagem, status, criado_em')
                    .order('criado_em', { ascending: false })
                    .limit(200)
            );

            const [
                avaliacoesResultado,
                mensagensResultado,
                avaliacoesPendentesResultado,
                mensagensPendentesResultado
            ] = await Promise.all([
                consultaAvaliacoes,
                consultaMensagens,
                supabase
                    .from('avaliacoes_modelos')
                    .select('id', { count: 'exact', head: true })
                    .eq('status', 'pendente'),
                supabase
                    .from('mensagens_modelos')
                    .select('id', { count: 'exact', head: true })
                    .eq('status', 'pendente')
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

            renderizarAvaliacoesModeracao();
            renderizarMensagensModeracao();

        } catch (error) {
            console.error(
                'Erro ao carregar moderação:',
                error
            );

            avaliacoesModeracaoCache = [];
            mensagensModeracaoCache = [];

            avaliacoesAdminList.innerHTML = `
        <div class="admin-empty-state">
          <strong>Não foi possível carregar as avaliações.</strong>
          <p>Confirme se o SQL de avaliações e mensagens foi executado no Supabase.</p>
        </div>
      `;

            mensagensAdminList.innerHTML = `
        <div class="admin-empty-state">
          <strong>Não foi possível carregar as mensagens.</strong>
          <p>Confirme se o SQL de avaliações e mensagens foi executado no Supabase.</p>
        </div>
      `;

            mostrarFeedbackModeracao(
                avaliacoesAdminFeedback,
                'A estrutura de moderação ainda não está disponível.',
                'error'
            );

        } finally {
            if (recarregarModeracaoButton) {
                recarregarModeracaoButton.disabled = false;
                recarregarModeracaoButton.textContent = 'Atualizar';
            }
        }
    }

    async function executarAcaoModeracao(event) {
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
                if (button.disabled) {
                    return;
                }

                const nomeSecao = button.dataset.section;
                abrirSecao(nomeSecao);

                if (nomeSecao === 'avaliacoes') {
                    carregarModeracao();
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

            configurarNavegacao();
            configurarLogout();
            configurarFormularioModelos();
            configurarModeracao();

            await Promise.all([
                carregarIndicadores(),
                carregarModelos(),
                carregarFotosCasa()
            ]);

            await carregarModeracao();

            mostrarPainel();

        } catch (error) {
            console.error(
                'Erro ao inicializar painel:',
                error
            );

            mostrarErroCarregamento(
                'Ocorreu um erro ao consultar os dados administrativos.'
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