document.addEventListener("DOMContentLoaded", function () {
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
      },
  
      on: {
          init: function () {
              updateRightBox(this.realIndex); // Update right box when slider is initialized
          },
          slideChange: function () {
              updateRightBox(this.realIndex);
          }
      }
  });

  // Function to update the right box content
  function updateRightBox(index) {
      const slides = document.querySelectorAll(".swiper-slide");
      if (slides.length === 0) return; // Prevent errors if no slides exist

      const activeSlide = slides[index % slides.length]; // Prevent index errors

      if (activeSlide) {
          const newTitle = activeSlide.getAttribute("data-title") || "Default Title";
          const newDescription = activeSlide.getAttribute("data-description") || "Default Description";

          document.querySelector(".modern-box .title").textContent = newTitle;
          document.querySelector(".modern-box .description").textContent = newDescription;
      }
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






const timelineItems = document.querySelectorAll('.timeline-item');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });










class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector("summary");
    this.content = el.querySelector(".accordion-content");
    this.expandIcon = this.summary.querySelector(".accordion-icon");
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = "hidden";

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight+20}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 400,
        easing: "ease-out"
      }
    );
    this.animation.onfinish = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return this.onAnimationFinish(false);
    };

    this.animation.oncancel = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return (this.isClosing = false);
    };
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight+20
    }px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 350,
        easing: "ease-out"
      }
    );

    this.animation.onfinish = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return this.onAnimationFinish(true);
    };
    this.animation.oncancel = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return (this.isExpanding = false);
    };
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = "";
  }
}

document.querySelectorAll("details").forEach((el) => {
  new Accordion(el);
});






function get_height() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  
  const viewport = window.innerHeight;
  const header_height = header.offsetHeight;
  const heroHeight = viewport - header_height;
  
  hero.style.height = `${heroHeight}px`;
}

window.addEventListener('load', get_height);
window.addEventListener('resize', get_height);



function countdown() {
  const target_date = new Date("2025-01-30T07:00:00Z").getTime();

  const days_counter = document.querySelector('.countdown-days');
  const hours_counter = document.querySelector('.countdown-hours');
  const minutes_counter = document.querySelector('.countdown-minutes');
  const seconds_counter = document.querySelector('.countdown-seconds');

  // Check if elements exist
  if (!days_counter || !hours_counter || !minutes_counter || !seconds_counter) {
    console.error("Countdown elements not found.");
    return;
  }
  let interval;
  function update_timer() {
    const now = new Date().getTime();
    const difference = target_date - now;

    if (difference <= 0) {
      days_counter.textContent = '0';
      hours_counter.textContent = '0';
      minutes_counter.textContent = '0';
      seconds_counter.textContent = '0';
      clearInterval(interval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    days_counter.textContent = days;
    hours_counter.textContent = hours;
    minutes_counter.textContent = minutes;
    seconds_counter.textContent = seconds;
  }

  // Run update immediately and every second
  interval = setInterval(update_timer, 1000);
  update_timer();

  
}

document.addEventListener("DOMContentLoaded", countdown);






document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#stats");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            let valueDisplays = document.querySelectorAll(".num");
            let interval = 5000;
            valueDisplays.forEach((valueDisplay) => {
              let startValue = 0;
              let endValue = parseInt(valueDisplay.getAttribute("data-val"));
              console.log(endValue);
              let duration = Math.floor(interval / endValue);
              let counter = setInterval(function(){
                startValue += 1;
                valueDisplay.textContent = startValue;
                if(startValue == endValue){
                    clearInterval(counter);
                }
              }, duration);
            
            });
              observer.unobserve(target); // Stop observing if you only want it to trigger once
          }
      });
  }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

  observer.observe(target);
});




document.addEventListener("DOMContentLoaded", () => {
            const target = document.querySelector(".swift-up-text");

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      const swiftUpElements = document.querySelectorAll('.swift-up-text');
                        swiftUpElements.forEach(elem => {

                          const words = elem.textContent.split(' ');
                          elem.innerHTML = '';
                        
                          words.forEach((el, index) => {
                            words[index] = `<span><i>${words[index]}</i></span>`;
                          });
                        
                          elem.innerHTML = words.join(' ');
                        
                          const children = document.querySelectorAll('span > i');
                          children.forEach((node, index) => {
                            node.style.animationDelay = `${index * .2}s`;
                          });
                        
                        });
                        observer.unobserve(target); // Stop observing if you only want it to trigger once
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

            observer.observe(target);
        });
