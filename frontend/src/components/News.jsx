import { useEffect, useRef, useState } from 'react';

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
          }) : 'Yakında',
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
                className={`news-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group ${
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
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-[hsl(355,65%,50%)] to-[hsl(355,65%,42%)] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                    {article.date}
                  </span>
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
      </div>
    </section>
  );
};

export default News;
