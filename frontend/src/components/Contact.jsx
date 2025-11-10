import { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { api } from '../config/api';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '90',  // Default to Turkey (+90)
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad alanı zorunludur';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Ad Soyad en az 3 karakter olmalıdır';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon alanı zorunludur';
    } else {
      // Remove all non-digit characters and check if we have at least 10 digits
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        newErrors.phone = 'Geçerli bir telefon numarası giriniz';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Posta alanı zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj alanı zorunludur';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitMessage({ type: '', text: '' });
      
      try {
        const response = await fetch(api('/api/contact/send'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitMessage({
            type: 'success',
            text: result.message || 'Teşekkür ederiz! Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.'
          });
          setFormData({ name: '', phone: '', email: '', message: '' });
          setErrors({});
        } else {
          // Handle specific error codes
          if (response.status === 429) {
            setSubmitMessage({
              type: 'error',
              text: result.detail || 'Çok fazla istek gönderildi. Lütfen birkaç dakika sonra tekrar deneyin.'
            });
          } else {
            setSubmitMessage({
              type: 'error',
              text: result.detail || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
            });
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitMessage({
          type: 'error',
          text: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.'
        });
      } finally {
        setIsSubmitting(false);
        // Clear message after 5 seconds
        setTimeout(() => {
          setSubmitMessage({ type: '', text: '' });
        }, 5000);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            İletişim
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(45,100%,47%)] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Projeleriniz için bize ulaşın
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[hsl(4,75%,50%)]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Adres</h4>
                <p className="text-gray-600 leading-relaxed">
                  Merkez Mahallesi, İnşaat Caddesi No:123<br />
                  İstanbul, Türkiye
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[hsl(4,75%,50%)]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Telefon</h4>
                <p className="text-gray-600 leading-relaxed">
                  +90 212 555 12 34<br />
                  +90 535 555 12 34
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[hsl(4,75%,50%)]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">E-Posta</h4>
                <p className="text-gray-600 leading-relaxed">
                  info@yildizay.com.tr
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[hsl(4,75%,50%)]">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Çalışma Saatleri</h4>
                <p className="text-gray-600 leading-relaxed">
                  Pazartesi - Cuma: 09:00 - 18:00<br />
                  Cumartesi: 09:00 - 14:00
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(4,75%,50%)]/20 ${
                    errors.name ? 'border-red-500' : 'border-gray-200 focus:border-[hsl(4,75%,50%)]'
                  }`}
                />
                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2">
                  Telefon *
                </label>
                <div className="phone-input-wrapper">
                  <PhoneInput
                    country={'tr'}
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone: '+' + phone })}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: false
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                    inputStyle={{
                      width: '100%',
                      height: '48px',
                      fontSize: '16px',
                      paddingLeft: '48px',
                      borderRadius: '0.5rem',
                      border: errors.phone ? '2px solid rgb(239, 68, 68)' : '2px solid rgb(229, 231, 235)',
                      transition: 'all 0.2s'
                    }}
                    buttonStyle={{
                      borderRadius: '0.5rem 0 0 0.5rem',
                      border: errors.phone ? '2px solid rgb(239, 68, 68)' : '2px solid rgb(229, 231, 235)',
                      borderRight: 'none',
                      backgroundColor: 'white'
                    }}
                    dropdownStyle={{
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    enableSearch={true}
                    searchPlaceholder="Ülke ara..."
                    placeholder="5__ ___ ____"
                  />
                </div>
                {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                  E-Posta *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(4,75%,50%)]/20 ${
                    errors.email ? 'border-red-500' : 'border-gray-200 focus:border-[hsl(4,75%,50%)]'
                  }`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
                  Mesajınız *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(4,75%,50%)]/20 resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-200 focus:border-[hsl(4,75%,50%)]'
                  }`}
                ></textarea>
                {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-[hsl(4,75%,50%)] to-[hsl(4,75%,40%)] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>

              {/* Submit Message */}
              {submitMessage.text && (
                <div 
                  className={`mt-4 p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
