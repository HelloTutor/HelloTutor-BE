CREATE TABLE `tb_like` (
    `user_id` int NOT NULL,
    `free_board_id` int DEFAULT NULL,
    `free_board_comments_id` int DEFAULT NULL,
    CONSTRAINT `fk_like_free_board_comments_id` FOREIGN KEY (`free_board_comments_id`) REFERENCES `tb_free_board_comments` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_like_free_board_id` FOREIGN KEY (`free_board_id`) REFERENCES `tb_free_board` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_like_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
);
