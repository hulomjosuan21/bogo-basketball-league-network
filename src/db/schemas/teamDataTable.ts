import {pgTable, uuid, jsonb, text, integer,date} from 'drizzle-orm/pg-core';

export const teamsTable = pgTable('teamsTable', {
    id: uuid("id").defaultRandom().primaryKey(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),

    coachId: text("coachId").notNull(),
    teamId: text("teamId").notNull().unique(),
    league: jsonb('league'),
    teamName: text('teamName').notNull(),
    teamMetaData: jsonb('teamMetaData'),
    teamImage: text('teamImage'),
    status: jsonb('status'),
    subStatus: jsonb('subStatus'),
    playerIds: jsonb('playerIds'),
    gamesWon: integer('gamesWon').default(0).notNull(),
    gamesLost: integer('gamesLost').default(0).notNull(),
    gamesPlayed: integer('gamesPlayed').default(0).notNull(),
});

export type SelectTeamsTableType = typeof teamsTable.$inferSelect;
export type InsertTeamsTableType = typeof teamsTable.$inferInsert;