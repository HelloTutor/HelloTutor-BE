CREATE TABLE `tb_free_board` (
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`title`	VARCHAR(50)	NULL,
	`content` MEDIUMTEXT NULL,
	`created_at` dateTime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` dateTime DEFAULT CURRENT_TIMESTAMP,
	`views`	INT	NULL,
	CONSTRAINT `fk_free_board_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
);