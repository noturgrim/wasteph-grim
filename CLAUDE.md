# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WastePH is a waste management CRM — a public marketing website plus an admin/sales portal (CRM). Two independent apps sharing one PostgreSQL database:

- **`backend/`** — Node.js + Express API (port 5000)
- **`front/`** — React 19 + Vite SPA (port 5173)

No root `package.json`. Each app is installed and run independently.

## Development Commands

```bash
# Backend
cd backend
npm install
npm run dev              # nodemon, port 5000
npm run db:push          # Push Drizzle schema to DB (use instead of migrations)
npm run db:studio        # Drizzle Studio GUI → https://local.drizzle.studio
npm run seed:admin       # Create default admin (admin@wasteph.com / Admin@123456)
npm run seed:services    # Seed service reference data

# Frontend
cd front
npm install
npm run dev              # Vite dev server, port 5173
npm run build            # Production build
npm run lint             # ESLint (flat config, ESLint 9)
```

There are no test suites configured. Verify changes by running both `npm run dev` servers and testing manually.

## WebSocket (Real-Time) System

The app uses **Socket.IO** for real-time updates. Currently implemented for:

### Ticket System (Live)
- Real-time ticket creation notifications (to admins)
- Live status updates (open → in_progress → resolved → closed)
- Priority changes (especially urgent tickets)
- Comment additions
- Attachment uploads/deletions

**Key Files:**
- Backend: `src/socket/socketServer.js`, `src/services/ticketServiceWithSocket.js`
- Frontend: `src/admin/services/socketService.js`, `src/admin/services/ticketSocketService.js`

**Security:** Cookie-based authentication via Lucia session. No tokens in localStorage. Auto-reconnection on disconnect.

**See:** `backend/SOCKET_IMPLEMENTATION.md` for detailed documentation.

## Environment

- **`backend/.env`** — `DATABASE_URL`, `PORT`, `FRONTEND_URL`, SMTP config, AWS S3 credentials, Facebook API keys
- **`front/.env`** — `VITE_API_URL=http://localhost:5000/api`
- Both use `type: "module"` (ESM throughout)

## Architecture

### Backend: Route → Controller → Service → DB

Every feature follows the same three-layer pattern:

1. **Route** (`src/routes/`) — Express router. Applies middleware (`requireAuth`, `requireRole`, `requireMasterSales`, validation). Wires HTTP methods to controller functions.
2. **Controller** (`src/controllers/`) — Extracts `req.params`, `req.query`, `req.body`, `req.user`. Calls the service. Returns JSON `{ success: true, data, message }`. Errors go to `next(error)`.
3. **Service** (`src/services/`) — All business logic and DB queries via Drizzle ORM. Handles pagination, filtering, activity logging. Instantiated as singletons (`export default new XxxService()`).

**Auth middleware stack** (`src/middleware/auth.js`):
- `requireAuth` — Validates Lucia session cookie (`auth_session`), sets `req.user`
- `requireRole(...roles)` — Checks `req.user.role` against allowed list
- `requireMasterSales` — Checks `req.user.isMasterSales`
- `optionalAuth` — Populates `req.user` if session exists, continues either way

**Error handling** — Throw `new AppError(message, statusCode)` from anywhere; the global error handler in `src/middleware/errorHandler.js` formats it into `{ success: false, message }`.

### Database

- **ORM:** Drizzle with `postgres` (postgres.js) driver
- **Schema:** Single file at `backend/src/db/schema.js` — all tables, enums, indexes
- **Migrations:** Use `npm run db:push` (schema-push). Migration files exist in `backend/drizzle/` but `db:push` is the workflow in use.
- **ID strategy:** Lucia user IDs are `text` (Lucia-generated). All other tables use `uuid` with `defaultRandom()`.
- **Sequential numbers:** `countersTable` generates `INQ-YYYYMMDD-NNNN`, `PROP-YYYYMMDD-NNNN`, `TKT-YYYYMMDD-NNNN` style identifiers.

### Frontend: Public Site + Admin CRM

**Routing** (`front/src/App.jsx`):
- `/admin/*` → lazy-loaded CRM app (`src/admin/`)
- `/proposal-response/:id/:action` and `/contract-response/:id` → token-based public pages (no auth)
- Everything else → public marketing site with scroll-snapping sections

**Admin CRM** (`front/src/admin/App.jsx`):
- Wraps everything in `ThemeProvider` → `AuthProvider`
- All pages inside `ProtectedRoute` with `AppLayout` (sidebar nav)
- Role-based route guards: `super_admin` sees everything; `sales` sees pipeline; `social_media` sees content

**State / Auth** — `AuthContext` holds `{ user, login, logout, isLoading }`. Calls `GET /api/auth/me` on mount to hydrate. No token stored client-side — auth is entirely cookie-based (`credentials: "include"`).

**API client** — Single `ApiClient` class instance exported as `api` from `src/admin/services/api.js`. All fetch calls go through `api.request(endpoint, options)`. Each feature has named methods (e.g., `api.getLeads(params)`, `api.createProposal(data)`).

**Path aliases** (Vite + tsconfig):
- `@` → `./src`
- `@admin` → `./src/admin`

## Key Patterns to Follow

### Pagination (server-side)

All list pages use server-side pagination. The standard shape:

**Backend service** returns:
```js
{ data: [...rows], pagination: { total, page, limit, totalPages } }
```

Backend services coerce query-string params with `Number()` to prevent string concatenation bugs (e.g., `page + 1` when page is `"1"`):
```js
const page = Number(rawPage) || 1;
const limit = Number(rawLimit) || 10;
```

Multi-value filters use comma-separated strings: frontend joins with `.join(",")`, backend splits with `.split(",")` and uses `inArray()` for multiple values, single `eq()` for one.

**Frontend page** pattern:
```js
const fetchIdRef = useRef(0);                    // stale-response guard
const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

useEffect(() => {
  setPagination(prev => ({ ...prev, page: 1 })); // reset to page 1 on filter change
  fetchData(1);
}, [filterA, filterB]);

const fetchData = async (page = pagination.page, limit = pagination.limit) => {
  const currentFetchId = ++fetchIdRef.current;
  setIsLoading(true);
  try {
    const response = await api.getXxx({ ...filters, page, limit });
    if (currentFetchId !== fetchIdRef.current) return; // ignore stale
    setData(response.data);
    setPagination(response.pagination);
  } finally {
    if (currentFetchId === fetchIdRef.current) setIsLoading(false);
  }
};
```

Navigation buttons clamp with `Math.max`/`Math.min` to prevent out-of-range page requests.

### DataTable (TanStack Table)

Admin list pages use `@tanstack/react-table` via shadcn's `DataTable` component. Columns are defined as arrays of column objects. The table receives `data` (current page rows) and the pagination controls are rendered separately below it.

### Components

- Use **shadcn/ui** components exclusively. Only create custom components if shadcn doesn't have the needed component (per `.cursor/rules/custom.mdc`).
- shadcn components live in `front/src/components/ui/` (auto-generated by shadcn CLI).
- Common admin components in `front/src/admin/components/common/` (e.g., `StatusBadge`, `DashboardCard`, `ResponsiveTable`).

### Activity Logging

Services that mutate data call a private `_logActivity` method at the end, passing `userId`, `action`, `entityType`, `entityId`, `details`, and request metadata (`ipAddress`, `userAgent`). Controllers extract metadata like:
```js
const metadata = { ipAddress: req.ip, userAgent: req.get("user-agent") };
```

## Role System

| Role | Description |
|---|---|
| `super_admin` | Full access to everything |
| `admin` | Management + support; can approve/reject proposals, manage contracts |
| `sales` | Sales pipeline (inquiries, leads, clients, tickets). Can create proposals. |
| `social_media` | Content management only (blog, showcase) |

The `isMasterSales` flag on a `sales` user grants access to proposal/contract template management.

## Proposal & Contract Workflow

**Proposal flow:** Sales creates proposal (status: `pending`) → Admin approves/rejects → Sales sends to client (generates PDF, sends email with accept/reject links) → Client responds via token-based public page → status updates accordingly.

**Contract flow:** When a proposal is accepted, a contract record is auto-created (`pending_request`). Sales requests a contract → Admin uploads/generates contract PDF → sent to Sales → Sales sends to client → client uploads signed copy → client record is auto-created.

Both flows use Handlebars templates rendered server-side, with Puppeteer generating PDFs.

## Common Gotchas

- **Query params are always strings.** Backend services must coerce `page`/`limit` with `Number()` before arithmetic.
- **`getUsers()` vs `getAllUsers()`** in `api.js` — `getUsers(role)` is a lightweight helper for dropdown selectors used across many pages (passes `limit=100`). `getAllUsers(filters)` is for the Users admin table with full pagination.
- **Cookie auth requires `credentials: "include"`** on every fetch call. The `ApiClient` class handles this automatically.
- **Drizzle `count()`** returns `{ value: number }` — destructure as `[{ value: total }]`.
- **Public proposal/contract response routes** (`/public/*`) in the router must be defined *before* the `/:id` parameterized routes, or Express will match them as IDs.
