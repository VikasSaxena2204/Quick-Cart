import './App.css';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useContext, useEffect } from 'react';
import { ProductContext } from './context/ProductContext';
import ThemeProvider from './context/Theme';

function App() {
  const { filterProducts } = useContext(ProductContext);
  const { category } = useParams();

  useEffect(() => {
    filterProducts(category);
  }, [category, filterProducts]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 w-[90%] mx-auto p-6 md:p-10 bg-white dark:bg-gray-800 shadow-md rounded-lg my-12">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
