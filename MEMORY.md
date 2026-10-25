# Pentagon Studios — Project Memory
_Last updated: 2026-10-25_

## Who
- **User:** Mohan (product designer, UX designer, creative technologist)
- **Client:** Pentagon Studios — music talent management company, based in CBE & Chennai, India
- **Founder:** Music director (debut), the person students travel with in the Mentorship programme

## What's been built
Static HTML/CSS/JS website. 5 pages:
- `index.html` — homepage with scroll-story hero (title shrinks on scroll, CTAs fade, copy fades in)
- `production.html` — production house page: selected work, what we do, the studio. **Project cards are still placeholders — needs real project data.**
- `mentorship.html` — fully built: two programs (Studio program, Residency), who it's for, outcomes, how to join, FAQs
- `talent-strategy.html` — deliberately minimal and subtle. No FAQs, no service list. Three blocks only.
- `contact.html` — contact info + Formspree form

`music.html` was removed on 2026-10-19 and folded into `production.html`. `/music` now 301s to `/production` via `vercel.json`.

## Confirmed facts (owner answers, 2026-10-20)

### Production
- **Projects:** all current work is ongoing/unreleased. Page uses 3 cards described by
  *shape* not name — Feature film / Independent single / Artist EP, each badged
  "In progress". Names stay off the page until the people involved release them.
  Swap in real names + credits as they land.
- **Services:** all of them are paid standalone work. Music direction, production &
  arrangement, recording, mixing, mastering.
- **Nothing is turned down.** Whatever the project needs, in music. The catchphrase
  "creative for all services" is now the section heading for this, not footer filler.
- **Studio:** physical studio in **Coimbatore**. Partner studios in **Chennai, Kochi,
  Hyderabad, Bangalore**.
- **Pentagon label releases:** the plan, NOT yet a fact. Copy says so.
- **Audience:** artists and producers, mostly producers and other talents (practitioners,
  not just buyers) — so the page is craft-forward, not sales-forward.

### Talent & Strategy
- **It is NOT** a place people get hired into, and **NOT** a label people get signed to.
  The Mentorship page was corrected on 2026-10-20 because it claimed the former.
- **What it actually is:** a full-spectrum strategy and narrative operation. Owner's own
  framing: if a political party came asking to win an election, Pentagon would run
  strategy, campaign, media, field work, digital and intelligence — "narrating the story
  common people hear." Same discipline, applied to artists.
- **Do not say that out loud on the page.** Stated plainly it reads as manufacturing a
  narrative, which is exactly the overselling the owner wants to be the opposite of.
  Capability in, mechanism out. The hero line "how you end up being understood" is as
  close as the copy goes.
- **The value is both** network and judgment: a team who hold the keys to the doors, plus
  people who can see where a door leads.
- Page stays at **2 sections**, deliberately fewer than Production's 3.

### Parked — do NOT publish yet
- **Client story:** an artist "wanted to be a hero"; Pentagon showed the paths and took
  the decisions to get them there. Owner says use later, not now. When it's public, this
  becomes T&S's third section — one real outcome is what the page is missing.
- **Scouting idea:** no apply button; Pentagon approaches talent the way an intelligence
  service recruits, rather than oversimulating an okayish artist. Owner says don't use
  anywhere. Noted because the current T&S page is already consistent with it — the only
  route in is a conversation.

### Open decision
Is non-music strategy work (political, brand) real revenue or just the analogy the owner
thinks in? If real, "Talent & Strategy" sitting inside a music company's nav is the wrong
container — it caps the more valuable service at music. If music-only, current page is right.

### Logo
Hidden as of 2026-10-20 in favour of a text wordmark ("PENTAGON / STUDIOS", Walkway,
right-aligned in the footer tagline row). Both the `<img class="footer-logo">` and
`<span class="footer-wordmark">` are in the HTML on all 5 pages; a commented
LOGO / WORDMARK TOGGLE block in style.css (after `.footer-logo`) hides the image and
shows the wordmark. Delete that block to restore the logo exactly as it was.

## Restructure — 2026-10-25 (owner answers)
- **Production = two pillars.** (1) Film production & music videos: Pentagon makes BOTH
  the visuals and the music, end to end. (2) Independent music: paid production for
  independent artists AND Pentagon's own releases (still "next thing coming", not a fact).
  Page order: Hero → Film & music videos → Independent music → Selected work (3 cards
  unchanged) → The studio → "Bring us the story." The old "Creative for all services"
  4-item section was removed; its services folded into the pillars.
- **T&S = two offerings.** Career consultation (open to any artist, the page CTA:
  "Book a consultation") and Artist management (by invitation, no form; consultation is
  the suggested way onto the radar). Still no prices, no FAQs, 2 sections.
- Contact dropdown "Talent & Strategy" option → "Career consultation".
- Footer Pentagon column on all pages → "Films, music and artist strategy."
- Homepage hover frame line → "We make films, music videos and independent music."

## Deployed — 2026-10-25
Everything up to commit `fc68f5e` is committed, pushed and LIVE on pentagon-studios.vercel.app.
Xcode licence accepted (git works). Vercel CLI updated to 65.2.0 and re-logged in. If deploy
says "token is not valid", the owner runs `! vercel login` (no password needed). `sudo` can't
run via `!`; it needs the macOS Terminal app.

## (Historical) WHERE WE LEFT OFF — session of 2026-10-20

### Shipped to disk this session (NOT deployed, NOT committed)
1. **`production.html` created.** Hero → Selected work (3 "In progress" cards: Feature
   film / Independent single / Artist EP, described by shape because nothing has
   released) → What we do ("Creative for all services" + 4 numbered services) → The
   studio (Coimbatore + partner rooms in Chennai, Kochi, Hyderabad, Bangalore) →
   "Bring us the song." CTA. Reuses existing CSS classes only; no new layout CSS.
2. **`music.html` deleted.** Folded into Production. `/music` → `/production` 301 added
   to `vercel.json`. No dangling links remain.
3. **Nav reordered** to Production → Mentorship → Talent & Strategy → Contact in the
   desktop nav, mobile drawer and footer Pages column on all 5 pages.
4. **Homepage "Explore Portfolio"** button repointed from talent-strategy to production.
5. **`talent-strategy.html` rewritten** to the deliberately-minimal version: 2 sections
   (How it works / Doors, and which ones matter), no FAQs, no service list, no pricing.
   Hero h1 is two lines: "For people building" / "something real."
6. **Hero treatment on Production + T&S:** centred, with a new `.inner-hero--airy`
   modifier class giving wider label→title→sub→CTA spacing (40/44/56px desktop,
   28/32/40px mobile). Mentorship deliberately does NOT carry `--airy`.
   `.inner-hero-title` now wraps below 640px to stop the nowrap titles clipping.
7. **`mentorship.html` corrected** — it claimed exceptional Residency students are
   "considered for a role within Talent & Strategy", which contradicts the owner's
   answer that T&S is not a hiring destination. Now reads "brought into the network".
8. **`contact.html`** — subject dropdown said "Music" (dead category), now "Production".
   Stale template scaffolding comments removed.
9. **Footer "Pentagon" column** reworded on all 5 pages; it repeated the hero phrase
   "building something real" site-wide.
10. **Logo hidden, wordmark live.** See the Logo section above. Wordmark is PP Pangaia
    (`--font-display`), 700, 32–56px, -0.02em tracking, 0.93 line-height, right-aligned,
    sentence case — matched to the big footer tagline opposite it. Uppercase + Walkway
    tracking were removed; if caps come back, the tracking must open up again.

### Blocked / not verified — READ THIS FIRST ON RESTART
- **Nothing has been seen rendered.** Playwright's Chromium is missing, so the gstack
  `/browse` daemon cannot start. Fix: `npx playwright install chromium`. Every page's
  markup was validated as tag-balanced and the mobile breakpoints were read, but no
  screenshot exists. **Visual QA at 1440 and 390 is the first job.**
- **Nothing is deployed.** pentagon-studios.vercel.app is still the April build with a
  Music page. Deploy is manual: `vercel --prod`.
- **Git is unusable** — Xcode licence unsigned, so every git command exits 69. Fix with
  `sudo xcodebuild -license` (interactive, needs the user). **Zero commits were made this
  session and no checkpoint exists.** Pre-session state is whatever the last commit holds
  (3 May 2026).
- Local preview: `python3 -m http.server 8777` from the project folder, then
  `http://localhost:8777/index.html`. Needs `.html` locally; Vercel's cleanUrls strips it.
  **Hard refresh (Cmd+Shift+R)** — the server returns 304s and Chrome serves stale CSS.

### Next up
1. Visual QA both new pages once Chromium is installed.
2. Mobile pass — the owner's standing complaint. Known issue: at 641–900px
   `.inner-section` stays a 260px + 1fr grid, which squeezes the cards. Pre-existing.
3. Real project names + credits into Production's 3 cards as releases land.
4. Decide the open question above (non-music strategy work) — it governs whether
   "Talent & Strategy" is the right container.
5. Deploy.

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
- Email: pentagonstudios.04@gmail.com (what all pages actually ship; Formspree still delivers to nvmusic.04@gmail.com)
- Instagram: https://www.instagram.com/studios_pentagon/
- Location: CBE & Chennai, India

## Nav order (all pages)
Production → Talent & Strategy → Mentorship → Contact (owner's call, 2026-10-25; was
Production → Mentorship → T&S). Applies to desktop nav, mobile drawer and footer Pages column.

## Footer structure
- Tagline row: "creative / for all services." (left) + logo.png (right)
- 3-col grid: Pages | Contact | Pentagon
- Bottom bar: "Pentagon Studios Private Limited." | "Since 2023"
- Logo colour matched to #137043 via mix-blend-mode: screen

## Pending work
1. **Production page content** — project names, years, roles, one-line descriptions. Cards are placeholders.
2. **Mobile layout fixes** — user said mobile looks bad. Breakpoints exist at 900px and 640px; `.program-tracks` and `.inner-section` do collapse at 640px. Tablet range (641–900px) keeps `.inner-section` two-column, which squeezes cards.
3. **Auto-deploy** — git push doesn't trigger Vercel, still using `vercel --prod`.

## Talent & Strategy positioning (decided 2026-10-19)
Deliberately subtle. Detail would commoditise strategy work, so the page gives minimum
understanding and pushes to a conversation. No FAQs, no service list, no pricing.
Proof lives on the Production page instead, one nav click away — that's what lets this
page stay vague without reading as empty.
Spine: *what can be done when what's expected is clear.* Doubles as a filter.
Three blocks: How it works (clarity in, leverage out) → What we work on (decisions that
compound) → "We take on few." Copy is concrete-but-withholding, never abstract-diplomatic.

## Retired copy
The Talent & Strategy FAQ copy below is **retired** — the page no longer has FAQs.
The Mentorship FAQ copy below is **superseded** by what's live in `mentorship.html`
(written when Mentorship was one 3-month programme; it's now two programs).
Kept for reference only.

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

## Homepage behaviour — 2026-10-25
- Hover box: shows anywhere in a band 140px above/below the title (`ZONE_PAD`, script.js §4),
  not just on the glyphs; skips the CTAs. 0.18s delay, sharpens in from blur(12px), trails the
  cursor with a soft lerp. Copy: "based in India and Hong Kong… film production, music videos
  and artist management." (Hong Kong NOT yet reflected in footer/contact — owner to confirm.)
- Scroll story: one small scroll (24px) fires a 900ms timed transition; it's no longer tied to
  scroll distance. `.scroll-story` 300vh → 180vh. Copy slides up into the space the CTA leaves.
- Step gate (script.js §5): first scroll down parks on the copy and holds for the rest of that
  gesture (until 180ms quiet, max 2s), so hard flicks/momentum can't skip to the footer. Enforced
  on the scroll event, since momentum wheel events aren't always cancelable. Uses
  behavior:'instant' because html has scroll-behavior: smooth. Scrolling up steps back to the top.
- "Explore Portfolio" CTA removed; only "Get in touch" remains.
- Rendering works now: Playwright with `channel: 'chrome'` (uses installed Google Chrome).
