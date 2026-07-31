# GemNexus · ProfileCard

A single, responsive React component that displays a person's profile card with
live bio data fetched from a public placeholder API.

Built for the GemNexus Frontend assignment.

---

## ✨ Features

- **Semantic HTML** — `<article>`, `<header>`, `<section>`, `<footer>`,
  `<h2>`, `<p>`, `<img>`. No `<div>` soup.
- **Mobile‑first responsive** — base layout is the narrow layout; the `sm:`
  variant (≥ 640 px) upgrades the avatar and padding.
- **Accessible**
  - Real alt text on the avatar (`Portrait of {name}`).
  - Visible focus rings on every interactive element (`focus-visible:ring-4`).
  - Card‑level `focus-within` ring when focus is anywhere inside.
  - Bio region marked `aria-live="polite"` so screen readers announce updates.
  - Loading state marked `aria-busy`; error state uses `role="alert"`.
  - Body text `#18144A` on white = **17.4 : 1** contrast ratio (WCAG AAA).
- **Loading, success, error, empty** states handled explicitly.
- **Brand‑styled** with GemNexus colours:
  - Sky `#3FBAEB` — accent (used only for backgrounds/focus rings, never body
    text).
  - Navy `#18144A` — body text.
- **Branded type** — `Syne` for the heading, `DM Sans` for body.

---

## 🧱 Tech stack

| Layer | Choice |
|---|---|
| Build tool | Vite |
| Framework | React 19 |
| Styling | Tailwind CSS v3 (with custom brand tokens) |
| Linting | Oxlint (React + Oxc plugins) |
| Data | [JSONPlaceholder](https://jsonplaceholder.typicode.com) — `GET /users/1` |

---

## 🚀 Getting started

Requires Node 18+.

```bash
npm install
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open it in a
browser and resize — the card is fully responsive.

### Other scripts

```bash
npm run build    # production build to ./dist
npm run preview  # serve the production build locally
npm run lint     # run Oxlint
```

---

## 📁 Project structure

```
profile-card/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ProfileCard.jsx   ← the component
│   ├── App.jsx               ← demo host
│   ├── index.css             ← Tailwind directives + fonts
│   └── main.jsx              ← entry
├── index.html
├── tailwind.config.js        ← brand colours, fonts, shadow
├── postcss.config.js
├── oxlintrc.json
├── vite.config.js
└── package.json
```

---

## 🔌 Component API

```jsx
import ProfileCard from "./components/ProfileCard";

<ProfileCard
  name="Ada Lovelace"
  role="Lead Engineer · GemNexus"
  avatarUrl="https://i.pravatar.cc/200?img=47"
/>
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | yes | Displayed as the heading and used in the avatar's alt text. |
| `role` | `string` | yes | Shown under the name. |
| `avatarUrl` | `string` | yes | Source URL for the avatar image. Provide a real image URL — the alt text assumes it depicts the named person. |

The component owns its own loading state and does not accept props to
override the fetched bio or network behaviour — keep it small and self‑contained.

---

## 🧠 How the fetch works

On mount (and whenever `name` changes), the component calls
`GET https://jsonplaceholder.typicode.com/users/1` with an `AbortController`
signal. The mapped bio is the user's `company.catchPhrase` — short, snappy,
"placeholder"‑flavoured. The four states are:

| `status` | UI | A11y |
|---|---|---|
| `loading` | "Loading bio…" with a subtle pulse | `aria-busy="true"` |
| `success` | The fetched bio text | — |
| `empty` | "No bio available." in italics | — |
| `error` | "Couldn't load bio — \<message\>" in red | `role="alert"` |

If the component unmounts mid‑fetch, the in‑flight request is aborted — no
"set state on unmounted component" warnings, even under React StrictMode's
double‑mount.

---

## 🎨 Brand tokens

Defined in `tailwind.config.js`:

```js
colors: {
  "brand-sky":      "#3FBAEB",   // accent (backgrounds, focus rings)
  "brand-navy":     "#18144A",   // primary text
  "brand-navy-soft": "#2A236B",
},
fontFamily: {
  heading: ['"Syne"',   "ui-sans-serif", "system-ui"],
  body:    ['"DM Sans"', "ui-sans-serif", "system-ui"],
},
```

Fonts are loaded from Google Fonts in `src/index.css` — the `@import` sits
above the `@tailwind` directives because PostCSS requires imports to precede
all other rules.

---

## ✅ Reviewer checklist

- [ ] `npm install && npm run dev` boots cleanly
- [ ] Card renders with the three required props
- [ ] Avatar `alt` contains the actual name (`Portrait of …`)
- [ ] Tab through — every button shows a visible focus ring
- [ ] Narrow width (≤ 360 px) is still readable, no horizontal scroll
- [ ] Throttle network to offline → error state appears
- [ ] Empty bio response → "No bio available." renders

---

## 📝 License

MIT — for the purposes of this assignment.
