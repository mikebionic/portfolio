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

	// Swiper: clients-slider (1 item, nav arrows, loop)
	new Swiper('.clients-swiper', {
		slidesPerView: 1,
		loop: true,
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
			pauseOnMouseEnter: true
		},
		pagination: {
			el: '.clients-slider-two-swiper .swiper-pagination',
			clickable: true
		},
		breakpoints: {
			1200: { slidesPerView: 2 }
		}
	});

	// Swiper: screens-slider (responsive 1-5 items, dots)
	var screensConfig = {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		autoplay: {
			delay: 3000,
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
