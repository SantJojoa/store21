export interface CartItem {
    productId: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    imageUrl: string;
}

const CART_KEY = "store21-cart";

export function getCart(): CartItem[] {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveCart(cart: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart:updated"));
}

export function addToCart(item: CartItem) {
    const cart = getCart();
    const existing = cart.find((i) => i.productId === item.productId && i.size === item.size);

    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    saveCart(cart);
}

export function removeFromCart(index: number) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

export function updateQuantity(index: number, quantity: number) {
    const cart = getCart();
    if (cart[index]) {
        cart[index].quantity = Math.max(1, quantity);
        saveCart(cart);
    }
}

export function getCartTotal(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function clearCart() {
    saveCart([]);
}