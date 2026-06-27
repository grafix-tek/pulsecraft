(function () {
	"use strict";

	const homeLink = {
		label: "Home",
		href: "index.html"
	};

	const tools = [
		{ label: "Collator Calculator", href: "collator_calculator.html", icon: "CC", color: "#b88a36" },
		{ label: "PDF Geometry Updater", href: "pdf_geometry_updater.html", icon: "PGU", color: "#5b6f8f" },
		{ label: "PDF Page Remover", href: "pdf_page_remover.html", icon: "PPR", color: "#8a6374" },
		{ label: "QuickCalcs", href: "quickcalcs.html", icon: "QC", color: "#607895" },
		{ label: "Text Compare", href: "text_compare.html", icon: "TC", color: "#1976d2" }
	];

	function getCurrentFileName() {
		const path = window.location.pathname;
		const file = path.substring(path.lastIndexOf("/") + 1);
		return file || "index.html";
	}

	function isCurrentPage(href) {
		return getCurrentFileName().toLowerCase() === href.toLowerCase();
	}

	function applyDrawerLinkLayout(link) {
		link.style.display = "flex";
		link.style.flexDirection = "column";
		link.style.alignItems = "flex-start";
		link.style.gap = "7px";
	}

	function makeIndexStyleIcon(item) {
		const icon = document.createElement("span");
		icon.textContent = item.icon;
		icon.setAttribute("aria-hidden", "true");

		/* Matches the index-page app icon style, scaled for the drawer. */
		icon.style.width = "44px";
		icon.style.height = "44px";
		icon.style.borderRadius = "12px";
		icon.style.display = "inline-flex";
		icon.style.alignItems = "center";
		icon.style.justifyContent = "center";
		icon.style.flex = "0 0 auto";
		icon.style.background = item.color;
		icon.style.color = "#fff";
		icon.style.fontSize = item.icon.length > 2 ? "13px" : "15px";
		icon.style.fontWeight = "900";
		icon.style.letterSpacing = "0.8px";
		icon.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.25)";
		icon.style.border = "1px solid rgba(255, 255, 255, 0.18)";

		return icon;
	}

	function makeLink(item) {
		const link = document.createElement("a");
		link.className = "pc-nav-link";
		link.href = item.href;

		if (item.icon) {
			applyDrawerLinkLayout(link);
			link.appendChild(makeIndexStyleIcon(item));
		}

		const label = document.createElement("span");
		label.textContent = item.label;
		link.appendChild(label);

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