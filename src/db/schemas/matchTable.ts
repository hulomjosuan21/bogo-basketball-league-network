import {pgTable, integer, text, timestamp, uuid, jsonb} from "drizzle-orm/pg-core";
import {MatchStatusType} from "@/types/matchType";

export const matchesTable = pgTable("matchesTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    matchId: uuid("matchId").defaultRandom(),
    date: timestamp("date").notNull(),
    durationMinutes: integer("duration_minutes").default(90),
    location: text("location"),
    leagueId: text("leagueId").notNull(),
    bracket: text("bracket").notNull(),
    notes: text("notes").default("No additional notes"),
    status: text("status").default(MatchStatusType.ONGOING),
    statistics: jsonb("statistics").default({}),
});

export const matchTeamsTable = pgTable("matchTeamsTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    matchId: text("matchId").notNull(),
    teamId: text("teamId").notNull(),
    teamName: text("teamName").notNull(),
    score: integer("score").default(0),
    status: text("status"),
    subStatus: jsonb("subStatus").default([]),
    gamesPlayed: integer("gamesPlayed").default(0),
    gamesWon: integer("gamesWon").default(0),
    gamesLost: integer("gamesLost").default(0),
});

export type SelectMatchType = typeof matchesTable.$inferSelect;
export type InsertMatchType = typeof matchesTable.$inferInsert;

export type SelectMatchTeamType = typeof matchTeamsTable.$inferSelect;
export type InsertMatchTeamType = typeof matchTeamsTable.$inferInsert;
