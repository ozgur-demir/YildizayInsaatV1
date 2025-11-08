/*
 * YILDIZAY Construction Company
 * Main JavaScript File
 * jQuery-based interactions and animations
 */

(function($) {
    'use strict';

    // ========================================
    // Document Ready
    // ========================================
    $(document).ready(function() {
        // Initialize all functions
        initStickyHeader();
        initSmoothScroll();
        initMobileMenu();
        initScrollAnimations();
        initBackToTop();
        initFormValidation();
    });

    // ========================================
    // Sticky Header on Scroll
    // ========================================
    function initStickyHeader() {
        const header = $('#header');
        const heroHeight = $('.hero').outerHeight();

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
        });
    }

    // ========================================
    // Smooth Scrolling for Internal Links
    // ========================================
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this).attr('href');
            
            // Don't prevent default for empty hash links
            if (target === '#' || target === '') {
                e.preventDefault();
                return;
            }

            const $target = $(target);

            if ($target.length) {
                e.preventDefault();

                // Close mobile menu if open
                $('.nav').removeClass('active');
                $('.mobile-menu-toggle').removeClass('active');

                const headerHeight = $('#header').outerHeight();
                const targetPosition = $target.offset().top - headerHeight;

                $('html, body').animate({
                    scrollTop: targetPosition
                }, 800, 'swing');
            }
        });
    }

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    function initMobileMenu() {
        const menuToggle = $('#mobileMenuToggle');
        const nav = $('.nav');

        menuToggle.on('click', function() {
            $(this).toggleClass('active');
            nav.toggleClass('active');
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.header').length) {
                nav.removeClass('active');
                menuToggle.removeClass('active');
            }
        });

        // Close menu on window resize
        $(window).on('resize', function() {
            if ($(window).width() > 767) {
                nav.removeClass('active');
                menuToggle.removeClass('active');
            }
        });
    }

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            const animatedElements = document.querySelectorAll('.scroll-animate');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            $('.scroll-animate').addClass('visible');
        }
    }

    // ========================================
    // Back to Top Button
    // ========================================
    function initBackToTop() {
        const backToTopBtn = $('#backToTop');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 300) {
                backToTopBtn.addClass('show');
            } else {
                backToTopBtn.removeClass('show');
            }
        });

        backToTopBtn.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        });
    }

    // ========================================
    // Form Validation
    // ========================================
    function initFormValidation() {
        const form = $('#contactForm');

        form.on('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            $('.form-error').removeClass('show').text('');
            $('.form-input').removeClass('error');

            let isValid = true;

            // Name validation
            const name = $('#name').val().trim();
            if (name === '') {
                showError('#name', 'Ad Soyad alanı zorunludur');
                isValid = false;
            } else if (name.length < 3) {
                showError('#name', 'Ad Soyad en az 3 karakter olmalıdır');
                isValid = false;
            }

            // Phone validation
            const phone = $('#phone').val().trim();
            const phoneRegex = /^[0-9]{10,11}$/;
            if (phone === '') {
                showError('#phone', 'Telefon alanı zorunludur');
                isValid = false;
            } else if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
                showError('#phone', 'Geçerli bir telefon numarası giriniz');
                isValid = false;
            }

            // Email validation
            const email = $('#email').val().trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('#email', 'E-Posta alanı zorunludur');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('#email', 'Geçerli bir e-posta adresi giriniz');
                isValid = false;
            }

            // Message validation
            const message = $('#message').val().trim();
            if (message === '') {
                showError('#message', 'Mesaj alanı zorunludur');
                isValid = false;
            } else if (message.length < 10) {
                showError('#message', 'Mesaj en az 10 karakter olmalıdır');
                isValid = false;
            }

            // If form is valid, submit (or show success message)
            if (isValid) {
                // Show success message
                alert('Teşekkür ederiz! Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.');
                
                // Reset form
                form[0].reset();
            }
        });

        // Remove error on input
        $('.form-input').on('input', function() {
            $(this).removeClass('error');
            $(this).siblings('.form-error').removeClass('show');
        });
    }

    // Helper function to show error
    function showError(inputId, message) {
        const input = $(inputId);
        const errorElement = input.siblings('.form-error');
        
        input.addClass('error');
        errorElement.text(message).addClass('show');
    }

    // ========================================
    // Performance: Debounce scroll events
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

})(jQuery);