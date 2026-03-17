import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { insights } from './schema';

// Derived from Drizzle schema — use these for application-level typing
export type Insight = InferSelectModel<typeof insights>;
export type NewInsight = InferInsertModel<typeof insights>;

// Kysely Database interface — reflects raw SQLite column types as returned
// by better-sqlite3. Timestamps are integers at the wire level; Drizzle's
// mode:'timestamp' coercion only applies when querying via Drizzle ORM.
export interface Database {
  insights: {
    documentId: string;
    summary: string;
    createdAt: number;
    updatedAt: number;
  };
}
