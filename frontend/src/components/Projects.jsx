import { useEffect, useRef, useState } from 'react';

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  // Fetch projects from API based on filter
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        let endpoint = `${backendUrl}/api/content/estates`;
        
        // Determine endpoint based on filter
        if (activeFilter === 'completed') {
          endpoint = `${backendUrl}/api/content/estates/completed`;
        } else if (activeFilter === 'ongoing') {
          endpoint = `${backendUrl}/api/content/estates/ongoing`;
        }
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const result = await response.json();
        const projectData = result.data || [];
        
        // Transform API data to component format
        const formattedProjects = projectData.map(project => ({
          id: project.id,
          title: project.name || 'Proje',
          category: project.location || 'Konut',
          image: project.coverUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070',
          url: project.url,
          status: project.status || 'completed'
        }));
        
        setProjects(formattedProjects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setLoading(false);
        // Use fallback data on error
        setProjects(getFallbackProjects());
      }
    };

    fetchProjects();
  }, [activeFilter]);

  // Intersection Observer for animations
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
  }, [projects]);

  // Handle project click to show modal
  const handleProjectClick = async (project) => {
    if (!project.id) return;
    
    setSelectedProject(project);
    setModalLoading(true);
    setCurrentImageIndex(0);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/content/estates/${project.id}`);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Project Detail Response:', result);
        console.log('Details Content:', result.data?.details?.content);
        setProjectDetail(result.data);
      } else {
        setProjectDetail(null);
      }
    } catch (err) {
      console.error('Error fetching project detail:', err);
      setProjectDetail(null);
    } finally {
      setModalLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
    setProjectDetail(null);
    setCurrentImageIndex(0);
    setLightboxOpen(false);
  };

  // Navigate slider
  const nextImage = () => {
    if (projectDetail?.item?.medias) {
      setCurrentImageIndex((prev) => 
        prev === projectDetail.item.medias.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (projectDetail?.item?.medias) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? projectDetail.item.medias.length - 1 : prev - 1
      );
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getFallbackProjects = () => [
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

  return (
    <section id="projects" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Projeler
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(355,65%,45%)] to-[hsl(45,100%,55%)] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Başarıyla tamamladığımız ve devam eden projelerimiz
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hepsi
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === 'completed'
                  ? 'bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tamamlanan Projeler
            </button>
            <button
              onClick={() => setActiveFilter('ongoing')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === 'ongoing'
                  ? 'bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Devam Eden Projeler
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(355,65%,45%)]"></div>
            <p className="mt-4 text-gray-600">Projeler yükleniyor...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                data-index={index}
                onClick={() => handleProjectClick(project)}
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
                  {/* Always visible gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                  
                  {/* Project info - always visible, enhanced on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-[hsl(45,100%,55%)]">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 font-medium transition-colors duration-300 group-hover:text-white">
                      {project.category}
                    </p>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[hsl(45,100%,55%)] transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {modalLoading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(355,65%,45%)]"></div>
                  <p className="mt-4 text-gray-600">Proje detayları yükleniyor...</p>
                </div>
              ) : projectDetail ? (
                <>
                  {/* Modal Header - Image Slider */}
                  {projectDetail.medias && projectDetail.medias.length > 0 ? (
                    <div className="relative h-96 overflow-hidden rounded-t-2xl bg-gray-900">
                      {/* Current Image */}
                      <img 
                        src={`https://yildizaycp.ozdsystems.com/uploads/${projectDetail.medias[currentImageIndex].file}`}
                        alt={`${projectDetail.name} - ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setLightboxOpen(true)}
                      />
                      
                      {/* Navigation Arrows */}
                      {projectDetail.medias.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                          >
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                          >
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {projectDetail.item.medias.length}
                      </div>
                      
                      {/* Overlay with Title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {projectDetail.item.name}
                        </h2>
                        {projectDetail.item?.location && (
                          <div className="flex items-center text-white/90">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{projectDetail.item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : projectDetail.item?.coverUrl && (
                    <div className="relative h-72 overflow-hidden rounded-t-2xl">
                      <img 
                        src={projectDetail.item.coverUrl} 
                        alt={projectDetail.item.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {projectDetail.item.name}
                        </h2>
                        {projectDetail.item?.location && (
                          <div className="flex items-center text-white/90">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{projectDetail.item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Modal Content */}
                  <div className="p-8">
                    {/* Short Description */}
                    {projectDetail.item?.shortDesc && (
                      <div className="mb-6">
                        <p className="text-lg text-gray-700 leading-relaxed font-medium">
                          {projectDetail.item.shortDesc}
                        </p>
                      </div>
                    )}

                    {/* Details Content - Full Description (details is an ARRAY) */}
                    {projectDetail.details && projectDetail.details.length > 0 && projectDetail.details[0]?.content && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Proje Detayları</h3>
                        <div 
                          className="text-gray-600 leading-relaxed prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: projectDetail.details[0].content }}
                        />
                      </div>
                    )}

                    {/* Description (fallback if details.content not available) */}
                    {(!projectDetail.details || projectDetail.details.length === 0 || !projectDetail.details[0]?.content) && projectDetail.item?.desc && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Açıklama</h3>
                        <div 
                          className="text-gray-600 leading-relaxed prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: projectDetail.item.desc }}
                        />
                      </div>
                    )}

                    {/* Project Stats */}
                    {projectDetail.item && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-6 bg-gray-50 rounded-xl">
                        {projectDetail.item.roomCount && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[hsl(355,65%,45%)]">
                              {projectDetail.item.roomCount}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Oda Sayısı</div>
                          </div>
                        )}
                        {projectDetail.item.bathroomCount && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[hsl(355,65%,45%)]">
                              {projectDetail.item.bathroomCount}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Banyo</div>
                          </div>
                        )}
                        {projectDetail.item.grossArea && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[hsl(355,65%,45%)]">
                              {projectDetail.item.grossArea}m²
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Brüt Alan</div>
                          </div>
                        )}
                        {projectDetail.item.netArea && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[hsl(355,65%,45%)]">
                              {projectDetail.item.netArea}m²
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Net Alan</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => {
                          closeModal();
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            const headerHeight = 90;
                            const elementPosition = contactSection.offsetTop - headerHeight;
                            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                          }
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] hover:from-[hsl(355,65%,55%)] hover:to-[hsl(355,65%,47%)] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        İletişime Geçin
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-600">Proje detayları yüklenemedi.</p>
                  <button
                    onClick={closeModal}
                    className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    Kapat
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lightbox for Image Viewing */}
        {lightboxOpen && projectDetail?.item?.medias && (
          <div 
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
              <img 
                src={`https://yildizaycp.ozdsystems.com/uploads/${projectDetail.item.medias[currentImageIndex].file}`}
                alt={`${projectDetail.item.name} - ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              {projectDetail.item.medias.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {projectDetail.item.medias.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
