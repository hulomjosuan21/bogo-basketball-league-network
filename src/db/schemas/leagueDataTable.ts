import { pgTable, uuid, text, date, integer, pgEnum } from 'drizzle-orm/pg-core';

export const leagueStatusEnum = pgEnum("league_status", ["Scheduled", "Ongoing", "Completed", "Canceled"]);

export const leaguesTable = pgTable('leaguesTable', {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
    barangayId: text("barangayId").notNull(),
    leagueId: text("leagueId").notNull().unique(),
    leagueName: text("leagueName").notNull(),
    status: leagueStatusEnum("status").notNull(),
    startDate: date("startDate").notNull(),
    leagueRegistrationFee: integer("leagueRegistrationFee").default(0).notNull(),
    leagueImageBanner: text("leagueImageBanner"),
});

export type SelectLeaguesTableType = typeof leaguesTable.$inferSelect;
export type InsertLeaguesTableType = typeof leaguesTable.$inferInsert;