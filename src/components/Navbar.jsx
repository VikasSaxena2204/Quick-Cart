import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { products_categories } from '../data/products';
import { ProductContext } from '../context/ProductContext';
import { ThemeContext } from '../context/Theme';

export default function Navbar() {
  const { invoice } = useContext(ProductContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (element) => (element?.isActive ? 'text-blue-600' : '');

  return (
    <div
      className={`w-full h-20 flex items-center justify-between px-8 fixed top-0 z-50 shadow-md ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-indigo-950 text-white'
      }`}
    >
      
      <div className="flex items-center gap-4">
        <NavLink className="flex flex-col items-center" to="/">
          <img
            className="w-12 h-12"
            src={require('../images/shopping-cart.png')}
            alt="QuickCart Logo"
          />
          <span className="font-bold text-amber-500">QuickCart</span>
        </NavLink>
        <button
          onClick={toggleTheme}
          className="text-2xl p-2 rounded-full hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="flex-1 mx-4 hidden md:flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="text-slate-800 flex-1 py-2 px-4 rounded-md outline-none border focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
        />
        <button className="py-2 px-4 m-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition">
          Search
        </button>
      </div>

      <ul
        className={`flex flex-col md:flex-row items-center gap-4 absolute md:static md:flex bg-indigo-950 md:bg-transparent top-20 left-0 right-0 py-4 md:py-0 md:translate-x-0 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:transition-none ${
          theme === 'dark' ? 'bg-gray-900 md:bg-transparent' : ''
        }`}
      >
        {products_categories.map((category) => (
          <li key={category.value}>
            <NavLink
              className={`text-lg font-medium hover:text-amber-400 ${isActive}`}
              to={`/${category.value}`}
            >
              {category.label}
            </NavLink>
          </li>
        ))}
        <li>
          <Link className="md:hidden block text-lg font-medium hover:text-amber-400" to="/cart">
            Cart
          </Link>
        </li>
      </ul>

      {/*  Cart Icon */}
      <Link className="relative md:ml-6" to="/cart">
        <FaShoppingCart className="text-2xl" />
        {invoice?.count > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-red-600 text-white flex items-center justify-center rounded-full">
            {invoice?.count}
          </div>
        )}
      </Link>

      {/* Menu Toggler */}
      <button
        onClick={toggleMenu}
        className="text-2xl md:hidden p-2 rounded-full hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
}
