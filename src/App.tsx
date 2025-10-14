import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Add other routes here, e.g., for Shop, About, Contact */}
              <Route path="/shop" element={<div className="text-center p-10">دوکان - بەم زووانە</div>} />
              <Route path="/about" element={<div className="text-center p-10">دەربارە - بەم زووانە</div>} />
              <Route path="/contact" element={<div className="text-center p-10">پەیوەندی - بەم زووانە</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
