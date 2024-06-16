CREATE TABLE `guests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text,
	`confirmed` integer,
	`confirmationDate` integer,
	`plusOne` integer,
	`plusOneName` text
);
