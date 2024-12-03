import React, { createContext, useState, useEffect, useCallback } from 'react';
import { products_data } from "../data/products";

export const ProductContext = createContext([]);

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState(products_data);
    const [cart, setCart] = useState([]);
    const [invoice, setInvoice] = useState({ count: 0, subTotal: 0 });
    const [message, setMessage] = useState('');

    const addCart = (product) => {
        setMessage(`${product.name} added to the cart`);
        setCart((prevCart) => {
            const existingProduct = prevCart.find((prod) => prod.id === product.id);
            if (!existingProduct) {
                return [...prevCart, { ...product, quantity: product.quantity }];
            }
            return prevCart.map((prod) =>
                prod.id === product.id ? { ...prod, quantity: prod.quantity + 1 } : prod
            );
        });
    };

    const removeCart = (product) => {
        setMessage(`${product.name} removed from the cart`);
        setCart((prevCart) => prevCart.filter((prod) => prod.id !== product.id));
    };

    const filterProducts = useCallback((category) => {
        if (category) {
            const filteredProducts = products_data.filter((product) => product.category === category);
            setProducts(filteredProducts);
        } else {
            setProducts(products_data);
        }
    }, []);

    const setInvoiceData = useCallback(() => {
        setInvoice((prevInvoice) => {
            let newInvoice = { ...prevInvoice, count: 0, subTotal: 0 };
            cart.forEach((product) => {
                newInvoice.count += product.quantity;
                newInvoice.subTotal += product.quantity * product.price;
            });
            return newInvoice;
        });
    }, [cart]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage('');
        }, 600);
        setInvoiceData();
        return () => clearTimeout(timeout);
    }, [cart, setInvoiceData]);

    return (
        <ProductContext.Provider value={{ products, filterProducts, addCart, removeCart, invoice, setInvoice, cart, setCart }}>
            {message && (
                <div className="fixed rounded-md shadow-lg right-0 top-20 bg-green-600 text-white min-w-[300px] p-2 text-center"
                style={{ zIndex: 9999 }}>
                    {message}
                </div>
            )}
            {children}
        </ProductContext.Provider>
    );
};
