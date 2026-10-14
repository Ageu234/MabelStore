# MABEL STORE — LOJA VIRTUAL DE ROUPAS & GUIA DE ESTUDO DE JAVASCRIPT

> **Boutique de Moda Contemporânea** desenvolvida exclusivamente com **HTML5**, **CSS3** e **Vanilla JavaScript** (sem recurso a frameworks, bibliotecas ou backend). Criada como projeto demonstrativo e material didático para estudantes que dominam HTML e CSS e pretendem aprofundar os seus conhecimentos em JavaScript puro.

---

## 1. VISÃO GERAL DO PROJETO

A **Mabel Store** é uma loja virtual inspirada na estética editorial de marcas de moda independentes. Apresenta uma identidade visual limpa e elegante, baseada em tons de marfim quente, bege, caramelo e grafite, tipografia mista (*Cormorant Garamond* e *Plus Jakarta Sans*), micro-interações suaves e fotografia editorial de alta resolução.

Todas as funcionalidades essenciais de comércio eletrónico acontecem integralmente no navegador:
- Navegação fluida com cabeçalho fixo (*sticky*) e menu adaptado para dispositivos móveis.
- Hero section editorial e grelha de categorias em destaque com navegação filtrada.
- Catálogo de 12 produtos distribuídos por T-shirts, Camisas, Calças, Vestidos, Casacos e Conjuntos.
- Pesquisa em tempo real por nome, categoria ou detalhes do tecido.
- Filtros por categoria, género (Mulher/Homem) e ordenação por preço, nome e lançamentos.
- Gestão completa de carrinho num painel lateral deslizante (*slide drawer*), com cálculo de subtotal, portes grátis dinâmicos (a partir de 100 €) e total.
- Tratamento de combinações de produto e tamanho (ex.: S vs M) como artigos distintos no carrinho.
- Sistema de favoritos com persistência.
- Janela de detalhes rápidos (*Quick View*) para inspeção das peças.
- Formulário demonstrativo de finalização de encomenda (*Checkout*) com validação no frontend e modal de confirmação.
- Notificações visuais discretas (*Toast notifications*).
- Persistência total do carrinho e favoritos através de `localStorage`.

---

## 2. ESTRUTURA DOS FICHEIROS

```text
MabelStore/
├── index.html          # Estrutura semântica HTML5 e acessibilidade
├── css/
│   └── style.css       # Estilos CSS3, variáveis de design e responsividade
├── js/
│   └── script.js       # Base de dados de produtos e lógica JavaScript modular
├── images/             # Fotografias de alta qualidade (Hero, categorias e peças)
│   ├── hero.jpg
│   ├── cat-mulher.jpg
│   ├── cat-homem.jpg
│   ├── cat-novidades.jpg
│   ├── cat-bestsellers.jpg
│   ├── prod-camisa-seda.jpg
│   ├── prod-vestido-midi.jpg
│   └── prod-blazer-wool.jpg
└── README.md           # Documentação completa e guia de estudo didático
```

---

## 3. COMO ABRIR E EXECUTAR O PROJETO

Por ser desenvolvido exclusivamente com tecnologias web nativas sem dependências nem compilação:

1. **Método Direto (Duplo Clique):**
   - Abre a pasta do projeto no explorador de ficheiros do computador.
   - Dá duplo clique sobre o ficheiro `index.html`. O projeto abrirá de imediato em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

2. **Através do VS Code (Recomendado para Estudo):**
   - Abre a pasta `MabelStore` no Visual Studio Code.
   - Se tiveres instalada a extensão **Live Server**, clica com o botão direito em `index.html` e escolhe **"Open with Live Server"**.
   - Desta forma, sempre que alterares o código HTML, CSS ou JS, a página recarregará automaticamente.

---

## 4. GUIA DE ESTUDO DE JAVASCRIPT

Esta secção foi elaborada para servir de manual de apoio para estudantes de JavaScript. Cada tópico explica um conceito chave aplicado diretamente na Mabel Store, com exemplos práticos retirados do `js/script.js`.

### 4.1. Como os Produtos são Representados em Arrays e Objetos

Em aplicações reais, os dados de produtos vêm quase sempre no formato JSON ou em arrays de objetos. Cada objeto agrupa todas as características de uma peça de vestuário através de pares chave-valor:

```javascript
// Array contendo múltiplos objetos
const PRODUTOS = [
  {
    id: 1,                          // Número identificador único
    nome: "Camisa de Seda Pura",    // String com o nome da peça
    preco: 89.00,                   // Número decimal para cálculos matemáticos
    categoria: "Camisas",           // Categoria para filtragem
    genero: "Mulher",               // Género para filtragem
    badge: "Novo",                  // Etiqueta destacada (ou null)
    imagem: "images/prod-camisa-seda.jpg", // Caminho do ficheiro local
    tamanhos: ["XS", "S", "M", "L"] // Array com os tamanhos disponíveis
  }
  // ...outros produtos
];
```

**Conceito Didático:**
- O array `PRODUTOS` guarda uma coleção ordenada.
- Usar tipos primitivos adequados (`preco` como número em vez de `"89.00 €"`) permite somar, multiplicar e comparar valores sem ter de converter texto a meio dos cálculos.

---

### 4.2. Como Funciona a Renderização Dinâmica no DOM

Em vez de escrever manualmente 12 cartões no ficheiro HTML, o JavaScript lê o array `PRODUTOS` e cria a interface dinamicamente:

```javascript
function renderizarProdutos() {
  const produtosExibir = obterProdutosFiltrados();
  DOM.productsGrid.innerHTML = ''; // Limpa os cartões anteriores

  // Usamos um fragmento para otimizar o desempenho do browser
  const fragment = document.createDocumentFragment();

  produtosExibir.forEach(produto => {
    const card = document.createElement('article');
    card.className = 'product-card';

    // Inserção da estrutura com template literals (`...`)
    card.innerHTML = `
      <div class="card-media">
        <img src="${produto.imagem}" alt="${produto.nome}" />
      </div>
      <div class="card-content">
        <h3>${produto.nome}</h3>
        <p>${formatarPreco(produto.preco)}</p>
        <button class="add-to-cart-btn" data-add-id="${produto.id}">
          Adicionar ao Carrinho
        </button>
      </div>
    `;

    fragment.appendChild(card);
  });

  DOM.productsGrid.appendChild(fragment);
}
```

**Conceito Didático:**
- `document.createElement()` cria um elemento HTML em memória.
- `document.createDocumentFragment()` acumula os elementos em memória antes de os desenhar no ecrã de uma só vez, tornando a renderização rápida e fluida.
- Atributos `data-*` (ex.: `data-add-id`) associam dados de programação a elementos HTML de forma padronizada.

---

### 4.3. Como são Utilizados os Eventos e a Delegação de Eventos

Em JavaScript iniciante, é frequente adicionar ouvintes de evento a cada botão individualmente. No entanto, quando os elementos são criados e destruídos dinamicamente (como filtros ou cartões de produtos), a melhor prática profissional é a **Delegação de Eventos**:

```javascript
// Colocamos apenas UM ouvinte no elemento pai da grelha de produtos
DOM.productsGrid.addEventListener('click', (evento) => {
  // Verificamos se o clique ocorreu num botão de adicionar ao carrinho
  const addBtn = evento.target.closest('.add-to-cart-btn');
  if (addBtn) {
    const prodId = Number(addBtn.getAttribute('data-add-id'));
    adicionarAoCarrinho(prodId);
    return;
  }

  // Verificamos se o clique ocorreu num botão de favorito
  const favBtn = evento.target.closest('.fav-btn');
  if (favBtn) {
    const prodId = Number(favBtn.getAttribute('data-fav-id'));
    alternarFavorito(prodId);
    return;
  }
});
```

**Conceito Didático:**
- `evento.target.closest(seletor)` procura o ancestral mais próximo que corresponda à classe CSS indicada, garantindo que o clique funciona mesmo se o utilizador clicar no ícone SVG que está dentro do botão.

---

### 4.4. Como Funciona a Pesquisa e a Filtragem (Métodos Funcionais)

Para encontrar produtos sem recarregar a página, aplicamos o método `.filter()` sobre a lista de produtos:

```javascript
function obterProdutosFiltrados() {
  const { searchQuery, category, gender } = appState.filters;

  return PRODUTOS.filter(produto => {
    // 1. Pesquisa por texto (insensível a maiúsculas/minúsculas)
    const termo = searchQuery.trim().toLowerCase();
    const bateNome = produto.nome.toLowerCase().includes(termo);

    // 2. Filtro por Categoria
    const bateCategoria = (category === 'Todos') || (produto.categoria === category);

    // 3. Filtro por Género
    const bateGenero = (gender === 'Todos') || (produto.genero === gender);

    // O produto só aparece se cumprir todas as condições em simultâneo
    return bateNome && bateCategoria && bateGenero;
  });
}
```

**Conceito Didático:**
- `.toLowerCase()` converte ambos os lados da comparação para letras minúsculas para que "camisa", "Camisa" e "CAMISA" encontrem o mesmo resultado.
- `.includes()` verifica se um pedaço de texto existe dentro de outro.
- O método `.filter()` não modifica o array `PRODUTOS` original; devolve sempre um array novo.

---

### 4.5. Como Funciona o Carrinho e a Chave Composta (Produto + Tamanho)

Numa loja de roupa, se um cliente comprar uma Camisa no tamanho **S** e a mesma Camisa no tamanho **M**, elas não podem ser somadas na mesma linha do carrinho. Têm de ser artigos distintos:

```javascript
function adicionarAoCarrinho(productId, tamanho) {
  // Procura se já existe exatamente o mesmo produto com o mesmo tamanho
  const itemExistente = appState.cart.find(item => 
    item.productId === productId && item.size === tamanho
  );

  if (itemExistente) {
    // Se já existia esse tamanho, incrementa apenas a quantidade
    itemExistente.quantity += 1;
  } else {
    // Se for uma combinação nova, adiciona um novo elemento ao carrinho
    appState.cart.push({
      productId: productId,
      size: tamanho,
      quantity: 1
    });
  }

  salvarCarrinho();
  renderizarCarrinho();
}
```

**Conceito Didático:**
- O método `.find()` percorre o array e devolve o primeiro elemento que satisfaça a condição dada, ou `undefined` se não encontrar nenhum.

---

### 4.6. Como são Calculados os Totais com `.reduce()`

O método `.reduce()` é a forma mais elegante e profissional de acumular valores num array:

```javascript
function calcularTotaisCarrinho() {
  // O acumulador começa em 0 e soma o (preço * quantidade) de cada artigo
  const subtotal = appState.cart.reduce((acumulador, item) => {
    const produto = PRODUTOS.find(p => p.id === item.productId);
    return acumulador + (produto.preco * item.quantity);
  }, 0);

  // Regra de Portes Grátis para encomendas a partir de 100€
  const portesGratis = subtotal >= 100.00 || subtotal === 0;
  const portes = portesGratis ? 0 : 4.90;
  const total = subtotal + portes;

  return { subtotal, portes, total, portesGratis };
}
```

**Conceito Didático:**
- O segundo argumento `, 0` define o valor inicial do acumulador.
- O operador ternário `condição ? seVerdadeiro : seFalso` permite tomar decisões simples em apenas uma linha limpa de código.

---

### 4.7. Como Funciona o `localStorage` e a Gestão de Erros

O `localStorage` permite guardar informações no navegador do utilizador que permanecem disponíveis mesmo após fechar a janela ou atualizar a página (`F5`):

```javascript
// Gravar no localStorage
function salvarCarrinho() {
  try {
    // O localStorage apenas aceita strings, por isso convertemos com JSON.stringify
    localStorage.setItem('mabel_store_cart_v1', JSON.stringify(appState.cart));
  } catch (error) {
    console.error('Não foi possível gravar no localStorage:', error);
  }
}

// Ler do localStorage
function carregarCarrinho() {
  try {
    const rawCart = localStorage.getItem('mabel_store_cart_v1');
    if (rawCart) {
      // Reconvertemos o texto em array de objetos JavaScript com JSON.parse
      appState.cart = JSON.parse(rawCart);
    }
  } catch (error) {
    console.warn('Dados corrompidos no localStorage. A reiniciar carrinho:', error);
    appState.cart = [];
  }
}
```

**Conceito Didático:**
- O bloco `try ... catch` impede que a aplicação pare de funcionar caso o utilizador tenha o armazenamento desativado ou os dados guardados estejam corrompidos.

---

### 4.8. Como Funciona a Validação do Checkout no Frontend

A validação assegura que o utilizador preenche os dados necessários com formatos coerentes antes de gerar a confirmação da encomenda:

```javascript
function validarFormularioCheckout(formData) {
  const erros = {};

  // Validação do Nome: obrigatório e com pelo menos primeiro e último nome
  const nome = formData.get('nome')?.trim() || '';
  if (!nome || nome.split(' ').length < 2) {
    erros.nome = 'Introduz o teu primeiro e último nome.';
  }

  // Validação do Telefone com Expressão Regular (RegExp)
  const telefone = formData.get('telefone')?.trim() || '';
  const regexTelefone = /^[+]?[\d\s-]{9,15}$/;
  if (!telefone || !regexTelefone.test(telefone)) {
    erros.telefone = 'Número de telefone inválido (ex: 912 345 678).';
  }

  // Validação de Morada
  const morada = formData.get('morada')?.trim() || '';
  if (!morada || morada.length < 6) {
    erros.morada = 'Por favor, introduz uma morada completa com código postal.';
  }

  return erros;
}
```

**Conceito Didático:**
- `FormData` é uma API nativa do navegador que permite extrair facilmente todos os campos de um `<form>` pelo respetivo atributo `name`.
- `RegExp.test(string)` verifica se o texto cumpre a regra de formato especificada.

---

## 5. EXPERIÊNCIA DE UTILIZADOR & DETALHES DE IMPLEMENTAÇÃO

- **Acessibilidade:** Elementos interativos com atributos ARIA (`aria-label`, `aria-modal`, `role="dialog"`), foco visível para navegação por teclado e respeito pelas diretrizes de redução de movimento (`prefers-reduced-motion: reduce`).
- **Resiliência de Imagens:** Todas as imagens possuem tratamento de erro `onerror`, garantindo que se uma imagem externa não puder ser descarregada sem ligação à internet, é ativado um fallback visual adequado.
- **Responsividade Rigorosa:** Testado e adaptado para resoluções móveis (320px, 375px), tablets (768px, 1024px) e ecrãs de secretária (1280px+).

---

## 6. AVISO ACADÉMICO

Este projeto tem fins pedagógicos e demonstrativos. Não possui ligação a serviços de pagamento externos, não processa transações bancárias e não envia dados do utilizador para servidores remotos. Todas as operações decorrem localmente na memória e no armazenamento seguro do navegador.
