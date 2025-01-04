var SpeakersSlider = new Swiper('.speakers-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });





const blocks = document.querySelectorAll('.block');

function handleScroll() {
  blocks.forEach(block => {
    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the block is entering the viewport
    const isVisible = rect.top <= windowHeight-80;

    if (isVisible) {
      block.style.opacity = 1;
      block.style.transform = 'translateX(0)';
    } else {
      block.style.opacity = 0;
      block.style.transform = 'translateX(100px)'; // Slide back to the right
    }
  });
}

window.addEventListener('scroll', handleScroll);

// Trigger the effect on page load
handleScroll();




document.querySelectorAll('.hexagon').forEach(hex => {
  hex.addEventListener('click', () => {
    hex.classList.toggle('flipped');
  });
});
