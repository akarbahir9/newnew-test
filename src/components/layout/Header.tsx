import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'سەرەکی' },
    { href: '/shop', label: 'دوکان' },
    { href: '/about', label: 'دەربارە' },
    { href: '/contact', label: 'پەیوەندی' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-primary">
            دوکانی ستیکەر
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                <User className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <ThemeToggle />
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-500 dark:text-gray-400">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="md:hidden pb-4"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors px-2 py-1 rounded-md" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"><Search className="w-6 h-6" /></button>
                        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"><User className="w-6 h-6" /></button>
                        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"><ShoppingCart className="w-6 h-6" /></button>
                    </div>
                    <ThemeToggle />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
