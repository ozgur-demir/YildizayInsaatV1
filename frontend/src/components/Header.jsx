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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-lg shadow-lg py-3' 
        : 'bg-gradient-to-b from-[hsl(0,0%,15%)]/40 to-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - MUCH BIGGER */}
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

          {/* Mobile Menu Button */}
          <button 
            id="mobileMenuToggle"
            className="lg:hidden flex flex-col space-y-1.5 p-2 z-[100] relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-7 h-0.5 transition-all duration-300 ${
              mobileMenuOpen ? 'bg-white' : (isScrolled ? 'bg-[hsl(30,8%,25%)]' : 'bg-white')
            } ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`block w-7 h-0.5 transition-all duration-300 ${
              mobileMenuOpen ? 'bg-white' : (isScrolled ? 'bg-[hsl(30,8%,25%)]' : 'bg-white')
            } ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block w-7 h-0.5 transition-all duration-300 ${
              mobileMenuOpen ? 'bg-white' : (isScrolled ? 'bg-[hsl(30,8%,25%)]' : 'bg-white')
            } ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden fixed inset-0 bg-gradient-to-br from-[hsl(0,0%,15%)] to-[hsl(30,8%,20%)] transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`} style={{ top: 0 }}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-2xl text-white font-bold hover:text-[hsl(45,100%,55%)] transition-colors"
          >
            Hakkımızda
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-2xl text-white font-bold hover:text-[hsl(45,100%,55%)] transition-colors"
          >
            Hizmetler
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-2xl text-white font-bold hover:text-[hsl(45,100%,55%)] transition-colors"
          >
            Projeler
          </button>
          <button 
            onClick={() => scrollToSection('news')} 
            className="text-2xl text-white font-bold hover:text-[hsl(45,100%,55%)] transition-colors"
          >
            Haberler
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="px-10 py-4 bg-gradient-to-r from-[hsl(355,65%,45%)] to-[hsl(355,65%,38%)] text-white text-xl font-bold rounded-lg shadow-xl hover:scale-105 transition-all"
          >
            İletişim
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
