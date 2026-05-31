(function () {
	"use strict";

	const homeLink = {
		label: "Home",
		href: "index.html"
	};

	const tools = [
		{ label: "Collator Calculator", href: "collator_calculator.html" },
		{ label: "PDF Geometry Updater", href: "pdf_geometry_updater.html" },
		{ label: "PDF Page Remover", href: "pdf_page_remover.html" },
		{ label: "QuickCalcs", href: "quickcalcs.html" },
		{ label: "Text Compare", href: "text_compare.html" }
	];

	function getCurrentFileName() {
		const path = window.location.pathname;
		const file = path.substring(path.lastIndexOf("/") + 1);
		return file || "index.html";
	}

	function isCurrentPage(href) {
		return getCurrentFileName().toLowerCase() === href.toLowerCase();
	}

	function makeLink(item) {
		const link = document.createElement("a");
		link.className = "pc-nav-link";
		link.href = item.href;
		link.textContent = item.label;

		if (isCurrentPage(item.href)) {
			link.classList.add("pc-nav-active");
			link.setAttribute("aria-current", "page");
		}

		return link;
	}

	function openNav() {
		document.body.classList.add("pc-nav-open");
		const toggle = document.querySelector(".pc-nav-toggle");
		if (toggle) toggle.setAttribute("aria-expanded", "true");
	}

	function closeNav() {
		document.body.classList.remove("pc-nav-open");
		const toggle = document.querySelector(".pc-nav-toggle");
		if (toggle) toggle.setAttribute("aria-expanded", "false");
	}

	function toggleNav() {
		if (document.body.classList.contains("pc-nav-open")) {
			closeNav();
		} else {
			openNav();
		}
	}

	function buildNav() {
		if (document.querySelector(".pc-nav-drawer")) return;

		const toggle = document.createElement("button");
		toggle.className = "pc-nav-toggle";
		toggle.type = "button";
		toggle.setAttribute("aria-label", "Open PulseCraft tools menu");
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-controls", "pcNavDrawer");
		toggle.innerHTML = "<span></span><span></span><span></span>";

		const overlay = document.createElement("div");
		overlay.className = "pc-nav-overlay";
		overlay.setAttribute("aria-hidden", "true");

		const drawer = document.createElement("nav");
		drawer.className = "pc-nav-drawer";
		drawer.id = "pcNavDrawer";
		drawer.setAttribute("aria-label", "PulseCraft tools");

		const title = document.createElement("h2");
		title.className = "pc-nav-title";
		title.textContent = "PulseCraft Tools";

		const list = document.createElement("div");
		list.className = "pc-nav-list";

		list.appendChild(makeLink(homeLink));

		const divider = document.createElement("div");
		divider.className = "pc-nav-divider";
		divider.setAttribute("aria-hidden", "true");
		list.appendChild(divider);

		tools
			.slice()
			.sort((a, b) => a.label.localeCompare(b.label))
			.forEach(tool => list.appendChild(makeLink(tool)));

		drawer.appendChild(title);
		drawer.appendChild(list);

		document.body.appendChild(toggle);
		document.body.appendChild(overlay);
		document.body.appendChild(drawer);

		toggle.addEventListener("click", toggleNav);
		overlay.addEventListener("click", closeNav);

		document.addEventListener("keydown", event => {
			if (event.key === "Escape") closeNav();
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", buildNav);
	} else {
		buildNav();
	}
})();