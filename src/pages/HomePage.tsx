import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Product } from '../types/database.types';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8);

      if (error) {
        setError('نەتوانرا بەرهەمەکان بهێنرێت.');
        console.error(error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1620421680383-80f836a448a8?q=80&w=2070&auto=format&fit=crop" 
          alt="Stickers background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div 
          className="relative z-20 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            باشترین ستیکەرەکانی دای-کەت
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
            کۆمەڵەیەکی ناوازە لە ستیکەری کوالێتی بەرز بدۆزەرەوە بۆ ڕازاندنەوەی لاپتۆپ، بتڵی ئاو، و زیاتر.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-primary-600 transition-all duration-300 transform hover:scale-105"
          >
            <span>ئێستا بکڕە</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          بەرهەمە دیارەکان
        </h2>
        {loading && <div className="text-center">...بارکردن</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
