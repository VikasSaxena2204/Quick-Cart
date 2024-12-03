import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';

export default function Products() {
  const { products, addCart, removeCart, cart } = useContext(ProductContext);

  // Track quantities of items
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; 
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + change);
      return { ...prev, [id]: newQty };
    });
  };

  const isProductInCart = (id) => {
    return cart.some((product) => product.id === id);
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products &&
        products.map((product) => {
          const inCart = isProductInCart(product.id);
          const cartProduct = cart.find((prod) => prod.id === product.id);
          const quantityInCart = cartProduct ? cartProduct.quantity : 0;

          return (
            <div
              key={product.id}
              className="bg-green-50 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain bg-slate-200 p-4 border border-gray-200 rounded-lg"
              />

              {/* Product Info */}
              <div className="p-4 flex flex-col gap-2 bg-green-50">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">${product.price}</p>
                <p className="text-xs text-gray-500">{product.smallDescription}</p>
              </div>

              {/* Quantity Selector */}
              <div className="p-4 flex items-center justify-between gap-4 bg-green-50">
                <div className="flex items-center border rounded-md text-slate-950 ">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantities[product.id] || 1}
                    readOnly
                    className="w-12 text-center bg-white border-0"
                  />
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                {inCart && (
                  <button
                    onClick={() => removeCart(product)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full bg-blue-600 text-white text-lg py-2 rounded-b-lg hover:bg-blue-800 transition"
                onClick={() => addCart({ ...product, quantity: quantities[product.id] || 1 })}
              >
                {inCart ? `Added (${quantityInCart})` : '+ Add To Cart'}
              </button>
            </div>
          );
        })}
    </div>
  );
}
