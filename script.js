// SR Media – Minimal, robust JS for navigation + polish
(function(){
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('#primary-nav');

  // Header shadow on scroll
  const onScroll = () => {
    if(window.scrollY > 4) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Mobile menu toggle
  if(hamburger && nav){
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if(nav.classList.contains('open')){
          nav.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded','false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Smooth scroll for same-page anchors (with header offset)
  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 74;
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if(id.length > 1){
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          const top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
})();




//Slider of images

let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");

    // Create dots dynamically
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(n) {
      const current = slideIndex;
      slideIndex = (n + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        slide.classList.remove("active", "prev");
        if (i === slideIndex) {
          slide.classList.add("active");
        }
        if (i === current && current !== slideIndex) {
          slide.classList.add("prev");
        }
      });

      dots.forEach(dot => dot.classList.remove("active-dot"));
      dots[slideIndex].classList.add("active-dot");
    }

    function nextSlide(step) {
      showSlide(slideIndex + step);
    }

    

    // Auto play
    function autoPlay() {
      nextSlide(1);
      setTimeout(autoPlay, 3000);
    }

    // Swipe Support
    let startX = 0;
    const slideshow = document.getElementById("slideshow");

    slideshow.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slideshow.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) {
        nextSlide(1); // swipe left
      } else if (endX - startX > 50) {
        nextSlide(-1); // swipe right
      }
    });

    // Initialize
    showSlide(0);
    setTimeout(autoPlay, 4000);