# HANDOFF — Ellen Paul for State Rep (CT 55th) campaign site

Context document for anyone (human or Claude session) picking this up cold.
Last updated: 2026-08-21.

## What this is

A from-scratch campaign website for **Ellen Paul**, Democrat for State
Representative, CT 55th District (Andover, Bolton, Glastonbury, Hebron,
Marlborough), replacing her thin Wix site at **ellenforstaterep.com**.
Served by **GitHub Pages** from `main` branch, `/docs` folder, currently at
https://crosseye.github.io/ellen-paul/.

People:
- **Scott Sauyet** — builds and maintains this repo.
- **Ellen Paul** — the candidate; has signed off on all current content.
- **Trip Holtgrewe** — campaign professional; handles the campaign's Wix account and domain DNS; more technical than he first appears.
- **Jay Kamins** — friendly observer, web professional, cc'd on emails.

## Layout

- `docs/index.html` — **the canonical site**: long-scroll single page (Ellen's
  stated preference). Contains the ten-slide Ellen-vs-Weir carousel.
- `docs/multi/` (two-page variant with a separate contrasts page) was
  **removed 2026-08-21**; keeping it in sync wasn't worth it. Revive from git
  history (commit f35a52b or earlier) if ever wanted.
- `docs/Option1/`, `docs/Option2/`, `docs/Option3/` — **temporary review pages for Ellen**
  (2026-08-21), `noindex`ed, reachable at ellenforstaterep.com/Option1 and
  /Option2 and /Option3. All restore Strong Families as a seventh issue card. Option1 makes
  the odd seventh card (Accountable Government) span the final row; Option2
  adds a photo card (`assets/img/issues.jpg`, cropped from
  `photos/ellen-picks/PAUL_ELLEN_2026_0027.jpg`) in the eighth slot, full-bleed;
  Option3 is the same photo framed inside the card shell. Each is a
  copy of `docs/index.html` with asset paths re-rooted and a small inline
  `<style>` block. Once Ellen picks one, fold it into `docs/index.html` and
  delete all three folders.
- `docs/001/` … `docs/008/` — frozen early prototype snapshots. Never edit.
- `docs/assets/` — shared CSS (`css/main.css`), JS (`js/carousel.js`,
  `js/forms.js`, `js/main.js`), images incl. logo SVGs and `favicon.svg`.
- `content/` — source text: Ellen's `Website Content.docx`, the copy deck
  `site-content.md`, and `weir-contrast-draft.md` (the contrast menu that
  seeded the compare section).
- `scripts/make-contrast-docx.py` — regenerates the root-level
  "Ellen vs Weir - Contrast Menu.docx" from `content/weir-contrast-draft.md`
  (needs `pip install python-docx`).
- `photos/` — original photos (large); web-optimized copies live in
  `docs/assets/img/`.

## Hard rules

- **No Donate button, ever.** Ellen qualified for CT public financing
  (Citizens' Election Program) and cannot collect contributions. Primary CTA
  is "Pitch In" (volunteer form).
- **Disclaimer on every page** (Trip's requirement): "Paid for by Defending
  Connecticut Values. Approved by Ellen Paul." It's in each footer.
- **Never use the word "lobbying"** for Ellen's legislative work; say
  advocacy, coalition-building, working with the General Assembly.
- Contrast framing is **his record vs. her priorities** — factual, bill-cited,
  no name-calling. Weir-side claims must trace to roll-call data (see Sources).
- Prose style: **no em-dashes** (commas, periods, parens instead). One
  deliberate exception: the `&mdash;` in the Accountable Government card, which
  is Ellen's own wording kept verbatim. Don't "fix" it.
- JS style: no semicolons, const-default, arrow functions, expression-oriented.
- Ellen-voice copy: practical, values-forward, first person, "We need… / I'll
  work to… / I believe…", never fearmongering.

## Design decisions (and why)

- **Colors:** ink color matches the campaign logo's indigo `#282160`
  (headings, buttons, nav). Large dark surfaces (hero, choice section, footer)
  deliberately do NOT use the logo color — they use a darker, desaturated,
  slightly blue-shifted "midnight" family (`#1c2242` / `#141831` / `#0f1226`).
  Reason: big fields of the literal logo indigo read purple; small marks read
  navy. Matching pixels made it look less matched. All colors are role-based
  tokens at the top of `main.css`; edit only there.
- **Logo:** five SVG variants in `docs/assets/img/` (color for light
  backgrounds, white for dark). Nav uses color at 52px (Ellen asked for
  "a tad bigger" from 44). Favicon is the star-and-swoosh extracted from the
  logo.
- **Carousel behavior** (`carousel.js`): slides are deep-linkable (`#vs-*`);
  arriving with a slide fragment shows that slide with autoplay suspended.
  Autoplay pauses on hover and on keyboard focus; the focus latch applies only
  to `:focus-visible` so mouse clicks don't kill autoplay permanently.
  Inactive slides are `inert`. Dots get tooltips from slide `data-title`.
- **Hover anchors:** issue cards (`#issue-*`) and comparisons (`#vs-*`) have
  hover-reveal `#` links; visible at 45% opacity on touch (`hover: none`).
- **Intro overlay** ("working draft" popup) is disabled by one commented-out
  `initOverlay()` call at the bottom of `main.js`. Re-enable by uncommenting.
- SMS checkbox keeps the simple wording ("It's okay to text me campaign
  updates") — Trip confirmed the campaign is approved for political texting
  and doesn't use form-collected numbers.

## Content decisions

- Contrast order: Education, Property Taxes, Women's Health, Housing,
  Environment, Energy, Workers, Independence, Common Sense, Voting.
  Ellen's one ordering constraint: **housing must not be first**.
- **Housing** slide (Trip initially wanted it dropped; this version won him
  over): leads with Weir's Connecticut Apartment Association board seat and
  his "a service provider to apartments" self-description, then the SB-274
  (2026) tenant-safety bill killed by filibuster threat, then the four-year
  no-on-everything pattern. An older, softer version is preserved commented
  out in `docs/index.html`.
- **Education/Property Taxes** were split at Ellen's request after her CEA
  endorsement. CEA scores Weir 53.5% / 52% / 52% by year
  (cea.org/voting-record/?bio_id=55) — CEA uses percentages, not letter
  grades; the line "In any classroom, that's an F" is approved
  characterization, anchored to the real 52%. Per Ellen, CEA is described as
  "the state's largest organization advocating for teachers and students"
  (NOT "teachers' union").
- **Women's Health** was added at Ellen's request (reproductive topics were
  originally left off strategically; her call overrode that). Key Weir votes:
  SB-1108 (2023), HB-7213 (2025 — a majority of his own caucus voted yes),
  SB-7 (2025). Gun votes remain deliberately unused.
- "Strong Families" issue card came from Ellen's sixth content section
  (child care, schools, reproductive freedom), lightly condensed. **Replaced
  2026-08-16** at Ellen's request by **Accountable Government** (term limits,
  no individual-stock trading in office, required public town halls), her
  text. Strong Families is preserved commented out in `docs/index.html`. On
  2026-08-21 Ellen said she only cut it for the odd-card-count look and would
  keep it given a layout fix; see `docs/Option1/` and `docs/Option2/`.

## Sources for Weir-side claims (NOT in this repo)

All vote claims come from Scott's local reports — verify there before
changing any factual claim:
- `c:\Users\scott\Dev\Andover\55th\reports\weir-analysis\` — the voting-record
  analysis (1,293 roll calls, 2023–May 2026).
- `c:\Users\scott\Dev\Andover\andoverct.info\reports\55th\` — includes
  `weir-votes/weir-votes.md` (every roll call with Weir's vote and both
  caucus splits) and `weir-businesses/` (the SB-274 story, CTAA board seat,
  business holdings).
A cloud session without these files should not alter or extend Weir-side
factual claims — flag for Scott instead.

## Launch: what's done and what's left

Done: all content signed off by Ellen (2026-07-31). Site complete on
github.io. Multi variant in step. Overlay off.

Remaining, **in this order** (order matters):
1. **Trip edits DNS at Wix** (blocked on Wix outage as of 2026-07-31):
   delete the Wix A records on the bare domain; add four A records
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`; point the `www` CNAME at `crosseye.github.io`;
   **leave MX records alone** (domain email must keep working).
2. Only after DNS: **add custom domain** `ellenforstaterep.com` in the repo's
   Pages settings (this auto-commits a `CNAME` file into `docs/`).
   Do NOT add it earlier — Pages immediately 301-redirects github.io traffic
   to the custom domain, which would bounce previews to the old Wix site.
3. Once the certificate provisions, enable **Enforce HTTPS**.
4. Optional hardening: account-level domain verification (Settings → Pages →
   Verified domains) via a TXT record; can be done anytime, doesn't affect
   Wix.

Scott is camping (no power, has phone) starting 2026-08-02; steps 2–3 are
phone-browser tasks.
