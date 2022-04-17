-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 17, 2022 at 12:48 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Juice-Boost`
--

-- --------------------------------------------------------

--
-- Table structure for table `Juices`
--

CREATE TABLE `Juices` (
  `ID` int(11) NOT NULL COMMENT 'The ID of the juice',
  `NAME` varchar(100) NOT NULL COMMENT 'Name of the drink',
  `INGREDIENTS` text NOT NULL COMMENT 'The ingredients of the drink',
  `BENEFITS` text NOT NULL COMMENT 'The benefits of drinking the drink',
  `HTM` text NOT NULL COMMENT 'Instructions on how to make the drink',
  `IMAGENAME` varchar(1000) NOT NULL COMMENT 'Picture of the juice'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Juices`
--

INSERT INTO `Juices` (`ID`, `NAME`, `INGREDIENTS`, `BENEFITS`, `HTM`, `IMAGENAME`) VALUES
(1, 'Apple Juice', 'Apples', 'Apple juice supports hydration, contains beneficial plant compounds, supports heart health, and protects your brain as you age.', 'Squeeze apples', 'https://tamboskitchen.com/wp-content/uploads/2020/03/apple-juice.jpg'),
(2, 'Orange Juice', 'Oranges', 'High in vitamin C, antioxidants, may improve heart health and prevent kidney stones', 'Squeeze Oranges', 'https://www.alphafoodie.com/wp-content/uploads/2020/11/Orange-Ginger-Juice-1-of-1.jpeg'),
(3, 'Strawberry Banana Smoothie', '2 cups frozen strawberries, 1 banana (room temperature), ¼ cup Greek yogurt*, 1 cup milk (or almond milk or oat milk), 1 ½ tablespoons maple syrup,½ cup ice.\r\n(Optional add-ins: 1 tablespoon almond butter, ¼ teaspoon vanilla, fresh mint leaves or basil leaves)', 'Rich in fiber, vitamins, and antioxidants', 'Place all ingredients in a blender, breaking the banana into pieces. Blend until creamy and frothy, stopping and scraping down the sides as necessary. If desired, garnish with a frozen strawberry and mint sprig. Serve immediately or store in a covered jar in the refrigerator for 2 days.', 'https://deliciouslysprinkled.com/wp-content/uploads/2020/03/THE-BEST-STRAWBERRY-BANANA-SMOOTHIE.jpg'),
(16, 'Grapefruit Juice', 'Grapefruits', 'Provides powerful antioxidants, aids in weight loss, helps you stay hydrated, and may prevent diabetes', 'Squeeze grapefruits', 'https://www.verywellhealth.com/thmb/WHPCcBCxA6e4OTeVGKvR8xnotfQ=/1414x1414/smart/filters:no_upscale()/GettyImages-634466021-28eacdafbd674656a3651383f3ec2517.jpg'),
(18, 'StarFruit Juice', 'Star Fruits', 'Great for treating respiratory infections because it cuts through phlegm', 'Squeeze Starfruits', 'http://mydeliciousblog.com/wp-content/uploads/2016/02/StarfruitJuiceinGlass.jpg'),
(19, 'Kiwi Juice', 'Kiwi', 'tastes good', 'Squeeze Kiwis', 'https://stylesatlife.com/wp-content/uploads/2019/09/Amazing-Kiwi-Juice-Benefits-For-Health-Hair-Skin.jpg.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Juices`
--
ALTER TABLE `Juices`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Juices`
--
ALTER TABLE `Juices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'The ID of the juice', AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
