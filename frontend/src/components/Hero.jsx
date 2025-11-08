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
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden mt-28 md:mt-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070" 
          alt="Construction Site" 
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(4,75%,50%)]/70 via-[hsl(210,17%,20%)]/80 to-[hsl(210,17%,20%)]/90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
          İnşaatta Güvenin Adresi
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
          Modern yaşam alanları ve kurumsal projeler için profesyonel çözümler
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3.5 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(4,75%,40%)] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Projelerimiz
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3.5 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-[hsl(4,75%,50%)] transition-all duration-300"
          >
            Teklif Alın
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
