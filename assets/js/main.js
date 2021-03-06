(function () {
	"use strict";

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/**
	 * Easy on scroll event listener
	 */
	const onscroll = (el, listener) => {
		el.addEventListener("scroll", listener);
	};

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select("#navbar .scrollto", true);
	const navbarlinksActive = () => {
		let position = window.scrollY + 200;
		navbarlinks.forEach((navbarlink) => {
			if (!navbarlink.hash) return;
			let section = select(navbarlink.hash);
			if (!section) return;
			if (
				position >= section.offsetTop &&
				position <= section.offsetTop + section.offsetHeight
			) {
				navbarlink.classList.add("active");
			} else {
				navbarlink.classList.remove("active");
			}
		});
	};
	window.addEventListener("load", navbarlinksActive);
	onscroll(document, navbarlinksActive);

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let header = select("#header");
		let offset = header.offsetHeight;

		let elementPos = select(el).offsetTop;
		window.scrollTo({
			top: elementPos - offset,
			behavior: "smooth",
		});
	};

	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = select("#header");
	if (selectHeader) {
		const headerScrolled = () => {
			if (window.scrollY > 100) {
				selectHeader.classList.add("header-scrolled");
			} else {
				selectHeader.classList.remove("header-scrolled");
			}
		};
		window.addEventListener("load", headerScrolled);
		onscroll(document, headerScrolled);
	}

	/**
	 * Back to top button
	 */
	let backtotop = select(".back-to-top");
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add("active");
			} else {
				backtotop.classList.remove("active");
			}
		};
		window.addEventListener("load", toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}

	/**
	 * Mobile nav toggle
	 */
	on("click", ".mobile-nav-toggle", function (e) {
		select("#navbar").classList.toggle("navbar-mobile");
		this.classList.toggle("bi-list");
		this.classList.toggle("bi-x");
	});

	/**
	 * Mobile nav dropdowns activate
	 */
	on(
		"click",
		".navbar .dropdown > a",
		function (e) {
			if (select("#navbar").classList.contains("navbar-mobile")) {
				e.preventDefault();
				this.nextElementSibling.classList.toggle("dropdown-active");
			}
		},
		true
	);

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on(
		"click",
		".scrollto",
		function (e) {
			if (select(this.hash)) {
				e.preventDefault();

				let navbar = select("#navbar");
				if (navbar.classList.contains("navbar-mobile")) {
					navbar.classList.remove("navbar-mobile");
					let navbarToggle = select(".mobile-nav-toggle");
					navbarToggle.classList.toggle("bi-list");
					navbarToggle.classList.toggle("bi-x");
				}
				scrollto(this.hash);
			}
		},
		true
	);

	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener("load", () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash);
			}
		}
	});

	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener("load", () => {
		let portfolioContainer = select(".portfolio-container");
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: ".portfolio-item",
			});

			let portfolioFilters = select("#portfolio-flters li", true);

			on(
				"click",
				"#portfolio-flters li",
				function (e) {
					e.preventDefault();
					portfolioFilters.forEach(function (el) {
						el.classList.remove("filter-active");
					});
					this.classList.add("filter-active");

					portfolioIsotope.arrange({
						filter: this.getAttribute("data-filter"),
					});
					portfolioIsotope.on("arrangeComplete", function () {
						AOS.refresh();
					});
				},
				true
			);
		}
	});

	/**
	 * Initiate portfolio lightbox
	 */
	const portfolioLightbox = GLightbox({
		selector: ".portfolio-lightbox",
	});

	/**
	 * Portfolio details slider
	 */
	new Swiper(".portfolio-details-slider", {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
	});

	/**
	 * Testimonials slider
	 */
	new Swiper(".testimonials-slider", {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: "auto",
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},

			1200: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});

	/**
	 * Animation on scroll
	 */
	window.addEventListener("load", () => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
			mirror: false,
		});
	});

	/**
	 * Modal popups for six and seven rules
	 */
	// Modal popup for 6 nguy??n t???c v??n h??a
	$(function () {
		$(document).on("click", "#six-rules", function () {
			openSixRules();
		});
	});

	$(function () {
		$(document).on("click", "#seven-rules", function () {
			openSevenRules();
		});
	});

	var inceptionLevel = 1;
	var offsetLevel = 0;

	function openSixRules() {
		new jBox("Modal", {
			width: 800,
			addClass: "inception-modal",
			overlayClass: "inception-overlay",
			zIndex: "auto",
			draggable: "title",
			closeOnClick: false,
			closeButton: "title",
			title: "<h3><strong>N???i dung 6 nguy??n t???c v??n h??a</strong></h3>",
			offset: {
				x: offsetLevel * 15,
				y: offsetLevel * 15,
			},
			content:
				"<p>????? g???n k???t to??n b??? c??c nh??n s??? trong t??? ch???c, SUEH ???? x??y d???ng v?? ph??t tri???n c???m nang ho???t ?????ng SUEH c?? s??? tham kh???o t??? v??n h??a Vinamilk, n??u ra 6 nguy??n t???c b???t bu???c t??? ch???c ph???i ??i theo</p>" +
				`
        <ul style="clear:left;">
            <li><strong>Tr??ch nhi???m</strong>: Khi ???????c giao nhi???m v??? ph???i ho??n th??nh m???t c??ch ?????y ?????, ????ng h???n, v?? ph???i ch???u tr??ch nhi???m v??? nh???ng vi???c m??nh l??m</li>
            <li><strong>H?????ng k???t qu???</strong>: ???? l?? ????ch ?????n ????? b???t ?????u th???c hi???n m???i h??nh ?????ng</li>
            <li><strong>S??ng t???o v?? ch??? ?????ng</strong>: ????? cao c??i m???i, t??m ki???m nhi???u gi???i ph??p.</li>
            <li><strong>H???p t??c</strong>: Ch???c ch???n s??? ?????t ???????c k???t qu??? t???t khi s??? d???ng nhi???u h??n m???t b??? n??o</li>
            <li><strong>Ch??nh tr???c</strong>: Trung th???c, th???t th??</li>
            <li><strong>Xu???t s???c</strong>: C?? k??? n??ng t???t, v?? lu??n c???i thi???n n??ng l???c</li>
        </ul>
        ` +
				'<p><button class="inception-modal-button btn btn-primary" data-inception-tooltip="Nh???n ????? xen 7 h??nh vi l??nh ?????o">Xem 7 h??nh vi l??nh ?????o</button></p>',

			onCreated: function () {
				// Add tooltip
				this.tooltip = new jBox("Tooltip", {
					theme: "TooltipBorder",
					attach: "[data-inception-tooltip]",
					getContent: "data-inception-tooltip",
					zIndex: "auto",
					delayOpen: 600,
				});

				// Add button event
				this.content
					.find(".inception-modal-button")
					.on("click", function () {
						openSevenRules();
					});
			},
			// Remove modal from DOM when it's closed
			onCloseComplete: function () {
				this.destroy();
				this.tooltip && this.tooltip.destroy();
			},
		}).open();
	}

	function openSevenRules() {
		new jBox("Modal", {
			width: 800,
			addClass: "inception-modal",
			overlayClass: "inception-overlay",
			zIndex: "auto",
			draggable: "title",
			closeOnClick: false,
			closeButton: "title",
			title: "<h3><strong>N???i dung 7 h??nh vi l??nh ?????o</strong></h3>",
			offset: {
				x: offsetLevel * 15,
				y: offsetLevel * 15,
			},
			content:
				"<p>????? t??? ch???c ph??t tri???n m???nh m??? v?? c?? ch??? ?????ng, t???t c??? ban l??nh ?????o v?? th??nh vi??n t??? ch???c ?????u n???m v???ng 4 h??nh vi l??nh ?????o nh?? sau:</p>" +
				`
        <ul>
            <li>C???p l??nh ?????o c???n quan t??m, ?????ng vi??n th??nh vi??n, quan s??t n??ng l???c v?? c?? k??? ho???ch ????o t???o cho to??n b??? th??nh vi??n</li>
            <li>T???o ??i???u ki???n m??i tr?????ng l??m vi???c t???t v?? k???t n???i t???t c??? th??nh vi??n l???i v???i nhau.</li>
            <li>C???n bi???t ????a ra c??c ?? t?????ng, k??ch th??ch s???c s??ng t???o c???a th??nh vi??n</li>
            <li>L?? ng?????i c???m l??i, l?? huynh tr?????ng nh??ng c??ng l?? ng?????i ph???c v???.</li>
        </ul>
        <p>Tuy nhi??n, ai c??ng c?? th??? bi???u l??? kh??? n??ng l??nh ?????o, ch??nh v?? th???</p>
        <ul>
            <li>M???i ng?????i c???n c?? th??i ????? c???a nh?? l??nh ?????o-b???t k??? vai tr?? c???a m??nh l?? g??</li>
            <li>C???n nh???n l??nh tr??ch nhi???m v??? m??nh ????? ?????t k???t qu??? cao nh???t</li>
            <li>L??m vi???c c???n c?? k??? ho???ch, b??o c??o</li>
            <li>M???i ng?????i c???n t??ch c???c v?? kh??i ngu???n c???m h???ng</li>
            <li>C???n bi???t n??? l???c h??n m???t ch??t n???a khi l??m vi???c, xem s??? thay ?????i l?? c?? h???i khi???n s??? vi???c t???t ?????p h??n</li>
        </ul>
        ` +
				'<p><button class="inception-modal-button btn btn-primary" data-inception-tooltip="Nh???n ????? xem 6 nguy??n t???c v??n h??a">Xem 6 nguy??n t???c v??n h??a</button></p>',

			onCreated: function () {
				// Add tooltip
				this.tooltip = new jBox("Tooltip", {
					theme: "TooltipBorder",
					attach: "[data-inception-tooltip]",
					getContent: "data-inception-tooltip",
					zIndex: "auto",
					delayOpen: 600,
				});

				// Add button event
				this.content
					.find(".inception-modal-button")
					.on("click", function () {
						openSixRules();
					});
			},
			// Remove modal from DOM when it's closed
			onCloseComplete: function () {
				this.destroy();
				this.tooltip && this.tooltip.destroy();
			},
		}).open();
	}

	/**
	 * Team section swiper
	 */
	new Swiper(".team-slider", {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: "auto",
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},

			989: {
				slidesPerView: 2,
				spaceBetween: 20,
			},

			999: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			1005: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			1023: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			1030: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
	});

    /**
     * Change background due to time
     * @param {time} time - current time
     */
    function changeBackground(time){
        var hour = time.getHours()
        console.log(hour)

        // Morning
        if(hour >= 6 && hour <= 14){
            return $('#hero').css('background-image', 'url(https://wallpaperaccess.com/full/448248.jpg)')
        }

        // Evening
        if(hour >= 15 && hour <= 18){
            return $('#hero').css('background-image', 'url(https://i.ibb.co/Jx9kYdL/evening.jpg)')
        }

        // Night
        if(hour >= 19 || (hour >= 0 && hour <= 5)){
            return $('#hero').css('background-image', 'url(https://i.ibb.co/GQxRqQ5/night.jpg)')
        }
    }

    var time = new Date()
    changeBackground(time)
})();
