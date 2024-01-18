CREATE TABLE `tb_favorite` (
    `tutor_id` int NOT NULL,
    `user_id` int NOT NULL,
    KEY `fk_tb_favorite_tutor_id` (`tutor_id`),
    KEY `fk_tb_favorite_user_id` (`user_id`),
    CONSTRAINT `fk_tb_favorite_tutor_id` FOREIGN KEY (`tutor_id`) REFERENCES `tb_tutor` (`id`),
    CONSTRAINT `fk_tb_favorite_user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE
);