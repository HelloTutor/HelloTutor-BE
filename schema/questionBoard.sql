CREATE TABLE `tb_question_board` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` int NOT NULL,
    `subject` varchar(50) NOT NULL,
    `title` varchar(50) NOT NULL,
    `content` mediumtext NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `views` int DEFAULT '0',
    `status` varchar(50) DEFAULT NULL
);