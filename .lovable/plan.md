# Redmond Christmas storm-check banner (replace image only)

## Current state
- Draft text verified for context: 15,380 bytes, SHA-256 matches. It is not added to any file.
- `public/images/blog/winter-storm-paint-damage-redmond-wa.webp` **already exists**. It is the earlier non-holiday banner from the approved first plan (243,584 bytes). No post uses it yet.
- This plan **overwrites that file** with the new Christmas version at the same path. Nothing else uses it, so no other file changes.

## New image
- Photorealistic Redmond-area suburban home, painted lap siding with white trim, early December, shortly after a rainstorm.
- Tasteful Christmas touches: warm white string lights along the eaves/roofline, a simple evergreen wreath on the front door, light garland on the porch rail.
- Overcast gray sky at dusk/late afternoon so the lights glow; wet siding, wet walkway with small puddles, a few fallen leaves and twigs on the lawn; bare deciduous trees plus some evergreens.
- Cozy and calm after the storm: no major damage, no flooding, no fallen tree.
- None of: readable text or numbers (house numbers, signs, "Merry Christmas" lettering), logos, brands, seals, people, faces, Santa or other characters.

## Steps
1. Generate the image wide.
2. Check it for any text, numbers, logos, people or characters; regenerate if found.
3. Crop to exactly 1600×900, save as WebP under 250 KB at the same path.
4. Report path, dimensions and file size.

## Not changed
blogPosts.ts, sitemap, robots.txt, redirects, llms.txt, SEO scripts and all other images stay untouched. Nothing is published.
