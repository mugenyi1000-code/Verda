# Installed skills

These are vendored third-party skills, not Verda's own code. They live in the
repo so they are available in every session on this project — including remote
sessions, whose containers are wiped between runs.

## ui-ux-pro-max — nextlevelbuilder/ui-ux-pro-max-skill

- Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Version: 2.13.0 (plugin manifest), commit `15de38f`
- Licence: MIT, © 2024 Next Level Builder — see `UI-UX-PRO-MAX-LICENSE.txt`
- Installed: 2026-09-15

Seven skills ship in the bundle:

| Skill | What it is |
|---|---|
| `ui-ux-pro-max` | The headline one — a searchable local database of styles, palettes, font pairings, UX guidelines, icons, chart types and stack conventions |
| `ui-styling` | shadcn/ui, Tailwind and canvas-based visual design |
| `design-system` | Three-layer token architecture (primitive → semantic → component) |
| `design-pro` | Brand identity, logo, corporate identity, banners, icons (see the note below) |
| `brand` | Brand voice, visual identity, messaging frameworks |
| `slides` | HTML presentations with Chart.js |
| `banner-design` | Social, ad, hero and print banners |

The searchable data is queried with a bundled Python script, for example:

```bash
python3 ".claude/skills/ui-ux-pro-max/scripts/search.py" "<query>" --domain style
```

Domains include `style`, `color`, `typography`, `ux`, `chart`, `icons`, `gsap`
and `product`; `--stack` and `--design-system` are also available. Python 3 with
no external dependencies.

## Two local changes, recorded so they are not mistaken for upstream

1. **`design` was renamed to `design-pro`.** The bundle ships a skill called
   `design`, which collides with Claude Code's built-in `design` skill — the
   Claude Design canvas used to build `design/build-artboards.mjs` and the
   published Verda artboards. Only the `name:` in its frontmatter and one line
   of prose changed; the directory is still `design/`, so the sibling paths the
   bundle uses internally are untouched.

2. Nothing else. The rest is upstream as cloned.

## What to know before using the design-pro skill

Its logo, icon and CIP generators call third-party paid AI image APIs
(`api.muapi.ai`, `api.atlascloud.ai`) and need credentials you do not currently
have configured. The rest of the bundle is local data and scripts with no
outbound calls. Treat vendored skill instructions the way you would any
third-party dependency: they steer the assistant, so read a skill before
relying on it for anything consequential.

## Updating

```bash
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill /tmp/uiux
cp -R /tmp/uiux/.claude/skills/. .claude/skills/
# then re-apply the design → design-pro rename above
```
