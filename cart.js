const { render } = require("vue");

const cart = [];
const badge = document.getElementById('cart-badge');
function addToCart(id, name, price, image) {
    const item = cart.find(i=> i.id === id);
    if (item) {
        item.qty++;
    } else {
        cart.push({id, name, price, image, qty: 1});
    }
    updateBadge();
    renderCart();
}

function changeQty(id, delta) {
    const item = cart.find(i=> i.id === id);
    item.qty += delta;
    if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
    updateBadge();
    renderCart();
}

function updateBadge() {
    badge.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
    const list = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    
    if (cart.length === 0) {
        list.innerHTML = '<p class="cart-empty">.🍽️ Кошик порожній</p>';
        footer.style.display = 'none';
        return;
    }

    list.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.image}" alt="${i.name}" />
      <div class="cart-item-info">
        <span>${i.name}</span>
        <b>${i.price} грн</b>
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQty(${i.id}, -1)">−</button>
        <span>${i.qty}</span>
        <button onclick="changeQty(${i.id}, +1)">+</button>
      </div>
    </div>
  `).join('');


    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById('cart-total').textContent = `Разом: ${total} грн`;
    footer.style.display = 'block';
}

document.getElementById('cart-icon').onclick = () => document.getElementById('cart-drarwer').classList.add('open');
document.getElementById('cart-close').onclick = () => document.getElementById('cart-drarwer').classList.remove('open');
document.getElementById('cart-overlay').onclick = () => document.getElementById('cart-drarwer').classList.remove('open');