import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuoteSection } from './components/QuoteSection';
import { QuoteModal } from './components/QuoteModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { DashboardPage } from './components/DashboardPage';

export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState('home');

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quoteItemsCount, setQuoteItemsCount] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleOpenQuoteModal = (product = null) => {
    setSelectedProductForQuote(product);
    setQuoteModalOpen(true);
    if (product) {
      setQuoteItemsCount((prev) => prev + 1);
    }
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleExploreClick = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigatePage = (page) => {
    if (page === 'dashboard') {
      setCurrentPage('dashboard');
      setActiveSection('dashboard');
      return;
    }

    setCurrentPage('home');
    setActiveSection('hero');
    const element = document.querySelector('#hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        quoteItemsCount={quoteItemsCount}
        onOpenQuoteModal={handleOpenQuoteModal}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {currentPage === 'dashboard' ? (
        <div id="dashboard" className="px-0 py-0">
          <DashboardPage onBackToHome={() => handleNavigatePage('home')} />
        </div>
      ) : (
        <>
          <Hero onOpenQuoteModal={handleOpenQuoteModal} onExploreClick={handleExploreClick} />
          <ProductShowcase
            darkMode={darkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            onQuickView={handleQuickView}
            onGetQuote={handleOpenQuoteModal}
          />
          <GallerySection darkMode={darkMode} />
          <TestimonialsSection darkMode={darkMode} />
          <QuoteSection darkMode={darkMode} />
        </>
      )}

      <Footer darkMode={darkMode} />
      <WhatsAppButton />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={selectedProductForQuote}
        darkMode={darkMode}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onGetQuote={handleOpenQuoteModal}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
