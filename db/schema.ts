import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const insights = sqliteTable('insights', {
  documentId: text('documentId').primaryKey(),
  summary: text('summary').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
