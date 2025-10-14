import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} دوکانی ستیکەر. هەموو مافەکان پارێزراون.
            </p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
