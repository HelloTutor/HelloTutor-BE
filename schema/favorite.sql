    CREATE TABLE `tb_favorite` (
    `tutor_id` int NOT NULL,
    `user_id` int NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_tb_favorite_tutor_id` FOREIGN KEY (`tutor_id`) REFERENCES `tb_tutor` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_tb_favorite_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE
);