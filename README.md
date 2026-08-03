# Jiaxi Wang — Personal Research Website

Personal research portfolio for Jiaxi Wang, hosted on GitHub Pages at
[jiaxiwang05.github.io](https://jiaxiwang05.github.io/).

Built with semantic HTML5, modern CSS, and vanilla JavaScript. No build
step, no framework, no backend — push to `main` and GitHub Pages serves it
from the repository root.

## Repository structure

```
.
├── index.html        # single-page site (all content)
├── style.css         # design system + layout
├── script.js         # nav, scroll reveal, copy-email
├── cv.pdf            # curriculum vitae (replaced manually)
├── assets/
│   ├── favicon.svg   # favicon mark
│   ├── favicon-180.png  # apple-touch icon
│   └── og-card.png   # social-sharing preview card
└── README.md
```

## How to update content

All content lives in `index.html` — there is no data file or build step.
Search for the section comments to find the right block.

### Projects (Selected Research)

Each project is one `<article class="project">` inside
`<section id="research">`. The first article is the featured case study;
the two below it are supporting cards.

- Title: edit the `<h3>`.
- Institution / role: edit `<p class="project__meta">`.
- Problem / contribution: edit the `<dt>`/`<dd>` pairs in
  `<dl class="project__facts">`. Keep each claim verifiable.
- Results: edit the `<ul class="metric-list">` items. Only report metrics
  that are real and already documented.
- Video: replace the `src` in the `<iframe>` with a new YouTube embed URL
  (`https://www.youtube-nocookie.com/embed/<ID>`), and keep the `title`
  attribute descriptive.

### Publications

Edit the `<article class="paper">` inside `<section id="publications">`.
Keep the venue tag honest — use `Submission`, `Under review`, or
`Accepted` as appropriate, and do not change author names.

### Experience & Education

Two timelines inside `<section id="experience">`: research experience
(most recent first) and education. Add or remove `<li class="tl">` entries;
each has a date, role, institution, and optional one-line note.

### Open source / service

Edit `<article class="service">` in `<section id="opensource">`. The GSoC
project links are the two `<a class="link-arrow">` elements.

### Contact details

Edit the email address in three places in `index.html`:

1. The hero contact line (`hero__contact`) and `mailto:` buttons.
2. The contact-card email row and its `data-copy` attribute.
3. The footer email link.

Also update `script.js`? No — `script.js` reads the address from the
`data-copy` attribute, so only `index.html` needs editing.

## Local development

Serve the folder from its root (relative paths assume the repo root):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

GitHub Pages is configured to publish from the `main` branch root:

```bash
git add -A
git commit -m "Update portfolio"
git push origin main
```

The redesign was developed on the `redesign/oxford-robotics` branch.

## Notes on content integrity

- No publications, awards, affiliations, results, or statistics were
  invented. Everything on the page traces back to the original site
  content or the CV.
- The AAAI 2027 EndoWAM entry is explicitly labelled a submission.
- The site does not claim any Oxford affiliation.
