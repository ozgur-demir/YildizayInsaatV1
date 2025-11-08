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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')] bg-cover bg-center bg-fixed"></div>
        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-[hsl(4,75%,50%)]/40 to-black/80"></div>
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
        }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-[hsl(45,100%,47%)] rounded-full mr-3 animate-pulse"></span>
            <span className="text-white text-sm font-semibold tracking-wide">20+ YIL SEKTÖR DENEYİMİ</span>
          </div>

          {/* Main Heading - Bold & Impactful */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="block mb-2">İnşaatta Güvenin</span>
            <span className="bg-gradient-to-r from-white via-white to-[hsl(45,100%,47%)] bg-clip-text text-transparent">
              Profesyonel Adresi
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Modern yaşam alanları, ticari yapılar ve altyapı projeleri için
            <span className="text-[hsl(45,100%,47%)] font-semibold"> yenilikçi çözümler</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => scrollToSection('projects')}
              className="group px-10 py-5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(4,75%,40%)] text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-[hsl(4,75%,50%)]/50 hover:scale-105 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Projelerimizi İnceleyin</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-xl border-2 border-white/30 hover:bg-white hover:text-[hsl(4,75%,50%)] hover:border-white transition-all duration-300 flex items-center space-x-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Ücretsiz Teklif Alın</span>
            </button>
          </div>

          {/* Trust Indicators - Stats Row */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                150+
              </div>
              <div className="text-sm md:text-base text-gray-300 font-medium">Tamamlanan Proje</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                20+
              </div>
              <div className="text-sm md:text-base text-gray-300 font-medium">Yıl Tecrübe</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-sm md:text-base text-gray-300 font-medium">Mutlu Müşteri</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-14 border-2 border-white/40 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
