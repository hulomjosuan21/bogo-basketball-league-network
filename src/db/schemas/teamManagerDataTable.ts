import {date, pgTable, text, uuid} from "drizzle-orm/pg-core";

export const teamManagerTable = pgTable("teamManagerTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().unique(),
    fullName: text("fullName").notNull(),
    teamManagerId: text("teamManagerId").notNull().unique(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

export type SelectTeamManagerType = typeof teamManagerTable.$inferSelect;
export type InsertTeamManagerType = typeof teamManagerTable.$inferInsert;