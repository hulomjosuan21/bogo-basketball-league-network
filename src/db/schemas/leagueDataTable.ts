import { pgTable, uuid, text, date, pgEnum } from 'drizzle-orm/pg-core';

export const leagueStatusEnum = pgEnum("league_status", ["Scheduled", "Ongoing", "Completed", "Canceled"]);

export const leaguesTable = pgTable('leaguesTable', {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
    barangayId: text("barangayId").notNull(),
    leagueId: text("leagueId").notNull().unique(),
    leagueName: text("leagueName").notNull(),
    status: leagueStatusEnum("status").notNull(),
    startDate: text("startDate").notNull(),
    leagueRegistrationFee: text("leagueRegistrationFee").default('0').notNull(),
    leagueImageBanner: text("leagueImageBanner"),
});

export type SelectLeaguesTableType = typeof leaguesTable.$inferSelect;
export type InsertLeaguesTableType = typeof leaguesTable.$inferInsert;