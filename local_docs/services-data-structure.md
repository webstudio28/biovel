# Services Data Structure Plan

## Overview
Expand `homepageServices.json` to include comprehensive service information for single service pages.

## New Fields per Service

- **name**: Service name (existing)
- **description**: Short description for homepage (existing)
- **longDescription**: Detailed description for service page
- **images**: Array of images (existing, already updated)
- **time**: Service duration (e.g., "30 минути", "1 час")
- **howItWorks**: Array of step strings describing the process
- **benefits**: Array of benefit strings

## Implementation Steps

1. Update JSON structure in `homepageServices.json`
2. Update single service page template (`src/uslugi/service.njk`) to display all fields
3. Ensure homepage continues to use only `description` and `images[0]`

