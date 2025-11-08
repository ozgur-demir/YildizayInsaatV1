const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 90;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[hsl(210,17%,20%)] to-[hsl(215,15%,25%)] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Company Info */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_6474a059-a22b-4c37-b1ef-e3bebee970f4/artifacts/ihq1edzo_logo.png" 
              alt="YILDIZAY Logo" 
              className="h-20 w-20 mb-6"
            />
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              20 yılı aşkın tecrübemizle konut, ticari yapı ve altyapı projelerinde 
              güvenilir çözümler sunuyoruz.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[hsl(4,75%,50%)] hover:to-[hsl(45,100%,47%)] rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[hsl(4,75%,50%)] hover:to-[hsl(45,100%,47%)] rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[hsl(4,75%,50%)] hover:to-[hsl(45,100%,47%)] rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                onClick={(e) => e.preventDefault()}
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[hsl(4,75%,50%)] hover:to-[hsl(45,100%,47%)] rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                onClick={(e) => e.preventDefault()}
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hızlı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block"
                >
                  Hakkımızda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block"
                >
                  Hizmetler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block"
                >
                  Projeler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('news')} 
                  className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block"
                >
                  Haberler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block"
                >
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hizmetler</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block">
                  Konut İnşaatı
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block">
                  Ticari Yapılar
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block">
                  Tadilat & Renovasyon
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block">
                  Altyapı Projeleri
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[hsl(45,100%,47%)] transition-colors hover:translate-x-1 inline-block">
                  Proje Danışmanlığı
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">İletişim</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="leading-relaxed">
                Merkez Mahallesi, İnşaat Caddesi No:123<br />
                İstanbul, Türkiye
              </li>
              <li>
                <a href="tel:+902125551234" className="hover:text-[hsl(45,100%,47%)] transition-colors">
                  +90 212 555 12 34
                </a>
              </li>
              <li>
                <a href="mailto:info@yildizay.com" className="hover:text-[hsl(45,100%,47%)] transition-colors">
                  info@yildizay.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 YILDIZAY İnşaat. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
