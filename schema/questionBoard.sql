CREATE TABLE `tb_question_board` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` int NOT NULL,
    `subject` enum('korean','english','mathematics','social','science') NOT NULL,
    `title` varchar(50) NOT NULL,
    `content` mediumtext NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `views` int DEFAULT '0',
    `status` varchar(50) DEFAULT NULL,
    `content_json` json NOT NULL,
    CONSTRAINT `fk_question_board_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
);
