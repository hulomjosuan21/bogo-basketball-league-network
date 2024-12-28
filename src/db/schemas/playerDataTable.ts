import {pgTable, uuid, text, integer, decimal, boolean, jsonb, date} from "drizzle-orm/pg-core";

export const playersTable = pgTable("playersTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().unique(),
    fullName: text("fullName").notNull(),
    nickname: text("nickname").notNull(),
    jerseyNumber: integer("jerseyNumber").default(0).notNull(),
    playerHeight: decimal("playerHeight").default("0").notNull(),
    playerWeight: decimal("playerWeight").default("0").notNull(),
    primaryPosition: text("primaryPosition").notNull(),
    secondaryPosition: text("secondaryPosition").notNull(),
    gamesPlayed: integer("gamesPlayed").default(0).notNull(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

export const playerLeagueMetadataTable = pgTable("playerLeagueMetadataTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull(),
    leagueId: text("leagueId"),
    requirements: jsonb("requirements"),
    isAllowed: boolean("isAllowed").default(false).notNull(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

export const playerTeamMetadataTable = pgTable("playerTeamMetadata", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull(),
    teamId: text("teamId"),
    coachId: text("coachId"),
    isAllowed: boolean("isAllowed").default(false).notNull(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

export type SelectPlayerType = typeof playersTable.$inferSelect;
export type InsertPlayerType = typeof playersTable.$inferInsert;

export type SelectPlayerLeagueMetadataType = typeof playerLeagueMetadataTable.$inferSelect;
export type InsertPlayerLeagueMetadataType = typeof playerLeagueMetadataTable.$inferInsert;

export type SelectPlayerTeamMetadataType = typeof playerTeamMetadataTable.$inferSelect;
export type InsertPlayerTeamMetadataType = typeof playerTeamMetadataTable.$inferInsert;