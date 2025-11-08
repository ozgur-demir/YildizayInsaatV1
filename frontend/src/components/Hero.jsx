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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')] bg-cover bg-center"></div>
        {/* Sophisticated Gradient Overlay - Brand Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,15%)]/85 via-[hsl(355,65%,20%)]/60 to-[hsl(30,8%,15%)]/90"></div>
        {/* Subtle warm pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,193,70,.1) 10px, rgba(255,193,70,.1) 20px)'
        }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge with brand colors */}
            <div className="inline-flex items-center px-5 py-2.5 bg-[hsl(45,100%,55%)]/15 backdrop-blur-sm border border-[hsl(45,100%,55%)]/30 rounded-full mb-8 animate-fade-in-up">
              <div className="w-2 h-2 bg-[hsl(45,100%,55%)] rounded-full mr-3 animate-pulse"></div>
              <span className="text-[hsl(45,100%,60%)] text-sm font-bold tracking-wider">20+ YIL SEKTÖR LİDERİ</span>
            </div>

            {/* Main Heading - Using brand red and gold */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="block mb-2">İnşaatta</span>
              <span className="block mb-2 bg-gradient-to-r from-white via-[hsl(40,95%,70%)] to-[hsl(45,100%,55%)] bg-clip-text text-transparent">
                Güvenin
              </span>
              <span className="block text-[hsl(45,100%,55%)]">
                Adresi
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="text-[hsl(45,100%,65%)] font-semibold">Kalite</span>, 
              <span className="text-[hsl(45,100%,65%)] font-semibold"> güvenlik</span> ve 
              <span className="text-[hsl(45,100%,65%)] font-semibold"> zamanında teslimat</span> ile 
              modern yaşam alanlarını hayata geçiriyoruz.
            </p>

            {/* CTA Buttons - Brand colors */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] hover:from-[hsl(355,65%,55%)] hover:to-[hsl(355,65%,47%)] text-white text-base font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Projelerimizi Görün</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-base font-semibold rounded-xl border-2 border-white/40 hover:bg-white hover:text-[hsl(355,65%,45%)] hover:border-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Ücretsiz Teklif Alın</span>
              </button>
            </div>

            {/* Trust Indicators - Brand styled */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-[hsl(45,100%,60%)] bg-clip-text text-transparent mb-1">150+</div>
                <div className="text-sm text-white/70">Tamamlanan Proje</div>
              </div>
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-[hsl(45,100%,60%)] bg-clip-text text-transparent mb-1">500+</div>
                <div className="text-sm text-white/70">Mutlu Müşteri</div>
              </div>
              <div className="text-left">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-[hsl(45,100%,60%)] bg-clip-text text-transparent mb-1">20+</div>
                <div className="text-sm text-white/70">Yıl Tecrübe</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Card */}
          <div className="hidden lg:block">
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {/* Glassmorphism Card with brand accent */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl animate-float">
                {/* Gold glow */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[hsl(45,100%,55%)] rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[hsl(355,65%,50%)] rounded-full opacity-15 blur-3xl"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931" 
                  alt="Construction Excellence" 
                  className="w-full h-80 object-cover rounded-xl mb-6 ring-2 ring-white/10"
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">Son Projemiz</span>
                    <span className="px-3 py-1 bg-[hsl(45,100%,55%)]/20 text-[hsl(45,100%,60%)] text-xs font-bold rounded-full border border-[hsl(45,100%,55%)]/30">2024</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Modern Rezidans Kompleksi</h3>
                  <p className="text-white/70 text-sm leading-relaxed">200 daireli lüks yaşam alanı projesi üstün kalite standartlarıyla tamamlandı.</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[hsl(45,100%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white/80 text-sm font-semibold">Premium Kalite</span>
                    </div>
                    <span className="text-[hsl(45,100%,55%)] text-xs font-bold">+50 Ekip</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-[hsl(45,100%,55%)]/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-1 bg-[hsl(45,100%,55%)] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
