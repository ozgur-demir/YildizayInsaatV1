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
        ? 'bg-white/95 backdrop-blur-lg shadow-xl py-3 border-b border-slate-100' 
        : 'bg-gradient-to-b from-black/30 to-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_6474a059-a22b-4c37-b1ef-e3bebee970f4/artifacts/ihq1edzo_logo.png" 
              alt="YILDIZAY Logo" 
              className={`object-contain hover:scale-105 transition-all duration-300 cursor-pointer ${
                isScrolled ? 'h-14 w-14' : 'h-16 w-16 md:h-20 md:w-20'
              }`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button 
              onClick={() => scrollToSection('about')} 
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-slate-700 hover:text-[hsl(215,45%,25%)] hover:bg-slate-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Hakkımızda
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-slate-700 hover:text-[hsl(215,45%,25%)] hover:bg-slate-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Hizmetler
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-slate-700 hover:text-[hsl(215,45%,25%)] hover:bg-slate-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Projeler
            </button>
            <button 
              onClick={() => scrollToSection('news')} 
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-slate-700 hover:text-[hsl(215,45%,25%)] hover:bg-slate-50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Haberler
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="ml-2 px-6 py-2.5 bg-[hsl(43,96%,56%)] hover:bg-[hsl(43,96%,50%)] text-[hsl(215,45%,25%)] text-sm font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              İletişim
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden flex flex-col space-y-1.5 p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-7 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-slate-700' : 'bg-white'
            } ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}></span>
            <span className={`block w-7 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-slate-700' : 'bg-white'
            } ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block w-7 h-0.5 transition-all duration-300 ${
              isScrolled ? 'bg-slate-700' : 'bg-white'
            } ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden fixed inset-0 bg-gradient-to-br from-[hsl(215,45%,25%)] to-[hsl(215,40%,20%)] transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`} style={{ top: 0 }}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-2xl text-white font-bold hover:text-[hsl(43,96%,56%)] transition-colors"
          >
            Hakkımızda
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-2xl text-white font-bold hover:text-[hsl(43,96%,56%)] transition-colors"
          >
            Hizmetler
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-2xl text-white font-bold hover:text-[hsl(43,96%,56%)] transition-colors"
          >
            Projeler
          </button>
          <button 
            onClick={() => scrollToSection('news')} 
            className="text-2xl text-white font-bold hover:text-[hsl(43,96%,56%)] transition-colors"
          >
            Haberler
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="px-10 py-4 bg-[hsl(43,96%,56%)] text-[hsl(215,45%,25%)] text-xl font-bold rounded-lg shadow-xl hover:scale-105 transition-all"
          >
            İletişim
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
