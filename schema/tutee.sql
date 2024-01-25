CREATE TABLE `tb_tutee` (
	`id` int NOT NULL,
	`google_id` varchar(50) DEFAULT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_tutee_id` FOREIGN KEY (`id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE
);