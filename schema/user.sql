CREATE TABLE `tb_user` (
	`id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`email` varchar(50) NOT NULL,
	`pw` varchar(60) DEFAULT NULL,
	`name` varchar(50) NOT NULL,
	`nickname` varchar(50) DEFAULT NULL,
	`phone` varchar(50) DEFAULT NULL,
	`role` int NOT NULL,
	`profile` varchar(255) DEFAULT NULL
);
