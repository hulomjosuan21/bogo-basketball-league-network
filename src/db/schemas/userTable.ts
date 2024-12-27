import { pgTable, uuid, text, date, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role_type", ["super", "barangayAdmin", "player", "coach"]);

export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    address: text("address"),
    phoneNumber: text("phone_number"),
    dateOfBirth: date("date_of_birth"),
    role: roleEnum("role").notNull(),
    userId: text("user_id").notNull().unique(),
    createdAt: date("created_at").defaultNow().notNull(),
    updatedAt: date("updated_at").defaultNow().notNull(),
});

export type SelectUserType = typeof usersTable.$inferSelect;
export type InsertUserType = typeof usersTable.$inferInsert;