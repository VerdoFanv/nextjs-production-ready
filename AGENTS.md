<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent instructions (project)

## Always

1. Read `package.json` for **installed** library versions before using an API.
2. For any new or changed dependency usage, read **official docs for that version** (Next docs under `node_modules/next/dist/docs/` first).
3. Follow existing patterns in `src/app/` — do not invent parallel structure.
4. Prefer components in `src/app/components/ui/`, hooks in `src/app/hooks/`, utils in `src/app/lib/`.
5. Types: only what is needed and used. No speculative type layers.
6. Styling: semantic tokens from `src/app/_styles/` and typography utilities (`text-display`, `text-title`, `text-body`, `text-caption`).
7. Cursor rules in `.cursor/rules/` are authoritative for day-to-day agent behavior.

## Layout map

| Path                     | Role                                     |
| ------------------------ | ---------------------------------------- |
| `src/app/(home)/`        | Home route + section components          |
| `src/app/components/ui/` | Shared Radix-based UI                    |
| `src/app/hooks/`         | Client hooks                             |
| `src/app/lib/`           | `cn`, formatters, url/json/file/sanitize |
| `src/app/config/`        | `siteConfig`, `siteImages`               |
| `src/app/_styles/`       | Design tokens                            |
| `public/assets/images/`  | Content imagery                          |
| `next.config.ts`         | CSP + security headers                   |

# Engineering Standards Directive

This workspace is governed by the principles, workflows, and approval boundaries defined in `PERSONAL_ENGINEERING_STANDARDS.md`.

## Agent Instructions:
1. **Primary Reference:** Check for `PERSONAL_ENGINEERING_STANDARDS.md` in the workspace root. Adhere strictly to its rules, workflow, and approval gates throughout your tasks.
2. **Context-Efficient Reading:** Reference the document targetedly based on your current task phase (e.g., consult Planning & Approval Gates before making architectural decisions; consult Testing & Git Policy before finalizing changes) rather than exhausting context unnecessarily.
3. **Strict Boundaries:** Treat all `[MANDATORY]` clauses—especially around high-risk operations (migrations, deployments, destructive commands) and Git boundaries—as non-negotiable hard constraints.
4. **Fallback:** If `PERSONAL_ENGINEERING_STANDARDS.md` is absent or unreadable, inform the user and proceed with standard senior engineering discipline: maintain strict scope control, avoid speculative changes, and ask before executing any destructive action.
5. **Immutability:** Never modify, overwrite, or delete `PERSONAL_ENGINEERING_STANDARDS.md` unless explicitly commanded by the user.