import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/database.types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative">
        <img 
          src={product.image_url || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/6366f1/white?text=Sticker'} 
          alt={product.name} 
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">نوێ</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 h-10 overflow-hidden">{product.description || 'بێ وەسف'}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">{product.price.toFixed(2)} IQD</p>
          <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-colors duration-300">
            <ShoppingCart className="w-4 h-4" />
            <span>زیادیکە</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
