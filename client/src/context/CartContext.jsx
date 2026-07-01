import { createContext, useEffect, useState } from "react"

export const CartContext = createContext();

const CartContextProvider = (props) => {

    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('app_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('app_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.product._id === product._id);
            if (existing)
                return prev.map(item => item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item);
            return [...prev, { product, quantity }];
        })
        setIsCartOpen(true);
    }

    const removeFromCart = (productId) => {
        setItems(prev => prev.filter(item => item.product._id !== productId));
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems(prev => prev.map(item => item.product._id === productId ? { ...item, quantity } : item))
    }

    const clearCart = () => {
        setItems([]);
        setIsCartOpen(false);
    }

    const cartCount = items.reduce((sum, item) => {
        return sum + item.quantity
    }, 0)

    const cartTotal = items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0)

    const value = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
    };

    return (
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>)
}

export default CartContextProvider;