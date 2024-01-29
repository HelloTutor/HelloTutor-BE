CREATE TABLE `tb_free_board_comments` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` int NOT NULL,
    `free_board_id` int NOT NULL,
    `content` mediumtext,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_free_board_comments_free_board_id` FOREIGN KEY (`free_board_id`) REFERENCES `tb_free_board` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_free_board_comments_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE
);