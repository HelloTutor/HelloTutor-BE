CREATE TABLE `tb_free_board` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`title` varchar(50) DEFAULT NULL,
	`content` mediumtext,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`views` int DEFAULT '0',
	`content_json` json NOT NULL,
	PRIMARY KEY (`id`),
	KEY `fk_question_board_user_id` (`user_id`),
	CONSTRAINT `fk_free_board_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_question_board_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE
);
