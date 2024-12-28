CREATE TYPE "public"."role_type" AS ENUM('barangayAdmin');--> statement-breakpoint
CREATE TABLE "usersData" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"address" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"dateOfBirth" date NOT NULL,
	"role" "role_type" NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL,
	CONSTRAINT "usersData_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "adminData" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"barangayId" text NOT NULL,
	"barangayName" text NOT NULL,
	"address" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"role" "role_type" NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL,
	CONSTRAINT "adminData_userId_unique" UNIQUE("userId"),
	CONSTRAINT "adminData_barangayId_unique" UNIQUE("barangayId"),
	CONSTRAINT "adminData_barangayName_unique" UNIQUE("barangayName")
);
