import { pgTable, uuid, text, date, jsonb } from "drizzle-orm/pg-core";

export const announcementTable = pgTable("announcementTable", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    barangayId: text("barangayId").notNull(),
    description: text("description"),
    image: text("image"),
    content: jsonb("content").default({}),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

export type SelectAnnouncementType = typeof announcementTable.$inferSelect;
export type InsertAnnouncementType = typeof announcementTable.$inferInsert;