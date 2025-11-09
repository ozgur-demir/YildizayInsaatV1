import { useEffect, useState } from 'react';

const Hero = () => {
  const [featuredProject, setFeaturedProject] = useState(null);

  useEffect(() => {
    const fetchFeaturedProject = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await fetch(`${backendUrl}/api/content/estates/featured`);
        
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            setFeaturedProject(result.data);
          }
        }
      } catch (err) {
        console.error('Error fetching featured project:', err);
      }
    };

    fetchFeaturedProject();
  }, []);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')] bg-cover bg-center"></div>
        {/* Sophisticated Gradient Overlay */}
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
            {/* Badge */}
            <div className="inline-flex items-center px-5 py-2.5 bg-[hsl(45,100%,55%)]/15 backdrop-blur-sm border border-[hsl(45,100%,55%)]/30 rounded-full mb-8 animate-fade-in-up">
              <div className="w-2 h-2 bg-[hsl(45,100%,55%)] rounded-full mr-3 animate-pulse"></div>
              <span className="text-[hsl(45,100%,60%)] text-sm font-bold tracking-wider">PROFESYONEL İNŞAAT HİZMETLERİ</span>
            </div>

            {/* Main Heading */}
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

            {/* CTA Buttons */}
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

            {/* Value Propositions */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-[hsl(45,100%,55%)]/15 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-[hsl(45,100%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm text-white/90 font-semibold">Kalite Garantisi</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-[hsl(45,100%,55%)]/15 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-[hsl(45,100%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm text-white/90 font-semibold">Zamanında Teslimat</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-[hsl(45,100%,55%)]/15 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-[hsl(45,100%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="text-sm text-white/90 font-semibold">Uzman Ekip</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Project from API */}
          {featuredProject && (
            <div className="hidden lg:block">
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {/* Glassmorphism Card */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl animate-float">
                  {/* Glows */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-[hsl(45,100%,55%)] rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[hsl(355,65%,50%)] rounded-full opacity-15 blur-3xl"></div>
                  
                  <img 
                    src={featuredProject.coverUrl || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931'} 
                    alt={featuredProject.name || 'Featured Project'} 
                    className="w-full h-80 object-cover rounded-xl mb-6 ring-2 ring-white/10"
                  />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm font-medium">
                        Öne Çıkan Proje
                      </span>
                      <span className="px-3 py-1 bg-[hsl(45,100%,55%)]/20 text-[hsl(45,100%,60%)] text-xs font-bold rounded-full border border-[hsl(45,100%,55%)]/30">2024</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {featuredProject.name || 'Proje Adı'}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {featuredProject.shortDesc || 'Proje açıklaması burada gösterilecek.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
