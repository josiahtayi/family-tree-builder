# Family Tree 🌳

An interactive, web-based family tree with photo support. The tree comes pre-loaded with the family (Selina's descendants — 75 people across 4 generations) and can be edited, searched, and backed up entirely in your browser. No server, no accounts, no dependencies.

## Features

- **4-generation collapsible tree** — expand/collapse any branch
- **Add, edit, delete** any member
- **Spouses / partners** shown next to each person
- **Deceased markers** (shown with a † symbol)
- **Photos** — upload a picture for any member (shows as a circular avatar)
- **Search** — type a name to jump to anyone in the tree
- **Re-parent** anyone via the Parent dropdown (cycles are prevented automatically)
- **Auto-save** to the browser's local storage
- **Backup / restore** — download your data as `family-data.json` and re-import it later

## Getting Started

### Run locally
Just open `index.html` in any browser (double-click it). That's it.

### Host free on GitHub Pages
1. Push these files to a GitHub repo.
2. Repo **Settings → Pages → Source → Deploy from a branch → `main` / root**.
3. Your tree goes live at `https://YOURNAME.github.io/REPO/`.

## How the data works

The family is stored in two places:

1. **Built into `index.html`** as the default tree (so it shows immediately, including on GitHub Pages).
2. **`family-data.json`** — a clean, editable copy of the same data for version control.

When you edit in the browser, changes are saved to **local storage** on that device. Local storage is per-browser and isn't committed to GitHub, so to make edits permanent / shareable:

1. Click **Download data** in the app to get an updated `family-data.json`.
2. Replace `family-data.json` in your repo and commit it.

To restore that data on another device, open the app and click **Load data**.

> **Photos** are also kept in local storage as embedded images. They are not written to `family-data.json`, so they live only in the browser where you added them. For permanent photo storage you'd want a hosted-image approach (a future enhancement).

## Data format

`family-data.json` is a flat list. Each person links to their parent by `parentId`:

```json
{ "id": "2.4", "name": "Gciniwe", "parentId": "1.0", "spouse": "Eliot", "spouseDeceased": true }
```

| Field            | Meaning                                            |
|------------------|----------------------------------------------------|
| `id`             | Unique identifier (e.g. `2.4.1`)                   |
| `name`           | Person's name                                      |
| `parentId`       | `id` of their parent, or `null` for the top person |
| `spouse`         | (optional) spouse / partner name                   |
| `deceased`       | (optional) `true` if the person has passed away    |
| `spouseDeceased` | (optional) `true` if the spouse has passed away    |

## File structure

```
family-tree/
├── index.html         # The whole app (open this)
├── family-data.json   # Editable copy of the family data
├── README.md          # This file
├── package.json       # Project metadata
└── .gitignore         # Git ignore rules
```

## Roadmap

- [ ] Export the tree as an image / PDF
- [ ] Hosted photo storage (so pictures sync across devices)
- [ ] Birth / death years and notes per person
- [ ] Print-friendly layout
- [ ] Dark mode

## License

MIT — free to use, modify, and share.