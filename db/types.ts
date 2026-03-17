import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { insights } from './schema';

// Derived from Drizzle schema — use these for application-level typing
export type Insight = InferSelectModel<typeof insights>;
export type NewInsight = InferInsertModel<typeof insights>;

// Kysely Database interface — must be kept in sync with db/schema.ts
// Kysely with better-sqlite3 works with raw column types.
// SQLite stores timestamps as integers, so we use `number` here.
export interface Database {
  Insights: {
    documentId: string;
    summary: string;
    createdAt: number;
    updatedAt: number;
  };
}
