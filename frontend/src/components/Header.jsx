import { useState, useEffect } from 'react';

const Header = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      setTimeout(() => {
        const headerHeight = 90;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }, 300);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-gradient-to-b from-[hsl(0,0%,15%)]/40 to-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_6474a059-a22b-4c37-b1ef-e3bebee970f4/artifacts/ihq1edzo_logo.png" 
                alt="YILDIZAY Logo" 
                className={`object-contain hover:scale-105 transition-all duration-300 cursor-pointer ${
                  isScrolled ? 'h-24 w-24 md:h-28 md:w-28' : 'h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40'
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button 
                onClick={() => scrollToSection('about')} 
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[hsl(30,8%,25%)] hover:text-[hsl(355,65%,45%)] hover:bg-[hsl(30,20%,96%)]' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Hakkımızda
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[hsl(30,8%,25%)] hover:text-[hsl(355,65%,45%)] hover:bg-[hsl(30,20%,96%)]' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Hizmetler
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[hsl(30,8%,25%)] hover:text-[hsl(355,65%,45%)] hover:bg-[hsl(30,20%,96%)]' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Projeler
              </button>
              <button 
                onClick={() => scrollToSection('news')} 
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[hsl(30,8%,25%)] hover:text-[hsl(355,65%,45%)] hover:bg-[hsl(30,20%,96%)]' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Haberler
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="ml-2 px-6 py-2.5 bg-gradient-to-r from-[hsl(355,65%,45%)] to-[hsl(355,65%,38%)] hover:from-[hsl(355,65%,50%)] hover:to-[hsl(355,65%,43%)] text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                İletişim
              </button>
            </nav>

            {/* Mobile Menu Button - NEW DESIGN */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center z-[100] pointer-events-auto"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  mobileMenuOpen 
                    ? 'bg-white rotate-45 translate-y-2' 
                    : (isScrolled ? 'bg-[hsl(30,8%,25%)]' : 'bg-white')
                }`}></span>
                <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  mobileMenuOpen 
                    ? 'bg-white opacity-0' 
                    : (isScrolled ? 'bg-[hsl(30,8%,25%)]' : 'bg-white')
                }`}></span>
                <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  mobileMenuOpen 
                    ? 'bg-white -rotate-45 -translate-y-2' 
                    : (isScrolled ? 'bg-[hsl(30,8%,25%)]' : 'bg-white')
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* NEW MOBILE MENU - FULL SCREEN OVERLAY */}
      <div 
        className={`fixed inset-0 bg-[hsl(0,0%,10%)] z-[90] lg:hidden transition-opacity duration-500 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center h-full px-8">
          <nav className="flex flex-col items-center space-y-8 w-full max-w-sm">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-2xl font-bold text-white hover:text-[hsl(45,100%,55%)] transition-all duration-300 transform hover:scale-110"
            >
              Hakkımızda
            </button>
            <div className="w-20 h-px bg-white/20"></div>
            
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-2xl font-bold text-white hover:text-[hsl(45,100%,55%)] transition-all duration-300 transform hover:scale-110"
            >
              Hizmetler
            </button>
            <div className="w-20 h-px bg-white/20"></div>
            
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-2xl font-bold text-white hover:text-[hsl(45,100%,55%)] transition-all duration-300 transform hover:scale-110"
            >
              Projeler
            </button>
            <div className="w-20 h-px bg-white/20"></div>
            
            <button 
              onClick={() => scrollToSection('news')} 
              className="text-2xl font-bold text-white hover:text-[hsl(45,100%,55%)] transition-all duration-300 transform hover:scale-110"
            >
              Haberler
            </button>
            <div className="w-20 h-px bg-white/20"></div>
            
            <button 
              onClick={() => scrollToSection('contact')} 
              className="mt-4 px-12 py-4 bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] text-white text-xl font-bold rounded-xl shadow-2xl hover:scale-110 transition-all duration-300"
            >
              İletişim
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
