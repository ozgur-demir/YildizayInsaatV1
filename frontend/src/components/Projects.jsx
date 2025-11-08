import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'Modern Konut Kompleksi',
    category: 'Konut',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070'
  },
  {
    title: 'İş Merkezi Plaza',
    category: 'Ticari',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070'
  },
  {
    title: 'Lüks Villa Projesi',
    category: 'Villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070'
  },
  {
    title: 'Kurumsal Ofis Binası',
    category: 'Ticari',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069'
  },
  {
    title: 'Rezidans Projesi',
    category: 'Konut',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070'
  },
  {
    title: 'Alışveriş Merkezi',
    category: 'Ticari',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974'
  }
];

const Projects = () => {
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

    const cards = sectionRef.current?.querySelectorAll('.project-card');
    cards?.forEach(card => observer.observe(card));

    return () => {
      cards?.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Tamamlanan Projeler
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Başarıyla tamamladığımız projelerden örnekler
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-index={index}
              className={`project-card group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative pb-[75%] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-[hsl(45,100%,47%)] font-medium">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
