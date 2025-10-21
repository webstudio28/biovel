# How Eleventy Handles Data Files

This document explains how Eleventy loads data from the `_data` directory and makes it available in your templates. Understanding this is key to avoiding rendering issues like the one we encountered with the services section.

## The Basics

Eleventy automatically loads any `.json` or `.js` files from the `src/_data` directory and makes their content accessible as global data variables in your templates.

The name of the file determines the name of the variable. For example:

- A file named `src/_data/user.json` can be accessed in a Nunjucks template with the variable `user`.
- A file named `src/_data/site.js` can be accessed with the variable `site`.

## The Problem with Hyphens in Filenames

We initially named our services data file `homepage-services.json`. This caused a problem because Nunjucks, the templating engine we're using, interprets hyphens as subtraction operators.

When you try to access `homepage-services.categories` in a template, Nunjucks thinks you're trying to subtract a variable named `services` from `homepage`. This won't work and results in the data not being rendered.

While it's sometimes possible to work around this using bracket notation (e.g., `['homepage-services'].categories`), this can be clunky and isn't the standard way.

## The Solution: Use CamelCase

The cleanest and most reliable solution is to use a filename format that doesn't conflict with the templating language. CamelCase is the recommended approach.

Here's what we did:

1.  **Renamed the data file:** We renamed `src/_data/homepage-services.json` to `src/_data/homepageServices.json`.
2.  **Updated the template:** Eleventy automatically makes this data available under the `homepageServices` variable. We then updated the loop in `src/index.njk` to use this new variable:

    ```nunjucks
    {% for category in homepageServices.categories %}
      {# ... card content ... #}
    {% endfor %}
    ```

By following this convention, the data is loaded correctly and is easily accessible in our templates, making the code cleaner and preventing unexpected issues.
