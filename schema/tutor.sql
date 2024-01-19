CREATE TABLE `tb_tutor` (
	`id` int NOT NULL PRIMARY KEY,
	`introduce` varchar(255) DEFAULT NULL,
	`detailed_description` mediumtext,
	`career` int DEFAULT NULL,
	`service_price` decimal(10,0) DEFAULT NULL,
	`status` tinyint(1) DEFAULT '0',
	`subject` json NOT NULL,
	`answer` int DEFAULT '0',
	`experience` json DEFAULT NULL,
	CONSTRAINT `fk_tutor_id` FOREIGN KEY (`id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE
)