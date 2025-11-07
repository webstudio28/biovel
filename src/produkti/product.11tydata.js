module.exports = {
    eleventyComputed: {
        relatedProducts: (data) => {
            const products = data.products || [];
            const currentProduct = data.product;

            if (!products.length || !currentProduct) {
                return [];
            }

            const variants = products.filter((item) => item.meta_title !== currentProduct.meta_title);

            // Shuffle using Fisher-Yates for better randomness
            for (let i = variants.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [variants[i], variants[j]] = [variants[j], variants[i]];
            }

            return variants.slice(0, 4);
        }
    }
};

