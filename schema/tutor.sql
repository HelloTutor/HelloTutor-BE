CREATE TABLE `tb_tutor` (
	`id` int NOT NULL,
	`introduce` varchar(255) DEFAULT NULL,
	`detailed_description` mediumtext,
	`career` int DEFAULT NULL,
	`service_price` decimal(10,0) DEFAULT NULL,
	`deal` int DEFAULT '0',
	`status` tinyint(1) DEFAULT '0',
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_tutor_id` FOREIGN KEY (`id`) REFERENCES `tb_user` (`id`)
);
