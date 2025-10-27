# Website Structure Update Plan

This document outlines the plan to create new pages, update the site navigation, and implement the necessary routing.

---

### 1. Navigation Updates

The main navigation will be updated as follows:

- **Rename "За нас" to "За мен"**: The "About Us" link will be changed to "About Me".
- **Add "Продукти" Page**: A new top-level link for "Products" will be added.
- **"Услуги" Dropdown/Accordion**:
    - **Desktop**: The "Услуги" (Services) link will become a dropdown menu that lists all individual services.
    - **Mobile**: The "Услуги" link will function as an accordion, expanding to show the list of services.

**New Menu Structure:**
- Начало (Home)
- За мен (About Me)
- Услуги (Services) -> Dropdown/Accordion
  - Service 1
  - Service 2
  - ...
- Продукти (Products)
- Контакти (Contact)

---

### 2. New Page Creation

I will create the following new pages and templates:

#### A. About Me
- **"За мен" Page (`/za-men/`)**:
    - **Purpose**: Create a dedicated "About Me" page. This will likely replace or update an existing `/about` page.
    - **Content**: The page will contain more detailed information about Elena Hristova. The specific content will be added later.

#### B. Services
- **Services Listing Page (`/uslugi/`)**:
    - **Purpose**: A main page to display all available services.
    - **Layout**: Services will be shown in a responsive grid format (not a horizontal scroll).
    - **Component**: The design of the service cards will be consistent with the homepage.
    - **Data**: Data will be fetched from the existing `homepageServices.json` file.

- **Individual Service Pages (`/uslugi/[service-slug]/`)**:
    - **Purpose**: A unique, dynamically generated page for each individual service.
    - **Template**: I will create a new Eleventy template (`service-page.njk`).
    - **Initial Content**: For now, each page will only display the service `title` and `description`.
    - **Routing**: Eleventy's pagination and dynamic routing features will be used to automatically generate a page for each service in the JSON file.

#### C. Products
- **Products Listing Page (`/produkti/`)**:
    - **Purpose**: A main page to display all available products.
    - **Layout**: Products will be shown in a responsive grid, similar to the Services page.
    - **Component**: The product card design will be consistent with the homepage.
    - **Data**: Data will be fetched from the existing `products.json` file.

- **Individual Product Pages (`/produkti/[product-slug]/`)**:
    - **Purpose**: A unique, dynamically generated page for each individual product.
    - **Template**: I will create a new Eleventy template (`product-page.njk`).
    - **Initial Content**: For now, each page will only display the product `title` and a longer `description`.
    - **Routing**: This will also use Eleventy's dynamic routing to generate pages automatically from the `products.json` data.

---

Once you approve this plan, I will begin implementing the changes.
