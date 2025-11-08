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
            <div className="w-20 h-1 bg-gradient-to-r from-[hsl(355,65%,45%)] to-[hsl(45,100%,55%)] mb-6"></div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              YILDIZAY İnşaat olarak, konut, ticari yapı ve altyapı projelerinde güvenilir 
              çözümler sunuyoruz. Kalite, güvenlik ve zamanında teslimat prensipleriyle, 
              her projede mükemmelliği hedefliyoruz.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Modern inşaat teknolojileri ve deneyimli kadromuzla, hayalinizdeki projeleri 
              gerçeğe dönüştürüyoruz. Müşteri memnuniyeti odaklı yaklaşımımız ve titiz çalışma 
              anlayışımızla sektörde fark yaratıyoruz.
            </p>

            {/* Core Values - Instead of stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[hsl(355,65%,45%)] to-[hsl(355,65%,38%)] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Kalite Odaklı</h3>
                  <p className="text-sm text-gray-600">Her projede en yüksek kalite standartlarını uyguluyoruz</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[hsl(45,100%,55%)] to-[hsl(45,100%,48%)] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[hsl(30,8%,25%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Güvenilirlik</h3>
                  <p className="text-sm text-gray-600">Sözleşmelere bağlı kalarak güvenli iş ortağınızız</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[hsl(355,65%,45%)] to-[hsl(45,100%,55%)] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Hızlı Çözüm</h3>
                  <p className="text-sm text-gray-600">Projeleri zamanında teslim eden profesyonel yaklaşım</p>
                </div>
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
