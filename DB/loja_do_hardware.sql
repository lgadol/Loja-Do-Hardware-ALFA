-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.37 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para loja_do_hardware
CREATE DATABASE IF NOT EXISTS `loja_do_hardware` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `loja_do_hardware`;

-- Copiando estrutura para tabela loja_do_hardware.carrinho_hardware
CREATE TABLE IF NOT EXISTS `carrinho_hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_produto` int DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `carrinho_hardware_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_hardware` (`id`),
  CONSTRAINT `carrinho_hardware_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos_hardware` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela loja_do_hardware.carrinho_hardware: ~2 rows (aproximadamente)

-- Copiando estrutura para tabela loja_do_hardware.produtos_hardware
CREATE TABLE IF NOT EXISTS `produtos_hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ativo` tinyint(1) NOT NULL DEFAULT (0),
  `nome` varchar(100) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `preco` varchar(30) DEFAULT NULL,
  `imagem_url` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela loja_do_hardware.produtos_hardware: ~9 rows (aproximadamente)
INSERT INTO `produtos_hardware` (`id`, `ativo`, `nome`, `descricao`, `preco`, `imagem_url`) VALUES
	(1, 1, 'MSI RTX 4060 TI 8GB 2X VENTUS', 'PLACA DE VIDEO RTX 4060 TI \r\nMSI COM 2 COOLERS E 8 GB', '2420', 'https://th.bing.com/th/id/OIP.YFEBYJhu1ky3zk1agjG4hwAAAA?rs=1&pid=ImgDetMain'),
	(2, 1, 'AMD RYZEN 7 5800X', 'PROCESSADOR AMD RYZEN 7 5800X\r\n3.8GHZ (4.7GHZ MAX TURBO)\r\nCACHE 36MB OCTA CORE 16 THREADS AM4\r\n', '1500', 'https://th.bing.com/th/id/OIP._qPvSq5eYRFEEQbe8WWrUwAAAA?rs=1&pid=ImgDetMain'),
	(3, 1, 'AIR COOLER RISE MODE GAMER G800', 'AIR COOLER RISE MODE GAMER G800 \r\nRGB AMD E INTEL 180MM PRETO', '69', 'https://th.bing.com/th/id/OIP.Cl4_Gkg3Z7Cm9o3QCvWFawHaHa?rs=1&pid=ImgDetMain'),
	(4, 1, 'FONTE SAFEGAMER 550W', 'FONTE SAFEGAMER 550W FULL MODULAR PFC ATIVO', '189', 'https://a-static.mlcdn.com.br/800x560/fonte-safegamer-550w-full-modular-pfc-ativo/olistplus/o2ez7pdnioggw9zl/ce1a68bf00a5c1fe53c4bbcab39d3c39.jpeg'),
	(5, 1, 'SSD ARKTEK 512GB M.2', 'SSD ARKTEK 512GB M2 PCIE NVME \r\nLEITURA 2000 MB/S GRAVAÇÃO 1600 MB/S', '199', 'https://www.arktekco.com/wp-content/uploads/2021/11/Mockup-2-512G-SSD-1.jpg'),
	(6, 1, 'GABINETE HAYOM', 'GABINETE HAYOM MID TOWER COM 4 FANS', '299', 'https://cdn.awsli.com.br/800x800/2547/2547358/produto/207713070/gabinete-gamer-hayom-gb1749-1-tgvmkx.jpg'),
	(7, 1, 'SSD WD GREEN 2TB M.2', 'SSD WD GREEN 2TB M2 PCIE NVME \r\nLEITURA 3200 MB/S GRAVAÇÃO 3000 MB/S', '830', 'https://www.uzishop.hr/290025-large_default/wd-green-sn350-nvme-ssd-2tb-m2-2280.jpg'),
	(8, 1, 'PLACA MÃE ASUS TUF GAMING B550M PLUS', 'PLACA MÃE ASUS TUF GAMING B550M PLUS \r\nAM4 MATX DDR4', '929', 'https://th.bing.com/th/id/OIP.7htp-99VxmJCsGgz3zJFTAAAAA?rs=1&pid=ImgDetMain'),
	(9, 1, 'MEMÓRIA RAM 16GB DDR4', 'MEMÓRIA RAM HYPERX 16GB RAM DDR4 2666 MHZ', '220', 'https://images6.kabum.com.br/produtos/fotos/79936/79936_1520000156_g.jpg');

-- Copiando estrutura para tabela loja_do_hardware.usuarios_hardware
CREATE TABLE IF NOT EXISTS `usuarios_hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin` tinyint(1) NOT NULL DEFAULT (0),
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `usuario` varchar(20) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `senha` varchar(64) NOT NULL,
  `rua` varchar(150) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `cidade` varchar(150) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela loja_do_hardware.usuarios_hardware: ~2 rows (aproximadamente)
INSERT INTO `usuarios_hardware` (`id`, `admin`, `ativo`, `usuario`, `nome`, `email`, `cpf`, `senha`, `rua`, `bairro`, `numero`, `cep`, `cidade`, `estado`) VALUES
	(1, 1, 1, 'root', 'USUARIO ADMIN', 'admin.user@email.com', '12345678910', 'admin', 'RUA TAL', 'CENTRO', '999', '99999000', 'NOVA PRATA', 'RS'),
	(2, 0, 1, 'userTeste', 'USUARIO TESTE', 'teste.user@email.com', '99999999999', 'teste', 'RUA TESTE', 'CENTRO', '000', '99999000', 'NOVA PRATA', 'RS');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
