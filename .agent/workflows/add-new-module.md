---
description: Guide for adding a new full-stack module or refactoring existing ones to the project's standard architecture.
---

# Full-Stack Module Integration Workflow

Follow these steps to integrate a new feature module using the 5-layer architecture.

## 1. Data & Types
// turbo
1. Create `types/[module].types.ts` with `I[Module]`, `Create[Module]DTO`, and `Update[Module]DTO`.
// turbo
2. Create `validations/[module]s.schema.ts` with Zod schemas and `[Module]FormValues`.
// turbo
3. Create `models/[module].model.ts` with Mongoose schema and model.

## 2. Business Logic
// turbo
4. Create `repositories/[module].repository.ts` for pure DB operations.
// turbo
5. Create `services/[module].service.ts` for domain logic and validations.

## 3. Network & API
// turbo
6. Implement API routes in `app/(admin)/api/admin/[module]s/` using `apiHandler`.

## 4. Client State
// turbo
7. Define query keys and endpoints in `react-query/[module].ts`.
// turbo
8. Create custom hooks in `hooks/query/use-[module].ts` and `hooks/mutation/use-[module].ts`.

## 5. Presentation (UI)
9. Follow the `server-entry-client-logic` skill:
   - Create a Server Component in `app/(admin)/admin/[module]s/page.tsx` for metadata.
   - Create a Client Shell in `_components/[module]-table.tsx` or similar.
   - Use `DataTableShell` for listing views.
   - Use the `frontend-design` skill to ensure a premium, non-AI aesthetic.
