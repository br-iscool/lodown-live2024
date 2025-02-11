document.addEventListener("DOMContentLoaded", function () {
	var SpeakersSlider = new Swiper(".speakers-slider", {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		loop: true,
		slidesPerView: "auto",
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 100,
			modifier: 2.5,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		on: {
			init: function () {
				updateRightBox(this.realIndex); // Update right box when slider is initialized
			},
			slideChange: function () {
				updateRightBox(this.realIndex);
			},
		},
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

const timelineItems = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	},
	{
		threshold: 0.1,
	}
);

timelineItems.forEach((item) => {
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
		const endHeight = `${this.summary.offsetHeight + 20}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		this.animation = this.el.animate(
			{
				height: [startHeight, endHeight],
			},
			{
				duration: 400,
				easing: "ease-out",
			}
		);
		this.animation.onfinish = () => {
			this.expandIcon.setAttribute("src", "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>");
			return this.onAnimationFinish(false);
		};

		this.animation.oncancel = () => {
			this.expandIcon.setAttribute("src", "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>");
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
		const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight + 20}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		this.animation = this.el.animate(
			{
				height: [startHeight, endHeight],
			},
			{
				duration: 350,
				easing: "ease-out",
			}
		);

		this.animation.onfinish = () => {
			this.expandIcon.setAttribute("src", "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>");
			return this.onAnimationFinish(true);
		};
		this.animation.oncancel = () => {
			this.expandIcon.setAttribute("src", "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>");
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

/*
function get_height() {
    const header = document.querySelector("header");
    const hero = document.querySelector(".hero");

    const viewport = window.innerHeight;
    const header_height = header.offsetHeight;
    const heroHeight = viewport - header_height;

    hero.style.height = `${heroHeight}px`;
}

window.addEventListener("load", get_height);
window.addEventListener("resize", get_height);
*/

document.addEventListener("DOMContentLoaded", () => {
	const target = document.querySelector(".stats");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					let valueDisplays = document.querySelectorAll(".num");
					let interval = 5000;
					valueDisplays.forEach((valueDisplay) => {
						let startValue = 0;
						let endValue = parseInt(valueDisplay.getAttribute("data-val"));
						console.log(endValue);
						let duration = Math.floor(interval / endValue);
						let counter = setInterval(function () {
							startValue += 1;
							valueDisplay.textContent = startValue;
							if (startValue == endValue) {
								clearInterval(counter);
							}
						}, duration);
					});
					observer.unobserve(target);
				}
			});
		},
		{ threshold: 0.5 }
	);

	observer.observe(target);
});

document.addEventListener("DOMContentLoaded", () => {
	const target = document.querySelector(".swift-up-text");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const swiftUpElements = document.querySelectorAll(".swift-up-text");
					swiftUpElements.forEach((elem) => {
						const words = elem.textContent.split(" ");
						elem.innerHTML = "";

						words.forEach((el, index) => {
							words[index] = `<span><i>${words[index]}</i></span>`;
						});

						elem.innerHTML = words.join(" ");

						const children = document.querySelectorAll("span > i");
						children.forEach((node, index) => {
							node.style.animationDelay = `${index * 0.2}s`;
						});
					});
					observer.unobserve(target); // Stop observing if you only want it to trigger once
				}
			});
		},
		{ threshold: 0.5 }
	); // Trigger when 50% of the section is visible

	observer.observe(target);
});
