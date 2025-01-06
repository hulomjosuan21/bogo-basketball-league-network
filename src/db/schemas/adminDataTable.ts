import { pgTable, uuid, text, date, boolean } from "drizzle-orm/pg-core";
import RoleTypes from "@/types/roleTypes";

export const adminDataTable = pgTable("adminData", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().unique(),
    barangayId: text("barangayId").notNull().unique(),
    barangayName: text("barangayName").notNull().unique(),
    address: text("address").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    role: text("role").default(RoleTypes.BarangayAdmin),
    barangayImage: text("barangayImage"),
    createdAt: date("createdAt").defaultNow(),
    updatedAt: date("updatedAt").defaultNow(),
    isAllowed: boolean("isAllowed").default(false)
});

export type SelectAdminDataType = typeof adminDataTable.$inferSelect;
export type InsertAdminDataType = typeof adminDataTable.$inferInsert;