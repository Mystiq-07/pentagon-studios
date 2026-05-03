# Pentagon Studios — Project Memory
_Last updated: 2026-04-21_

## Who
- **User:** Mohan (product designer, UX designer, creative technologist)
- **Client:** Pentagon Studios — music talent management company, based in CBE & Chennai, India
- **Founder:** Music director (debut), the person students travel with in the Mentorship programme

## What's been built
Static HTML/CSS/JS website. 5 pages:
- `index.html` — homepage with scroll-story hero (title shrinks on scroll, CTAs fade, copy fades in)
- `talent-strategy.html` — coming-soon style page
- `mentorship.html` — coming-soon style page
- `music.html` — coming-soon style page
- `contact.html` — contact info + Formspree form

## Live URLs
- **Vercel:** https://pentagon-studios.vercel.app/
- **GitHub:** https://github.com/Mystiq-07/pentagon-studios
- Deploy via: `vercel --prod` from the project folder (auto-deploy from GitHub not working yet)

## Tech stack
- Pure HTML/CSS/JS — no framework
- Fonts: PP Pangaia Bold (`fonts/PPPangaia-Bold.otf`) for H1/hero, Walkway Black (`fonts/Walkway_Black.ttf`) for all secondary text
- Google Fonts: Inter (form inputs only)
- Form: Formspree `xeevlapw` → sends to `nvmusic.04@gmail.com`
- Favicon: `favicon.png` (logo.png with #F2EDE3 bg baked in)

## Design tokens
```css
--bg:        #F2EDE3  (cream)
--text:      #141414  (near black)
--accent:    #3DBE4A  (green — nav/buttons)
--dark:      #141414  (footer bg)
--dark-text: #F2EDE3
--ls-walk:   1.5px    (Walkway Black letter spacing)
--pad:       48px     (layout padding)
--font-display: 'PP Pangaia'
--font-walkway: 'Walkway Black'
--font-body:    'Inter'
```
Footer tagline accent: `#137043` (sampled from logo, darker green)

## Contact details
- Email: nvmusic.04@gmail.com
- Instagram: https://www.instagram.com/studios_pentagon/
- Location: CBE & Chennai, India

## Nav order (all pages)
Music → Talent & Strategy → Mentorship → Contact

## Footer structure
- Tagline row: "creative / for all services." (left) + logo.png (right)
- 3-col grid: Pages | Contact | Pentagon
- Bottom bar: "Pentagon Studios Private Limited." | "Since 2023"
- Logo colour matched to #137043 via mix-blend-mode: screen

## Pending work
1. **Mobile layout fixes** — user said mobile looks bad, next priority
2. **FAQs** — on hold, copy 80% approved, Music #1 and #2 still need finalising
3. **Auto-deploy** — git push doesn't trigger Vercel, currently using `vercel --prod`

## Approved FAQ copy

### Talent & Strategy
1. Q: Who is this for? — "People building something real in music. We work with artists and talents at different stages — what matters is intent."
2. Q: What does Pentagon actually help with? — "Networks and career direction. We help artists move with clarity — knowing what to build, who to be around, and where they're going."
3. Q: Can I join through Mentorship? — "Yes — and it's one of the clearest paths in. Completing the programme puts you in line for the opportunity to work directly with Pentagon Studios."

### Mentorship
1. Q: How does selection work? — "Reach out through our contact channels. We look for intent and commitment — not credentials. If there's a fit, we'll get on a call."
2. Q: What does the programme look like? — "3 months. You travel with the founder — a music director — for the full duration. Every student gets personalised attention built around their specific skills. It's immersive, live, and nothing like a classroom."
3. Q: What does it cost? — "The fee covers your stay for the 3 months. Food can be worked out separately. The number is shared after selection — we want to make sure it's the right fit before we get into that."

### Music
1. PENDING
2. PENDING
3. Q: How do I get Pentagon Studios involved in my project? — "Reach out through the contact page, tell us what you're building, and we'll take it from there."

## Mohan's working style
- Direct, no fluff
- Doesn't want AI filler or hooks
- Ask before making design decisions
- Brave feedback preferred — tell him when he's wrong
- TARS personality: Honesty 90%, Humour 80%, Sarcasm 10%
- No bullet points in casual replies — prose preferred
