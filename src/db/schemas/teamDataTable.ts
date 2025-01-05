import {pgTable, uuid, jsonb, text, integer,date} from 'drizzle-orm/pg-core';

export const teamsTable = pgTable('teamsTable', {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),

    teamManagerId: text("teamManagerId").notNull(),
    teamId: text("teamId").notNull().unique(),
    leagueIds: jsonb('leagueIds'),
    teamName: text('teamName').notNull(),
    teamMetaData: jsonb('teamMetaData'),
    teamImage: text('teamImage'),
    status: jsonb('status'),
    subStatus: jsonb('subStatus'),
    players: jsonb('players'),
    gamesWon: integer('gamesWon').default(0).notNull(),
    gamesLost: integer('gamesLost').default(0).notNull(),
    gamesPlayed: integer('gamesPlayed').default(0).notNull(),
});

export type SelectTeamsTableType = typeof teamsTable.$inferSelect;
export type InsertTeamsTableType = typeof teamsTable.$inferInsert;