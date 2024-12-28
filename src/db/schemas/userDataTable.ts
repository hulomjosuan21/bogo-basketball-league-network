import { pgTable, uuid, text, date, pgEnum } from "drizzle-orm/pg-core";
import RoleTypes from "@/types/roleTypes";

export const userRoleEnum =pgEnum("role_type", [RoleTypes.Player,RoleTypes.Coach]);

export const usersDataTable = pgTable("usersData", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId").notNull().unique(),
    firstName: text("firstName").notNull(),
    lastName: text("lastName").notNull(),
    address: text("address").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    dateOfBirth: date("dateOfBirth").notNull(),
    userImage: text("userImage"),
    role: userRoleEnum("role").notNull(),
    createdAt: date("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt").defaultNow().notNull(),
});

export type SelectUserDataType = typeof usersDataTable.$inferSelect;
export type InsertUserDataType = typeof usersDataTable.$inferInsert;