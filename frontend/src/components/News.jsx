import { useEffect, useRef, useState } from 'react';
import { api } from '../config/api';

const News = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsDetail, setNewsDetail] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const sectionRef = useRef(null);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await fetch(`${backendUrl}/api/content/blogs`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const result = await response.json();
        const newsData = result.data || [];
        
        // Transform API data and take only first 3
        const formattedNews = newsData.slice(0, 3).map(article => ({
          id: article.id,
          title: article.name || 'Haber',
          excerpt: article.shortDesc || 'Detaylar için tıklayın...',
          date: article.createdAt ? new Date(article.createdAt).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : null,
          image: article.coverUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076',
          url: article.url
        }));
        
        setNewsArticles(formattedNews.length > 0 ? formattedNews : getFallbackNews());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setNewsArticles(getFallbackNews());
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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

    const cards = sectionRef.current?.querySelectorAll('.news-card');
    cards?.forEach(card => observer.observe(card));

    return () => {
      cards?.forEach(card => observer.unobserve(card));
    };
  }, [newsArticles]);

  // Handle news click to show modal
  const handleNewsClick = async (article) => {
    if (!article.id) return;
    
    setSelectedNews(article);
    setModalLoading(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/content/blogs/${article.id}`);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Blog detail response:', result);
        
        if (result.data) {
          setNewsDetail(result.data);
        } else {
          console.error('No data in response');
          setNewsDetail(null);
        }
      } else {
        console.error('Blog detail fetch failed:', response.status, response.statusText);
        setNewsDetail(null);
      }
    } catch (err) {
      console.error('Error fetching news detail:', err);
      setNewsDetail(null);
    } finally {
      setModalLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedNews(null);
    setNewsDetail(null);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getFallbackNews = () => [
    {
      title: 'Yeni Modern Rezidans Projemiz Başlıyor',
      excerpt: 'Şehrin kalbinde konumlanacak 200 daireli modern rezidans projemizin temeli atılıyor. Çevreci mimarisi ve sosyal donatılarıyla dikkat çeken proje...',
      date: '15 Şubat 2024',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076'
    },
    {
      title: 'Yılın İnşaat Firması Ödülü Bizim Oldu',
      excerpt: 'İnşaat Sektörü Derneği tarafından düzenlenen törende "Yılın İnşaat Firması" ödülünü aldık. Kaliteli işçilik ve zamanında teslimat anlayışımız...',
      date: '10 Şubat 2024',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070'
    },
    {
      title: 'Yeni Nesil İnşaat Teknolojilerine Yatırım',
      excerpt: 'Akıllı bina yönetim sistemleri ve çevre dostu inşaat malzemelerine yapılan yatırımlarla projelerimize değer katmaya devam ediyoruz...',
      date: '05 Şubat 2024',
      image: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?q=80&w=2070'
    }
  ];

  return (
    <section id="news" className="py-20 bg-[hsl(30,20%,96%)]" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Haberler ve Duyurular
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(355,65%,45%)] to-[hsl(45,100%,55%)] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Son gelişmeler ve projelerimizden haberler
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(355,65%,45%)]"></div>
            <p className="mt-4 text-gray-600">Haberler yükleniyor...</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <article
                key={article.id || index}
                data-index={index}
                onClick={() => handleNewsClick(article)}
                className={`news-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative pb-[60%] overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {article.date && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                      {article.date}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[hsl(355,65%,45%)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-[hsl(355,65%,45%)] font-semibold hover:gap-2 transition-all group"
                    onClick={(e) => e.preventDefault()}
                  >
                    Devamını Oku
                    <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* News Detail Modal */}
        {selectedNews && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-fade-in"
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
                  <p className="mt-4 text-gray-600">Haber detayları yükleniyor...</p>
                </div>
              ) : newsDetail ? (
                <>
                  {/* Modal Header Image */}
                  {newsDetail.coverUrl && (
                    <div className="relative h-80 overflow-hidden rounded-t-2xl">
                      <img 
                        src={newsDetail.coverUrl} 
                        alt={newsDetail.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {newsDetail.name}
                        </h2>
                        {newsDetail.createdAt && (
                          <div className="flex items-center text-white/90">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">
                              {new Date(newsDetail.createdAt).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Modal Content */}
                  <div className="p-8">
                    {/* Short Description */}
                    {newsDetail.shortDesc && (
                      <div className="mb-6">
                        <p className="text-lg text-gray-700 leading-relaxed font-medium">
                          {newsDetail.shortDesc}
                        </p>
                      </div>
                    )}

                    {/* Full Content (details is an ARRAY) */}
                    {newsDetail.details && newsDetail.details.length > 0 && newsDetail.details[0]?.content && (
                      <div className="mb-6">
                        <div 
                          className="text-gray-600 leading-relaxed prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: newsDetail.details[0].content }}
                        />
                      </div>
                    )}

                    {/* Description (fallback if details.content not available) */}
                    {(!newsDetail.details || newsDetail.details.length === 0 || !newsDetail.details[0]?.content) && newsDetail.desc && (
                      <div className="mb-6">
                        <div 
                          className="text-gray-600 leading-relaxed prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: newsDetail.desc }}
                        />
                      </div>
                    )}

                    {/* Close Button */}
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={closeModal}
                        className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all duration-300"
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-600">Haber detayları yüklenemedi.</p>
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
      </div>
    </section>
  );
};

export default News;
