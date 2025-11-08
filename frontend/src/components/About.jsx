import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Hakkımızda
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[hsl(215,45%,25%)] to-[hsl(43,96%,56%)] mb-6"></div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              YILDIZAY İnşaat olarak, 20 yılı aşkın tecrübemizle konut, ticari yapı ve altyapı 
              projelerinde güvenilir çözümler sunuyoruz. Kalite, güvenlik ve zamanında teslimat 
              prensipleriyle, her projede mükemmelliği hedefliyoruz.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Modern inşaat teknolojileri ve deneyimli kadromuzla, hayalinizdeki projeleri 
              gerçeğe dönüştürüyoruz. Müşteri memnuniyeti odaklı yaklaşımımız ve titiz çalışma 
              anlayışımızla sektörde fark yaratıyoruz.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[hsl(215,45%,25%)] to-[hsl(43,96%,56%)] bg-clip-text text-transparent mb-1">
                  20+
                </div>
                <div className="text-sm text-gray-600 font-medium">Yıl Tecrübe</div>
              </div>
              <div className="text-center p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[hsl(215,45%,25%)] to-[hsl(43,96%,56%)] bg-clip-text text-transparent mb-1">
                  150+
                </div>
                <div className="text-sm text-gray-600 font-medium">Tamamlanan Proje</div>
              </div>
              <div className="text-center p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[hsl(215,45%,25%)] to-[hsl(43,96%,56%)] bg-clip-text text-transparent mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600 font-medium">Mutlu Müşteri</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931" 
                alt="Construction Team" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
