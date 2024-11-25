-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 25. 09:12
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `sajtok`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sajtok`
--

CREATE TABLE `sajtok` (
  `id` int(11) NOT NULL,
  `nev` text NOT NULL,
  `tipus` text NOT NULL,
  `tejfele` text NOT NULL,
  `erlelesi_ido` text NOT NULL,
  `szarmazas` text NOT NULL,
  `iz` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `sajtok`
--

INSERT INTO `sajtok` (`id`, `nev`, `tipus`, `tejfele`, `erlelesi_ido`, `szarmazas`, `iz`) VALUES
(1, 'Cheddar', 'kemény', 'tehéntej', '6 hónap', 'Anglia', 'édes, erős'),
(2, 'Brie', 'lágy', 'tehéntej', '3 hónap', 'Franciaország', 'lágy, enyhe'),
(3, 'Gorgonzola', 'kékpenészes', 'tehéntej', '4 hónap', 'Olaszország', 'sós, erős'),
(4, 'Feta', 'friss', 'juhtej', '1 hónap', 'Görögország', 'savanyú, friss'),
(5, 'Parmesan', 'kemény', 'tehéntej', '12 hónap', 'Olaszország', 'tüzes, sós'),
(6, 'Mozzarella', 'lágy', 'bivalytej', 'nem érlelt', 'Olaszország', 'enyhe, friss'),
(7, 'Camembert', 'fehérpenészes', 'tehéntej', '3 hónap', 'Franciaország', 'krémes, enyhe'),
(8, 'Pecorino Romano', 'kemény', 'juhtej', '8 hónap', 'Olaszország', 'pikáns, sós'),
(9, 'Roquefort', 'kékpenészes', 'juhtej', '3 hónap', 'Franciaország', 'erős, fűszeres'),
(10, 'Gouda', 'kemény', 'tehéntej', '6 hónap', 'Hollandia', 'édes, diós');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `sajtok`
--
ALTER TABLE `sajtok`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `sajtok`
--
ALTER TABLE `sajtok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
