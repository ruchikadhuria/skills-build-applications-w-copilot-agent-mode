# Octofit Tracker Frontend

The presentation tier uses React 19 + Vite + React Router.

## Environment configuration

Define `VITE_CODESPACE_NAME` so API URLs can target the backend in Codespaces:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

When defined, API calls use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to:

```text
http://localhost:8000/api/[component]/
```

This fallback avoids malformed URLs such as `https://undefined-8000.app.github.dev/...`.
