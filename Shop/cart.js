// Product database
const products = {
    1: { id: 1, name: "Premium Headphones", price: 149.99, image: "/api/placeholder/100/100" },
    2: { id: 2, name: "Wireless Mouse", price: 29.99, image: "/api/placeholder/100/100" },
    3: { id: 3, name: "Smart Watch", price: 199.99, image: "/api/placeholder/100/100" }
};

// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        cart[productId] = {
            ...products[productId],
            quantity: 1
        };
    }
    saveCart();
    showNotification('Item added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    delete cart[productId];
    saveCart();
    renderCart();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    cart[productId].quantity = newQuantity;
    saveCart();
    renderCart();
}

// Calculate cart totals
function calculateTotals() {
    const subtotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Render cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');

    if (!cartItemsContainer) return; // Not on cart page

    if (Object.keys(cart).length === 0) {
        cartItemsContainer.parentElement.style.display = 'none';
        emptyCartMessage.style.display = 'flex';
        return;
    }

    cartItemsContainer.parentElement.style.display = 'grid';
    emptyCartMessage.style.display = 'none';

    // Render cart items
    cartItemsContainer.innerHTML = Object.values(cart).map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="price">$${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <p class="item-total">$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update totals
    const { subtotal, shipping, total } = calculateTotals();
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    // Add event listeners for add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        });
    });

    // Add event listener for checkout button
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (Object.keys(cart).length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            alert('Proceeding to checkout... (Implementation pending)');
        });
    }
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #007bff;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-out 2.7s;
        z-index: 1000;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);