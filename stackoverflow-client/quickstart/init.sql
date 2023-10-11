-- Create the 'users' table
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `refreshToken` text,
  `rating` decimal(4,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  CONSTRAINT `users_chk_4` CHECK ((char_length(`password`) >= 3))
);

-- Create the 'skills' table
CREATE TABLE `skills` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userid` bigint DEFAULT NULL,
  `skillname` varchar(255) DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
);

-- Create the 'live_users' table
CREATE TABLE `live_users` (
  `id` bigint NOT NULL,
  `status` int DEFAULT NULL,
  `webrtc_secret` text,
  `question_details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `live_users_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
);
