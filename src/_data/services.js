module.exports = () => {
	const data = require('./homepageServices.json');

	function baseSlug(text) {
		return String(text || '')
			.trim()
			.toLowerCase()
			// replace whitespace with hyphens first
			.replace(/\s+/g, '-')
			// allow latin, digits, hyphen, and Cyrillic range \u0400-\u04FF
			.replace(/[^a-z0-9\u0400-\u04FF-]+/g, '')
			// collapse multiple hyphens
			.replace(/-+/g, '-')
			.replace(/(^-+|-+$)/g, '');
	}

	const usedSlugs = new Set();
	function ensureUniqueSlug(text) {
		let slug = baseSlug(text);
		if (!slug) slug = 'usluga';
		let unique = slug;
		let i = 2;
		while (usedSlugs.has(unique)) {
			unique = `${slug}-${i++}`;
		}
		usedSlugs.add(unique);
		return unique;
	}

	const services = [];
	if (data && Array.isArray(data.categories)) {
		for (const category of data.categories) {
			if (Array.isArray(category.services)) {
				for (const svc of category.services) {
					services.push({
						name: svc.name,
						description: svc.description,
						image: svc.image,
						slug: ensureUniqueSlug(svc.name)
					});
				}
			}
		}
	}
	return services;
};
