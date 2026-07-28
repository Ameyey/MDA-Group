import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import ImageManagementModule from './components/ImageManagementModule';
import { Hero } from './components/Hero';
import { TrustedBrands } from './components/TrustedBrands';
import { ProductShowcase } from './components/ProductShowcase';
import { BrandWiseSection } from './components/BrandWiseSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TeamSection } from './components/TeamSection';
import { FAQSection } from './components/FAQSection';
import { QuoteSection } from './components/QuoteSection';
import { QuoteModal } from './components/QuoteModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';


export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState('home');

  // Modal States
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quoteItemsCount, setQuoteItemsCount] = useState(0);

  // Apply dark mode class to document root for Tailwind dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenQuoteModal = (product = null) => {
    setSelectedProductForQuote(product);
    setQuoteModalOpen(true);
    if (product) {
      setQuoteItemsCount(prev => prev + 1);
    }
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleSelectBrandFromTrusted = (brandName) => {
    setSelectedBrand(brandName);
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigatePage = (page) => {
    setCurrentPage(page);
    if (page === 'dashboard') {
      setActiveSection('dashboard');
      return;
    }
    setActiveSection('hero');
    const element = document.querySelector('#hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      
      {/* Top Header Navigation */}
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
        <div id="dashboard">
          <ImageManagementModule onBackToHome={() => handleNavigatePage('home')} />
        </div>
      ) : (
        <>
          {/* Hero Section with Full-Width Background Image */}
          <Hero
            onOpenQuoteModal={handleOpenQuoteModal}
            onExploreClick={handleExploreClick}
          />

          {/* Main Product Showcase Grid (All 20 Spares with HD Images, Prices, Badges) */}
          <ProductShowcase
            darkMode={darkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            onQuickView={handleQuickView}
            onGetQuote={handleOpenQuoteModal}
          />

          {/* Brand-Wise Products Matrix */}
          {/* <BrandWiseSection
            darkMode={darkMode}
            onGetQuote={handleOpenQuoteModal}
          /> */}

          {/* Product & Warehouse Gallery (12 HD Images Grid) */}
          <GallerySection
            darkMode={darkMode}
          />

          {/* Verified Customer Reviews (4 Customer Photos) */}
          <TestimonialsSection
            darkMode={darkMode}
          />

          {/* Meet Our Expert Team (5 Team Member Photos) */}
          {/* <TeamSection
            darkMode={darkMode}
          /> */}

          {/* FAQ Accordion Section */}
          {/* <FAQSection
            darkMode={darkMode}
          /> */}

          {/* Request a Quote Form Section */}
          <QuoteSection
            darkMode={darkMode}
          />
        </>
      )}

      {/* Footer with Payment Options & Partner Logos */}
      <Footer
        darkMode={darkMode}
      />

      {/* Floating Action WhatsApp Button */}
      <WhatsAppButton />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={selectedProductForQuote}
        darkMode={darkMode}
      />

      {/* Quick View Details Modal */}
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
