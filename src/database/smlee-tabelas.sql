 DROP DATABASE IF EXISTS smlee;
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
(2, 'Frango frito Yangnyom s/ osso', 'Com molho levemente apimentado agridoce - 900g Serve ate três pessoas, acompanha batata frita, nabo em conserva, salada de repolho com maionese, maionese de alho e molho barbecue.', 80.00),
(2, 'Frango frito Galbi s/ osso', 'Feito na base de shoyu levemente agridoce, acompanha batata frita, nabo em conserva, molho de alho e molho barbecue', 80.00),
(3, 'Drumete (coxinha da asa) Inteira', 'Drumete (coxinha da asa) com aprox. 900g antes da fritura. Podendo escolher entre a massa tradicional ou a massa hot', 97.90),
(3, 'Whole Chicken (Normal inteira)', 'Normal inteira(Asa, coxa, sobrecoxa e peito) Com aprox. 1,1 Kg antes da fritura.', 97.90);




CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT,
    fk_restaurante INT,
    comentario TEXT,
    avaliacao DECIMAL(2,1),
    data_insercao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id),
    CONSTRAINT review_fkrestaurante FOREIGN KEY(fk_restaurante) REFERENCES Restaurantes(idRestaurante)
);


  SELECT 
    r.idRestaurante,
    r.nome,
    r.WhatsApp,
    CONCAT(r.endereco, ', ', r.cidade, ', ', r.bairro) AS endereco_completo,
    MIN(hf.dias_funcionamento) AS primeiro_dia,
    MAX(hf.dias_funcionamento) AS ultimo_dia,
    TIME_FORMAT(MIN(hf.horario_abertura), '%H:%i') AS horario_abertura,
    TIME_FORMAT(MAX(hf.horario_fechamento), '%H:%i') AS horario_fechamento
FROM 
    Restaurantes AS r
JOIN 
    horario_funcionamento hf ON r.idRestaurante = hf.fk_restaurante
GROUP BY 
    r.idRestaurante, r.nome, r.WhatsApp, endereco_completo
ORDER BY 
    r.nome;



       SELECT 
            r.idRestaurante,
            r.nome,
            GROUP_CONCAT(DISTINCT hf.dias_funcionamento ORDER BY FIELD(hf.dias_funcionamento, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo')) AS dias_funcionamento,
            GROUP_CONCAT(DISTINCT CONCAT(hf.dias_funcionamento, ': ', hf.horario_abertura, ' - ', hf.horario_fechamento) ORDER BY FIELD(hf.dias_funcionamento, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo')) AS horarios,
            r.WhatsApp,
            CONCAT(r.endereco, ', ', r.cidade, ', ', r.bairro) AS endereco_completo
        FROM 
            Restaurantes AS r
        JOIN 
            horario_funcionamento hf ON r.idRestaurante = hf.fk_restaurante
        GROUP BY 
            r.idRestaurante, r.nome, r.WhatsApp, endereco_completo
        ORDER BY 
            r.nome;

CREATE TABLE usuario (
id INT AUTO_INCREMENT,
nome VARCHAR(50),
PRIMARY KEY (id)
);


CREATE TABLE perguntas (
id INT AUTO_INCREMENT,
pergunta VARCHAR(100) NOT NULL,

PRIMARY KEY (id)
);

CREATE TABLE alternativas (
id INT AUTO_INCREMENT,
resposta VARCHAR(45) NOT NULL,
fkPerguntas INT NOT NULL,

PRIMARY KEY (id),
FOREIGN KEY (fKPerguntas) REFERENCES perguntas (id)

);

CREATE TABLE alternativa_escolhida (
id INT AUTO_INCREMENT,
fkUsuario INT NOT NULL,
fkPerguntas INT NOT NULL,
fkAlternativas INT NOT NULL,

PRIMARY KEY (id),
FOREIGN KEY (fkUsuario) REFERENCES usuario (id),
FOREIGN KEY (fKPerguntas) REFERENCES perguntas (id),
FOREIGN KEY (fkAlternativas) REFERENCES alternativas (id)

);


INSERT INTO usuario
(nome)
VALUES
('Betina'),
('Cláudio'),
('Paula');

INSERT INTO perguntas
(pergunta)
VALUES
('Você prefere um toque picante ou algo mais suave?'),
('Em qual tipo de ambiente você gostaria de aproveitar a sua refeição?'),
('Você já tem um orçamento em mente?'),
('Qual o molho que você mais gostaria de experimentar? '),
('Você já foi em algum dos restaurantes recomendados? Qual?');

INSERT INTO alternativas
(resposta, fKPerguntas)
VALUES
('Suave', 1),
('Moderado', 1),
('Picante', 1),

('Familiar', 2),
('Casual', 2),
('Fast-food', 2),

('Até R$70.00', 3),
('Até R$80.00', 3),
('Até R$100.00', 3),

('Yangnyom(Apimentado agridoce)', 4),
('Galbi(Shoyo agridoce)' , 4),
('Honey Garlic(Mel e alho) coreano', 4),
('Spicy(Apimentado)',4),

('Pollo Loko', 5),
('Seoul Chicken' , 5),
('Waker Chicken',5),
('Não! É a minha primeira vez', 5);

INSERT INTO alternativa_escolhida
(fkUsuario, fkAlternativas, fKPerguntas)
VALUES
(1, 3, 1),
(1, 5, 2),
(1, 7, 3),
(1, 12, 4),
(1, 17,5),


(2, 1, 1),
(2, 4, 2),
(2, 9, 3),
(2, 11, 4),
(2, 17,5),

(3, 2, 1),
(3, 4, 2),
(3, 8, 3),
(3, 10, 4),
(3, 17,5);


SELECT u.nome,
COUNT(altEsc.fkAlternativas) AS total_perg1, altEsc.fkAlternativas, 
altEsc.fKPerguntas
 FROM alternativa_escolhida AS altEsc 
 INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
 INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id
 INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id
 WHERE altEsc.fKPerguntas = 1 
 AND altEsc.fkAlternativas IN (1, 2, 3)
 GROUP BY  u.nome, altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
 
 SELECT  u.nome,
 COUNT(altEsc.fkAlternativas) AS total_perg2, altEsc.fkAlternativas, 
 altEsc.fKPerguntas 
 FROM alternativa_escolhida AS altEsc 
 INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
 INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
 INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
 WHERE altEsc.fKPerguntas = 2
 AND altEsc.fkAlternativas IN (4, 5, 6) 
 GROUP BY  u.nome,altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
 
 
  SELECT u.nome,
COUNT(altEsc.fkAlternativas) AS total_perg3, altEsc.fkAlternativas, 
 altEsc.fKPerguntas 
 FROM alternativa_escolhida AS altEsc 
 INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
 INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
 INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
 WHERE altEsc.fKPerguntas = 3
 AND altEsc.fkAlternativas IN (7, 8, 9) 
 GROUP BY  u.nome, altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
 
   SELECT COUNT(altEsc.fkAlternativas) AS total_perg4, altEsc.fkAlternativas, 
 altEsc.fKPerguntas 
 FROM alternativa_escolhida AS altEsc 
 INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
 INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
 INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
 WHERE altEsc.fKPerguntas = 4
 AND altEsc.fkAlternativas IN (10, 11, 12, 13) 
 GROUP BY altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;
 
 
 SELECT COUNT(altEsc.fkAlternativas) AS total_perg5, altEsc.fkAlternativas, 
 altEsc.fKPerguntas 
 FROM alternativa_escolhida AS altEsc 
 INNER JOIN alternativas AS a ON altEsc.fkAlternativas = a.id 
 INNER JOIN perguntas AS q ON altEsc.fKPerguntas = q.id 
 INNER JOIN usuario AS u ON altEsc.fkUsuario = u.id 
 WHERE altEsc.fKPerguntas = 5
 AND altEsc.fkAlternativas IN (14, 15, 16, 17) 
 GROUP BY altEsc.fkAlternativas, altEsc.fKPerguntas ORDER BY altEsc.fkAlternativas;

-- 

   SELECT u.nome, GROUP_CONCAT(a.resposta ORDER BY ae.fkPerguntas) AS respostas
        FROM alternativa_escolhida ae
        JOIN usuario u ON ae.fkUsuario = u.id
        JOIN alternativas a ON ae.fkAlternativas = a.id
        GROUP BY u.id, u.nome;


 