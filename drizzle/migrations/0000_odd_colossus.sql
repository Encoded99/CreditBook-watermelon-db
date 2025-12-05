CREATE TABLE `businesses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`owner_name` text,
	`password` text NOT NULL,
	`address` text,
	`phone` text,
	`email` text,
	`currency_name` text NOT NULL,
	`currency_symbol` text NOT NULL,
	`total_debt_given` real DEFAULT 0 NOT NULL,
	`total_debt_paid` real DEFAULT 0 NOT NULL,
	`total_customer` integer DEFAULT 0 NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`business_id` integer NOT NULL,
	`total_debt_given` real DEFAULT 0 NOT NULL,
	`total_debt_paid` real DEFAULT 0 NOT NULL,
	`total_debt` real DEFAULT 0 NOT NULL,
	`phone` text,
	`address` text,
	`avatar` text,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`last_transaction_at` integer,
	`deleted_at` integer,
	`due_date` integer NOT NULL,
	`reminder_days_before` integer,
	`credit_limit` real DEFAULT 0,
	`score_last_updated` integer,
	`due_reminder` integer DEFAULT 0 NOT NULL,
	`almost_due_reminder` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`business_id` integer NOT NULL,
	`customer_id` integer NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`last_transaction_at` integer,
	`reminder_days_before` integer,
	`due_date` integer NOT NULL,
	FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade
);
