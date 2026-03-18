import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import type { insights } from './schema'

// Derived from Drizzle schema — use these for application-level typing
export type Insight = InferSelectModel<typeof insights>
export type NewInsight = InferInsertModel<typeof insights>

// Kysely Database interface — generated from the live database via kysely-codegen.
// Run `npm run db:typegen` after migrations to keep this in sync.
export type { DB as Database } from './kysely-types.generated'
