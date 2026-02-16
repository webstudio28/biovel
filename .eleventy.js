const dotenv = require('dotenv');
dotenv.config();
 
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("favicon.ico");
  // OG image at site root for social previews (https://www.biovel.bg/og-image.png)
  eleventyConfig.addPassthroughCopy({ "src/og-image.png": "og-image.png" });
  // cPanel: .htaccess for Apache (routing, security headers)
  eleventyConfig.addPassthroughCopy(".htaccess");
 
  // Expose env vars if needed in templates (keep debug optional)
  if (process.env.MAIL_KEY) {
    console.log("Loaded API key:", process.env.MAIL_KEY);
  }
  eleventyConfig.addGlobalData("mailKey", process.env.MAIL_KEY || "");

  // Add filter to convert newlines to <br> tags
  eleventyConfig.addNunjucksFilter("nl2br", function(value) {
    if (!value) return "";
    return String(value).replace(/\n/g, "<br>");
  });

  // JSON stringify for embedding data in script tags (e.g. econtOffices)
  eleventyConfig.addNunjucksFilter("json", function(value) {
    return JSON.stringify(value);
  });

  // pathPrefix: root for cPanel (use PATH_PREFIX env to override if needed)
  const pathPrefix = process.env.PATH_PREFIX || process.env.ELEVENTY_PATH_PREFIX || "/";
 
  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};