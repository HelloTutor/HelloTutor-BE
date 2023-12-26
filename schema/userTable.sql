CREATE TABLE `tb_user` (
	`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`email` varchar(50) NOT NULL,
	`pw` varchar(60) NOT NULL,
	`name` varchar(50) NOT NULL,
	`nickname` varchar(50) DEFAULT NULL,
	`phone` varchar(50) DEFAULT NULL,
	`role` int NOT NULL,
	`money` int DEFAULT NULL,
)

CREATE TABLE `tb_tutee` (
	`id` INT NOT NULL PRIMARY KEY,
	CONSTRAINT `fk_tutee_id` FOREIGN KEY (`id`) REFERENCES `tb_user` (`id`)
)

CREATE TABLE `tb_tutor` (
	`id` INT NOT NULL PRIMARY KEY,
	`introduce` VARCHAR(255) NULL,
	`detailed_description` MEDIUMTEXT NULL,
	`career` INT NULL,
	`service_price` DECIMAL NULL,
	`deal` INT DEFAULT 0,
	`status` BOOLEAN DEFAULT 0,
	CONSTRAINT `fk_tutor_id` FOREIGN KEY (`id`) REFERENCES `tb_user` (`id`);
);
