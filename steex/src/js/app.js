/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Version: 1.1.0
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Main Js File
*/

(function () {
	("use strict");

	/**
	 *  global variables
	 */
	var navbarMenuHTML = document.querySelector(".navbar-menu").innerHTML;
	var default_lang = "en"; // set Default Language
	var language = localStorage.getItem("language");

	function initLanguage() {
		// Set new language
		(language === null) ? setLanguage(default_lang) : setLanguage(language);
		var languages = document.getElementsByClassName("language");
		languages && Array.from(languages).forEach(function (dropdown) {
			dropdown.addEventListener("click", function (event) {
				setLanguage(dropdown.getAttribute("data-lang"));
			});
		});
	}

	function setLanguage(lang) {
		if (document.getElementById("header-lang-img")) {
			switch (lang) {
				case "en":
					document.getElementById("header-lang-img").src = "/static/images/flags/us.svg";
					break;
				case "sp":
					document.getElementById("header-lang-img").src = "/static/images/flags/spain.svg";
					break;
				case "gr":
					document.getElementById("header-lang-img").src = "/static/images/flags/germany.svg";
					break;
				case "it":
					document.getElementById("header-lang-img").src = "/static/images/flags/italy.svg";
					break;
				case "ru":
					document.getElementById("header-lang-img").src = "/static/images/flags/russia.svg";
					break;
				case "ch":
					document.getElementById("header-lang-img").src = "/static/images/flags/china.svg";
					break;
				case "fr":
					document.getElementById("header-lang-img").src = "/static/images/flags/french.svg";
					break;
				case "ar":
					document.getElementById("header-lang-img").src = "/static/images/flags/ae.svg";
					break;
				default:
					console.error("Unsupported language selected:", lang);
					return;
			}
			localStorage.setItem("language", lang);
			language = localStorage.getItem("language");
			getLanguage();
		}
	}

	// Multi language setting
	function getLanguage() {
		language == null ? setLanguage(default_lang) : false;
		var request = new XMLHttpRequest();
		// Instantiating the request object
		request.open("GET", "/static/lang/" + language + ".json");
		// Defining event listener for readystatechange event
		request.onreadystatechange = function () {
			// Check if the request is compete and was successful
			if (this.readyState === 4 && this.status === 200) {
				var data = JSON.parse(this.responseText);
				Object.keys(data).forEach(function (key) {
					var elements = document.querySelectorAll("[data-key='" + key + "']");
					Array.from(elements).forEach(function (elem) {
						elem.textContent = data[key];
					});
				});
			}
		};
		// Sending the request to the server
		request.send();
	}

	function pluginData() {
		/**
		 * Common plugins
		 */
		/**
		 * Toast UI Notification
		 */
		var toastExamples = document.querySelectorAll("[data-toast]");
		Array.from(toastExamples).forEach(function (element) {
			element.addEventListener("click", function () {
				var toastData = {};
				var isToastVal = element.attributes;
				if (isToastVal["data-toast-text"])
					toastData.text = isToastVal["data-toast-text"].value.toString();
				if (isToastVal["data-toast-gravity"])
					toastData.gravity = isToastVal["data-toast-gravity"].value.toString();
				if (isToastVal["data-toast-position"])
					toastData.position = isToastVal["data-toast-position"].value.toString();
				if (isToastVal["data-toast-className"])
					toastData.className = isToastVal["data-toast-className"].value.toString();
				if (isToastVal["data-toast-duration"])
					toastData.duration = isToastVal["data-toast-duration"].value.toString();
				if (isToastVal["data-toast-close"])
					toastData.close = isToastVal["data-toast-close"].value.toString();
				if (isToastVal["data-toast-style"])
					toastData.style = isToastVal["data-toast-style"].value.toString();
				if (isToastVal["data-toast-offset"])
					toastData.offset = isToastVal["data-toast-offset"];

				Toastify({
					newWindow: true,
					text: toastData.text,
					gravity: toastData.gravity,
					position: toastData.position,
					className: "bg-" + toastData.className,
					stopOnFocus: true,
					offset: {
						x: toastData.offset ? 50 : 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
						y: toastData.offset ? 10 : 0, // vertical axis - can be a number or a string indicating unity. eg: '2em'
					},
					duration: toastData.duration,
					close: toastData.close == "close" ? true : false,
					style: toastData.style == "style" ? {
						background: "linear-gradient(to right, #0AB39C, #405189)"
					} : "",
				}).showToast();
			});
		});

		/**
		 * Choices Select plugin
		 */
		var choicesExamples = document.querySelectorAll("[data-choices]");
		Array.from(choicesExamples).forEach(function (item) {
			var choiceData = {};
			var isChoicesVal = item.attributes;
			if (isChoicesVal["data-choices-groups"])
				choiceData.placeholderValue = "This is a placeholder set in the config";
			if (isChoicesVal["data-choices-search-false"])
				choiceData.searchEnabled = false;
			if (isChoicesVal["data-choices-search-true"])
				choiceData.searchEnabled = true;
			if (isChoicesVal["data-choices-removeItem"])
				choiceData.removeItemButton = true;
			if (isChoicesVal["data-choices-sorting-false"])
				choiceData.shouldSort = false;
			if (isChoicesVal["data-choices-sorting-true"])
				choiceData.shouldSort = true;
			if (isChoicesVal["data-choices-multiple-remove"])
				choiceData.removeItemButton = true;
			if (isChoicesVal["data-choices-limit"])
				choiceData.maxItemCount = isChoicesVal["data-choices-limit"].value.toString();
			if (isChoicesVal["data-choices-limit"])
				choiceData.maxItemCount = isChoicesVal["data-choices-limit"].value.toString();
			if (isChoicesVal["data-choices-editItem-true"])
				choiceData.maxItemCount = true;
			if (isChoicesVal["data-choices-editItem-false"])
				choiceData.maxItemCount = false;
			if (isChoicesVal["data-choices-text-unique-true"])
				choiceData.duplicateItemsAllowed = false;
			if (isChoicesVal["data-choices-text-disabled-true"])
				choiceData.addItems = false;
			isChoicesVal["data-choices-text-disabled-true"] ? new Choices(item, choiceData).disable() : new Choices(item, choiceData);
		});

		/**
		 * flatpickr
		 */
		var flatpickrExamples = document.querySelectorAll("[data-provider]");
		Array.from(flatpickrExamples).forEach(function (item) {
			if (item.getAttribute("data-provider") == "flatpickr") {
				var dateData = {};
				var isFlatpickerVal = item.attributes;
				if (isFlatpickerVal["data-date-format"])
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				if (isFlatpickerVal["data-enable-time"]) {
					(dateData.enableTime = true),
						(dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString() + " H:i");
				}
				if (isFlatpickerVal["data-altFormat"]) {
					(dateData.altInput = true),
						(dateData.altFormat = isFlatpickerVal["data-altFormat"].value.toString());
				}
				if (isFlatpickerVal["data-minDate"]) {
					dateData.minDate = isFlatpickerVal["data-minDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-maxDate"]) {
					dateData.maxDate = isFlatpickerVal["data-maxDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-default-date"]) {
					dateData.defaultDate = isFlatpickerVal["data-default-date"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-multiple-date"]) {
					dateData.mode = "multiple";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-range-date"]) {
					dateData.mode = "range";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-inline-date"]) {
					(dateData.inline = true),
						(dateData.defaultDate = isFlatpickerVal["data-default-date"].value.toString());
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-disable-date"]) {
					var dates = [];
					dates.push(isFlatpickerVal["data-disable-date"].value);
					dateData.disable = dates.toString().split(",");
				}
				if (isFlatpickerVal["data-week-number"]) {
					var dates = [];
					dates.push(isFlatpickerVal["data-week-number"].value);
					dateData.weekNumbers = true
				}
				flatpickr(item, dateData);
			} else if (item.getAttribute("data-provider") == "timepickr") {
				var timeData = {};
				var isTimepickerVal = item.attributes;
				if (isTimepickerVal["data-time-basic"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i");
				}
				if (isTimepickerVal["data-time-hrs"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.time_24hr = true);
				}
				if (isTimepickerVal["data-min-time"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.minTime = isTimepickerVal["data-min-time"].value.toString());
				}
				if (isTimepickerVal["data-max-time"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.minTime = isTimepickerVal["data-max-time"].value.toString());
				}
				if (isTimepickerVal["data-default-time"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.defaultDate = isTimepickerVal["data-default-time"].value.toString());
				}
				if (isTimepickerVal["data-time-inline"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.defaultDate = isTimepickerVal["data-time-inline"].value.toString());
					timeData.inline = true;
				}
				flatpickr(item, timeData);
			}
		});

		// Dropdown
		const dropdownMenuLinks = document.querySelectorAll('.dropdown-menu a[data-bs-toggle="tab"]');
		dropdownMenuLinks.forEach(function (link) {
			link.addEventListener("click", function (event) {
				event.preventDefault();
				event.stopPropagation();
				const targetTab = bootstrap.Tab.getInstance(link);
				targetTab.show();
			});
		});
	}

	// on click collapse menu
	function isCollapseMenu() {
		/**
		 * Sidebar menu collapse
		 */
		const collapses = document.querySelectorAll(".navbar-nav .collapse");
		if (collapses) {
			collapses.forEach(function (collapse) {
				// Init collapses
				const collapseInstance = new bootstrap.Collapse(collapse, {
					toggle: false,
				});

				// Hide sibling collapses on `show.bs.collapse`
				collapse.addEventListener("show.bs.collapse", function (e) {
					e.stopPropagation();
					var closestCollapse = collapse.parentElement.closest(".collapse");
					if (closestCollapse) {
						var siblingCollapses = closestCollapse.querySelectorAll(".collapse");
						siblingCollapses.forEach(function (siblingCollapse) {
							var siblingCollapseInstance = bootstrap.Collapse.getInstance(siblingCollapse);
							if (siblingCollapseInstance === collapseInstance) {
								return;
							}
							siblingCollapseInstance.hide();
						});
					} else {
						var getSiblings = function (elem) {
							var siblings = [];
							var sibling = elem.parentNode.firstChild;
							while (sibling) {
								if (sibling.nodeType === 1 && sibling !== elem) {
									siblings.push(sibling);
								}
								sibling = sibling.nextSibling;
							}
							return siblings;
						};
						var siblings = getSiblings(collapse.parentElement);
						siblings.forEach(function (item) {
							if (item.childNodes.length > 2)
								item.firstElementChild.setAttribute("aria-expanded", "false");
							var ids = item.querySelectorAll("*[id]");
							ids.forEach(function (item1) {
								item1.classList.remove("show");
								if (item1.childNodes.length > 2) {
									var val = item1.querySelectorAll("ul li a");
									val.forEach(function (subitem) {
										if (subitem.hasAttribute("aria-expanded"))
											subitem.setAttribute("aria-expanded", "false");
									});
								}
							});
						});
					}
				});
			});
		}
	}

	/**
	 * Generate two column menu
	 */
	function twoColumnMenuGenerate() {
		var isTwoColumn = document.documentElement.getAttribute("data-layout");
		var isValues = sessionStorage.getItem("defaultAttribute");
		var defaultValues = JSON.parse(isValues);

		if (defaultValues && (isTwoColumn == "twocolumn" || defaultValues["data-layout"] == "twocolumn")) {
			if (document.querySelector(".navbar-menu")) {
				document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
			}
			var ul = document.createElement("ul");
			ul.innerHTML = '<a href="/" class="logo"><img src="/static/images/logo-sm.png" alt="" height="22"></a>';
			Array.from(document.getElementById("navbar-nav").querySelectorAll(".menu-link")).forEach(function (item) {
				ul.className = "twocolumn-iconview";
				var li = document.createElement("li");
				var a = item;
				a.querySelectorAll("span").forEach(function (element) {
					element.classList.add("d-none");
				});

				if (item.parentElement.classList.contains("twocolumn-item-show")) {
					item.classList.add("active");
				}
				li.appendChild(a);
				ul.appendChild(li);

				a.classList.contains("nav-link") ? a.classList.replace("nav-link", "nav-icon") : "";
				a.classList.remove("collapsed", "menu-link");
			});
			var currentPath = location.pathname == "/" ? "/" : location.pathname.substring(1);
			currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
			if (currentPath) {
				// navbar-nav
				var a = document.getElementById("navbar-nav").querySelector('[href="' + currentPath + '"]');

				if (a) {
					var parentCollapseDiv = a.closest(".collapse.menu-dropdown");
					if (parentCollapseDiv) {
						parentCollapseDiv.classList.add("show");
						parentCollapseDiv.parentElement.children[0].classList.add("active");
						parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
						if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
							parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
							if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
								parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
							if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")) {
								parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").classList.add("show");
								if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling) {
									parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
								}
							}
						}
					}
				}
			}
			// add all sidebar menu icons
			document.getElementById("two-column-menu").innerHTML = ul.outerHTML;

			// show submenu on sidebar menu click
			Array.from(document.querySelector("#two-column-menu ul").querySelectorAll("li a")).forEach(function (element) {
				var currentPath = location.pathname == "/" ? "/" : location.pathname.substring(1);
				currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
				element.addEventListener("click", function (e) {
					if (!(currentPath == "/" + element.getAttribute("href") && !element.getAttribute("data-bs-toggle")))
						document.body.classList.contains("twocolumn-panel") ? document.body.classList.remove("twocolumn-panel") : "";
					document.getElementById("navbar-nav").classList.remove("twocolumn-nav-hide");
					document.querySelector(".hamburger-icon").classList.remove("open");
					if ((e.target && e.target.matches("a.nav-icon")) || (e.target && e.target.matches("i"))) {
						if (document.querySelector("#two-column-menu ul .nav-icon.active") !== null)
							document.querySelector("#two-column-menu ul .nav-icon.active").classList.remove("active");
						e.target.matches("i") ? e.target.closest("a").classList.add("active") : e.target.classList.add("active");

						var twoColumnItem = document.getElementsByClassName("twocolumn-item-show");

						twoColumnItem.length > 0 ? twoColumnItem[0].classList.remove("twocolumn-item-show") : "";

						var currentMenu = e.target.matches("i") ? e.target.closest("a") : e.target;
						var childMenusId = currentMenu.getAttribute("href").slice(1);
						if (document.getElementById(childMenusId))
							document.getElementById(childMenusId).parentElement.classList.add("twocolumn-item-show");
					}
				});

				// add active class to the sidebar menu icon who has direct link
				if (currentPath == "/" + element.getAttribute("href") && !element.getAttribute("data-bs-toggle")) {
					element.classList.add("active");
					document.getElementById("navbar-nav").classList.add("twocolumn-nav-hide");
					if (document.querySelector(".hamburger-icon")) {
						document.querySelector(".hamburger-icon").classList.add("open");
					}
				}
			});

			var currentLayout = document.documentElement.getAttribute("data-layout");
			if (currentLayout !== "horizontal") {
				var simpleBar = new SimpleBar(document.getElementById("navbar-nav"));
				if (simpleBar) simpleBar.getContentElement();

				var simpleBar1 = new SimpleBar(
					document.getElementsByClassName("twocolumn-iconview")[0]
				);
				if (simpleBar1) simpleBar1.getContentElement();
			}
		}
	}

	//  Search menu dropdown on Topbar
	function isCustomDropdown() {
		//Search bar
		var searchOptions = document.getElementById("search-close-options");
		var dropdown = document.getElementById("search-dropdown");
		var searchInput = document.getElementById("search-options");
		if (searchInput) {
			searchInput.addEventListener("focus", function () {
				var inputLength = searchInput.value.length;
				if (inputLength > 0) {
					dropdown.classList.add("show");
					searchOptions.classList.remove("d-none");
				} else {
					dropdown.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});

			searchInput.addEventListener("keyup", function (event) {
				var inputLength = searchInput.value.length;
				if (inputLength > 0) {
					dropdown.classList.add("show");
					searchOptions.classList.remove("d-none");

					var inputVal = searchInput.value.toLowerCase();
					var notifyItem = document.getElementsByClassName("notify-item");

					Array.from(notifyItem).forEach(function (element) {
						var notifyText = ''
						if (element.querySelector("h6")) {
							var spanText = element.getElementsByTagName("span")[0].innerText.toLowerCase()
							var name = element.querySelector("h6").innerText.toLowerCase()
							if (name.includes(inputVal)) {
								notifyText = name
							} else {
								notifyText = spanText
							}
						} else if (element.getElementsByTagName("span")) {
							notifyText = element.getElementsByTagName("span")[0].innerText.toLowerCase()
						}

						if (notifyText) {
							if (notifyText.includes(inputVal)) {
								element.classList.add("d-block");
								element.classList.remove("d-none");
							} else {
								element.classList.remove("d-block");
								element.classList.add("d-none");
							}
						}

						Array.from(document.getElementsByClassName("notification-group-list")).forEach(function (element) {
							if (element.querySelectorAll(".notify-item.d-block").length == 0) {
								element.querySelector(".notification-title").style.display = 'none'
							} else {
								element.querySelector(".notification-title").style.display = 'block'
							}
						});
					});
				} else {
					dropdown.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});

			searchOptions.addEventListener("click", function () {
				searchInput.value = "";
				dropdown.classList.remove("show");
				searchOptions.classList.add("d-none");
			});

			document.body.addEventListener("click", function (e) {
				if (e.target.getAttribute("id") !== "search-options") {
					dropdown.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});
		}
	}
	//  search menu dropdown on topbar
	function isCustomDropdownResponsive() {
		//Search bar
		var searchOptions = document.getElementById("search-close-options");
		var dropdownResponsive = document.getElementById("search-dropdown-reponsive");
		var searchInputResponsive = document.getElementById("search-options-reponsive");

		if (searchOptions && dropdownResponsive && searchInputResponsive) {
			searchInputResponsive.addEventListener("focus", function () {
				var inputLength = searchInputResponsive.value.length;
				if (inputLength > 0) {
					dropdownResponsive.classList.add("show");
					searchOptions.classList.remove("d-none");
				} else {
					dropdownResponsive.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});

			searchInputResponsive.addEventListener("keyup", function () {
				var inputLength = searchInputResponsive.value.length;
				if (inputLength > 0) {
					dropdownResponsive.classList.add("show");
					searchOptions.classList.remove("d-none");
				} else {
					dropdownResponsive.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});

			searchOptions.addEventListener("click", function () {
				searchInputResponsive.value = "";
				dropdownResponsive.classList.remove("show");
				searchOptions.classList.add("d-none");
			});

			document.body.addEventListener("click", function (e) {
				if (e.target.getAttribute("id") !== "search-options") {
					dropdownResponsive.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});
		}
	}

	function initLeftMenuCollapse() {
		/**
		 * Vertical layout menu scroll add
		 */
		if (document.documentElement.getAttribute("data-layout") == "vertical") {
			document.getElementById("two-column-menu").innerHTML = "";
			if (document.querySelector(".navbar-menu")) {
				document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
			}
			document.getElementById("scrollbar").setAttribute("data-simplebar", "");
			document.getElementById("navbar-nav").setAttribute("data-simplebar", "");
			document.getElementById("scrollbar").classList.add("h-100");
		}

		/**
		 * Two-column layout menu scroll add
		 */
		if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
			document.getElementById("scrollbar").removeAttribute("data-simplebar");
			document.getElementById("scrollbar").classList.remove("h-100");
		}
	}

	function isLoadBodyElement() {
		var verticalOverlay = document.getElementsByClassName("vertical-overlay");
		if (verticalOverlay) {
			Array.from(verticalOverlay).forEach(function (element) {
				element.addEventListener("click", function () {
					document.body.classList.remove("vertical-sidebar-enable");
					if (sessionStorage.getItem("data-layout") == "twocolumn")
						document.body.classList.add("twocolumn-panel");
					else
						document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
				});
			});
		}
	}

	function windowResizeHover() {
		var windowSize = document.documentElement.clientWidth;
		if (windowSize < 1025 && windowSize > 767) {
			document.body.classList.remove("twocolumn-panel");
			if (sessionStorage.getItem("data-layout") == "twocolumn") {
				document.documentElement.setAttribute("data-layout", "twocolumn");
				if (document.getElementById("customizer-layout03")) {
					document.getElementById("customizer-layout03").click();
				}
				twoColumnMenuGenerate();
				initTwoColumnActiveMenu();
				isCollapseMenu();
			}
			if (sessionStorage.getItem("data-layout") == "vertical") {
				document.documentElement.setAttribute("data-sidebar-size", "sm");
			}
			if (sessionStorage.getItem("data-layout") != "horizontal") {
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
			if (document.querySelector(".hamburger-icon")) {
				document.querySelector(".hamburger-icon").classList.add("open");
			}
		} else if (windowSize >= 1025) {
			document.body.classList.remove("twocolumn-panel");
			if (sessionStorage.getItem("data-layout") == "twocolumn") {
				document.documentElement.setAttribute("data-layout", "twocolumn");
				if (document.getElementById("customizer-layout03")) {
					document.getElementById("customizer-layout03").click();
				}
				twoColumnMenuGenerate();
				initTwoColumnActiveMenu();
				isCollapseMenu();
			}
			if (sessionStorage.getItem("data-layout") == "vertical") {
				document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
			}
			if (sessionStorage.getItem("data-layout") == "horizontal") {
				updateHorizontalMenus();
			}
			if (document.querySelector(".hamburger-icon")) {
				document.querySelector(".hamburger-icon").classList.remove("open");
			}
		} else if (windowSize <= 767) {
			document.body.classList.remove("vertical-sidebar-enable");
			document.body.classList.add("twocolumn-panel");
			if (sessionStorage.getItem("data-layout") == "twocolumn") {
				document.documentElement.setAttribute("data-layout", "vertical");
				hideShowLayoutOptions("vertical");
				isCollapseMenu();
			}
			if (sessionStorage.getItem("data-layout") != "horizontal") {
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
			if (document.querySelector(".hamburger-icon")) {
				document.querySelector(".hamburger-icon").classList.add("open");
			}
		}
		menuPosSetOnClicknHover();
	}

	function menuPosSetOnClicknHover() {
		const isElement = document.querySelectorAll("#navbar-nav > li.nav-item");
		Array.from(isElement).forEach(function (item) {
			item.addEventListener("click", menuItem.bind(this), false);
			item.addEventListener("mouseover", menuItem.bind(this), false);
		});
	}

	function menuItem(e) {
		// get the dropdown menu element
		var dropdownMenu = e.target;
		const subMenus = (dropdownMenu.nextElementSibling) ? dropdownMenu.nextElementSibling : dropdownMenu.parentElement.nextElementSibling;
		if (dropdownMenu && subMenus) {
			// get the position and dimensions of the dropdown menu
			var dropdownOffset = subMenus.getBoundingClientRect();
			var dropdownWidth = subMenus.offsetWidth;
			var dropdownHeight = subMenus.offsetHeight;

			// get the dimensions of the screen
			var screenWidth = window.innerWidth;
			var screenHeight = window.innerHeight;

			// calculate the maximum x and y coordinates of the dropdown menu
			var maxDropdownX = dropdownOffset.left + dropdownWidth;
			var maxDropdownY = dropdownOffset.top + dropdownHeight;

			// check if the dropdown menu goes outside the screen
			var isDropdownOffScreen = (maxDropdownX > screenWidth) || (maxDropdownY > screenHeight);

			if (isDropdownOffScreen) {
				if (subMenus.classList.contains("menu-dropdown")) {
					subMenus.classList.add("dropdown-custom-right");
				}
			}
		}
	}

	function toggleHamburgerMenu() {
		var windowSize = document.documentElement.clientWidth;

		if (windowSize > 767)
			document.querySelector(".hamburger-icon").classList.toggle("open");

		//For collapse horizontal menu
		if (document.documentElement.getAttribute("data-layout") === "horizontal") {
			document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
		}

		//For collapse vertical menu
		if (document.documentElement.getAttribute("data-layout") === "vertical") {
			if (windowSize < 1025 && windowSize > 767) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
					document.documentElement.setAttribute("data-sidebar-size", "") :
					document.documentElement.setAttribute("data-sidebar-size", "sm");
			} else if (windowSize > 1025) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
					document.documentElement.setAttribute("data-sidebar-size", "sm") :
					document.documentElement.setAttribute("data-sidebar-size", "lg");
			} else if (windowSize <= 767) {
				document.body.classList.add("vertical-sidebar-enable");
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
		}

		//Two column menu
		if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
			document.body.classList.contains("twocolumn-panel") ?
				document.body.classList.remove("twocolumn-panel") :
				document.body.classList.add("twocolumn-panel");
		}
	}

	function windowLoadContent() {
		window.addEventListener("resize", windowResizeHover);
		windowResizeHover();

		document.addEventListener("scroll", function () {
			windowScroll();
		});

		window.addEventListener("load", function () {
			var isTwoColumn = document.documentElement.getAttribute("data-layout");
			if (isTwoColumn == "twocolumn") {
				initTwoColumnActiveMenu();
			} else {
				initActiveMenu();
			}
			isLoadBodyElement();
			addEventListenerOnSmHoverMenu();
		});
		if (document.getElementById("topnav-hamburger-icon")) {
			document.getElementById("topnav-hamburger-icon").addEventListener("click", toggleHamburgerMenu);
		}
		var isValues = sessionStorage.getItem("defaultAttribute");
		var defaultValues = JSON.parse(isValues);
		var windowSize = document.documentElement.clientWidth;

		if (defaultValues["data-layout"] == "twocolumn" && windowSize < 767) {
			Array.from(document.getElementById("two-column-menu").querySelectorAll("li")).forEach(function (item) {
				item.addEventListener("click", function (e) {
					document.body.classList.remove("twocolumn-panel");
				});
			});
		}
	}

	// page topbar class added
	function windowScroll() {
		var pageTopbar = document.getElementById("page-topbar");
		if (pageTopbar) {
			document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add("topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
		}
	}

	function initTwoColumnActiveMenu() {
        // two column sidebar active js
        var currentPath = location.pathname == "/" ? "/" : "/" + location.pathname.substring(1);

        if (currentPath) {
            if(document.body.className == "twocolumn-panel"){
				document.getElementById("two-column-menu").querySelector('[href="' + currentPath + '"]').classList.add("active");
			}
            // navbar-nav
            var a = document.getElementById("navbar-nav").querySelector('[href="' + currentPath + '"]');
            if (a) {
                a.classList.add("active");
                var parentCollapseDiv = a.closest('.collapse.menu-dropdown');
                if (parentCollapseDiv && parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
                    parentCollapseDiv.classList.add("show");
                    parentCollapseDiv.parentElement.children[0].classList.add("active");
                    parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown').parentElement.classList.add("twocolumn-item-show");
                    if(parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")){
						var menuIdSub = parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown").getAttribute("id");
						parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show");
						parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.remove("twocolumn-item-show");
						if (document.getElementById("two-column-menu").querySelector('[href="#' + menuIdSub + '"]'))
						document.getElementById("two-column-menu").querySelector('[href="#' + menuIdSub + '"]').classList.add("active");
					}
                    var menuId = parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown').getAttribute("id");
                    if (document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]'))
                        document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]').classList.add("active");
                } else {
                    a.closest('.collapse.menu-dropdown').parentElement.classList.add("twocolumn-item-show")
                    var menuId = parentCollapseDiv.getAttribute("id");
                    if (document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]'))
                        document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]').classList.add("active");
                }
            } else {
                document.body.classList.add('twocolumn-panel');
            }
        }
    }

	// two-column sidebar active js
	function initActiveMenu() {
		var currentPath = location.pathname == "/" ? "/" : "/" + location.pathname.substring(1);
		
		if (currentPath) {
			// navbar-nav
			var a = document.getElementById("navbar-nav").querySelector('[href="' + currentPath + '"]');
			if (a) {
				a.classList.add("active");
				var parentCollapseDiv = a.closest(".collapse.menu-dropdown");
				if (parentCollapseDiv) {
					parentCollapseDiv.classList.add("show");
					parentCollapseDiv.parentElement.children[0].classList.add("active");
					parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
					if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
						parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
						if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
							parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");

						if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")) {
							parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").classList.add("show");
							if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling) {

								parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
								if ((document.documentElement.getAttribute("data-layout") == "horizontal") && parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse")) {
									parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active")
								}
							}
						}
					}
				}
			}
			initMenuItemScroll();
		}
	}


	// notification cart dropdown
	function initTopbarComponents() {
		// cart dropdown

		// input spin
		isData();
		function isData() {
			var plus = document.getElementsByClassName('plus');
			var minus = document.getElementsByClassName('minus');
			var product = document.getElementsByClassName("product");

			if (plus) {
				Array.from(plus).forEach(function (e) {
					e.addEventListener('click', function (event) {
						// if(event.target.previousElementSibling.value )
						if (parseInt(e.previousElementSibling.value) < event.target.previousElementSibling.getAttribute('max')) {
							event.target.previousElementSibling.value++;
							if (product) {
								Array.from(product).forEach(function (x) {
									updateQuantity(event.target);
								})
							}
						}
					});
				});
			}

			if (minus) {
				Array.from(minus).forEach(function (e) {
					e.addEventListener('click', function (event) {
						if (parseInt(e.nextElementSibling.value) > event.target.nextElementSibling.getAttribute('min')) {
							event.target.nextElementSibling.value--;
							if (product) {
								Array.from(product).forEach(function (x) {
									updateQuantity(event.target);
								})
							}
						}
					});
				});
			}
		}

		var taxRate = 0.125;
		var shippingRate = 65.00;
		var discountRate = 0.15;

		var currencySign = "$";
		var cartList = document.querySelectorAll(".product").length;

		document.querySelectorAll(".cartitem-badge").forEach(function (item) {
			item.innerHTML = cartList
		})

		document.querySelectorAll(".product-list").forEach(function (elem) {
			elem.querySelectorAll(".product-count").forEach(function (subelem) {
				subelem.innerHTML = elem.querySelectorAll(".product").length
			})
			recalculateCart(elem);
		})

		function recalculateCart(elm) {
			var subtotal = 0;

			Array.from(elm.getElementsByClassName("product")).forEach(function (item) {
				Array.from(item.getElementsByClassName('product-line-price')).forEach(function (e) {
					subtotal += parseFloat(e.innerHTML);
				});
			});

			/* Calculate totals */
			var tax = subtotal * taxRate;
			var discount = subtotal * discountRate;

			var shipping = (subtotal > 0 ? shippingRate : 0);
			var total = subtotal + tax + shipping - discount;

			elm.querySelector(".cart-subtotal").innerHTML = currencySign + subtotal.toFixed(2);
			elm.querySelector(".cart-tax").innerHTML = currencySign + tax.toFixed(2);
			elm.querySelector(".cart-shipping").innerHTML = currencySign + shipping.toFixed(2);
			elm.querySelector(".cart-total").innerHTML = currencySign + total.toFixed(2);
			elm.querySelector(".cart-discount").innerHTML = "-" + currencySign + discount.toFixed(2);
		}

		if (document.getElementById("empty-cart")) {
			document.getElementById("empty-cart").style.display = "none";
		}
		if (document.getElementById("checkout-elem") || document.getElementById('count-table')) {
			document.getElementById("checkout-elem").style.display = "block";
			document.getElementById("count-table").style.display = "block";
		}

		function updateQuantity(quantityInput) {
			if (quantityInput.closest('.product')) {
				var productRow = quantityInput.closest('.product');
				var productList = quantityInput.closest('.product-list');
				var price;
				if (productRow || productRow.getElementsByClassName('product-price'))
					Array.from(productRow.getElementsByClassName('product-price')).forEach(function (e) {
						price = parseFloat(e.innerHTML);
					});

				if (quantityInput.previousElementSibling && quantityInput.previousElementSibling.classList.contains("product-quantity")) {
					var quantity = quantityInput.previousElementSibling.value;
				} else if (quantityInput.nextElementSibling && quantityInput.nextElementSibling.classList.contains("product-quantity")) {
					var quantity = quantityInput.nextElementSibling.value;
				}
				var linePrice = price * quantity;
				/* Update line price display and recalc cart totals */
				Array.from(productRow.getElementsByClassName('product-line-price')).forEach(function (e) {
					e.innerHTML = linePrice.toFixed(2);
					recalculateCart(productList);
				});
			}
		}

		// Remove product from cart
		var removeProduct = document.getElementById('removeCartModal')
		if (removeProduct)
			removeProduct.addEventListener('show.bs.modal', function (e) {
				document.getElementById('remove-cartproduct').addEventListener('click', function (event) {
					e.relatedTarget.closest('.product').remove();

					document.getElementById("close-cartmodal").click();
					document.querySelectorAll(".cartitem-badge").forEach(function (item) {
						item.innerHTML = document.querySelectorAll(".product").length;
					})

					document.querySelectorAll(".product-list").forEach(function (elem) {
						elem.querySelectorAll(".product-count").forEach(function (subelem) {
							subelem.innerHTML = elem.querySelectorAll(".product").length
						})
						recalculateCart(elem);
					})

					if (document.getElementById("empty-cart")) {
						document.getElementById("empty-cart").style.display = document.querySelectorAll(".product").length == 0 ? "block" : "none";
					}
					if (document.getElementById("checkout-elem") || document.getElementById('count-table')) {
						document.getElementById("checkout-elem").style.display = document.querySelectorAll(".product").length == 0 ? "none" : "block";
						document.getElementById('count-table').style.display = document.querySelectorAll(".product").length == 0 ? "none" : "block";
					}
				});
			});


		// notification messages
		if (document.getElementsByClassName("notification-check")) {
			function emptyNotification() {
				if (document.querySelectorAll(".notification-item").length > 0) {
					document.querySelectorAll(".notification-title").forEach(function (item) {
						item.style.display = "block";
					});
				} else {
					document.querySelectorAll(".notification-title").forEach(function (item) {
						item.style.display = "none";
					});

					var emptyNotificationElem = document.querySelector("#notificationItemsTabContent .empty-notification-elem")
					if (!emptyNotificationElem && document.getElementById("notificationItemsTabContent")) {
						document.getElementById("notificationItemsTabContent").innerHTML += '<div class="empty-notification-elem text-center px-4">\
						<div class="mt-3 avatar-md mx-auto">\
							<div class="avatar-title bg-info-subtle text-info fs-24 rounded-circle">\
							<i class="bi bi-bell "></i>\
							</div>\
						</div>\
						<div class="pb-3 mt-2">\
							<h6 class="fs-lg fw-semibold lh-base">Hey! You have no any notifications </h6>\
						</div>\
					</div>'
					}
				}
			}
			emptyNotification();
			Array.from(document.querySelectorAll(".notification-check input")).forEach(function (element) {
				element.addEventListener("change", function (el) {
					el.target.closest(".notification-item").classList.toggle("active");

					var checkedCount = document.querySelectorAll('.notification-check input:checked').length;

					if (el.target.closest(".notification-item").classList.contains("active")) {
						(checkedCount > 0) ? document.getElementById("notification-actions").style.display = 'block' : document.getElementById("notification-actions").style.display = 'none';
					} else {
						(checkedCount > 0) ? document.getElementById("notification-actions").style.display = 'block' : document.getElementById("notification-actions").style.display = 'none';
					}
					document.getElementById("select-content").innerHTML = checkedCount
				});

				var notificationDropdown = document.getElementById('notificationDropdown')
				if (notificationDropdown) {
					notificationDropdown.addEventListener('hide.bs.dropdown', function (event) {
						element.checked = false;
						document.querySelectorAll('.notification-item').forEach(function (item) {
							item.classList.remove("active");
						})
						emptyNotification();
						document.getElementById('notification-actions').style.display = '';
					});
				}

			});


			var removeItem = document.getElementById('removeNotificationModal');
			if (removeItem) {
				removeItem.addEventListener('show.bs.modal', function (event) {
					document.getElementById("delete-notification").addEventListener("click", function () {
						Array.from(document.querySelectorAll(".notification-item")).forEach(function (element) {
							if (element.classList.contains("active")) {
								element.remove();
							}
							Array.from(document.querySelectorAll(".notification-badge")).forEach(function (item) {
								item.innerHTML = document.querySelectorAll('.notification-check input').length;
							})
							Array.from(document.querySelectorAll(".notification-unread")).forEach(function (item) {
								item.innerHTML = document.querySelectorAll('.notification-item.unread-message').length;
							})
						});
						emptyNotification();
						document.getElementById("NotificationModalbtn-close").click();
					})
				})
			}
		}
	}

	function initComponents() {
		// tooltip
		const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

		tooltipTriggerList.forEach(function (tooltipTriggerEl) {
			new bootstrap.Tooltip(tooltipTriggerEl);
		});

		const popoverTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'));

		popoverTriggerList.forEach(function (popoverTriggerEl) {
			new bootstrap.Popover(popoverTriggerEl);
		});
	}

	// Counter Number
	function counter() {
		const counters = document.querySelectorAll(".counter-value");
		const speed = 250;

		if (counters.length) {
			counters.forEach((counter) => {
				const target = +counter.getAttribute("data-target");
				const inc = target / speed;

				let count = 0;
				const updateCount = () => {
					count += inc;
					if (count < target) {
						counter.innerText = numberWithCommas(count.toFixed(0));
						setTimeout(updateCount, 1);
					} else {
						counter.innerText = numberWithCommas(target);
					}
				};
				updateCount();
			});
		}

		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	function updateHorizontalMenus() {
		const twoColumnMenu = document.getElementById("two-column-menu");
		if (twoColumnMenu) {
			twoColumnMenu.innerHTML = "";
		}

		const navbarMenu = document.querySelector(".navbar-menu");
		if (navbarMenu) {
			navbarMenu.innerHTML = navbarMenuHTML;
		}
		const scrollbar = document.getElementById("scrollbar");
		scrollbar.removeAttribute("data-simplebar");

		const navbarNav = document.getElementById("navbar-nav");
		navbarNav.removeAttribute("data-simplebar");

		scrollbar.classList.remove("h-100");

		// count width of horizontal menu
		const fullWidthOfMenu = navbarNav.parentElement.clientWidth;
		const extraMenuName = "More";
		const menuData = document.querySelectorAll("ul.navbar-nav > li.nav-item");
		let newMenus = "";
		let splitItem = "";
		let menusWidth = 0;
		Array.prototype.forEach.call(menuData, function (item, index) {
			menusWidth += item.offsetWidth;
			if (menusWidth + 100 > fullWidthOfMenu && fullWidthOfMenu != 0) {
				newMenus += item.outerHTML;
				item.remove();
			} else {
				splitItem = item;
			}

			if (index + 1 === menuData.length) {
				if (splitItem.insertAdjacentHTML && newMenus) {
					splitItem.insertAdjacentHTML(
						"afterend",
						'<li class="nav-item">\
						<a class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarMore">\
							<i class="ri-briefcase-2-line"></i> ' + extraMenuName + '\
						</a>\
						<div class="collapse menu-dropdown dropdown-custom-right" id="sidebarMore"><ul class="nav nav-sm flex-column">' + newMenus + "</ul></div>\
					</li>"
					);
				}
			}
		});
		menuPosSetOnClicknHover();
	}

	function hideShowLayoutOptions(dataLayout) {
		if (dataLayout == "vertical") {
			document.getElementById("two-column-menu").innerHTML = "";
			if (document.querySelector(".navbar-menu")) {
				document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
			}
			if (document.getElementById("theme-settings-offcanvas")) {
				document.getElementById("sidebar-size").style.display = "block";
				document.getElementById("sidebar-view").style.display = "block";
				document.getElementById("sidebar-color").style.display = "block";
				if (document.getElementById("sidebar-img")) {
					document.getElementById("sidebar-img").style.display = "block";
				}
				document.getElementById("layout-position").style.display = "block";
				document.getElementById("layout-width").style.display = "block";
			}
			initLeftMenuCollapse();
			initActiveMenu();
			addEventListenerOnSmHoverMenu();
			initMenuItemScroll();
		} else if (dataLayout == "horizontal") {
			updateHorizontalMenus();
			if (document.getElementById("theme-settings-offcanvas")) {
				document.getElementById("sidebar-size").style.display = "none";
				document.getElementById("sidebar-view").style.display = "none";
				document.getElementById("sidebar-color").style.display = "none";
				if (document.getElementById("sidebar-img")) {
					document.getElementById("sidebar-img").style.display = "none";
				}
				document.getElementById("layout-position").style.display = "block";
				document.getElementById("layout-width").style.display = "block";
			}
			initActiveMenu();
		} else if (dataLayout == "twocolumn") {
			document.getElementById("scrollbar").removeAttribute("data-simplebar");
			document.getElementById("scrollbar").classList.remove("h-100");
			if (document.getElementById("theme-settings-offcanvas")) {
				document.getElementById("sidebar-size").style.display = "none";
				document.getElementById("sidebar-view").style.display = "none";
				document.getElementById("sidebar-color").style.display = "block";
				if (document.getElementById("sidebar-img")) {
					document.getElementById("sidebar-img").style.display = "block";
				}
				document.getElementById("layout-position").style.display = "none";
				document.getElementById("layout-width").style.display = "none";
			}
		}
	}

	// add listener Sidebar Hover icon on change layout from setting
	function addEventListenerOnSmHoverMenu() {
		document.getElementById("vertical-hover").addEventListener("click", function () {
			if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover") {
				document.documentElement.setAttribute("data-sidebar-size", "sm-hover-active");
			} else if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover-active") {
				document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
			} else {
				document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
			}
		});
	}

	function setAttrItemAndTag(dataAttr, dataValue) {
		document.documentElement.setAttribute(dataAttr, dataValue);
		getElementUsingTagname(dataAttr, dataValue);
		sessionStorage.setItem(dataAttr, dataValue);
	}

	// set full layout
	function layoutSwitch(isLayoutAttributes) {
		switch (isLayoutAttributes) {
			case isLayoutAttributes:
				switch (isLayoutAttributes["data-layout"]) {
					case "vertical":
						setAttrItemAndTag("data-layout", "vertical");
						hideShowLayoutOptions("vertical");
						isCollapseMenu();
						break;
					case "horizontal":
						setAttrItemAndTag("data-layout", "horizontal");
						hideShowLayoutOptions("horizontal");
						break;
					case "twocolumn":
						setAttrItemAndTag("data-layout", "twocolumn");
						hideShowLayoutOptions("twocolumn");
						break;
					default:
						var layout = sessionStorage.getItem("data-layout");
						if (layout === "horizontal") {
							setAttrItemAndTag("data-layout", "horizontal");
							hideShowLayoutOptions("horizontal");
						} else if (layout === "twocolumn") {
							setAttrItemAndTag("data-layout", "twocolumn");
							hideShowLayoutOptions("twocolumn");
						} else {
							setAttrItemAndTag("data-layout", "vertical");
							hideShowLayoutOptions("vertical");
							isCollapseMenu();
						}
						break;
				}
				var fontLink = document.getElementById("fontsLink");
				switch (isLayoutAttributes["data-theme"]) {
					case "default":
						document.documentElement.setAttribute("data-theme", "default");
						setThemeOnClick("data-theme", "default");
						sessionStorage.setItem("data-theme", "default");
						updateFonts("default");
						break;
					case "material":
						document.documentElement.setAttribute("data-theme", "material");
						setThemeOnClick("data-theme", "material");
						sessionStorage.setItem("data-theme", "material");
						updateFonts("material");
						break;
					case "creative":
						document.documentElement.setAttribute("data-theme", "creative");
						setThemeOnClick("data-theme", "creative");
						sessionStorage.setItem("data-theme", "creative");
						updateFonts("creative");
						break;
					case "minimal":
						document.documentElement.setAttribute("data-theme", "minimal");
						setThemeOnClick("data-theme", "minimal");
						sessionStorage.setItem("data-theme", "minimal");
						updateFonts("minimal");
						break;
					case "modern":
						document.documentElement.setAttribute("data-theme", "modern");
						setThemeOnClick("data-theme", "modern");
						sessionStorage.setItem("data-theme", "modern");
						updateFonts("modern");
						break;
					case "interaction":
						document.documentElement.setAttribute("data-theme", "interaction");
						setThemeOnClick("data-theme", "interaction");
						sessionStorage.setItem("data-theme", "interaction");
						updateFonts("interaction");
						break;
					default:
						const themes = ["default", "material", "creative", "minimal", "modern", "interaction"];
						const storedTheme = sessionStorage.getItem("data-theme");
						if (themes.includes(storedTheme)) {
							updateFonts(storedTheme);
							document.documentElement.setAttribute("data-theme", storedTheme);
							setThemeOnClick("data-theme", storedTheme);
							sessionStorage.setItem("data-theme", storedTheme);
						} else {
							document.documentElement.setAttribute("data-theme", "default");
							setThemeOnClick("data-theme", "default");
							sessionStorage.setItem("data-theme", "default");
							updateFonts("default");
						}
						break;
				}
				switch (isLayoutAttributes["data-topbar"]) {
					case "light":
						setAttrItemAndTag("data-topbar", "light");
						break;
					case "dark":
						setAttrItemAndTag("data-topbar", "dark");
						break;
					default:
						setAttrItemAndTag("data-topbar", "light");
						break;
				}

				switch (isLayoutAttributes["data-layout-style"]) {
					case "default":
						setAttrItemAndTag("data-layout-style", "default");
						break;
					case "detached":
						setAttrItemAndTag("data-layout-style", "detached");
						break;
					default:
						setAttrItemAndTag("data-layout-style", sessionStorage.getItem("data-layout-style") ?? "default");
						break;
				}

				switch (isLayoutAttributes["data-sidebar-size"]) {
					case "lg":
						setAttrItemAndTag("data-sidebar-size", "lg");
						break;

					case "sm":
						setAttrItemAndTag("data-sidebar-size", "sm");
						break;

					case "md":
						setAttrItemAndTag("data-sidebar-size", "md");
						break;

					case "sm-hover":
						setAttrItemAndTag("data-sidebar-size", "sm-hover");
						break;

					default:
						setAttrItemAndTag("data-sidebar-size", "lg");
						break;
				}

				switch (isLayoutAttributes["data-bs-theme"]) {
					case "light":
						setAttrItemAndTag("data-bs-theme", "light");
						break;
					case "dark":
						setAttrItemAndTag("data-bs-theme", "dark");
						break;
					default:
						setAttrItemAndTag("data-bs-theme", "light");
						break;
				}

				switch (isLayoutAttributes["data-layout-width"]) {
					case "fluid":
						setAttrItemAndTag("data-layout-width", "fluid");
						break;
					case "boxed":
						setAttrItemAndTag("data-layout-width", "boxed");
						break;
					default:
						setAttrItemAndTag("data-layout-width", sessionStorage.getItem("data-layout-width") ?? "fluid");
						break;
				}

				switch (isLayoutAttributes["data-sidebar"]) {
					case "light":
						setAttrItemAndTag("data-sidebar", "light");
						break;
					case "dark":
						setAttrItemAndTag("data-sidebar", "dark");
						break;
					case "gradient":
						setAttrItemAndTag("data-sidebar", "gradient");
						break;
					case "gradient-2":
						setAttrItemAndTag("data-sidebar", "gradient-2");
						break;
					case "gradient-3":
						setAttrItemAndTag("data-sidebar", "gradient-3");
						break;
					case "gradient-4":
						setAttrItemAndTag("data-sidebar", "gradient-4");
						break;
					default:
						setAttrItemAndTag("data-sidebar", "dark");
						break;
				}

				switch (isLayoutAttributes["data-sidebar-image"]) {
					case "none":
						setAttrItemAndTag("data-sidebar-image", "none");
						break;
					case "img-1":
						setAttrItemAndTag("data-sidebar-image", "img-1");
						break;
					case "img-2":
						setAttrItemAndTag("data-sidebar-image", "img-2");
						break;
					case "img-3":
						setAttrItemAndTag("data-sidebar-image", "img-3");
						break;
					case "img-4":
						setAttrItemAndTag("data-sidebar-image", "img-4");
						break;
					default:
						setAttrItemAndTag("data-sidebar-image", (sessionStorage.getItem("data-sidebar-image")) ?? "none");
						break;
				}

				switch (isLayoutAttributes["data-layout-position"]) {
					case "fixed":
						setAttrItemAndTag("data-layout-position", "fixed");
						break;
					case "scrollable":
						setAttrItemAndTag("data-layout-position", "scrollable");
						break;
					default:
						setAttrItemAndTag("data-layout-position", sessionStorage.getItem("data-layout-position") ?? "fixed");
						break;
				}

				switch (isLayoutAttributes["data-preloader"]) {
					case "disable":
						setAttrItemAndTag("data-preloader", "disable");
						break;
					case "enable":
						preloaderEnable();
						break;
					default:
						if (sessionStorage.getItem("data-preloader") && sessionStorage.getItem("data-preloader") == "disable") {
							setAttrItemAndTag("data-preloader", "disable");
						} else if (sessionStorage.getItem("data-preloader") == "enable") {
							preloaderEnable();
						} else {
							document.documentElement.setAttribute("data-preloader", "disable");
						}
						break;
				}

			default:
				break;
		}
	}

	function preloaderEnable() {
		setAttrItemAndTag("data-preloader", "enable");
		var preloader = document.getElementById("preloader");
		if (preloader) {
			window.addEventListener("load", function () {
				preloader.style.opacity = "0";
				preloader.style.visibility = "hidden";
			});
		}
	}

	function initMenuItemScroll() {
		const sidebarMenu = document.getElementById("navbar-nav");

		if (sidebarMenu) {
			const activeMenu = sidebarMenu.querySelector(".nav-item .active");
			const offset = activeMenu ? activeMenu.offsetTop : 0;
			if (offset > 300) {
				const verticalMenu = document.getElementsByClassName("app-menu")[0] || "";
				if (verticalMenu && verticalMenu.querySelector(".simplebar-content-wrapper")) {
					if (offset === 330) {
						verticalMenu.querySelector(".simplebar-content-wrapper").scrollTop = offset + 85;
					} else {
						verticalMenu.querySelector(".simplebar-content-wrapper").scrollTop = offset;
					}
				}
			}
		}
	}

	function updateFonts(layout) {
		var fontLink = document.getElementById("fontsLink");
		switch (layout) {
			case "default":
				fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
				break;
			case "material":
				fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
				break;
			case "creative":
				fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap");
				break;
			case "interaction":
				fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap");
				break;
			case "minimal":
				fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&display=swap");
				break;
			case "modern":
				fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Gantari:wght@300;400;500;600;700&display=swap");
				break;
			default:
				fontLink.setAttribute("href", "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
				break;
		}
	}

	function setThemeOnClick(ele, val) {
		const inputs = Array.from(document.querySelectorAll(`input[name="${ele}"]`));

		inputs.forEach(function (x) {
			x.checked = val === x.value;
			x.addEventListener("change", function () {
				updateFonts(x.value);
				document.documentElement.setAttribute(ele, x.value);
				if (x.value === "minimal")
					document.getElementById("sidebar-color-light").click();
				else {
					document.getElementById("sidebar-color-dark").click();
				}
				sessionStorage.setItem(ele, x.value);
				setTimeout(() => {
					window.dispatchEvent(new Event('resize'));
				}, 100);
			});
		});
	}

	// add change event listener on right layout setting
	function getElementUsingTagname(ele, val) {
		const inputs = Array.from(document.querySelectorAll(`input[name="${ele}"]`));

		inputs.forEach(function (x) {
			x.checked = val === x.value;
			x.addEventListener("change", function () {
				document.documentElement.setAttribute(ele, x.value);
				sessionStorage.setItem(ele, x.value);
				initLanguage();

				if (ele === "data-layout-width") {
					if (x.value === "boxed") {
						document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
						sessionStorage.setItem("data-sidebar-size", "sm-hover");
						document.getElementById("sidebar-size-small-hover").checked = true;
					} else if (x.value === "fluid") {
						document.documentElement.setAttribute("data-sidebar-size", "lg");
						sessionStorage.setItem("data-sidebar-size", "lg");
						document.getElementById("sidebar-size-default").checked = true;
					}
				}

				if (ele === "data-layout") {
					if (x.value === "vertical") {
						hideShowLayoutOptions("vertical");
						isCollapseMenu();
					} else if (x.value === "horizontal") {
						hideShowLayoutOptions("horizontal");
						const sidebarImg = document.getElementById("sidebarimg-none");
						if (sidebarImg) {
							sidebarImg.click();
						}
						setTimeout(() => {
							updateHorizontalMenus();
						}, 50);
					} else if (x.value === "twocolumn") {
						hideShowLayoutOptions("twocolumn");
						document.documentElement.setAttribute("data-layout-width", "fluid");
						document.getElementById("layout-width-fluid").click();
						twoColumnMenuGenerate();
						initTwoColumnActiveMenu();
						isCollapseMenu();
					}
				}

				if (ele === "data-bs-theme") {
					const colorButton = x.value === "light" ? document.getElementById("topbar-color-light")?.click() :
						document.getElementById("topbar-color-dark")?.click();
					window.dispatchEvent(new Event('resize'));
				}

				if (ele === "data-preloader") {
					const preloader = document.getElementById("preloader");
					if (x.value === "enable" && preloader) {
						document.documentElement.setAttribute("data-preloader", "enable");
						setTimeout(() => {
							preloader.style.opacity = "0";
							preloader.style.visibility = "hidden";
							document.getElementById("customizerclose-btn").click();
						}, 1000);
					} else if (x.value === "disable") {
						document.documentElement.setAttribute("data-preloader", "disable");
						document.getElementById("customizerclose-btn").click();
					}
				}
			});
		});

		if (document.getElementById('collapseBgGradient')) {
			Array.from(document.querySelectorAll("#collapseBgGradient .form-check input")).forEach(function (subElem) {
				var myCollapse = document.getElementById('collapseBgGradient');
				if (subElem.checked) {
					var bsCollapse = new bootstrap.Collapse(myCollapse, {
						toggle: false,
					});
					bsCollapse.show();
				}

				if (document.querySelector("[data-bs-target='#collapseBgGradient']")) {
					document.querySelector("[data-bs-target='#collapseBgGradient']").addEventListener('click', function (elem) {
						document.getElementById("sidebar-color-gradient").click();
					});
				}
			});
		}

		const target = document.querySelector("[data-bs-target='#collapseBgGradient']");
		const inputChecked = document.querySelector("#collapseBgGradient .form-check input:checked");
		if (target) {
			if (inputChecked) {
				target.classList.add("active");
			} else {
				target.classList.remove("active");
			}

			Array.from(document.querySelectorAll("[name='data-sidebar']")).forEach(function (elem) {
				elem.addEventListener("change", function () {
					if (document.querySelector("#collapseBgGradient .form-check input:checked")) {
						target.classList.add("active");
					} else {
						target.classList.remove("active");
					}
				})
			})
		}
	}

	function setDefaultAttribute() {
		if (!sessionStorage.getItem("defaultAttribute")) {
			var attributesValue = document.documentElement.attributes;
			var isLayoutAttributes = {};
			Array.from(attributesValue).forEach(function (x) {
				if (x && x.nodeName && x.nodeName != "undefined") {
					var nodeKey = x.nodeName;
					isLayoutAttributes[nodeKey] = x.nodeValue;
					sessionStorage.setItem(nodeKey, x.nodeValue);
				}
			});
			sessionStorage.setItem("defaultAttribute", JSON.stringify(isLayoutAttributes));
			layoutSwitch(isLayoutAttributes);

			// open right sidebar on first time load
			var offCanvas = document.querySelector('.btn[data-bs-target="#theme-settings-offcanvas"]');
			offCanvas && offCanvas.click();
		} else {
			var isLayoutAttributes = {};
			var attributesToRetrieve = [
				"data-theme",
				"data-layout",
				"data-sidebar-size",
				"data-bs-theme",
				"data-layout-width",
				"data-sidebar",
				"data-sidebar-image",
				"data-layout-position",
				"data-layout-style",
				"data-topbar",
				"data-preloader"
			];
			attributesToRetrieve.forEach(function (attribute) {
				isLayoutAttributes[attribute] = sessionStorage.getItem(attribute);
			});
			layoutSwitch(isLayoutAttributes);
		}
	}

	function initFullScreen() {
		const fullscreenBtn = document.querySelector('[data-toggle="fullscreen"]');
		if (fullscreenBtn) {
			fullscreenBtn.addEventListener("click", function (e) {
				e.preventDefault();
				document.body.classList.toggle("fullscreen-enable");

				if (!document.fullscreenElement &&
					!document.mozFullScreenElement &&
					!document.webkitFullscreenElement &&
					!document.msFullscreenElement) {
					// current working methods
					if (document.documentElement.requestFullscreen) {
						document.documentElement.requestFullscreen();
					} else if (document.documentElement.mozRequestFullScreen) {
						document.documentElement.mozRequestFullScreen();
					} else if (document.documentElement.webkitRequestFullscreen) {
						document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
					} else if (document.documentElement.msRequestFullscreen) {
						document.documentElement.msRequestFullscreen();
					}
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				}
			});
		}

		document.addEventListener("fullscreenchange", exitHandler);
		document.addEventListener("webkitfullscreenchange", exitHandler);
		document.addEventListener("mozfullscreenchange", exitHandler);
		document.addEventListener("MSFullscreenChange", exitHandler);

		function exitHandler() {
			if (!document.fullscreenElement &&
				!document.mozFullScreenElement &&
				!document.webkitFullscreenElement &&
				!document.msFullscreenElement) {
				document.body.classList.remove("fullscreen-enable");
			}
		}
	}

	function setLayoutMode(mode, modeType, modeTypeId, html) {
		const isModeTypeId = document.getElementById(modeTypeId);
		html.setAttribute(mode, modeType);
		if (isModeTypeId) {
			document.getElementById(modeTypeId).click();
			if (modeType == "light")
				modeType = "dark"
			document.getElementById(`sidebar-color-${modeType}`).click();
		}
	}

	function initModeSetting() {
		const html = document.documentElement;
		const lightDarkModeItems = document.querySelectorAll("#light-dark-mode .dropdown-item");

		lightDarkModeItems.forEach(item => {
			item.addEventListener("click", event => {
				const { mode } = item.dataset;

				if (html.hasAttribute("data-bs-theme") && mode !== "auto") {
					setLayoutMode("data-bs-theme", mode, `layout-mode-${mode}`, html);
					sessionStorage.setItem("data-layout-auto", "false");
				} else if (html.hasAttribute("data-bs-theme") && mode === "auto") {
					const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
					const modeValue = prefersDarkScheme.matches ? "dark" : "light";

					setLayoutMode("data-bs-theme", modeValue, `layout-mode-${modeValue}`, html);
					sessionStorage.setItem("data-layout-auto", "true");
				}

				html.classList.toggle("mode-auto", sessionStorage.getItem("data-layout-auto") === "true");
			});
		});

		html.classList.toggle("mode-auto", sessionStorage.getItem("data-layout-auto") === "true");
	}

	function resetLayout() {
		const resetLayoutButton = document.getElementById("reset-layout");
		if (resetLayoutButton) {
			resetLayoutButton.addEventListener("click", function () {
				sessionStorage.clear();
				location.reload();
			});
		}
	}

	function init() {
		setDefaultAttribute();
		twoColumnMenuGenerate();
		isCustomDropdown();
		isCustomDropdownResponsive();
		initFullScreen();
		initModeSetting();
		windowLoadContent();
		counter();
		initLeftMenuCollapse();
		initTopbarComponents();
		initComponents();
		resetLayout();
		pluginData();
		initLanguage();
		isCollapseMenu();
	}
	init();

	let timeOutFunctionId;

	function setResize() {
		const currentLayout = document.documentElement.getAttribute("data-layout");
		if (currentLayout !== "horizontal") {
			const navbarNav = document.getElementById("navbar-nav");
			if (navbarNav) {
				const simpleBar = new SimpleBar(navbarNav);
				if (simpleBar) simpleBar.getContentElement();
			}

			const twocolumnIconView = document.querySelector(".twocolumn-iconview");
			if (twocolumnIconView) {
				const simpleBar1 = new SimpleBar(twocolumnIconView);
				if (simpleBar1) simpleBar1.getContentElement();
			}

			clearTimeout(timeOutFunctionId);
		}
	}

	window.addEventListener("resize", function () {
		if (timeOutFunctionId) clearTimeout(timeOutFunctionId);
		timeOutFunctionId = setTimeout(setResize, 2000);
	});
})();


//
/********************* scroll top js ************************/
//

const myButton = document.getElementById("back-to-top");

if (myButton) {
	// Show the button when the user scrolls down 100px from the top of the document
	window.addEventListener('scroll', function () {
		if (window.scrollY > 100) {
			myButton.style.display = "block";
		} else {
			myButton.style.display = "none";
		}
	});

	// Scroll to the top of the document when the user clicks on the button
	myButton.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
}