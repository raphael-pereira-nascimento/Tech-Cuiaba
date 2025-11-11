const products = [
  { id: 1, name: 'Camiseta TechCuiabá 2025', price: 79.90, image: 'img/camisa-techcuiabá.png' },
  { id: 2, name: 'Caneca Premium', price: 49.90, image: 'img/caneca-techcuiabá.png' },
  { id: 3, name: 'Adesivo Pack', price: 29.90, image: 'img/adesivos-techcuiabá.png' },
  { id: 4, name: 'Ingresso VIP', price: 350.00, image: 'img/ingresso-vip.png' },
  { id: 5, name: 'Mochila Tech', price: 129.90, image: 'img/mochila.jpg' },
  { id: 6, name: 'Power Bank 10000mAh', price: 89.90, image: 'img/powerbank.jpg' },
  { id: 7, name: 'Mouse Gamer RGB', price: 119.90, image: 'img/mouse.jpg' },
  { id: 8, name: 'Notebook Stand', price: 59.90, image: 'img/stand.jpg' },
  { id: 9, name: 'Kit Caneta Tech', price: 35.00, image: 'img/canetas.jpg' },
  { id: 10, name: 'Boné Personalizado', price: 45.00, image: 'img/bone.jpg' },
  { id: 11, name: 'Caneca de Barro Artesanal', price: 65.00, image: 'img/caneca-barro.jpg' },
  { id: 12, name: 'Badge TechCuiabá 2025 (NFC)', price: 25.00, image: 'img/badge-nfc.jpg' }
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

// Renderização
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

// Toast
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

// Remover item do carrinho
function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  showToast('Item removido do carrinho.');
  setTimeout(() => window.location.reload(), 300);
}

// Desfavoritar produto
function unfavorite(productId) {
  let favorites = getFavorites();
  const index = favorites.indexOf(productId);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    showToast('Removido dos favoritos.');
    setTimeout(() => window.location.reload(), 300);
  }
}