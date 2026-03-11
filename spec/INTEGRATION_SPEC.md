# 🚀 Standard Module Integration Specification

This document serves as the standard Standard Operating Procedure (SOP) and architectural blueprint for integrating a new feature module into a full-stack Next.js application.

By following this strict, layered architecture, we ensure maximum code maintainability, reusability, strict type-safety, testability, and a clear separation of concerns from the database up to the UI.

## 🏗️ Workflow Overview (Back-to-Front)

Adding a new module involves implementing changes sequentially across the stack. Follow this guide layer-by-layer.

---

### Layer 1: Data & Types 🗄️

**1. Type Definitions**
**Path:** `types/[module].types.ts`
Define the core interfaces and Data Transfer Objects (DTOs).
- `I[Module]`: The main interface reflecting the database schema strictly.
- `Create[Module]DTO`: Types for creating a new record (excluding auto-generated fields like `_id`, `createdAt`, `updatedAt`).
- `Update[Module]DTO`: Typically a `Partial<Create[Module]DTO>`.

**2. Validation Schemas**
**Path:** `validations/[module]s.schema.ts`
Define the Zod schemas for both frontend form validation and backend API request parsing.
- Export `[module]Schema` (Zod validation).
- Export `[Module]FormValues` inferred from the schema (`z.infer<typeof [module]Schema>`).

**3. Database Model**
**Path:** `models/[module].model.ts`
Define the Mongoose (or ORM) schema and model.
- Map the schema exactly to the `I[Module]` interface.
- **Hot-Reloading Note**: In development mode with Next.js, use this pattern to prevent the runtime from throwing an `OverwriteModelError` on recompilation:
  ```typescript
  import mongoose from "mongoose";

  // Define schema...
  const schema = new mongoose.Schema<I[Module]>({ ... }, { timestamps: true });

  if (mongoose.models.[Module]) delete mongoose.models.[Module];
  export const [Module]Model = mongoose.models.[Module] || mongoose.model<I[Module]>("[Module]", schema);
  ```

---

### Layer 2: Business Logic ⚙️

**4. Repository (Data Access/DAL)**
**Path:** `repositories/[module].repository.ts`
Keep pure database operations isolated from request/response contexts.
- Implement standard CRUD operations: `create`, `updateById`, `deleteById`, `findById`, `findAll`, `findPaginated`.
- Return raw objects (using methods like `.lean()` in Mongoose) where applicable to keep responses clean.
- This layer should NOT know about HTTP `req` or `res` objects.

**5. Service (Business Logic)**
**Path:** `services/[module].service.ts`
Handle the domain logic, ensuring the repository remains purely data-driven.
- Input validation checks (re-validating with Zod if necessary).
- Authorization, ownership, and role checks.
- Complex data transformations, slug generation, dependency management.
- Transaction handling if multiple database records are modified simultaneously.

---

### Layer 3: Network & API 🌐

**6. API Route Handlers**
**Path:** `app/api/[module]s/route.ts` & `app/api/[module]s/[id]/route.ts`
Expose the backend to the frontend using Next.js App Router handlers.
- **Collection Route (`/api/[module]s`)**:
  - `GET`: Fetch a list (implement pagination/filtering).
  - `POST`: Create a new record.
- **Item Route (`/api/[module]s/[id]`)**:
  - `GET`: Fetch a single record.
  - `PATCH` / `PUT`: Update a specific record.
  - `DELETE`: Remove a record.
- Always wrap handlers in an error-catching utility or middleware to ensure uniform JSON error responses and status codes.

---

### Layer 4: Client State 🔗

**7. State Management Configuration (React Query)**
**Path:** `react-query/[module]/keys.ts` & `react-query/[module]/api.ts`
Define centralized API fetcher functions and Query Keys to prevent cache collisions and typos across the app.
- Maintain query keys as arrays: `['[module]s', 'list']`, `['[module]s', 'detail', id]`.

**8. Custom Hooks**
**Path:** `hooks/query/use-[module].ts` & `hooks/mutation/use-[module].ts`
Abstract React Query (or SWR) usage completely away from UI components.
- **Queries**: `useGet[Module]s`, `useGet[Module]ById`.
- **Mutations**: `useCreate[Module]`, `useUpdate[Module]`, `useDelete[Module]`.
- **Important**: Implement cache invalidation (`queryClient.invalidateQueries`) inside mutation success callbacks. 
- Utilize Optimistic UI updates for quick interactions (like toggling boolean statuses).

---

### Layer 5: Presentation (UI) 🖥️

**9. Admin / Dashboard Components**
**Path:** `app/(admin)/[module]s/`
- `_components/[module]-form.tsx`: Reusable form component utilizing `react-hook-form` and the shared Zod schema defined in Layer 1.
- `_components/[module]-columns.tsx`: Data table column definitions (e.g., TanStack Table).
- `page.tsx`: The main list view containing the data table and "Create New" action.
- `edit/[id]/page.tsx` & `create/page.tsx`: Pages controlling the layout and fetching initial state for the forms.

**10. Public/Client Views**
**Path:** `app/(public)/[module]s/`
- Implement SSR (Server-Side Rendering) or ISR (Incremental Static Regeneration) where caching/SEO is ideal.
- Ensure loading boundaries (`loading.tsx`), standard error boundaries (`error.tsx`), and SEO metadata (`generateMetadata`) are strictly set for public consumers.

---

## 🌟 Code Quality & Best Practices

- **Type Safety Pipeline**: Your types must flow continuously from the Database ➡️ API ➡️ React Query ➡️ UI Components without using `any`. If a database column change occurs, TypeScript should catch the ripple effect across the entire stack.
- **Atomic Saves**: When creating complex entities with deep relations, save core metadata via API first before redirecting the user to a nested relationship editor or rich content editor.
- **Unified Routing for Edits**: Rely on unique `ID`-based routing for administrative CRUD operations to avoid slug collision and modification issues during edits. Slugs should primarily be used for public-facing aesthetic URLs.
- **Predictable Loading States**: Always extract and utilize `isPending` or `isLoading` from your custom hooks to show explicit global or component-level UI feedback. Always disable submission buttons during async networking operations.
- **Naming Conventions**: 
  - File names: `kebab-case` (e.g., `user-profile.tsx`)
  - React Component names: `PascalCase` (e.g., `UserProfile`)
  - Service/Repository functions: `camelCase` (e.g., `getUserById`)
  - Types/Interfaces: prefixed with `I` (e.g. `IUser`) or `Dto` (e.g. `UserDto`) appropriately.
