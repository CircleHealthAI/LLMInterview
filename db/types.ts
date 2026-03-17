import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { insights } from './schema';

// Derived from Drizzle schema — use these for application-level typing
export type Insight = InferSelectModel<typeof insights>;
export type NewInsight = InferInsertModel<typeof insights>;

// Kysely Database interface — derived from Drizzle's inferred types
// so db/schema.ts remains the single source of truth.
export interface Database {
  Insights: Insight;
}
