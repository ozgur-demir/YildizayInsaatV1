import { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'Konut İnşaatı',
    description: 'Modern ve konforlu yaşam alanları tasarlayıp inşa ediyoruz. Villa, apartman ve toplu konut projelerinde uzman kadromuzla hizmetinizdeyiz.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )
  },
  {
    title: 'Ticari Yapılar',
    description: 'İş merkezleri, alışveriş merkezi ve endüstriyel tesislerin yapımında geniş deneyime sahibiz. İşiniz için ideal mekanları yaratıyoruz.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },
  {
    title: 'Tadilat & Renovasyon',
    description: 'Eski yapılarınıza yeni hayat veriyoruz. Komple tadilat, restorasyon ve yenileme işlemlerinde profesyonel hizmet sunuyoruz.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  },
  {
    title: 'Altyapı Projeleri',
    description: 'Yol, köprü, su ve kanalizasyon sistemleri gibi altyapı projelerinde deneyimli ekibimizle kaliteli çözümler üretiyoruz.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    )
  },
  {
    title: 'Proje Danışmanlığı',
    description: 'İnşaat projelerinizin planlamasından teslimata kadar her aşamada uzman danışmanlık hizmeti veriyoruz.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    title: 'Mimari Tasarım',
    description: 'Uzman mimar kadromuzla özgün ve fonksiyonel mimari tasarımlar hazırlıyor, hayalinizdeki projeyi şekillendiriyoruz.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
        <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
        <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    )
  }
];

const Services = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));

    return () => {
      cards?.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-[hsl(210,12%,95%)]" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Hizmetlerimiz
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(355,65%,45%)] to-[hsl(45,100%,55%)] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kapsamlı inşaat çözümleri ile projelerinizi hayata geçiriyoruz
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 text-center group ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-[hsl(215,45%,25%)] group-hover:to-[hsl(215,40%,30%)] transition-all duration-300">
                <div className="w-9 h-9 text-[hsl(215,45%,25%)] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
