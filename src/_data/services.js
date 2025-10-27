module.exports = () => {
	const data = require('./homepageServices.json');

	function transliterateCyrillic(text) {
		const cyrillicMap = {
			'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
			'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
			'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
			'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a',
			'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
		};
		
		return text.split('').map(char => {
			const lower = char.toLowerCase();
			return cyrillicMap[lower] || char;
		}).join('');
	}

	function baseSlug(text) {
		return String(text || '')
			.trim()
			.toLowerCase()
			// transliterate Cyrillic to Latin
			.replace(/[\u0400-\u04FF]/g, (match) => {
				const cyrillicMap = {
					'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
					'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
					'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
					'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a',
					'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
				};
				return cyrillicMap[match] || match;
			})
			// replace whitespace with hyphens
			.replace(/\s+/g, '-')
			// keep only latin letters, digits, and hyphens
			.replace(/[^a-z0-9-]+/g, '')
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
