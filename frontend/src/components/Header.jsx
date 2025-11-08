import { useState } from 'react';

const Header = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 90;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_6474a059-a22b-4c37-b1ef-e3bebee970f4/artifacts/ihq1edzo_logo.png" 
              alt="YILDIZAY Logo" 
              className="h-14 w-14 md:h-16 md:w-16 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium transition-colors relative group"
                >
                  Hakkımızda
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium transition-colors relative group"
                >
                  Hizmetler
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium transition-colors relative group"
                >
                  Projeler
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('news')} 
                  className="text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium transition-colors relative group"
                >
                  Haberler
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium transition-colors relative group"
                >
                  İletişim
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100"
              >
                Hakkımızda
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('services')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100"
              >
                Hizmetler
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100"
              >
                Projeler
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('news')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100"
              >
                Haberler
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2"
              >
                İletişim
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
