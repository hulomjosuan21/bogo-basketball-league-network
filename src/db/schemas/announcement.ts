import { pgTable, uuid, text,date} from "drizzle-orm/pg-core";

export const announcementTable = pgTable("announcementTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    teamId: text("teamId").notNull().unique(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});