# Module Integration Specification

This document outlines the standard process for integrating a new module (e.g., Projects, Notes, Testimonials) into the portfolio application, following the pattern established by the Blog module.

## Workflow Overview

Adding a new module involves changes across the entire stack: from database models to UI components.

---

### 1. Type Definitions
**File**: `types/[module].types.ts`
Define the core interface and Data Transfer Objects (DTOs).
- `I[Module]`: The main interface reflecting the database schema.
- `Create[Module]DTO`: Types for creating a new record (excluding auto-generated fields like `_id`, `createdAt`).
- `Update[Module]DTO`: Usually a partial of the Create DTO.

### 2. Validation Schema
**File**: `validations/[module]s.schema.ts`
Define the Zod schema for form validation and API request parsing.
- Export `[module]Schema` and `[module]FormValues`.

### 3. Database Model
**File**: `models/[module].model.ts`
Define the Mongoose schema and model.
- Use the `IBlog` interface.
- **Note**: In development, use the "force delete" pattern to ensure schema changes are applied:
  ```typescript
  if (mongoose.models.Project) delete mongoose.models.Project;
  export const ProjectModel = mongoose.models.Project || mongoose.model("Project", schema);
  ```

### 4. Repository Layer
**File**: `repositories/[module].repository.ts`
Implement raw database operations (CRUD).
- `create[Module]`, `update[Module]`, `delete[Module]`, `get[Module]`, `get[Module]s`.

### 5. Service Layer
**File**: `services/[module].service.ts`
Implement business logic (slug generation checks, permission checks, etc.).
- `create[Module]Service`, `update[Module]Service`, etc.

### 6. API Routes
**Directory**: `app/(admin)/api/[module]s/`
Implement Next.js API handlers using `apiHandler`.
- `route.ts`: `GET` (list), `POST` (create).
- `[id]/route.ts`: `GET` (by ID), `PATCH` (update), `DELETE`.
- `id/[id]/route.ts`: (Optional) specifically for ID-based fetches if `[id]` handles slugs.

### 7. React Query configuration
**File**: `react-query/[module].ts`
Define query keys and API endpoints.

### 8. Frontend Hooks
**Files**: 
- `hooks/query/use-[module].ts`: `use[Module]s`, `use[Module]ById`.
- `hooks/mutation/use-[module].ts`: `useCreate[Module]`, `useUpdate[Module]`, `useDelete[Module]`.

### 9. UI Components (Admin)
**Directory**: `app/(admin)/admin/[module]s/`
- `_components/[module]-form.tsx`: Unified form for Create/Edit metadata.
- `_components/[module]-columns.tsx`: Table column definitions with actions.
- `page.tsx`: Table view and "New" button.
- `edit/[id]/page.tsx`: Unified content editor page.

---

## Best Practices
- **Atomic Saves**: Always save metadata via API before redirecting to a full content editor.
- **Unified Routes**: Use ID-based routes for editing to avoid slug collision issues.
- **Type Safety**: Ensure Zod schemas align perfectly with TypeScript types and Mongoose schemas.
- **Loading States**: Always show `isPending` or `isLoading` states in the UI.
