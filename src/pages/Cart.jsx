import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function Cart() {
  const { cart, invoice, removeCart, setCart, setInvoice } = useContext(ProductContext);
  const navigate = useNavigate();

  const discount = { type: 'percentage', value: 10 }; 

  // Calculate total cost 
  const calculateFinalPrice = () => {
    const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const discountAmount =
      discount.type === 'percentage'
        ? (subtotal * discount.value) / 100
        : discount.type === 'fixed'
        ? discount.value
        : 0;
    return { subtotal, discountAmount, finalPrice: subtotal - discountAmount };
  };

  const { subtotal, discountAmount, finalPrice } = calculateFinalPrice();

  const placeOrder = () => {
    setCart([]);
    setInvoice({ count: 0, subTotal: 0 });
    navigate('/success');
  };

  return (
    <div className="p-6 min-h-screen">
      {cart.length > 0 ? (
        <div>
          {cart.map((product) => (
            <div
              key={product.id}
              className="shadow-md p-4 flex items-center gap-4 justify-between rounded-lg bg-white mb-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-contain border border-gray-200 rounded-lg"
              />
              <div className="flex flex-col gap-2 w-[300px] md:w-[450px]">
                <p className="font-bold text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-500">{product.smallDescription}</p>
                <p className="text-sm text-blue-500">Qty: {product.quantity}</p>
              </div>
              <p className="font-semibold text-gray-800">${product.price.toFixed(2)}</p>
              <IoIosRemoveCircleOutline
                className="text-red-600 text-2xl cursor-pointer hover:text-red-800 transition"
                onClick={() => removeCart(product)}
              />
            </div>
          ))}

          {/* Order Summary */}
          <div className="flex flex-col items-end gap-4 py-6 bg-white shadow-md p-6 rounded-lg">
            <p className="font-bold text-gray-700">
              Subtotal ({invoice.count} {invoice.count > 1 ? 'items' : 'item'}): ${subtotal.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Discount ({discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}): -$
              {discountAmount.toFixed(2)}
            </p>
            <p className="font-bold text-lg text-gray-800">Final Price: ${finalPrice.toFixed(2)}</p>
            <button
              className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-800 transition w-full md:w-auto"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-xl justify-center p-6 gap-4 flex-col">
          <div className="text-orange-600 flex items-center gap-2 ">
            <span>🛒 Your cart is empty!</span>
          </div>
          <Link
            className="text-blue-600 hover:text-blue-500 transition text-2xl"
            to={'/'}
          >
            Add Products
          </Link>
        </div>
      )}
    </div>
  );
}
