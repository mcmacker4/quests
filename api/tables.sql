DROP TABLE tasks;
DROP TABLE quests;

CREATE TABLE `quests` (
  `id` varchar(14) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(240) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tasks` (
  `position` int(3) NOT NULL,
  `title` varchar(50) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  `questId` varchar(14) NOT NULL,
  PRIMARY KEY (`questId`,`position`),
  CONSTRAINT `fk_questId` FOREIGN KEY (`questId`) REFERENCES `quests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);