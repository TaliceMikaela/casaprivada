# Casa dos Prazeres

## Galeria pública do ambiente

Esta versão foi ajustada para trabalhar melhor com repositório Git e publicação estática.

### Como adicionar fotos da seção "Conheça a casa"

1. Coloque as imagens em `static/img/casa/`
2. Edite `static/js/house-gallery-data.js`
3. Cadastre cada foto neste formato:

```js
window.HOUSE_GALLERY_ITEMS = [
  {
    src: 'static/img/casa/lounge-principal.webp',
    title: 'Lounge principal',
    description: 'Entrada, iluminação e clima do ambiente.',
    alt: 'Lounge principal da Casa dos Prazeres'
  }
];
```

### Recomendação prática

- Use imagens já otimizadas para web.
- Preferência: `.webp` ou `.jpg`
- Largura sugerida: entre 1200px e 1800px
- Evite subir originais pesados da câmera para o repositório público.

### Proteção aplicada

- bloqueio de clique direito na área da galeria
- bloqueio de arrastar imagem
- bloqueio de atalhos comuns de salvar/copiar/imprimir
- camada visual de proteção ao perder foco
- marca d'água visual sobre as imagens

Observação honesta: proteção em site público nunca é 100%. Ela dificulta, mas não torna impossível capturar imagem.


## Correção para publicação no Git
Nesta versão:
- as imagens da galeria da casa foram convertidas de .jfif para .jpg
- house-gallery-data.js foi ajustado para apontar para .jpg
- arquivo .nojekyll incluído

Isso reduz bastante o risco de falha de renderização em hospedagem estática.
