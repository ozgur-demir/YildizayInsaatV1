const BackToTop = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(4,75%,40%)] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-40 flex items-center justify-center ${
        show ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-label="Yukarı Çık"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
};

export default BackToTop;
