-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 07, 2014 at 11:05 AM
-- Server version: 5.5.34
-- PHP Version: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_user`
--

CREATE TABLE t_user (
  user_ID int(11) NOT NULL AUTO_INCREMENT,
  Name varchar(255) NOT NULL,
  email varchar(255),
  duedate DATE,
  PRIMARY KEY (user_ID)
);


CREATE TABLE t_lineitems (
user_ID int(11),
line_ID int(11) NOT NULL AUTO_INCREMENT,
description varchar(255) not null,
amount int(10) NOT NULL,
total int(10) NOT NULL,
PRIMARY KEY (line_ID),
FOREIGN KEY (user_ID) REFERENCES t_user(user_ID)
);

--
-- Dumping data for table `t_user`
--

INSERT INTO t_user (`user_id`, `name`, `email`, `duedate`) VALUES
(1, 'Mas Banyar', 'banyar@yahoo.com', '07-10-15'),
(2, 'Mas Mapmup', 'mapmup@gmail.com', '07-10-15'),
(4, 'Boronong', 'borononn@yahoo.com', '07-10-15'),
(5, 'Nadya Ek', 'nadya@yahoo.com', '07-10-15');

INSERT INTO t_lineitems (`user_id`, `description`, `amount`, `total`) VALUES
(1, 'Invoice1', 30, 0),
(1, 'Invoice2', 60, 0);





/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
