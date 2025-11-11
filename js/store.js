// js/store.js — sistema de loja com localStorage

// Produtos de exemplo (use imagens reais na pasta img/)
const products = [
  { id: 1, name: 'Camiseta TechCuiabá 2025', price: 79.90, image: 'img/camiseta.jpg' },
  { id: 2, name: 'Caneca Premium', price: 49.90, image: 'img/caneca.jpg' },
  { id: 3, name: 'Adesivo Pack', price: 29.90, image: 'img/adesivos.jpg' },
  { id: 4, name: 'Ingresso VIP', price: 350.00, image: 'img/ingresso.jpg' }
];

// Funções de armazenamento
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}

// Funções de ação
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart(cart);
  showToast('Produto adicionado ao carrinho!');
}

function toggleFavorite(productId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);
  
  if (index === -1) {
    favorites.push(productId);
    showToast('Adicionado aos favoritos!');
  } else {
    favorites.splice(index, 1);
    showToast('Removido dos favoritos.');
  }
  
  saveFavorites(favorites);
  if (typeof renderProducts === 'function') renderProducts();
}

// Renderização (usada em produtos.html)
function renderProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;
  
  const favorites = getFavorites();
  container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
        <div class="product-actions">
          <button class="btn-primary btn-sm" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
          <button class="favorite-btn ${favorites.includes(product.id) ? 'active' : ''}" 
                  onclick="toggleFavorite(${product.id})">
            <span class="material-symbols-outlined">
              ${favorites.includes(product.id) ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Função de toast (reutiliza script.js ou fallback)
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="material-symbols-outlined">check</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
  }
  toast.querySelector('span:last-child').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}