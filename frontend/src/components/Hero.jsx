const Hero = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Construction Image Background - Subtle */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[hsl(43,96%,56%)]/20 border border-[hsl(43,96%,56%)]/30 rounded-full mb-6 animate-fade-in-up">
              <div className="w-2 h-2 bg-[hsl(43,96%,56%)] rounded-full mr-2 animate-pulse"></div>
              <span className="text-[hsl(43,96%,56%)] text-xs font-bold tracking-wider">SEKTÖRDE 20+ YIL GÜVEN</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              İnşaatta
              <span className="block mt-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Yenilikçi
              </span>
              <span className="block mt-2 text-[hsl(43,96%,56%)]">
                Çözümler
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Modern mimari tasarım ve sürdürülebilir inşaat teknolojileri ile hayalinizdeki projeleri gerçeğe dönüştürüyoruz.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-[hsl(43,96%,56%)] hover:bg-[hsl(43,96%,50%)] text-[hsl(215,45%,25%)] text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Projelerimizi Keşfedin</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-transparent text-white text-base font-semibold rounded-xl border-2 border-slate-500 hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>Ücretsiz Danışmanlık</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t border-slate-700 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-slate-400">Tamamlanan Proje</div>
              </div>
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-slate-400">Mutlu Müşteri</div>
              </div>
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">%100</div>
                <div className="text-sm text-slate-400">Memnuniyet</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="hidden lg:block">
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {/* Floating Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl animate-float">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[hsl(43,96%,56%)] rounded-xl opacity-20 blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931" 
                  alt="Construction Team" 
                  className="w-full h-80 object-cover rounded-xl mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-medium">Son Proje</span>
                    <span className="px-3 py-1 bg-[hsl(43,96%,56%)]/20 text-[hsl(43,96%,56%)] text-xs font-bold rounded-full">2024</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Modern Rezidans Kompleksi</h3>
                  <p className="text-slate-400 text-sm">200 daireli lüks yaşam alanı projesi başarıyla tamamlandı.</p>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-800"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-slate-800"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-800"></div>
                    </div>
                    <span className="text-slate-400 text-xs">+50 Ekip Üyesi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-2">
          <div className="w-1 h-1 bg-[hsl(43,96%,56%)] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
