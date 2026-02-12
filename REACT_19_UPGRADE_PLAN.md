# React 19 Upgrade Plan

## Current State

- **React**: 18.2.0
- **Build tool**: Vite 5.0.13 with `@vitejs/plugin-react` 4.2.1
- **Routing**: `react-router-dom` 6.21.1
- **Components**: 100% functional components, no class components, no legacy patterns
- **Entry point**: Already uses `createRoot` / `hydrateRoot` (React 18 API)

The codebase is in good shape for this upgrade. There are no class components,
no string refs, no legacy lifecycle methods, and no usage of `defaultProps` on
function components. The main work involves replacing three incompatible
third-party packages and bumping versions on the rest.

---

## Incompatible Dependencies

### 1. `react-helmet` (v6.1.0) — BROKEN, abandoned

**Problem:** Internally calls `ReactDOM.findDOMNode()`, which is removed in
React 19. The package has not been updated since 2020 and will crash at runtime.

**Used in:** `Home.jsx`, `Resume.jsx`, `Contact.jsx`, `Posts.jsx`
(imported as `{ Helmet } from 'react-helmet'`)

**Replacement: React 19 built-in document metadata**

React 19 natively supports rendering `<title>`, `<meta>`, and `<link>` tags
anywhere in the component tree. React hoists them into the document `<head>`
automatically. No library needed.

Before (React 18 + react-helmet):
```jsx
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <>
      <Helmet>
        <title>Chris Yates | Home</title>
      </Helmet>
      <div>...</div>
    </>
  );
}
```

After (React 19, no imports):
```jsx
function Home() {
  return (
    <>
      <title>Chris Yates | Home</title>
      <div>...</div>
    </>
  );
}
```

---

### 2. `react-helmet-async` (v2.0.4) — BROKEN, peer dep excludes React 19

**Problem:** Peer dependency is `react: ^16.6.0 || ^17.0.0 || ^18.0.0` —
React 19 is excluded, so `npm install` fails. The package is also unmaintained
(no response to React 19 issues).

**Used in:** `Post.jsx`
(imported as `{ Helmet, HelmetProvider } from 'react-helmet-async'`)

This page uses Helmet for dynamic Open Graph and Twitter Card meta tags based
on post data.

**Replacement: React 19 built-in document metadata** (same as above)

Before:
```jsx
import { Helmet, HelmetProvider } from 'react-helmet-async';

<HelmetProvider context={helmetContext}>
  <Helmet>
    <title>{post.title} - Chris Yates</title>
    <meta property="og:title" content={post.title} />
  </Helmet>
</HelmetProvider>
```

After (React 19):
```jsx
<title>{post.title} - Chris Yates</title>
<meta property="og:title" content={post.title} />
```

No `HelmetProvider`, no context object, no wrapper. React 19 handles it.

---

### 3. `react-markdown-editor-lite` (v1.3.4) — BROKEN, abandoned

**Problem:** Peer dependency is `react: ^16.9.0 || ^17.0.0 || ^18.0.0` —
React 19 excluded. The package has not been updated in over 2 years, has 58
open issues, and likely uses `findDOMNode` internally.

**Used in:** `PostForm.jsx`
(imported as `MdEditor from 'react-markdown-editor-lite'`)

Usage: WYSIWYG markdown editor with live preview via `markdown-it`, accessed
with a `ref`, and wired to form state via `onChange`.

**Replacement: `@uiw/react-md-editor`**

- Actively maintained (latest release within last few months)
- ~4.6 kB gzipped, small footprint
- Built-in preview (no separate markdown parser dependency needed, though a
  custom `renderHTML` can be provided)
- Supports React 19
- Supports `ref` forwarding and controlled `value`/`onChange`
- Includes its own CSS (similar to the current `react-markdown-editor-lite/lib/index.css` import)

Migration notes:
- The `markdown-it` dependency can be removed if using `@uiw/react-md-editor`'s
  built-in preview renderer, which uses `rehype`/`remark` internally.
- The `onChange` API differs slightly: the new editor passes the value string
  directly rather than `{ text, html }`.
- The `ref` usage in `PostForm.jsx` (line 21, `MdEditorRef`) is only used for
  an `instanceof` check on `Enter` key handling, which can be adapted.

---

### 4. `@formspree/react` (v2.5.1) — peer dep excludes React 19

**Problem:** Peer dependency is `react: ^16.8 || ^17.0 || ^18.0`. React 19 is
not included.

**Used in:** `Contact.jsx` (`useForm`, `ValidationError`)

**Fix: Upgrade to v3.0.0** — the latest version adds `react: ^19.0` to its
peer dependencies. No API changes required; it is a straightforward version
bump.

---

## Compatible Dependencies (version bumps recommended)

### 5. `react-transition-group` (v4.4.5) — WORKS, no changes needed

This package uses `findDOMNode` by default, which is removed in React 19.
However, the codebase already passes the `nodeRef` prop to `<CSSTransition>`
in `App.jsx:39`, which bypasses `findDOMNode` entirely. The `routes` array at
`App.jsx:56-72` uses `createRef()` for each route's `nodeRef`. This pattern is
correct and React 19-safe.

**Action:** None. Keep as-is.

### 6. `react-markdown` (v9.0.1) — WORKS, upgrade for type fixes

Peer dependency is `react: >=18` (open-ended), so it installs fine. However,
v9.0.1 has TypeScript type conflicts with `@types/react@19` (JSX namespace
change). Upgrade to **v9.0.2+** to fix types. Alternatively, v10.x is
available but removes the `className` prop (breaking change to evaluate).

**Action:** Upgrade to `react-markdown@^9.0.2`.

### 7. `react-router-dom` (v6.21.1) — WORKS

Peer dependency is `react: >=16.8` (open-ended). Fully functional with React
19. React Router v7 is available and is the actively developed line, but the
v6-to-v7 migration is a separate project and not required for React 19
compatibility.

**Action:** None required. Optionally upgrade to latest v6.x patch for bug
fixes.

### 8. `react-icons` (v4.12.0) — WORKS

Peer dependency is `react: *` (wildcard). Pure SVG components with no
deprecated API usage.

**Action:** None required.

### 9. `@vercel/analytics` (v1.1.1) — WORKS

No React peer dependency declared in v1.1.1.

**Action:** None required. Optionally upgrade to v1.6.x.

### 10. `prop-types` — NOT in `package.json`, but used in code

`ProjectCard.jsx` imports from `prop-types` and defines a `propTypes` block.
This package is not listed in `package.json` — it works only because it's
resolved as a transitive dependency. The `prop-types` package itself still
works with React 19, but it is a legacy pattern.

**Action:** Remove the `PropTypes` import and the `propTypes` block from
`ProjectCard.jsx`. The component already destructures its props in the function
signature, which serves as self-documentation.

---

## Dev Dependencies

### 11. `@types/react` and `@types/react-dom` — MUST upgrade

Upgrade to `@types/react@^19.0.0` and `@types/react-dom@^19.0.0`. React 19
types have breaking changes (JSX namespace moved from global to
`React.JSX`). These are devDependencies and do not affect the runtime bundle,
but are needed if TypeScript checking is ever enabled or for editor
IntelliSense.

### 12. `@vitejs/plugin-react` (v4.2.1) — WORKS

No React peer dependency. Peers on Vite only.

**Action:** None required.

### 13. `eslint-plugin-react-hooks` (v4.6.0) — WORKS

No React peer dependency.

**Action:** None required. Note that v5+ is available with React 19-aware
rules but requires ESLint 9 + flat config migration, which is a separate
effort.

### 14. `.eslintrc.cjs` — UPDATE React version

The ESLint config at line 12 hardcodes `react: { version: '18.2' }`. Update
this to `'19.0'` (or `'detect'` to auto-detect from `package.json`).

---

## Step-by-Step Execution Plan

### Phase 1: Core upgrade

1. Update `package.json`:
   - `react` → `^19.0.0`
   - `react-dom` → `^19.0.0`
   - `@types/react` → `^19.0.0`
   - `@types/react-dom` → `^19.0.0`

2. Run `npm install` and resolve any peer dependency conflicts.

### Phase 2: Remove `react-helmet` and `react-helmet-async`

3. **`Home.jsx`** — Remove `Helmet` import. Replace `<Helmet><title>...</title></Helmet>` with bare `<title>...</title>` in the JSX.

4. **`Resume.jsx`** — Same pattern.

5. **`Contact.jsx`** — Same pattern.

6. **`Posts.jsx`** — Same pattern.

7. **`Post.jsx`** — Remove `Helmet` and `HelmetProvider` imports from
   `react-helmet-async`. Remove the `helmetContext` variable. Remove the
   `<HelmetProvider>` wrapper. Replace all `<Helmet>` content (`<title>`,
   `<meta>` tags) with bare JSX tags rendered directly in the component tree.

8. Remove both packages:
   ```
   npm uninstall react-helmet react-helmet-async
   ```

### Phase 3: Replace `react-markdown-editor-lite`

9. Install the replacement:
   ```
   npm install @uiw/react-md-editor
   ```

10. **`PostForm.jsx`** — Replace `MdEditor` import and usage:
    - Remove `import MdEditor from 'react-markdown-editor-lite'` and its CSS import.
    - Import `@uiw/react-md-editor` instead.
    - Adapt the `onChange` handler (new editor passes value string directly).
    - Evaluate whether `markdown-it` is still needed (it is also used as the
      `renderHTML` prop). If `@uiw/react-md-editor`'s built-in preview
      suffices, remove `markdown-it` from dependencies.

### Phase 4: Upgrade `@formspree/react`

11. Upgrade to v3:
    ```
    npm install @formspree/react@^3.0.0
    ```
    No code changes expected — the `useForm` and `ValidationError` APIs are
    unchanged.

### Phase 5: Upgrade supporting packages

12. Upgrade `react-markdown`:
    ```
    npm install react-markdown@^9.0.2
    ```

### Phase 6: Clean up legacy patterns

13. **`ProjectCard.jsx`** — Remove the `prop-types` import and the
    `ProjectCard.propTypes` block.

14. **`.eslintrc.cjs`** — Change `react: { version: '18.2' }` to
    `react: { version: 'detect' }`.

### Phase 7: Verify

15. Run `npm run build` and fix any build errors.

16. Run `npm run dev` and manually test:
    - Home page title appears in browser tab
    - Blog post pages render correct Open Graph meta tags (inspect with dev tools)
    - Post editor (PostForm) loads, accepts markdown input, and renders preview
    - Contact form submits successfully
    - Page transitions animate correctly
    - No console errors or warnings

---

## Summary of Changes

| Package | Current | Action | Replacement |
|---|---|---|---|
| `react` | 18.2.0 | Upgrade | 19.0.0 |
| `react-dom` | 18.2.0 | Upgrade | 19.0.0 |
| `react-helmet` | 6.1.0 | **Remove** | React 19 built-in `<title>` / `<meta>` |
| `react-helmet-async` | 2.0.4 | **Remove** | React 19 built-in `<title>` / `<meta>` |
| `react-markdown-editor-lite` | 1.3.4 | **Replace** | `@uiw/react-md-editor` |
| `markdown-it` | 14.0.0 | Evaluate removal | Built into `@uiw/react-md-editor` |
| `@formspree/react` | 2.5.1 | Upgrade | 3.0.0 |
| `react-markdown` | 9.0.1 | Upgrade | 9.0.2+ |
| `@types/react` | 18.2.43 | Upgrade | 19.x |
| `@types/react-dom` | 18.2.17 | Upgrade | 19.x |
| `react-transition-group` | 4.4.5 | Keep | Already uses `nodeRef` |
| `react-router-dom` | 6.21.1 | Keep | Compatible as-is |
| `react-icons` | 4.12.0 | Keep | Compatible as-is |
| `@vercel/analytics` | 1.1.1 | Keep | Compatible as-is |
| `prop-types` (implicit) | — | Remove usage | Delete from `ProjectCard.jsx` |
