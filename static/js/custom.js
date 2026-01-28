(function () {
	'use strict';

	// Navbar shrink on scroll
	window.addEventListener('scroll', function () {
		var navbar = document.querySelector('.main-navbar');
		if (window.scrollY > 50) {
			navbar.classList.add('menu-shrink');
		} else {
			navbar.classList.remove('menu-shrink');
		}

		// Go to top button
		var goTop = document.querySelector('.go-top');
		if (goTop) {
			if (window.scrollY > 0) {
				goTop.classList.add('active');
			} else {
				goTop.classList.remove('active');
			}
		}
	});

	// Smooth scroll for nav links
	document.querySelectorAll('.navbar-nav li a').forEach(function (link) {
		link.addEventListener('click', function (e) {
			var target = document.querySelector(this.getAttribute('href'));
			if (target) {
				e.preventDefault();
				window.scrollTo({
					top: target.offsetTop - 50,
					behavior: 'smooth'
				});
			}
		});
	});

	// Close navbar collapse on link click (BS5)
	document.querySelectorAll('.navbar-collapse a.nav-link').forEach(function (link) {
		link.addEventListener('click', function () {
			var collapse = document.getElementById('navbarSupportedContent');
			var bsCollapse = bootstrap.Collapse.getInstance(collapse);
			if (bsCollapse) {
				bsCollapse.hide();
			}
		});
	});

	// Magnific Popup (jQuery required)
	$(document).ready(function () {
		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 300,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});

	// Swiper: clients-slider (Oguz Han university projects, nav arrows, loop)
	new Swiper('.clients-swiper', {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 6000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		},
		navigation: {
			nextEl: '.clients-swiper .swiper-button-next',
			prevEl: '.clients-swiper .swiper-button-prev'
		}
	});

	// Swiper: clients-slider-two (responsive 1-2 items, autoplay)
	new Swiper('.clients-slider-two-swiper', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		},
		pagination: {
			el: '.clients-slider-two-swiper .swiper-pagination',
			clickable: true
		},
		breakpoints: {
			992: { slidesPerView: 2 }
		}
	});

	// Swiper: screens-slider (responsive 1-5 items, dots)
	var screensConfig = {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		},
		pagination: {
			clickable: true
		},
		breakpoints: {
			576: { slidesPerView: 2 },
			768: { slidesPerView: 3 },
			1200: { slidesPerView: 5 }
		}
	};

	new Swiper('.screens-swiper', Object.assign({}, screensConfig, {
		pagination: { el: '.screens-swiper .swiper-pagination', clickable: true }
	}));

	new Swiper('.screens-swiper-2', Object.assign({}, screensConfig, {
		pagination: { el: '.screens-swiper-2 .swiper-pagination', clickable: true }
	}));

	// Swiper: Featured Projects Carousel
	var featuredSwiper = new Swiper('.featured-projects-swiper', {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		},
		navigation: {
			nextEl: '.featured-projects-swiper .swiper-button-next',
			prevEl: '.featured-projects-swiper .swiper-button-prev'
		},
		pagination: {
			el: '.featured-projects-swiper .swiper-pagination',
			clickable: true
		}
	});

	// Swiper: Gallery Projects Row (desktop only)
	if (window.innerWidth > 767) {
		new Swiper('.gallery-projects-swiper', {
			slidesPerView: 'auto',
			spaceBetween: 15,
			loop: true,
			freeMode: true,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			speed: 3000
		});
	}

	// Swiper: Credly Badges Carousel
	new Swiper('.badges-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 15,
		loop: true,
		freeMode: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		},
		speed: 4000
	});

	// Gallery click: navigate to featured carousel and scroll up (event delegation for loop clones)
	var featuredSwiperEl = document.querySelector('.featured-projects-swiper');
	var gallerySwiperEl = document.querySelector('.gallery-projects-swiper');
	if (gallerySwiperEl) {
		gallerySwiperEl.addEventListener('click', function (e) {
			var inner = e.target.closest('.gallery-slide-inner');
			if (!inner || !featuredSwiper) return;
			var label = inner.querySelector('.gallery-slide-label h4');
			if (!label) return;
			var name = label.textContent.trim();
			// Build a map of featured project names to their loop index
			var origSlides = featuredSwiperEl.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
			var targetIndex = -1;
			origSlides.forEach(function (slide, i) {
				var h3 = slide.querySelector('.study-text h3');
				if (h3 && h3.textContent.trim() === name) {
					targetIndex = i;
				}
			});
			if (targetIndex >= 0) {
				featuredSwiper.slideToLoop(targetIndex);
				featuredSwiper.autoplay.stop();
				featuredSwiperEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
				setTimeout(function () { featuredSwiper.autoplay.start(); }, 8000);
			}
		});
	}

	// Swiper: Volunteering image carousels (only init visible ones)
	var volunteeringSwiperConfig = {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		}
	};

	function initVolunteeringSwiper(el) {
		if (el.swiper) el.swiper.destroy(true, true);
		new Swiper(el, Object.assign({}, volunteeringSwiperConfig, {
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				clickable: true
			}
		}));
	}

	document.querySelectorAll('.volunteering-img-swiper').forEach(function (el) {
		if (el.offsetParent !== null) {
			initVolunteeringSwiper(el);
		}
	});

	// IntersectionObserver reveal (replaces WOW.js + Animate.css)
	var revealElements = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		revealElements.forEach(function (el) {
			observer.observe(el);
		});
	} else {
		revealElements.forEach(function (el) {
			el.classList.add('revealed');
		});
	}

	// See more toggle
	document.querySelectorAll('.see-more-btn').forEach(function(btn) {
		btn.addEventListener('click', function() {
			var row = this.closest('.container').querySelector('.collapsible-cards');
			row.classList.toggle('expanded');
			var isExpanded = row.classList.contains('expanded');
			this.textContent = isExpanded ? 'Show less ↑' : 'See more ↓';
			if (!isExpanded) {
				this.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			// Reinit swipers inside newly visible cards after reflow
			if (row.classList.contains('expanded')) {
				setTimeout(function() {
					row.querySelectorAll('.volunteering-img-swiper').forEach(function(el) {
						initVolunteeringSwiper(el);
					});
				}, 50);
			}
		});
	});

	// Go to top
	var goTopBtn = document.querySelector('.go-top');
	if (goTopBtn) {
		goTopBtn.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
		goTopBtn.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		});
	}

})();
