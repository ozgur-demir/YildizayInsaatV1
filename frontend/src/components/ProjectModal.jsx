import { useEffect } from 'react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Close"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Image */}
        {project.image && (
          <div className="relative h-80 bg-gray-100 overflow-hidden rounded-t-2xl">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block px-4 py-2 bg-[hsl(45,100%,55%)] text-[hsl(30,8%,25%)] text-sm font-bold rounded-lg mb-3">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">{project.title}</h2>
            </div>
          </div>
        )}

        {/* Project Content */}
        <div className="p-8">
          {/* Short Description */}
          {project.shortDesc && (
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {project.shortDesc}
              </p>
            </div>
          )}

          {/* Detailed Content */}
          {project.content && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Proje Detayları
              </h3>
              <div 
                className="prose prose-lg max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </div>
          )}

          {/* Project Info Grid */}
          {(project.location || project.phone1 || project.email || project.person) && (
            <div className="bg-[hsl(30,20%,96%)] rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">İletişim Bilgileri</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.location && (
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[hsl(355,65%,45%)] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Konum</div>
                      <div className="text-sm text-gray-600">{project.location}</div>
                    </div>
                  </div>
                )}

                {project.phone1 && (
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[hsl(355,65%,45%)] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Telefon</div>
                      <div className="text-sm text-gray-600">{project.phone1}</div>
                      {project.phone2 && <div className="text-sm text-gray-600">{project.phone2}</div>}
                    </div>
                  </div>
                )}

                {project.email && (
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[hsl(355,65%,45%)] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">E-posta</div>
                      <div className="text-sm text-gray-600">{project.email}</div>
                    </div>
                  </div>
                )}

                {project.person && (
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[hsl(355,65%,45%)] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Yetkili</div>
                      <div className="text-sm text-gray-600">{project.person}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${project.phone1}`}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] text-white font-bold text-center rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Hemen Ara
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
