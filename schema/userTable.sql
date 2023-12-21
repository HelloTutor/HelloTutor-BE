CREATE TABLE `tb_user` (
	`id`	INT	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`email`	VARCHAR(50)	NOT NULL,
	`pw`	VARCHAR(50)	NOT NULL,
	`name`	VARCHAR(50)	NOT NULL,
	`nickname`	VARCHAR(50)	NOT NULL,
	`phone`	VARCHAR(50)	NOT NULL,
	`role`	INT	NOT NULL,
	`money`	INT	NOT NULL
);

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
	`status` BOOLEAN DEFAULT 0
);

ALTER TABLE `tb_tutor`
ADD CONSTRAINT `fk_tutor_id` FOREIGN KEY (`id`) REFERENCES `tb_user` (`id`);
