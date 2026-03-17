---
name: module-integration
description: Full-stack module integration pattern based on a 5-layer architecture (Data, Logic, API, Client State, UI).
---

# full-stack Module Integration pattern

This skill guides the implementation of a new feature module following the project's strict 5-layer architecture. This ensures type safety, maintainability, and a clear separation of concerns.

## layer 1: Data & types

### 1. type Definitions
**Path:** `types/[module].types.ts`
Define the core interfaces and DTOs.

```tsx
import { Types } from "mongoose";

export interface I[Module] {
  _id: Types.ObjectId;
  title: string;
  // ... other fields
  createdAt: Date;
  updatedAt: Date;
}

export type Create[Module]DTO = Pick<I[Module], "title" | ...>;
export type Update[Module]DTO = Partial<Create[Module]DTO>;
```

### 2. Validation schemas
**Path:** `validations/[module]s.schema.ts`
Use Zod for frontend and backend validation.

```tsx
import { z } from "zod";

export const [module]Schema = z.object({
  title: z.string().min(1, "Title is required"),
  // ...
});

export type [Module]FormValues = z.infer<typeof [module]Schema>;
```

### 3. Database model
**Path:** `models/[module].model.ts`
Mongoose model with hot-reload protection.

```tsx
import mongoose, { Schema } from "mongoose";
import { I[Module] } from "@/types/[module].types";

const [module]Schema = new Schema<I[Module]>({
  title: { type: String, required: true },
  // ...
}, { timestamps: true });

export const [Module]Model = mongoose.models.[Module] || mongoose.model("[Module]", [module]Schema);
```

## layer 2: Business logic

### 4. Repository (DAL)
**Path:** `repositories/[module].repository.ts`
Pure database operations. Use `Record<string, unknown>` for flexible queries.

```tsx
export const get[Module]s = async (query: Record<string, unknown> = {}) => {
  return [Module]Model.find(query).sort({ createdAt: -1 });
};

export const create[Module] = async (data: Create[Module]DTO) => {
  return [Module]Model.create(data);
};
```

### 5. Service (Logic)
**Path:** `services/[module].service.ts`
Domain logic and validation checks.

```tsx
export const create[Module]Service = async (data: Create[Module]DTO) => {
  // logic like slug uniqueness...
  return [module]Repo.create[Module](data);
};
```

## layer 3: Network & API

### 6. API routes
**Path:** `app/(admin)/api/admin/[module]s/route.ts`
Next.js API handlers using `apiHandler`.

```tsx
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const data = await get[Module]sService();
  return NextResponse.json(data);
});
```

## layer 4: Client state

### 7. React Query config
**Path:** `react-query/[module].ts`
Centralized keys and endpoints.

```tsx
export const [module]Queries = {
  all: { key: ["[module]s", "admin"], endpoint: "/admin/[module]s" },
  // ...
};
```

### 8. custom hooks
**Path:** `hooks/query/use-[module].ts` & `hooks/mutation/use-[module].ts`
Abstract hooks for UI usage. Ensure return types are explicitly defined.

```tsx
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGet[Module]s = (): UseQueryResult<I[Module][], Error> => useQuery({
  queryKey: [module]Queries.all.key,
  queryFn: async () => (await axiosInstance.get([module]Queries.all.endpoint)).data
});
```

## layer 5: Presentation (UI)

### 9. Server entry & client shells
Follow the `server-entry-client-logic` skill.
- **`page.tsx`**: Server Entry (Metadata).
- **`_components/shell.tsx`**: Client Shell (Hooks + UI Shell).
- **`DataTableShell`**: Generalized UI for tables.

## Best Practices
- **No `any`**: Ensure types flow from DB to UI.
- **Invalidation**: Always invalidate relevant query keys in mutation `onSuccess`.
- **Naming**: `kebab-case` for files, `PascalCase` for components, `camelCase` for functions.
