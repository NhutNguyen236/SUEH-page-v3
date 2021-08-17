/**
 * Template Name: Selecao - v4.3.0
 * Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
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
	// Modal popup for 6 nguyên tắc văn hóa
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
			title: "<h3><strong>Nội dung 6 nguyên tắc văn hóa</strong></h3>",
			offset: {
				x: offsetLevel * 15,
				y: offsetLevel * 15,
			},
			content:
				"<p>Để gắn kết toàn bộ các nhân sự trong tổ chức, SUEH đã xây dựng và phát triển cẩm nang hoạt động SUEH có sự tham khảo từ văn hóa Vinamilk, nêu ra 6 nguyên tắc bắt buộc tổ chức phải đi theo</p>" +
				`
        <ul style="clear:left;">
            <li><strong>Trách nhiệm</strong>: Khi được giao nhiệm vụ phải hoàn thành một cách đầy đủ, đúng hạn, và phải chịu trách nhiệm về những việc mình làm</li>
            <li><strong>Hướng kết quả</strong>: Đó là đích đến để bắt đầu thực hiện mọi hành động</li>
            <li><strong>Sáng tạo và chủ động</strong>: Đề cao cái mới, tìm kiếm nhiều giải pháp.</li>
            <li><strong>Hợp tác</strong>: Chắc chắn sẽ đạt được kết quả tốt khi sử dụng nhiều hơn một bộ não</li>
            <li><strong>Chính trực</strong>: Trung thực, thật thà</li>
            <li><strong>Xuất sắc</strong>: Có kỹ năng tốt, và luôn cải thiện năng lực</li>
        </ul>
        ` +
				'<p><button class="inception-modal-button btn btn-primary" data-inception-tooltip="Nhấn để xen 7 hành vi lãnh đạo">Xem 7 hành vi lãnh đạo</button></p>',

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
			title: "<h3><strong>Nội dung 7 hành vi lãnh đạo</strong></h3>",
			offset: {
				x: offsetLevel * 15,
				y: offsetLevel * 15,
			},
			content:
				"<p>Để tổ chức phát triển mạnh mẽ và có chỗ đứng, tất cả ban lãnh đạo và thành viên tổ chức đều nắm vững 4 hành vi lãnh đạo như sau:</p>" +
				`
        <ul>
            <li>Cấp lãnh đạo cần quan tâm, động viên thành viên, quan sát năng lực và có kế hoạch đào tạo cho toàn bộ thành viên</li>
            <li>Tạo điều kiện môi trường làm việc tốt và kết nối tất cả thành viên lại với nhau.</li>
            <li>Cần biết đưa ra các ý tưởng, kích thích sức sáng tạo của thành viên</li>
            <li>Là người cầm lái, là huynh trưởng nhưng cũng là người phục vụ.</li>
        </ul>
        <p>Tuy nhiên, ai cũng có thể biểu lộ khả năng lãnh đạo, chính vì thế</p>
        <ul>
            <li>Mọi người cần có thái độ của nhà lãnh đạo-bất kể vai trò của mình là gì</li>
            <li>Cần nhận lãnh trách nhiệm về mình để đạt kết quả cao nhất</li>
            <li>Làm việc cần có kế hoạch, báo cáo</li>
            <li>Mọi người cần tích cực và khơi nguồn cảm hứng</li>
            <li>Cần biết nỗ lực hơn một chút nữa khi làm việc, xem sự thay đổi là cơ hội khiến sự việc tốt đẹp hơn</li>
        </ul>
        ` +
				'<p><button class="inception-modal-button btn btn-primary" data-inception-tooltip="Nhấn để xem 6 nguyên tắc văn hóa">Xem 6 nguyên tắc văn hóa</button></p>',

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
            $('#hero').css('background-image', 'url(https://wallpaperaccess.com/full/448248.jpg)')
        }

        // Evening
        else if(hour >= 15 && hour <= 18){
            $('#hero').css('background-image', 'url(https://i.ibb.co/Jx9kYdL/evening.jpg)')
        }

        // Night
        else if(hour >= 19 && hour <= 5){
            $('#hero').css('background-image', 'url(https://i.ibb.co/GQxRqQ5/night.jpg)')
        }
    }

    var time = new Date()
    changeBackground(time)
})();
