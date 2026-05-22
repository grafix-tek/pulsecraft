const copyrightStartYear = "2025";
const copyrightEndYear = new Intl.DateTimeFormat("en-US", {
	timeZone: "America/New_York",
	year: "numeric"
}).format(new Date());

const copyrightText = `Copyright &copy; ${copyrightStartYear}, ${copyrightEndYear} PulseCraft`;

document.querySelectorAll(".footer").forEach((footer) => {
	const footerType = footer.dataset.footerType || "common";
	const version = footer.dataset.version || "";

	let footerText = "";

	if (footerType === "common") {
		footerText = `
			${copyrightText} • Free for personal and commercial use.
			All rights reserved. No warranty is expressed or implied.<br>Use at your own risk.
			Not responsible or liable for any errors, data loss, or damages of any kind.
			${version ? ` • Ver ${version}` : ""}
		`;
	}

	if (footerType === "index") {
		footerText = `
			${copyrightText}
			${version ? ` • Ver ${version}` : ""}
		`;
	}

	if (footerType === "collator") {
		footerText = `
			Web version by PulseCraft, adapted from an existing Excel-based collator calculator.
			Original concept/design credited to its original creator.
			Provided as-is for convenience only.<br>Verify before production use.
			No warranty is expressed or implied.
			Not responsible or liable for errors, data loss, production issues, or damages of any kind.
			${version ? ` • Ver ${version}` : ""}
		`;
	}

	footer.innerHTML = `
		<div class="footer-container">
			${footerText}
		</div>
	`;
});