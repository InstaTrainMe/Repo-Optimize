# InstaTrainMe Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern SaaS landing pages with gradient-heavy aesthetics (similar to Stripe, Linear) combined with fitness app visual language (vibrant, energetic, motivational).

## Core Design Principles
- **Energy & Motion**: Vibrant gradients and smooth animations that convey transformation and progress
- **Trust & Credibility**: Clean layouts with ample whitespace, professional typography, and clear CTAs
- **Accessibility First**: High contrast, clear hierarchy, form-focused design

---

## Typography System

**Font Family**: System fonts for optimal performance
- Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

**Hierarchy**:
- Hero Headline: 3rem (mobile: 2rem), bold, white
- Section Headers: 2.5rem, bold, dark gray (#2d3748)
- Card Titles: 1.5rem, semi-bold
- Body Text: 1rem, regular, line-height 1.6
- CTAs: 1rem, bold

---

## Layout System

**Spacing Units**: Tailwind-inspired scale
- Common spacing: 20px, 30px, 40px, 50px, 80px
- Section padding: 80px vertical, 20px horizontal
- Card gaps: 30px
- Form field gaps: 20px

**Container Widths**:
- Max content width: 1200px
- Form max width: 600px
- Centered with auto margins

**Grid System**:
- Benefits cards: 3-column grid (auto-fit, minmax(300px, 1fr))
- Blog articles: Single column grid with 30px gaps
- Mobile: All grids collapse to single column

---

## Color Palette

**Primary Gradient**: 
- Purple gradient: #667eea → #764ba2 (135deg)
- Use for hero section background

**Accent Colors**:
- Primary button text: #667eea
- Hover states: #5568d3

**Neutrals**:
- Dark text: #333
- Section backgrounds: #f8f9fa (forms), white (cards)
- Footer: #2d3748
- Borders: #ddd

**Interactive States**:
- White backgrounds with high opacity
- Semi-transparent overlays: rgba(255,255,255,0.2)

---

## Component Library

### Hero Section
- **Height**: 80vh minimum
- **Background**: Full-width gradient (#667eea to #764ba2, 135deg)
- **Content**: Centered vertically and horizontally
- **Text Color**: White throughout
- **CTAs**: Two buttons side-by-side, wrapping on mobile
  - Primary: White background, purple text, 50px border-radius
  - Secondary: Transparent with white border (2px), white text
- **Spacing**: 20px margin below headline, 30px below subtitle, 20px gap between buttons
- **Button Padding**: 15px vertical, 40px horizontal

### Benefits Cards
- **Layout**: 3-column grid, equal height cards
- **Card Style**: 
  - White background
  - 20px border-radius
  - Deep shadow: 0 20px 60px rgba(0,0,0,0.1)
  - 40px padding all sides
- **Hover Effect**: Translate up 10px (transform: translateY(-10px))
- **Icons**: Large emoji icons (🎯 💪 💰) as visual anchors
- **Typography**: Bold headline, lighter description

### Forms (Partner & Gym Listing)
- **Section Background**: Light gray (#f8f9fa)
- **Form Container**: Centered, max-width 600px
- **Input Fields**: 
  - 15px padding
  - 10px border-radius
  - 1px light border (#ddd)
  - Full width
- **Submit Button**: 
  - Purple background (#667eea)
  - White text, bold
  - No border
  - Same padding as inputs
  - Darker hover state (#5568d3)
- **Field Spacing**: 20px vertical gaps

### App Screenshots Section
- **Layout**: Centered single image showcase
- **Image Treatment**: Add lazy loading attribute
- **Spacing**: 80px section padding

### Blog Preview
- **Card Style**: 
  - White background
  - 15px border-radius
  - Subtle shadow: 0 10px 30px rgba(0,0,0,0.1)
  - 30px padding
- **Animation**: Fade-in on scroll (0.6s ease-out)

### Footer
- **Background**: Dark (#2d3748)
- **Text Color**: White
- **Links**: Purple accent (#667eea)
- **Padding**: 40px vertical, 20px horizontal
- **Alignment**: Center text

---

## Animations

**Scroll Animations**:
- Fade-in with upward motion (20px translateY)
- Duration: 0.6s ease-out
- Apply to: Cards, articles

**Hover Interactions**:
- Buttons: Scale to 1.05 (0.3s transition)
- Cards: Translate up 10px (0.3s transition)

**Smooth Scroll**: 
- Navigation anchors scroll smoothly to sections

**Intersection Observer**: 
- Sections fade in when entering viewport

---

## Responsive Breakpoints

**Mobile (<768px)**:
- Hero headline: 2rem
- CTA buttons: Stack vertically, full width, center aligned
- All grids: Single column
- Reduce section padding: 40px vertical

**Desktop (≥768px)**:
- Multi-column grids active
- Side-by-side CTAs
- Full spacing applied

---

## Images

**Hero Section**: 
- No background image, use gradient only
- Focus on typography impact

**App Screenshots**:
- Use actual app store screenshots
- Source from: https://apps.apple.com/us/app/instatrainme/id6499338812
- Placement: Dedicated section between benefits and forms
- Alt text: "App interface"

**Blog Thumbnails**:
- Optional placeholder or fitness stock images
- If used: 600x400px minimum

---

## SEO & Social

**Meta Tags**:
- Description: "Connect with certified trainers. Book sessions, track progress. Download now!"
- Keywords: "personal trainer, gym, fitness, workout, training"
- Open Graph image: App preview screenshot

**Social Share**:
- Fixed position share buttons (right side, 50% from top)
- Twitter and WhatsApp links
- Minimal design, icon-based

---

## Accessibility

- High contrast ratios (white on purple, dark text on white)
- All forms have proper labels
- Keyboard navigation enabled
- Focus states visible on all interactive elements
- Alt text on all images