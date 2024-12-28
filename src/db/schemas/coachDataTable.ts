import {date, pgTable, text, uuid} from "drizzle-orm/pg-core";

export const coachesTable = pgTable("coachesTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().unique(),
    fullName: text("fullName").notNull(),
    coachId: text("coachId").notNull().unique(),
    teamId: text("teamId").notNull().unique(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

export type SelectCoachType = typeof coachesTable.$inferSelect;
export type InsertCoachType = typeof coachesTable.$inferInsert;