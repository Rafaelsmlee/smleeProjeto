-- drop database smlee;
CREATE DATABASE IF NOT EXISTS smlee;
USE smlee;

CREATE TABLE IF NOT EXISTS Restaurantes (
	idRestaurante INT  auto_increment,
	nome VARCHAR(50) NOT NULL,
	endereco VARCHAR(250) NOT NULL,
	cidade VARCHAR(30) NOT NULL,
	bairro VARCHAR(50) NOT NULL,
	Telefone CHAR(14)NOT NULL,
	WhatsApp CHAR(14) NOT NULL,
	Instagram VARCHAR(100) NOT NULL,
	Descricao VARCHAR(400) NOT NULL,
	Ranking DECIMAL(2,1) DEFAULT 0.0,
    
primary key(idRestaurante)
);

INSERT INTO restaurantes ( 
nome, endereco, cidade, bairro, Telefone, WhatsApp, Instagram, Descricao, Ranking)
VALUES
('Pollo Loko', 'Rua Prates, 694', 'São Paulo','Bom Retiro',  '(11)94226-1783', '(11)94226-1783', 'https://www.instagram.com/polloloko_oficial', 'Criado com a intenção de ser uma alternativas eram as pizzas e as esfihas, Pollo Loko veio para popularizar o frango frito, o casamento perfeito entre culturas com a sua mistura de temperos brasileiros com a técnica de fritura coreana! É a primeira franquia de frango frito coreano 100% brasileira!', 4.5),
('Seoul Chicken', 'R. Guarani, 127', 'São Paulo', 'Bom Retiro', '(11)91042-2801', '(11)91042-2801', 'https://www.instagram.com/seoulchickenbrasil/', 'Em um pub acolhedor do Bom Retiro, descubra um paraíso de sabores coreanos. O frango suculento e temperado brilha, enquanto a equipe atenciosa garante uma experiência memorável. Das opções crocantes aos pratos tradicionais, é uma verdadeira viagem à Coreia. Ideal para jovens em busca de uma aventura gastronômica!, .', 4.4),
('Waker Chicken', 'Rua Prates,340', 'São Paulo', 'Bom Retiro', '(11)91877-2209', '(11)91877-2209', 'https://www.instagram.com/wakerchickenbrasil/', 'Waker Chicken no Bom Retiro oferece frango frito ao estilo coreano em ambiente animado com K-pop. A suculência da carne, a crocância da fritura e os molhos apimentados que podem ser pedidos a parte surpreendem. Destaque para o mural do BTS. Uma experiência autêntica da Coreia no Brasil!', 4.8);


CREATE TABLE IF NOT EXISTS horario_funcionamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_restaurante INT,
    dias_funcionamento ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'),
    horario_abertura TIME,
    horario_fechamento TIME,
    constraint fk_restaurante_horario FOREIGN KEY (fk_restaurante) REFERENCES restaurantes(idRestaurante)
)auto_increment = 1000;


INSERT INTO horario_funcionamento (
fk_restaurante, dias_funcionamento, horario_abertura, horario_fechamento)
VALUES 
(1, 'quinta', '18:00', '23:00'),
(1, 'sexta', '18:00', '23:00'),
(1, 'sábado', '18:00', '23:00'),
(1, 'domingo', '18:00', '23:00'),
(1, 'terça', '18:00', '23:00'),
(1, 'quarta', '18:00', '23:00'),
(2, 'quinta', '17:00', '22:00'),
(2, 'sexta', '17:00', '22:00'),
(2, 'sábado', '12:00', '22:00'),
(2, 'domingo', '12:00', '20:00'),
(2, 'terça', '17:00', '22:00'),
(2, 'quarta', '17:00', '22:00'),
(3, 'quinta', '11:00', '22:00'),
(3, 'sexta', '11:00', '22:00'),
(3, 'sábado', '11:00', '22:00'),
(3, 'domingo', '11:00',  '22:00'),
(3, 'terça', '11:00', '22:00'),
(3, 'quarta', '11:00', '22:00');


CREATE TABLE IF NOT EXISTS menu_itens (
    id INT AUTO_INCREMENT,
    fk_restaurante INT,
    prato VARCHAR(100),
    menu_descricao VARCHAR(300),
    preco DECIMAL(10,2),
     PRIMARY KEY(id),
     CONSTRAINT fk_restaurante_menu FOREIGN KEY (fk_restaurante) REFERENCES restaurantes(idRestaurante)
)auto_increment=100;

INSERT INTO menu_itens (fk_restaurante, prato, menu_descricao, preco)
VALUES 
(1, 'Combo Asa G', 'Mega porção de frango frito com pedaços de Asinha E Coxinha.Acompanha porção de batata rústica e mais 4 molhos especiais.Serve até 3 pessoas', 65.00),
(1, 'Combo Pollo Loko G', 'Mega porção de frango frito com pedaços variados de Coxa, Sobrecoxa, Asinha E Coxinha. Acompanha porção de batata rústica e mais 4 molhos especiais. Serve até 4 pessoas', 65.00),
(2, 'Frango frito Yangnyom s/ osso', 'Com molho levemente apimentado agridoce - 900g Serve ate três pessoas, acompanha batata frita, nabo em conserva, salada de repolho com maionese, maionese de alho e molho barbecue.', 90.00),
(2, 'Frango frito Galbi s/ osso', 'Feito na base de shoyu levemente agridoce, acompanha batata frita, nabo em conserva, molho de alho e molho barbecue', 90.00),
(3, 'Drumete (coxinha da asa) Inteira', 'Drumete (coxinha da asa) com aprox. 900g antes da fritura. Podendo escolher entre a massa tradicional ou a massa hot', 97.90),
(3, 'Whole Chicken (Normal inteira)', 'Normal inteira(Asa, coxa, sobrecoxa e peito) Com aprox. 1,1 Kg antes da fritura.', 97.90);


