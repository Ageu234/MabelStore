/**
 * ==============================================================================
 * MABEL STORE - VANILLA JAVASCRIPT
 * ==============================================================================
 * Este ficheiro foi estruturado de forma didática e modular para apoiar
 * o estudo de JavaScript frontend.
 *
 * Conceitos abordados:
 * 1. Estruturas de dados (Arrays de Objetos).
 * 2. Manipulação do DOM (querySelector, createElement, textContent, classList).
 * 3. Gestão de eventos e delegação (addEventListener).
 * 4. Métodos funcionais de Arrays (filter, map, find, reduce, some, sort).
 * 5. Persistência de dados local (localStorage com tratamento de erros).
 * 6. Validação de formulários e expressões regulares (RegExp).
 * 7. Programação orientada a estado simples (State Management).
 * ==============================================================================
 */

// Utilizar o modo estrito para prevenir erros comuns e variáveis acidentais
'use strict';

/* ==============================================================================
   1. BASE DE DADOS DOS PRODUTOS (ARRAY DE OBJETOS)
   ==============================================================================
   Cada produto é modelado como um objeto JavaScript contendo propriedades
   como id, nome, preço numérico, categorias, tamanhos e caminhos de imagens.
   ============================================================================== */
const PRODUTOS = [
  {
    id: 1,
    nome: "Camisa de Seda Pura Areia",
    preco: 89.00,
    categoria: "Camisas",
    genero: "Mulher",
    badge: "Novo",
    imagem: "images/prod-camisa-seda.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80",
    descricao: "Confeccionada em seda amoreira 100% natural, com acabamento acetinado subtil e corte fluido que valoriza qualquer silhueta.",
    tamanhos: ["XS", "S", "M", "L"]
  },
  {
    id: 2,
    nome: "Sobretudo Longo em Lã Camel",
    preco: 149.00,
    categoria: "Casacos",
    genero: "Mulher",
    badge: "Mais vendido",
    imagem: "images/cat-novidades.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    descricao: "Peça estruturada clássica em mistura de lã e caxemira, forro em cetim e cinto amovível para ajuste à medida.",
    tamanhos: ["S", "M", "L"]
  },
  {
    id: 3,
    nome: "Vestido Midi Acetinado Champagne",
    preco: 95.00,
    categoria: "Vestidos",
    genero: "Mulher",
    badge: "Mais vendido",
    imagem: "images/prod-vestido-midi.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    descricao: "Corte em viés que proporciona caimento impecável. Alças finas ajustáveis e decote drapeado delicado.",
    tamanhos: ["XS", "S", "M", "L"]
  },
  {
    id: 4,
    nome: "Calça Alfaiataria Fluida Marfim",
    preco: 79.00,
    categoria: "Calças",
    genero: "Mulher",
    badge: null,
    imagem: "images/cat-mulher.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    descricao: "Cintura subida com pregas frontais bem definidas. Tecido de alta gramatura com toque macio e caimento reto.",
    tamanhos: ["34", "36", "38", "40"]
  },
  {
    id: 5,
    nome: "Blazer Estruturado em Lã Taupe",
    preco: 139.00,
    categoria: "Casacos",
    genero: "Homem",
    badge: "Novo",
    imagem: "images/prod-blazer-wool.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    descricao: "Alfaiataria moderna com lapela pontiaguda e botões em madrepérola escura. Ideal para ocasiões formais ou estilo casual chic.",
    tamanhos: ["48", "50", "52"]
  },
  {
    id: 6,
    nome: "Camisa Relaxed em Linho Natural",
    preco: 69.00,
    categoria: "Camisas",
    genero: "Homem",
    badge: "Mais vendido",
    imagem: "images/cat-homem.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    descricao: "Linho puro europeu lavado para máxima suavidade. Gola francesa descontraída e bolso frontal discreto.",
    tamanhos: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    nome: "Vestido Chemise em Linho Cru",
    preco: 85.00,
    categoria: "Vestidos",
    genero: "Mulher",
    badge: "Novo",
    imagem: "images/cat-bestsellers.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    descricao: "Elegância orgânica com abotoamento frontal completo, gola mandarim e bolsos embutidos nas costuras laterais.",
    tamanhos: ["S", "M", "L"]
  },
  {
    id: 8,
    nome: "T-Shirt Algodão Pima Off-White",
    preco: 39.00,
    categoria: "T-shirts",
    genero: "Mulher",
    badge: null,
    imagem: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    fallbackImagem: "images/cat-mulher.jpg",
    descricao: "Fibra de algodão Pima peruano de fibra extralonga, incrivelmente suave, respirável e resistente a lavagens.",
    tamanhos: ["XS", "S", "M", "L"]
  },
  {
    id: 9,
    nome: "T-Shirt Heavyweight Areia Quente",
    preco: 42.00,
    categoria: "T-shirts",
    genero: "Homem",
    badge: null,
    imagem: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    fallbackImagem: "images/cat-homem.jpg",
    descricao: "Gramatura encorpada de 240g/m² com corte boxy contemporâneo e ribana reforçada na gola redonda.",
    tamanhos: ["S", "M", "L", "XL"]
  },
  {
    id: 10,
    nome: "Calça Chino Alfaiataria Oliva",
    preco: 75.00,
    categoria: "Calças",
    genero: "Homem",
    badge: null,
    imagem: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    fallbackImagem: "images/cat-homem.jpg",
    descricao: "Sarga de algodão orgânico com 2% de elastano para conforto diário. Acabamento interno em viés contrastante.",
    tamanhos: ["38", "40", "42", "44"]
  },
  {
    id: 11,
    nome: "Conjunto Linho Minimalista Bege",
    preco: 119.00,
    categoria: "Conjuntos",
    genero: "Mulher",
    badge: "Novo",
    imagem: "images/hero.jpg",
    fallbackImagem: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    descricao: "Duo composto por colete ajustado e calça de perna larga em tom cru natural, perfeito para dias soalheiros.",
    tamanhos: ["S", "M", "L"]
  },
  {
    id: 12,
    nome: "Conjunto Lounge Monocromático",
    preco: 109.00,
    categoria: "Conjuntos",
    genero: "Homem",
    badge: "Mais vendido",
    imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    fallbackImagem: "images/cat-homem.jpg",
    descricao: "Camisa overshirt com calções tipo alfaiataria em tecido modal texturizado com toque suave de caxemira.",
    tamanhos: ["S", "M", "L", "XL"]
  }
];

/* ==============================================================================
   2. ESTADO DA APLICAÇÃO (STATE MANAGEMENT)
   ==============================================================================
   Mantemos o estado da aplicação em objetos e arrays simples:
   - cart: lista de itens adicionados ao carrinho (com chave única id + tamanho)
   - favorites: array com os IDs dos produtos favoritados
   - filters: parâmetros ativos de pesquisa, categoria, género e ordenação
   ============================================================================== */
const appState = {
  cart: [],
  favorites: [],
  filters: {
    searchQuery: '',
    category: 'Todos',
    gender: 'Todos',
    sortBy: 'default' // 'price-asc', 'price-desc', 'name-asc', 'newest'
  },
  selectedSizes: {} // Armazena temporariamente o tamanho selecionado em cada cartão { [productId]: size }
};

/* ==============================================================================
   3. CONSTANTES E CONFIGURAÇÃO
   ============================================================================== */
const CONFIG = {
  STORAGE_CART_KEY: 'mabel_store_cart_v1',
  STORAGE_FAV_KEY: 'mabel_store_fav_v1',
  FREE_SHIPPING_THRESHOLD: 100.00, // Limiar de 100€ para portes grátis
  SHIPPING_FEE: 4.90               // Custo padrão de envio
};

/* ==============================================================================
   4. ELEMENTOS DO DOM (CACHE DE SELETORES)
   ============================================================================== */
const DOM = {
  // Catálogo
  productsGrid: document.getElementById('products-grid'),
  resultsCount: document.getElementById('results-count'),
  activeFiltersBox: document.getElementById('active-filters-chips'),
  
  // Controles de Pesquisa e Filtros
  searchInput: document.getElementById('search-input'),
  searchClearBtn: document.getElementById('search-clear-btn'),
  categoryPills: document.querySelectorAll('.filter-pill'),
  genderBtns: document.querySelectorAll('.gender-btn'),
  sortSelect: document.getElementById('sort-select'),
  
  // Contadores no Cabeçalho
  cartCountBadge: document.getElementById('cart-count-badge'),
  favCountBadge: document.getElementById('fav-count-badge'),
  
  // Painel Lateral (Drawer) do Carrinho
  cartDrawer: document.getElementById('cart-drawer'),
  drawerBackdrop: document.getElementById('drawer-backdrop'),
  cartItemsList: document.getElementById('cart-items-list'),
  cartSubtotalText: document.getElementById('cart-subtotal'),
  cartShippingText: document.getElementById('cart-shipping'),
  cartTotalText: document.getElementById('cart-total'),
  shippingProgressText: document.getElementById('shipping-progress-text'),
  shippingBarFill: document.getElementById('shipping-bar-fill'),
  cartCheckoutBtn: document.getElementById('cart-checkout-btn'),
  openCartBtn: document.getElementById('open-cart-btn'),
  closeCartBtn: document.getElementById('close-cart-btn'),
  
  // Modal de Favoritos
  favModal: document.getElementById('fav-modal'),
  favItemsList: document.getElementById('fav-items-list'),
  openFavBtn: document.getElementById('open-fav-btn'),
  closeFavBtn: document.getElementById('close-fav-btn'),
  
  // Quick View Modal
  quickviewModal: document.getElementById('quickview-modal'),
  quickviewContent: document.getElementById('quickview-content'),
  closeQuickviewBtn: document.getElementById('close-quickview-btn'),
  
  // Modal de Checkout e Confirmação
  checkoutModal: document.getElementById('checkout-modal'),
  closeCheckoutBtn: document.getElementById('close-checkout-btn'),
  checkoutForm: document.getElementById('checkout-form'),
  checkoutSummaryItems: document.getElementById('checkout-summary-items'),
  checkoutTotalDisplay: document.getElementById('checkout-total-display'),
  
  confirmationModal: document.getElementById('confirmation-modal'),
  closeConfirmationBtn: document.getElementById('close-confirmation-btn'),
  orderNumberDisplay: document.getElementById('order-number-display'),
  orderCustomerDisplay: document.getElementById('order-customer-display'),
  orderSummaryDisplay: document.getElementById('order-summary-display'),
  continueShoppingBtn: document.getElementById('continue-shopping-btn'),
  
  // Menu Mobile
  mobileNavToggle: document.getElementById('mobile-nav-toggle'),
  mobileNavDrawer: document.getElementById('mobile-nav-drawer'),
  
  // Toast
  toastContainer: document.getElementById('toast-container')
};

/* ==============================================================================
   5. GESTÃO DE ARMAZENAMENTO LOCAL (LOCALSTORAGE COM TRATAMENTO DE ERROS)
   ==============================================================================
   O localStorage apenas guarda strings. Usamos JSON.stringify para gravar
   e JSON.parse para ler, protegendo com blocos try...catch para evitar
   quebras de script caso os dados do browser estejam corrompidos.
   ============================================================================== */
function carregarDadosArmazenados() {
  // Carregar carrinho
  try {
    const rawCart = localStorage.getItem(CONFIG.STORAGE_CART_KEY);
    if (rawCart) {
      const parsedCart = JSON.parse(rawCart);
      if (Array.isArray(parsedCart)) {
        appState.cart = parsedCart.filter(item => 
          item && typeof item.productId === 'number' && typeof item.quantity === 'number' && item.quantity > 0
        );
      }
    }
  } catch (error) {
    console.warn('Erro ao carregar carrinho do localStorage:', error);
    appState.cart = [];
  }

  // Carregar favoritos
  try {
    const rawFavs = localStorage.getItem(CONFIG.STORAGE_FAV_KEY);
    if (rawFavs) {
      const parsedFavs = JSON.parse(rawFavs);
      if (Array.isArray(parsedFavs)) {
        appState.favorites = parsedFavs.filter(id => typeof id === 'number');
      }
    }
  } catch (error) {
    console.warn('Erro ao carregar favoritos do localStorage:', error);
    appState.favorites = [];
  }
}

function salvarCarrinho() {
  try {
    localStorage.setItem(CONFIG.STORAGE_CART_KEY, JSON.stringify(appState.cart));
  } catch (error) {
    console.error('Erro ao guardar carrinho no localStorage:', error);
  }
}

function salvarFavoritos() {
  try {
    localStorage.setItem(CONFIG.STORAGE_FAV_KEY, JSON.stringify(appState.favorites));
  } catch (error) {
    console.error('Erro ao guardar favoritos no localStorage:', error);
  }
}

/* ==============================================================================
   6. RENDERIZAÇÃO E FORMATAÇÃO (UI HELPERS)
   ============================================================================== */
// Formata números decimais no padrão monetário europeu (ex: 89,00 €)
function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(valor);
}

// Sanitização segura de texto para evitar vulnerabilidades de injeção HTML
function sanitizarTexto(texto) {
  if (texto === undefined || texto === null) return '';
  const div = document.createElement('div');
  div.textContent = String(texto);
  return div.innerHTML;
}

// Sistema de Notificações Toast Suaves
function mostrarToast(mensagem, tipo = 'info') {
  if (!DOM.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `;

  toast.innerHTML = `${iconSvg} <span>${sanitizarTexto(mensagem)}</span>`;
  DOM.toastContainer.appendChild(toast);

  // Animar entrada
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remover após 3.2 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    }, { once: true });
  }, 3200);
}

/* ==============================================================================
   7. FILTRAGEM, PESQUISA E ORDENAÇÃO DO CATÁLOGO
   ==============================================================================
   Utilizamos métodos funcionais imutáveis:
   - filter(): cria um novo array filtrado sem alterar o original
   - toLowerCase(): comparação de strings insensível a maiúsculas/minúsculas
   - includes(): pesquisa de termos dentro do nome ou descrição
   - sort(): ordenação customizada numérica e alfabética
   ============================================================================== */
function obterProdutosFiltrados() {
  const { searchQuery, category, gender, sortBy } = appState.filters;

  // 1. Filtrar
  let filtrados = PRODUTOS.filter(produto => {
    // Filtro por Texto de Pesquisa
    const query = searchQuery.trim().toLowerCase();
    const correspondePesquisa = !query || 
      produto.nome.toLowerCase().includes(query) ||
      produto.categoria.toLowerCase().includes(query) ||
      produto.descricao.toLowerCase().includes(query);

    // Filtro por Categoria
    let correspondeCategoria = true;
    if (category === 'Novidades') {
      correspondeCategoria = produto.badge === 'Novo';
    } else if (category === 'Mais vendidos') {
      correspondeCategoria = produto.badge === 'Mais vendido';
    } else if (category !== 'Todos') {
      correspondeCategoria = produto.categoria === category;
    }

    // Filtro por Género
    const correspondeGenero = gender === 'Todos' || produto.genero === gender;

    return correspondePesquisa && correspondeCategoria && correspondeGenero;
  });

  // 2. Ordenar (criamos uma cópia com o spread operator [...] para não mutar o array)
  filtrados = [...filtrados].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.preco - b.preco; // Menor para Maior
      case 'price-desc':
        return b.preco - a.preco; // Maior para Menor
      case 'name-asc':
        return a.nome.localeCompare(b.nome, 'pt'); // Ordem Alfabética
      case 'newest':
        return (b.badge === 'Novo' ? 1 : 0) - (a.badge === 'Novo' ? 1 : 0);
      default:
        return a.id - b.id; // Ordenação padrão
    }
  });

  return filtrados;
}

/* ==============================================================================
   8. RENDERIZAÇÃO DOS PRODUTOS NO DOM
   ============================================================================== */
function renderizarProdutos() {
  if (!DOM.productsGrid) return;

  const produtosExibir = obterProdutosFiltrados();

  // Atualizar contador de resultados
  if (DOM.resultsCount) {
    const qtd = produtosExibir.length;
    DOM.resultsCount.textContent = `A apresentar ${qtd} ${qtd === 1 ? 'peça' : 'peças'}`;
  }

  // Atualizar chips visuais de filtros ativos
  renderizarChipsFiltros();

  // Limpar grelha antes de renderizar
  DOM.productsGrid.innerHTML = '';

  // Caso nenhum produto seja encontrado (Estado Vazio Elegante)
  if (produtosExibir.length === 0) {
    DOM.productsGrid.innerHTML = `
      <div class="empty-catalog-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <h3>Nenhuma peça encontrada</h3>
        <p>Não encontramos produtos com os critérios selecionados. Tenta pesquisar outro termo ou limpa os filtros ativos.</p>
        <button class="btn-primary" onclick="limparTodosOsFiltros()">Limpar todos os filtros</button>
      </div>
    `;
    return;
  }

  // Criar fragmento de documento para melhor desempenho na renderização
  const fragment = document.createDocumentFragment();

  produtosExibir.forEach(produto => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id', produto.id);

    const isFav = appState.favorites.includes(produto.id);
    const selectedSize = appState.selectedSizes[produto.id] || produto.tamanhos[0];
    // Garantir que o tamanho pré-selecionado existe no estado
    if (!appState.selectedSizes[produto.id]) {
      appState.selectedSizes[produto.id] = selectedSize;
    }

    // Badge HTML opcional
    let badgeHtml = '';
    if (produto.badge) {
      const badgeClass = produto.badge === 'Novo' ? 'novo' : 'bestseller';
      badgeHtml = `<span class="product-badge ${badgeClass}">${sanitizarTexto(produto.badge)}</span>`;
    }

    // Botões de Tamanho
    const sizesHtml = produto.tamanhos.map(tam => `
      <button 
        type="button" 
        class="size-btn ${tam === selectedSize ? 'selected' : ''}" 
        data-size="${tam}"
        data-prod-id="${produto.id}"
        aria-label="Selecionar tamanho ${tam}"
      >
        ${tam}
      </button>
    `).join('');

    card.innerHTML = `
      <div class="card-media">
        ${badgeHtml}
        <button 
          type="button" 
          class="fav-btn ${isFav ? 'active' : ''}" 
          data-fav-id="${produto.id}" 
          aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <img 
          src="${produto.imagem}" 
          alt="${sanitizarTexto(produto.nome)}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${produto.fallbackImagem}'"
        />
        <button type="button" class="quickview-btn" data-qv-id="${produto.id}">
          Ver Detalhes
        </button>
      </div>

      <div class="card-content">
        <span class="card-category">${sanitizarTexto(produto.categoria)} · ${sanitizarTexto(produto.genero)}</span>
        <h3 class="card-title">${sanitizarTexto(produto.nome)}</h3>
        <p class="card-price">${formatarPreco(produto.preco)}</p>

        <span class="size-selector-label">Tamanho:</span>
        <div class="size-selector" role="group" aria-label="Tamanhos disponíveis">
          ${sizesHtml}
        </div>

        <button 
          type="button" 
          class="add-to-cart-btn" 
          data-add-id="${produto.id}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    `;

    fragment.appendChild(card);
  });

  DOM.productsGrid.appendChild(fragment);
}

// Renderiza pequenos chips quando filtros ativos forem selecionados
function renderizarChipsFiltros() {
  if (!DOM.activeFiltersBox) return;

  const chips = [];
  const { searchQuery, category, gender } = appState.filters;

  if (searchQuery) {
    chips.push({ tipo: 'search', label: `Pesquisa: "${searchQuery}"` });
  }
  if (category !== 'Todos') {
    chips.push({ tipo: 'category', label: `Categoria: ${category}` });
  }
  if (gender !== 'Todos') {
    chips.push({ tipo: 'gender', label: `Género: ${gender}` });
  }

  if (chips.length === 0) {
    DOM.activeFiltersBox.innerHTML = '';
    return;
  }

  let html = chips.map(chip => `
    <span class="filter-chip">
      ${sanitizarTexto(chip.label)}
      <button type="button" data-remove-filter="${chip.tipo}" aria-label="Remover filtro">×</button>
    </span>
  `).join('');

  html += `<span class="clear-all-link" onclick="limparTodosOsFiltros()">Limpar todos</span>`;
  DOM.activeFiltersBox.innerHTML = html;
}

// Limpar todos os filtros e restaurar catálogo
window.limparTodosOsFiltros = function() {
  appState.filters.searchQuery = '';
  appState.filters.category = 'Todos';
  appState.filters.gender = 'Todos';
  appState.filters.sortBy = 'default';

  if (DOM.searchInput) {
    DOM.searchInput.value = '';
    DOM.searchClearBtn?.classList.remove('visible');
  }

  if (DOM.sortSelect) {
    DOM.sortSelect.value = 'default';
  }

  DOM.categoryPills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-category') === 'Todos');
  });

  DOM.genderBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-gender') === 'Todos');
  });

  renderizarProdutos();
};

/* ==============================================================================
   9. GESTÃO DO CARRINHO DE COMPRAS (COMPLEXIDADE E REGRAS DE NEGÓCIO)
   ==============================================================================
   Requisito fundamental:
   - Se o mesmo produto for adicionado em tamanhos diferentes, cada combinação
     deve ser tratada como um artigo distinto (chave composta: productId + tamanho).
   - Cálculo automático de subtotal, portes e total.
   - Atualização dinâmica de contadores e persistência.
   ============================================================================== */
function adicionarAoCarrinho(productId, tamanhoDesejado, quantidade = 1) {
  const produto = PRODUTOS.find(p => p.id === productId);
  if (!produto) return;

  const tamanho = tamanhoDesejado || appState.selectedSizes[productId] || produto.tamanhos[0];

  // Procurar se já existe este produto no mesmo tamanho no carrinho
  const itemExistente = appState.cart.find(item => 
    item.productId === productId && item.size === tamanho
  );

  if (itemExistente) {
    itemExistente.quantity += quantidade;
  } else {
    appState.cart.push({
      productId: produto.id,
      size: tamanho,
      quantity: quantidade
    });
  }

  salvarCarrinho();
  atualizarContadores();
  renderizarCarrinho();
  animarBadge(DOM.cartCountBadge);
  mostrarToast(`"${produto.nome}" (${tamanho}) adicionado ao carrinho!`);
}

function removerDoCarrinho(productId, tamanho) {
  appState.cart = appState.cart.filter(item => 
    !(item.productId === productId && item.size === tamanho)
  );

  salvarCarrinho();
  atualizarContadores();
  renderizarCarrinho();
}

function alterarQuantidadeCarrinho(productId, tamanho, delta) {
  const item = appState.cart.find(i => i.productId === productId && i.size === tamanho);
  if (!item) return;

  const novaQtd = item.quantity + delta;
  if (novaQtd <= 0) {
    removerDoCarrinho(productId, tamanho);
  } else if (novaQtd <= 99) {
    item.quantity = novaQtd;
    salvarCarrinho();
    atualizarContadores();
    renderizarCarrinho();
  }
}

// Cálculo dos Totais com o método .reduce()
function calcularTotaisCarrinho() {
  const subtotal = appState.cart.reduce((acumulador, item) => {
    const produto = PRODUTOS.find(p => p.id === item.productId);
    if (!produto) return acumulador;
    return acumulador + (produto.preco * item.quantity);
  }, 0);

  // Regra de Portes Grátis a partir de 100€
  const portesGratis = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const portes = portesGratis ? 0 : CONFIG.SHIPPING_FEE;
  const total = subtotal + portes;

  return { subtotal, portes, total, portesGratis };
}

function renderizarCarrinho() {
  if (!DOM.cartItemsList) return;

  const { subtotal, portes, total, portesGratis } = calcularTotaisCarrinho();

  // Atualizar Barra de Progresso de Portes Grátis
  if (DOM.shippingProgressText && DOM.shippingBarFill) {
    if (subtotal === 0) {
      DOM.shippingProgressText.innerHTML = `Adiciona <strong>${formatarPreco(CONFIG.FREE_SHIPPING_THRESHOLD)}</strong> para teres <strong>portes grátis</strong>!`;
      DOM.shippingBarFill.style.width = '0%';
    } else if (portesGratis) {
      DOM.shippingProgressText.innerHTML = `Parabéns! A tua encomenda tem <strong>portes grátis</strong>!`;
      DOM.shippingBarFill.style.width = '100%';
    } else {
      const falta = CONFIG.FREE_SHIPPING_THRESHOLD - subtotal;
      const percentagem = Math.min(100, Math.round((subtotal / CONFIG.FREE_SHIPPING_THRESHOLD) * 100));
      DOM.shippingProgressText.innerHTML = `Faltam apenas <strong>${formatarPreco(falta)}</strong> para ganhares <strong>portes grátis</strong>!`;
      DOM.shippingBarFill.style.width = `${percentagem}%`;
    }
  }

  // Lista de Itens no Carrinho
  if (appState.cart.length === 0) {
    DOM.cartItemsList.innerHTML = `
      <div class="cart-empty-message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <h4>O teu carrinho está vazio</h4>
        <p>Descobre as nossas peças exclusivas e adiciona as tuas preferidas.</p>
        <button type="button" class="btn-primary" onclick="fecharTodosOsPaineis(); window.location.href='#produtos';">
          Explorar Coleção
        </button>
      </div>
    `;
    if (DOM.cartCheckoutBtn) DOM.cartCheckoutBtn.disabled = true;
  } else {
    let itemsHtml = '';
    appState.cart.forEach(item => {
      const prod = PRODUTOS.find(p => p.id === item.productId);
      if (!prod) return;

      const itemTotal = prod.preco * item.quantity;

      itemsHtml += `
        <div class="cart-item" data-cart-id="${prod.id}" data-cart-size="${item.size}">
          <div class="cart-item-img">
            <img 
              src="${prod.imagem}" 
              alt="${sanitizarTexto(prod.nome)}" 
              onerror="this.onerror=null; this.src='${prod.fallbackImagem}'"
            />
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${sanitizarTexto(prod.nome)}</h4>
            <div class="cart-item-meta">
              <span>Tam: <strong class="cart-item-size-badge">${item.size}</strong></span>
              <span>·</span>
              <span class="cart-item-price">${formatarPreco(prod.preco)} un.</span>
            </div>
            
            <div class="quantity-control" aria-label="Controlo de quantidade">
              <button 
                type="button" 
                class="qty-btn" 
                data-qty-action="decrease" 
                data-prod-id="${prod.id}" 
                data-size="${item.size}"
                aria-label="Diminuir quantidade"
              >−</button>
              <span class="qty-display">${item.quantity}</span>
              <button 
                type="button" 
                class="qty-btn" 
                data-qty-action="increase" 
                data-prod-id="${prod.id}" 
                data-size="${item.size}"
                aria-label="Aumentar quantidade"
              >+</button>
            </div>
          </div>
          <button 
            type="button" 
            class="cart-item-remove-btn" 
            data-remove-id="${prod.id}" 
            data-remove-size="${item.size}"
            title="Remover peça"
            aria-label="Remover ${sanitizarTexto(prod.nome)}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;
    });

    DOM.cartItemsList.innerHTML = itemsHtml;
    if (DOM.cartCheckoutBtn) DOM.cartCheckoutBtn.disabled = false;
  }

  // Atualizar Valores nos Textos
  if (DOM.cartSubtotalText) DOM.cartSubtotalText.textContent = formatarPreco(subtotal);
  if (DOM.cartShippingText) {
    DOM.cartShippingText.textContent = portesGratis ? 'Grátis' : formatarPreco(portes);
  }
  if (DOM.cartTotalText) DOM.cartTotalText.textContent = formatarPreco(total);
}

/* ==============================================================================
   10. GESTÃO DOS FAVORITOS
   ============================================================================== */
function alternarFavorito(productId) {
  const index = appState.favorites.indexOf(productId);
  const produto = PRODUTOS.find(p => p.id === productId);

  if (index >= 0) {
    appState.favorites.splice(index, 1);
    mostrarToast(`"${produto ? produto.nome : 'Peça'}" removida dos favoritos.`);
  } else {
    appState.favorites.push(productId);
    mostrarToast(`"${produto ? produto.nome : 'Peça'}" adicionada aos favoritos!`);
  }

  salvarFavoritos();
  atualizarContadores();
  renderizarProdutos(); // Atualiza cor dos corações nos cartões
  renderizarFavoritos();
  animarBadge(DOM.favCountBadge);
}

function renderizarFavoritos() {
  if (!DOM.favItemsList) return;

  if (appState.favorites.length === 0) {
    DOM.favItemsList.innerHTML = `
      <div class="cart-empty-message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <h4>Ainda não tens favoritos</h4>
        <p>Clica no ícone do coração em qualquer peça para guardares os teus artigos preferidos.</p>
      </div>
    `;
    return;
  }

  let html = '';
  appState.favorites.forEach(favId => {
    const prod = PRODUTOS.find(p => p.id === favId);
    if (!prod) return;

    html += `
      <div class="fav-item" data-id="${prod.id}">
        <div class="cart-item-img">
          <img 
            src="${prod.imagem}" 
            alt="${sanitizarTexto(prod.nome)}" 
            onerror="this.onerror=null; this.src='${prod.fallbackImagem}'"
          />
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-title">${sanitizarTexto(prod.nome)}</h4>
          <span class="cart-item-meta">${prod.categoria}</span>
          <span class="cart-item-price">${formatarPreco(prod.preco)}</span>
        </div>
        <div class="fav-item-actions">
          <button 
            type="button" 
            class="fav-add-cart-btn" 
            data-quick-add-id="${prod.id}"
          >
            Adicionar
          </button>
          <button 
            type="button" 
            class="cart-item-remove-btn" 
            data-fav-remove-id="${prod.id}"
            title="Remover dos favoritos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
  });

  DOM.favItemsList.innerHTML = html;
}

/* ==============================================================================
   11. ATUALIZAÇÃO DOS CONTADORES E ANIMAÇÕES
   ============================================================================== */
function atualizarContadores() {
  // Contar o total de unidades no carrinho com .reduce()
  const totalArtigosCarrinho = appState.cart.reduce((soma, item) => soma + item.quantity, 0);
  const totalFavoritos = appState.favorites.length;

  if (DOM.cartCountBadge) {
    DOM.cartCountBadge.textContent = totalArtigosCarrinho;
    DOM.cartCountBadge.style.display = totalArtigosCarrinho > 0 ? 'flex' : 'none';
  }

  if (DOM.favCountBadge) {
    DOM.favCountBadge.textContent = totalFavoritos;
    DOM.favCountBadge.style.display = totalFavoritos > 0 ? 'flex' : 'none';
  }
}

function animarBadge(badgeEl) {
  if (!badgeEl) return;
  badgeEl.classList.remove('pulse');
  void badgeEl.offsetWidth; // Forçar reflow para reiniciar animação CSS
  badgeEl.classList.add('pulse');
  setTimeout(() => badgeEl.classList.remove('pulse'), 300);
}

/* ==============================================================================
   12. QUICK VIEW MODAL (DETALHES DO PRODUTO)
   ============================================================================== */
function abrirQuickView(productId) {
  const produto = PRODUTOS.find(p => p.id === productId);
  if (!produto || !DOM.quickviewContent) return;

  const isFav = appState.favorites.includes(produto.id);
  const selectedSize = appState.selectedSizes[produto.id] || produto.tamanhos[0];

  const sizesHtml = produto.tamanhos.map(tam => `
    <button 
      type="button" 
      class="size-btn ${tam === selectedSize ? 'selected' : ''}" 
      data-qv-size="${tam}"
      data-prod-id="${produto.id}"
    >
      ${tam}
    </button>
  `).join('');

  DOM.quickviewContent.innerHTML = `
    <div class="quickview-grid">
      <div class="qv-image">
        <img 
          src="${produto.imagem}" 
          alt="${sanitizarTexto(produto.nome)}" 
          onerror="this.onerror=null; this.src='${produto.fallbackImagem}'"
        />
      </div>
      <div class="qv-details">
        <span class="qv-category">${sanitizarTexto(produto.categoria)} · Coleção Mabel</span>
        <h2 class="qv-title">${sanitizarTexto(produto.nome)}</h2>
        <p class="qv-price">${formatarPreco(produto.preco)}</p>
        <p class="qv-desc">${sanitizarTexto(produto.descricao)}</p>

        <span class="size-selector-label">Escolhe o teu tamanho:</span>
        <div class="size-selector" style="margin-bottom: 1.5rem;">
          ${sizesHtml}
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: auto;">
          <button 
            type="button" 
            class="btn-primary" 
            style="flex-grow: 1;"
            data-qv-add-cart="${produto.id}"
          >
            Adicionar ao Carrinho
          </button>
          <button 
            type="button" 
            class="action-btn" 
            style="border: 1px solid var(--color-border);" 
            data-fav-id="${produto.id}"
            title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? 'var(--color-danger)' : 'none'}" stroke="${isFav ? 'var(--color-danger)' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  abrirModal(DOM.quickviewModal);
}

/* ==============================================================================
   13. FINALIZAÇÃO DA COMPRA (CHECKOUT DEMONSTRATIVO & VALIDAÇÕES)
   ==============================================================================
   Requisitos:
   - Validação de campos obrigatórios (Nome, Telefone, Morada).
   - Validação de formato (telefone com dígitos válidos, email válido se preenchido).
   - Mensagens claras de erro em cada campo.
   - Resumo da encomenda e total correto.
   - Aviso explícito de demonstração académica.
   ============================================================================== */
function abrirCheckout() {
  if (appState.cart.length === 0) {
    mostrarToast('O teu carrinho está vazio. Adiciona peças antes de finalizar a compra.');
    return;
  }

  fecharTodosOsPaineis();

  const { subtotal, portes, total, portesGratis } = calcularTotaisCarrinho();

  // Renderizar pré-visualização dos artigos no checkout
  if (DOM.checkoutSummaryItems) {
    let previewHtml = '';
    appState.cart.forEach(item => {
      const prod = PRODUTOS.find(p => p.id === item.productId);
      if (!prod) return;
      previewHtml += `
        <div class="preview-item-row">
          <span>${item.quantity}x ${sanitizarTexto(prod.nome)} (${item.size})</span>
          <strong>${formatarPreco(prod.preco * item.quantity)}</strong>
        </div>
      `;
    });
    DOM.checkoutSummaryItems.innerHTML = previewHtml;
  }

  if (DOM.checkoutTotalDisplay) {
    DOM.checkoutTotalDisplay.innerHTML = `
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>${formatarPreco(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Portes de Envio:</span>
        <span>${portesGratis ? 'Grátis' : formatarPreco(portes)}</span>
      </div>
      <div class="summary-row total-row">
        <span>Total a Pagar:</span>
        <span>${formatarPreco(total)}</span>
      </div>
    `;
  }

  abrirModal(DOM.checkoutModal);
}

// Validação dos Campos do Formulário de Checkout
function validarFormularioCheckout(formData) {
  const erros = {};

  // 1. Nome Completo (obrigatório, pelo menos 3 caracteres e duas palavras)
  const nome = formData.get('nome')?.trim() || '';
  if (!nome) {
    erros.nome = 'Por favor, introduz o teu nome completo.';
  } else if (nome.split(' ').filter(n => n.length > 0).length < 2) {
    erros.nome = 'Introduz o teu primeiro e último nome.';
  }

  // 2. Número de Telefone (obrigatório, validação de 9 a 15 dígitos)
  const telefone = formData.get('telefone')?.trim() || '';
  const regexTelefone = /^[+]?[\d\s-]{9,15}$/;
  if (!telefone) {
    erros.telefone = 'Por favor, introduz o teu número de telemóvel.';
  } else if (!regexTelefone.test(telefone)) {
    erros.telefone = 'Número de telefone inválido (ex: 912 345 678).';
  }

  // 3. Email (opcional, mas se fornecido deve ter formato válido)
  const email = formData.get('email')?.trim() || '';
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !regexEmail.test(email)) {
    erros.email = 'Endereço de email inválido.';
  }

  // 4. Morada / Endereço (obrigatório)
  const morada = formData.get('morada')?.trim() || '';
  if (!morada) {
    erros.morada = 'Por favor, indica a morada de entrega.';
  } else if (morada.length < 6) {
    erros.morada = 'A morada deve ser mais detalhada (rua, número, código postal).';
  }

  return erros;
}

function submeterCheckout(event) {
  event.preventDefault();
  if (!DOM.checkoutForm) return;

  const formData = new FormData(DOM.checkoutForm);
  const erros = validarFormularioCheckout(formData);

  // Limpar erros visuais anteriores
  DOM.checkoutForm.querySelectorAll('.field-error-msg').forEach(el => el.textContent = '');
  DOM.checkoutForm.querySelectorAll('.form-input').forEach(el => el.classList.remove('input-error'));

  // Se houver erros, exibi-los no formulário
  if (Object.keys(erros).length > 0) {
    for (const [campo, mensagem] of Object.entries(erros)) {
      const inputEl = DOM.checkoutForm.querySelector(`[name="${campo}"]`);
      const errorEl = document.getElementById(`error-${campo}`);
      if (inputEl) inputEl.classList.add('input-error');
      if (errorEl) errorEl.textContent = mensagem;
    }
    mostrarToast('Por favor, corrige os campos assinalados a vermelho.', 'erro');
    return;
  }

  // Se for válido: Simular Confirmação de Encomenda Demonstrativa
  const nomeCliente = formData.get('nome').trim();
  const moradaCliente = formData.get('morada').trim();
  const telefoneCliente = formData.get('telefone').trim();
  const { subtotal, portes, total, portesGratis } = calcularTotaisCarrinho();

  // Gerar número fictício elegante de encomenda (ex: #MBL-74921)
  const numeroEncomenda = `#MBL-${Math.floor(10000 + Math.random() * 90000)}`;

  // Criar resumo dos artigos encomendados
  const itensResumo = appState.cart.map(item => {
    const prod = PRODUTOS.find(p => p.id === item.productId);
    return `${item.quantity}x ${prod ? prod.nome : 'Peça'} (${item.size})`;
  }).join('<br>');

  // Preencher modal de confirmação
  if (DOM.orderNumberDisplay) DOM.orderNumberDisplay.textContent = numeroEncomenda;
  if (DOM.orderCustomerDisplay) {
    DOM.orderCustomerDisplay.innerHTML = `
      <strong>Destinatário:</strong> ${sanitizarTexto(nomeCliente)}<br>
      <strong>Contacto:</strong> ${sanitizarTexto(telefoneCliente)}<br>
      <strong>Morada:</strong> ${sanitizarTexto(moradaCliente)}
    `;
  }
  if (DOM.orderSummaryDisplay) {
    DOM.orderSummaryDisplay.innerHTML = `
      <div style="margin-bottom: 0.75rem;">
        <strong>Peças Selecionadas:</strong><br>
        ${itensResumo}
      </div>
      <div>
        <strong>Total Demonstrativo:</strong> ${formatarPreco(total)} (${portesGratis ? 'Portes Grátis' : 'Portes: ' + formatarPreco(portes)})
      </div>
    `;
  }

  // Limpar carrinho
  appState.cart = [];
  salvarCarrinho();
  atualizarContadores();
  renderizarCarrinho();

  // Reset do formulário
  DOM.checkoutForm.reset();

  // Transição de modais
  fecharModal(DOM.checkoutModal);
  abrirModal(DOM.confirmationModal);
}

/* ==============================================================================
   14. CONTROLO DE PAINÉIS E MODAIS (DRAWER & ACCESSIBILITY)
   ============================================================================== */
function abrirDrawerCarrinho() {
  fecharTodosOsPaineis();
  if (DOM.cartDrawer && DOM.drawerBackdrop) {
    DOM.cartDrawer.classList.add('open');
    DOM.drawerBackdrop.classList.add('active');
    document.body.classList.add('drawer-open');
  }
}

function abrirDrawerFavoritos() {
  fecharTodosOsPaineis();
  if (DOM.favModal && DOM.drawerBackdrop) {
    DOM.favModal.classList.add('open');
    DOM.drawerBackdrop.classList.add('active');
    document.body.classList.add('drawer-open');
  }
}

function abrirModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('active');
  document.body.classList.add('drawer-open');
}

function fecharModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  document.body.classList.remove('drawer-open');
}

function fecharTodosOsPaineis() {
  DOM.cartDrawer?.classList.remove('open');
  DOM.favModal?.classList.remove('open');
  DOM.drawerBackdrop?.classList.remove('active');
  DOM.checkoutModal?.classList.remove('active');
  DOM.confirmationModal?.classList.remove('active');
  DOM.quickviewModal?.classList.remove('active');
  DOM.mobileNavDrawer?.classList.remove('open');
  DOM.mobileNavToggle?.classList.remove('active');
  document.body.classList.remove('drawer-open');
}

/* ==============================================================================
   15. CONFIGURAÇÃO DE EVENTOS (DELEGAÇÃO E LISTENERS)
   ============================================================================== */
function configurarEventos() {
  // 1. Pesquisa em tempo real (evento 'input')
  DOM.searchInput?.addEventListener('input', (e) => {
    appState.filters.searchQuery = e.target.value;
    DOM.searchClearBtn?.classList.toggle('visible', e.target.value.length > 0);
    renderizarProdutos();
  });

  DOM.searchClearBtn?.addEventListener('click', () => {
    DOM.searchInput.value = '';
    appState.filters.searchQuery = '';
    DOM.searchClearBtn.classList.remove('visible');
    renderizarProdutos();
  });

  // 2. Filtros de Categoria (Pills)
  DOM.categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      DOM.categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.filters.category = pill.getAttribute('data-category');
      renderizarProdutos();
    });
  });

  // 3. Filtros de Género (Mulher, Homem, Todos)
  DOM.genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.filters.gender = btn.getAttribute('data-gender');
      renderizarProdutos();
    });
  });

  // 4. Seletor de Ordenação
  DOM.sortSelect?.addEventListener('change', (e) => {
    appState.filters.sortBy = e.target.value;
    renderizarProdutos();
  });

  // 5. Delegação de Eventos na Grelha de Produtos (Excelente prática para performance)
  DOM.productsGrid?.addEventListener('click', (e) => {
    // A. Seleção de tamanho no cartão
    const sizeBtn = e.target.closest('.size-btn');
    if (sizeBtn) {
      const prodId = Number(sizeBtn.getAttribute('data-prod-id'));
      const size = sizeBtn.getAttribute('data-size');
      appState.selectedSizes[prodId] = size;
      
      // Atualizar classe selected nos botões do mesmo cartão
      const parent = sizeBtn.parentElement;
      parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      sizeBtn.classList.add('selected');
      return;
    }

    // B. Favorito no cartão
    const favBtn = e.target.closest('.fav-btn');
    if (favBtn) {
      const prodId = Number(favBtn.getAttribute('data-fav-id'));
      alternarFavorito(prodId);
      return;
    }

    // C. Adicionar ao Carrinho
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
      const prodId = Number(addBtn.getAttribute('data-add-id'));
      adicionarAoCarrinho(prodId);
      return;
    }

    // D. Quick View
    const qvBtn = e.target.closest('.quickview-btn');
    if (qvBtn) {
      const prodId = Number(qvBtn.getAttribute('data-qv-id'));
      abrirQuickView(prodId);
      return;
    }
  });

  // 6. Delegação de Eventos nos Chips de Filtro
  DOM.activeFiltersBox?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-filter]');
    if (!btn) return;

    const tipo = btn.getAttribute('data-remove-filter');
    if (tipo === 'search') {
      appState.filters.searchQuery = '';
      if (DOM.searchInput) DOM.searchInput.value = '';
      DOM.searchClearBtn?.classList.remove('visible');
    } else if (tipo === 'category') {
      appState.filters.category = 'Todos';
      DOM.categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'Todos'));
    } else if (tipo === 'gender') {
      appState.filters.gender = 'Todos';
      DOM.genderBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-gender') === 'Todos'));
    }
    renderizarProdutos();
  });

  // 7. Delegação no Carrinho (Quantidade e Remoção)
  DOM.cartItemsList?.addEventListener('click', (e) => {
    // Alterar Quantidade (+ / -)
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
      const prodId = Number(qtyBtn.getAttribute('data-prod-id'));
      const size = qtyBtn.getAttribute('data-size');
      const action = qtyBtn.getAttribute('data-qty-action');
      alterarQuantidadeCarrinho(prodId, size, action === 'increase' ? 1 : -1);
      return;
    }

    // Remover Artigo
    const removeBtn = e.target.closest('.cart-item-remove-btn');
    if (removeBtn) {
      const prodId = Number(removeBtn.getAttribute('data-remove-id'));
      const size = removeBtn.getAttribute('data-remove-size');
      removerDoCarrinho(prodId, size);
      return;
    }
  });

  // 8. Delegação nos Favoritos
  DOM.favItemsList?.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.fav-add-cart-btn');
    if (addBtn) {
      const prodId = Number(addBtn.getAttribute('data-quick-add-id'));
      adicionarAoCarrinho(prodId);
      return;
    }

    const removeBtn = e.target.closest('.cart-item-remove-btn');
    if (removeBtn) {
      const prodId = Number(removeBtn.getAttribute('data-fav-remove-id'));
      alternarFavorito(prodId);
      return;
    }
  });

  // 9. Eventos no Modal Quick View
  DOM.quickviewContent?.addEventListener('click', (e) => {
    const sizeBtn = e.target.closest('[data-qv-size]');
    if (sizeBtn) {
      const prodId = Number(sizeBtn.getAttribute('data-prod-id'));
      const size = sizeBtn.getAttribute('data-qv-size');
      appState.selectedSizes[prodId] = size;
      sizeBtn.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      sizeBtn.classList.add('selected');
      return;
    }

    const addBtn = e.target.closest('[data-qv-add-cart]');
    if (addBtn) {
      const prodId = Number(addBtn.getAttribute('data-qv-add-cart'));
      adicionarAoCarrinho(prodId);
      fecharModal(DOM.quickviewModal);
      return;
    }

    const favBtn = e.target.closest('[data-fav-id]');
    if (favBtn) {
      const prodId = Number(favBtn.getAttribute('data-fav-id'));
      alternarFavorito(prodId);
      abrirQuickView(prodId); // Re-renderizar modal com novo estado
      return;
    }
  });

  // 10. Abertura e Fecho dos Painéis e Modais
  DOM.openCartBtn?.addEventListener('click', abrirDrawerCarrinho);
  DOM.closeCartBtn?.addEventListener('click', fecharTodosOsPaineis);
  DOM.openFavBtn?.addEventListener('click', abrirDrawerFavoritos);
  DOM.closeFavBtn?.addEventListener('click', fecharTodosOsPaineis);
  DOM.drawerBackdrop?.addEventListener('click', fecharTodosOsPaineis);
  DOM.cartCheckoutBtn?.addEventListener('click', abrirCheckout);

  DOM.closeCheckoutBtn?.addEventListener('click', () => fecharModal(DOM.checkoutModal));
  DOM.closeConfirmationBtn?.addEventListener('click', () => fecharModal(DOM.confirmationModal));
  DOM.continueShoppingBtn?.addEventListener('click', () => fecharModal(DOM.confirmationModal));
  DOM.closeQuickviewBtn?.addEventListener('click', () => fecharModal(DOM.quickviewModal));

  // Fechar modais ao clicar no overlay de fundo
  [DOM.checkoutModal, DOM.confirmationModal, DOM.quickviewModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) fecharModal(modal);
    });
  });

  // Fechar com a tecla ESC (acessibilidade)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharTodosOsPaineis();
  });

  // 11. Submissão do Formulário de Checkout
  DOM.checkoutForm?.addEventListener('submit', submeterCheckout);

  // 12. Menu Mobile
  DOM.mobileNavToggle?.addEventListener('click', () => {
    const isOpen = DOM.mobileNavDrawer.classList.toggle('open');
    DOM.mobileNavToggle.classList.toggle('active', isOpen);
  });

  // Fechar menu mobile ao clicar em links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      DOM.mobileNavDrawer?.classList.remove('open');
      DOM.mobileNavToggle?.classList.remove('active');
    });
  });

  // 13. Cliques nos Cartões de Categoria da Página Inicial
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-target-category');
      const gen = card.getAttribute('data-target-gender');

      if (cat) {
        appState.filters.category = cat;
        DOM.categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === cat));
      }
      if (gen) {
        appState.filters.gender = gen;
        DOM.genderBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-gender') === gen));
      }

      renderizarProdutos();
      
      // Scroll suave até ao catálogo
      const catalogoSection = document.getElementById('produtos');
      if (catalogoSection) {
        catalogoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 14. Efeito de scroll no cabeçalho (adiciona sombra ao rolar)
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  }, { passive: true });
}

/* ==============================================================================
   16. INICIALIZAÇÃO DA APLICAÇÃO (BOOTSTRAP)
   ============================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Carregar dados guardados no navegador
  carregarDadosArmazenados();

  // 2. Renderizar componentes iniciais
  renderizarProdutos();
  renderizarCarrinho();
  renderizarFavoritos();
  atualizarContadores();

  // 3. Vincular todos os ouvintes de eventos
  configurarEventos();

  console.log('Mabel Store inicializada com sucesso em Vanilla JavaScript.');
});
