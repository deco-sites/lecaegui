/**
 * The code snippet below is an example.
 */

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guests = sqliteTable("guests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email"),
  confirmed: integer("confirmed", { mode: "boolean" }),
  confirmationDate: integer("confirmationDate", { mode: "timestamp" }),
  plusOne: integer("plusOne", { mode: "boolean" }),
  plusOneName: text("plusOneName"),
  role: text("role"),
});
