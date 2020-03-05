-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: kakuro
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `puzzle`
--

DROP TABLE IF EXISTS `puzzle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `puzzle` (
  `id` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `gridId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gridIdFK` (`gridId`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puzzle`
--

LOCK TABLES `puzzle` WRITE;
/*!40000 ALTER TABLE `puzzle` DISABLE KEYS */;
/*!40000 ALTER TABLE `puzzle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grid`
--

DROP TABLE IF EXISTS `grid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grid` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `width` tinyint(2) unsigned DEFAULT '3',
  `height` tinyint(2) unsigned DEFAULT '3',
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grid`
--

LOCK TABLES `grid` WRITE;
/*!40000 ALTER TABLE `grid` DISABLE KEYS */;
/*!40000 ALTER TABLE `grid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cellsets`
--

DROP TABLE IF EXISTS `cellsets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cellsets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `numCells` tinyint(1) NOT NULL DEFAULT '0',
  `setsum` tinyint(2) NOT NULL DEFAULT '0',
  `sumcellX` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `sumcellY` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `isRow` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cellsets`
--

LOCK TABLES `cellsets` WRITE;
/*!40000 ALTER TABLE `cellsets` DISABLE KEYS */;
/*!40000 ALTER TABLE `cellsets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cells`
--

DROP TABLE IF EXISTS `cells`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cells` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `X` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `Y` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `digit` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `bitmap` binary(9) DEFAULT 'ÿ\0\0\0\0\0\0\0',
  `rowset` bigint(20) unsigned NOT NULL DEFAULT '0',
  `colset` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `colsetFK` (`colset`),
  KEY `rowsetFK` (`rowset`),
  KEY `digitFK` (`digit`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cells`
--

LOCK TABLES `cells` WRITE;
/*!40000 ALTER TABLE `cells` DISABLE KEYS */;
/*!40000 ALTER TABLE `cells` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digits`
--

DROP TABLE IF EXISTS `digits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `digits` (
  `id` tinyint(1) NOT NULL AUTO_INCREMENT,
  `bitmap` binary(9) DEFAULT '\0\0\0\0\0\0\0\0\0',
  PRIMARY KEY (`id`)
) ENGINE=MEMORY AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digits`
--

LOCK TABLES `digits` WRITE;
/*!40000 ALTER TABLE `digits` DISABLE KEYS */;
INSERT INTO `digits` VALUES (1,_binary '1\0\0\0\0\0\0\0\0'),(2,_binary '2\0\0\0\0\0\0\0\0'),(3,_binary '4\0\0\0\0\0\0\0\0'),(4,_binary '8\0\0\0\0\0\0\0\0'),(5,_binary '16\0\0\0\0\0\0\0'),(6,_binary '32\0\0\0\0\0\0\0'),(7,_binary '64\0\0\0\0\0\0\0'),(8,_binary '128\0\0\0\0\0\0'),(9,_binary '256\0\0\0\0\0\0');
/*!40000 ALTER TABLE `digits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-05  0:24:24
