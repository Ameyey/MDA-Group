import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
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

  // Modal States
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quoteItemsCount, setQuoteItemsCount] = useState(0);

  // Apply dark mode class to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
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

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
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
      />

      {/* Hero Section with Full-Width Background Image */}
      <Hero
        onOpenQuoteModal={handleOpenQuoteModal}
        onExploreClick={handleExploreClick}
      />

      {/* Our Trusted Brands Section with White & Black Logos */}
      <TrustedBrands
        darkMode={darkMode}
        onSelectBrand={handleSelectBrandFromTrusted}
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
      <BrandWiseSection
        darkMode={darkMode}
        onGetQuote={handleOpenQuoteModal}
      />

      {/* Product & Warehouse Gallery (12 HD Images Grid) */}
      <GallerySection
        darkMode={darkMode}
      />

      {/* Verified Customer Reviews (4 Customer Photos) */}
      <TestimonialsSection
        darkMode={darkMode}
      />

      {/* Meet Our Expert Team (5 Team Member Photos) */}
      <TeamSection
        darkMode={darkMode}
      />

      {/* FAQ Accordion Section */}
      <FAQSection
        darkMode={darkMode}
      />

      {/* Request a Quote Form Section */}
      <QuoteSection
        darkMode={darkMode}
      />

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
