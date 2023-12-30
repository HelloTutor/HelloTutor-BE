CREATE TABLE `tb_user` (
	`id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(50) NOT NULL,
	`pw` varchar(60) DEFAULT NULL,
	`name` varchar(50) NOT NULL,
	`nickname` varchar(50) DEFAULT NULL,
	`phone` varchar(50) DEFAULT NULL,
	`role` int NOT NULL,
	`money` int DEFAULT NULL,
	PRIMARY KEY (`id`)
)

CREATE TABLE `tb_tutee` (
	`id` int NOT NULL,
	`google_id` varchar(50) DEFAULT NULL,
	`kakao_id` varchar(50) DEFAULT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_tutee_id` FOREIGN KEY (`id`) REFERENCES `tb_user` (`id`)
)

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
)
