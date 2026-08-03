# Jiaxi Wang — Personal Portfolio

Interdisciplinary portfolio for Jiaxi Wang — AI research, medical robotics,
engineering, visual art, athletics, and international programmes.
Hosted on GitHub Pages at [jiaxiwang05.github.io](https://jiaxiwang05.github.io/).

Built with semantic HTML5, modern CSS, and vanilla JavaScript. No build
step, no framework, no backend — push to `main` and the Pages workflow
deploys automatically.

## Pages

| Page | File | Content |
| --- | --- | --- |
| Home | `index.html` | Hero, featured-work index, achievements, background, extracurricular (art + sport), contact band |
| Research | `research.html` | EndoWAM publication (in submission) + BiliVLA, Trileg-ESD, Motion-to-Sound |
| Engineering | `engineering.html` | Automated Material Mover case study + report PDF |
| Art | `art.html` | Durham Art Competition achievement, evidence links, artwork gallery |
| Sport | `sport.html` | USA Ultimate registered college player + official link |
| Certificates | `certificates.html` | EPCC + MITACS certificates with previews and downloads |
| Contact | `contact.html` | Email (copy), GitHub, CV, profile |

## Repository structure

```
.
├── index.html / research.html / engineering.html / art.html / sport.html / certificates.html / contact.html
├── style.css            # design system + layout (shared by all pages)
├── script.js            # nav, scroll reveal, copy-email (shared)
├── cv.pdf               # curriculum vitae (replace manually)
├── assets/
│   ├── favicon.svg      # favicon mark
│   ├── favicon-180.png  # apple-touch icon
│   ├── og-card.png      # social-sharing preview card
│   ├── art/             # gallery artwork (art-01.jpg … art-12.jpg)
│   ├── thumbs/          # PDF first-page previews (jpg)
│   └── pdfs/
│       ├── endowam-in-submission.pdf
│       ├── automated-material-mover-report.pdf
│       ├── epcc-summer-school-2024.pdf
│       └── mitacs-certificate-of-completion.pdf
├── .github/workflows/pages.yml   # GitHub Pages deploy workflow
└── .nojekyll
```

## How to update content

All content is plain HTML in the page files. Shared navigation and footer
markup are repeated in each page — when adding a page or changing a label,
update every page's `<header>` and `<footer>`.

- **Publication**: edit `research.html` (`#endowam`). The PDF lives at
  `assets/pdfs/endowam-in-submission.pdf`.
- **Projects**: edit `research.html` project rows or `engineering.html`
  case-study blocks.
- **Certificates**: replace the PDF in `assets/pdfs/` and regenerate the
  preview in `assets/thumbs/` (`pdftoppm -jpeg -r 72 -f 1 -l 1`).
- **Art gallery**: drop web-sized JPEGs into `assets/art/` and edit the
  `<figure>` items in `art.html`.
- **Contact details**: edit the email address and GitHub links in each
  page's header/footer and in `contact.html`.

## Local development

Serve the folder from its root (relative paths assume the repo root):

```bash
python3 -m http.server 8000
```

## Deploying

`.github/workflows/pages.yml` deploys on every push to `main`:

```bash
git add -A
git commit -m "Update portfolio"
git push origin main
```

Deployment runs under **Actions → Deploy static content to Pages** and the
site updates at https://jiaxiwang05.github.io shortly after.

## Content integrity notes

- The EndoWAM manuscript is listed as **in submission** — not accepted or
  published. The PDF is the anonymized review version; check the venue's
  anonymity policy before the submission deadline if you are concerned
  about public hosting of the manuscript.
- No publications, awards, statistics, or credentials were invented.
  Metrics (mIoU, action precision, navigation success) and the author list
  are taken from the original site and the paper PDF.
- The Material Mover case study is grounded in the group's feasibility
  report (Group 19-AIBM4, Durham University, July 2026).
- Certificate dates and programme names are taken from the certificate PDFs.
- The site does not claim any Oxford affiliation.
