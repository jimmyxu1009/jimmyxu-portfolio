# Page Topology — shanesayers.com

## Overview
Personal portfolio site built with Webflow. Smooth scroll (Lenis), rich text animations (word/char/line reveal on scroll), warm/earthy color palette with hand-drawn decorative elements.

## Sections (top to bottom)

1. **Navbar** (sticky)
   - Logo: "S" + "hane sayers" with hand-pointing image
   - Links: Home, About, Work, Contact
   - Transforms on scroll (background, shadow, sizing)
   - Mobile: hamburger sidebar menu with animated links

2. **Hero Section**
   - Headline: "design with a human touch" (word-by-word fade-up)
   - "human touch" in accent color
   - Decorative corner bracket SVGs (L-shaped lines)
   - Subtitle hidden: "I'm a web designer & web developer who values charisma in design..."

3. **Spacer-100vh**
   - Full viewport height spacer for scroll effect

4. **Alternate Hero** (`.section-hero-home.hide` — hidden)
   - "Who said websites should be boring?"
   - Horizontally scrolling image strip
   - "Work with me" CTA with arrow animation

5. **About Section** (`.section-about-home`)
   - "ABOUT ME" title with char-by-char reveal
   - Bio paragraphs with line reveal
   - Rocket illustration + hand-drawn decorative elements

6. **Services Section** (`.section-services.hide` — hidden)
   - 3 service cards: Content Production, Campaign Management, Brand Consulting
   - Scroll-triggered parallax images and card animations

7. **Testimonials** (`.section-testimonials.hide` — hidden)
   - Carousel with 3 testimonials
   - Avatar + name + company

8. **CTA Section** (`.section-action`)
   - "call me, baby" in large heading
   - Dark background
   - "Go to my calendar" button
   - Word/line reveal animations

9. **Work Section** (`#work`)
   - "my work" title
   - Filter pills: All, CMS, Animated, 3D, Interactive
   - Project cards with image + tags
   - Projects: Shukur, Dotfun, Senses International, Tati&Wina, The Innovation Game

10. **FAQ/Rocket Section** (`.section_rocket-man`)
    - "why work with me?" heading
    - Looping text strips (marquee-style) for questions
    - Accordion FAQ items
    - Rocket image + blast GIF animation

11. **Footer** (`.section-footer`)
    - "Let's work together" heading (line reveal)
    - "CONNECT WITH ME" label
    - Email: hello@shanesayers.com
    - Dark background
    - Social links

## Fixed/Overlay Elements
- **Awwwards Badge** (fixed right side, green)
- **Sidebar Menu** (full-screen overlay, triggered by hamburger)
- **Mega Menu Trigger**

## Interaction Models
- Navbar: scroll-driven (style changes on scroll)
- Hero: scroll-driven (parallax/opacity)
- About/Work/CTA: scroll-driven (reveal animations)
- FAQ: click-driven (accordion)
- Work: click-driven (filter pills)
- Testimonials: click-driven (carousel)
- Services: scroll-driven (parallax)
- Footer: scroll-driven (line reveal)
