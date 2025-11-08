import { useState } from 'react';

const Header = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 140;
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
        {/* Desktop Layout: Centered Logo with Navigation Below */}
        <div className="hidden md:flex flex-col items-center py-4">
          {/* Logo - Much Larger */}
          <div className="mb-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_6474a059-a22b-4c37-b1ef-e3bebee970f4/artifacts/ihq1edzo_logo.png" 
              alt="YILDIZAY Logo" 
              className="h-28 w-28 lg:h-32 lg:w-32 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Desktop Navigation Below Logo */}
          <nav>
            <ul className="flex items-center space-x-10">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-lg text-gray-700 hover:text-[hsl(4,75%,50%)] font-semibold transition-colors relative group"
                >
                  Hakkımızda
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-lg text-gray-700 hover:text-[hsl(4,75%,50%)] font-semibold transition-colors relative group"
                >
                  Hizmetler
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="text-lg text-gray-700 hover:text-[hsl(4,75%,50%)] font-semibold transition-colors relative group"
                >
                  Projeler
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('news')} 
                  className="text-lg text-gray-700 hover:text-[hsl(4,75%,50%)] font-semibold transition-colors relative group"
                >
                  Haberler
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-lg text-gray-700 hover:text-[hsl(4,75%,50%)] font-semibold transition-colors relative group"
                >
                  İletişim
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Layout: Logo Left, Menu Right */}
        <div className="md:hidden flex items-center justify-between py-4">
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_6474a059-a22b-4c37-b1ef-e3bebee970f4/artifacts/ihq1edzo_logo.png" 
              alt="YILDIZAY Logo" 
              className="h-16 w-16 object-contain cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="flex flex-col space-y-1.5 p-2"
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
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100 text-lg"
              >
                Hakkımızda
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('services')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100 text-lg"
              >
                Hizmetler
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100 text-lg"
              >
                Projeler
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('news')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 border-b border-gray-100 text-lg"
              >
                Haberler
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left text-gray-700 hover:text-[hsl(4,75%,50%)] font-medium py-2 text-lg"
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
