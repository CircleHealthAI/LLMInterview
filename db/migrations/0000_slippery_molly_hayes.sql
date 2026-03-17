CREATE TABLE `insights` (
	`documentId` text PRIMARY KEY NOT NULL,
	`summary` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
