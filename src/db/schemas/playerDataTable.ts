import {pgTable, uuid, text, integer, jsonb, date, pgEnum} from "drizzle-orm/pg-core";
import {GenderTypes} from "@/lib/utils";

const { Male, Female, Other } = GenderTypes;

export const genderEnum = pgEnum('gender_enum', [Male, Female, Other]);

export const playersTable = pgTable("playersTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().unique(),
    playerId: text("playerId").notNull().unique(),
    email: text("email").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    fullName: text("fullName").notNull(),
    leagueMetadata: jsonb('leagueMetadata'),
    playerImage: text('playerImage'),
    teamMetaData: jsonb('teamMetaData'),
    nickname: text("nickname").notNull(),
    gender: genderEnum("gender").notNull(),
    jerseyNumber: integer("jerseyNumber").default(0).notNull(),
    playerHeight: text("playerHeight").default("0"),
    playerWeight: text("playerWeight").default("0"),
    primaryPosition: text("primaryPosition").notNull(),
    secondaryPosition: text("secondaryPosition"),
    gamesPlayed: integer("gamesPlayed").default(0).notNull(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

// export const playerLeagueMetadataTable = pgTable("playerLeagueMetadataTable", {
//     id: uuid("id").defaultRandom().primaryKey(),
//     userId: text("userId").notNull(),
//     leagueId: text("leagueId"),
//     requirements: jsonb("requirements"),
//     isAllowed: boolean("isAllowed").default(false).notNull(),
//     createdAt: date("createdAt").defaultNow().notNull(),
//     updatedAt: date("updatedAt").defaultNow().notNull(),
// });
//
// export const playerTeamMetadataTable = pgTable("playerTeamMetadata", {
//     id: uuid("id").defaultRandom().primaryKey(),
//     userId: text("userId").notNull(),
//     teamId: text("teamId"),
//     coachId: text("coachId"),
//     isAllowed: boolean("isAllowed").default(false).notNull(),
//     createdAt: date("createdAt").defaultNow().notNull(),
//     updatedAt: date("updatedAt").defaultNow().notNull(),
// });

export type SelectPlayerType = typeof playersTable.$inferSelect;
export type InsertPlayerType = typeof playersTable.$inferInsert;

// export type SelectPlayerLeagueMetadataType = typeof playerLeagueMetadataTable.$inferSelect;
// export type InsertPlayerLeagueMetadataType = typeof playerLeagueMetadataTable.$inferInsert;
//
// export type SelectPlayerTeamMetadataType = typeof playerTeamMetadataTable.$inferSelect;
// export type InsertPlayerTeamMetadataType = typeof playerTeamMetadataTable.$inferInsert;