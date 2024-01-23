CREATE TABLE `tb_review` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tutee_id` int NOT NULL,
    `tutor_id` int NOT NULL,
    `score` tinyint NOT NULL DEFAULT '1',
    `content` varchar(255) NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_tb_review_tutee_id` FOREIGN KEY (`tutee_id`) REFERENCES `tb_tutee` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_tb_review_tutor_id` FOREIGN KEY (`tutor_id`) REFERENCES `tb_tutor` (`id`) ON DELETE CASCADE
);