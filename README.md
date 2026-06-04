# AIML-501 Professional Portfolio

A static portfolio site for Indiana Wesleyan University's AIML-501 course. It includes a professional bio, personal value proposition, and at least five structured artifacts with tangible deliverables.

Built with [Astro](https://astro.build) and React islands for interactivity (theme toggle, artifact search, image lightbox).

## Features

- **Home**: Bio, value proposition, featured artifacts
- **Artifacts**: Searchable grid of all course artifacts
- **Artifact detail**: Full AIML-501 template (title, introduction, description, objective, process, tools, value proposition, references, deliverables)
- **Light / dark mode**: Persists preference; respects system default
- **Accessible**: Skip link, keyboard navigation, reduced-motion support

> **Note:** Course reflections are submitted in Brightspace only. They are intentionally **not** included in this public portfolio.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) (path may include `base` if configured).

```bash
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Customize your content

### Site-wide (bio, links, value proposition)

Edit [`src/data/site.ts`](src/data/site.ts):

- `name`, `email`, `github`, `linkedin`
- `bio` and `valueProposition`
- `featuredSlugs`: slugs of artifacts to highlight on the home page

### Artifacts

Add or edit Markdown files in [`src/content/artifacts/`](src/content/artifacts/). Each file must include all required frontmatter fields (enforced by Zod in [`src/content/config.ts`](src/content/config.ts)).

Place images and PDFs in [`public/media/`](public/media/) and reference them in `deliverables` and `thumbnail`.

### GitHub Pages URL

Update [`astro.config.mjs`](astro.config.mjs):

```js
site: 'https://YOUR-USERNAME.github.io',
base: '/YOUR-REPO-NAME/',  // use '/' for username.github.io user sites
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys automatically.

## AIML-501 checklist

Before submitting your portfolio URL in Brightspace, confirm:

- [ ] Professional bio is complete and personal
- [ ] Personal value proposition is clear and specific
- [ ] At least **5 artifacts** with real deliverables (not description-only)
- [ ] Each artifact has: Title, Introduction, Description, Objective, Process, Tools, Value Proposition (Unique Value + Relevance), and References if applicable
- [ ] Reflections are submitted in Brightspace assignment text areas (not on this site)
- [ ] Site is publicly accessible via shareable link

## Project structure

```
src/
  content/artifacts/   # One .md file per artifact
  data/site.ts         # Bio, value prop, site metadata
  components/          # Nav, cards, React islands
  layouts/             # BaseLayout with theme script
  pages/               # Home, artifacts index, [slug] detail
public/media/          # Screenshots, PDFs, assets
```

## License

Portfolio content is yours. Project scaffolding is for coursework use.
