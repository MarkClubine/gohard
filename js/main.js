// GOHARD World — Main JS

(function () {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Newsletter modal (show after 3 seconds on homepage only)
  var modal = document.getElementById('newsletterModal');
  var modalClose = document.getElementById('modalClose');

  if (modal && modalClose) {
    // Only show on homepage and if not already dismissed
    var isHomepage = window.location.pathname === '/' ||
      window.location.pathname === '/index.html' ||
      window.location.pathname.endsWith('/gohard/') ||
      window.location.pathname.endsWith('/gohard/index.html');

    if (isHomepage && !sessionStorage.getItem('gohard_modal_dismissed')) {
      setTimeout(function () {
        modal.classList.add('active');
      }, 3000);
    }

    modalClose.addEventListener('click', function () {
      modal.classList.remove('active');
      sessionStorage.setItem('gohard_modal_dismissed', '1');
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        sessionStorage.setItem('gohard_modal_dismissed', '1');
      }
    });
  }

  // Transparent header — add scrolled class after passing hero
  var header = document.querySelector('.header');
  if (header) {
    var scrollThreshold = 100;
    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load in case page is already scrolled
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Subtle fade-in on scroll for product cards
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .editorial-card').forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

})();
