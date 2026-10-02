/* Prefixed UUIDs. Generated in the application, not the database, so the
   caller knows the id before the insert and a log line says what it refers to
   without a join. */
import { randomUUID } from "node:crypto";
export const newId = (prefix) => `${prefix}_${randomUUID()}`;
