import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import type { Database } from './types'
import path from 'path'

const dbPath = path.join(process.cwd(), 'db', 'dev.db')

const dialect = new SqliteDialect({
  database: new SQLite(dbPath),
})

export const db = new Kysely<Database>({ dialect })
