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
('Seoul Chicken', 'R. Guarani, 127', 'São Paulo', 'Bom Retiro', '(11)91042-2801', '(11)91042-2801', 'https://www.instagram.com/seoulchickenbrasil/', 'Venha conhecer o melhor pub coreano! Descubra um paraíso de sabores! O frango suculento temperado made in Korea vai te surpreender! Das opções crocantes aos pratos tradicionais, uma verdadeira viagem à Coreia. Ideal para jovens em busca de uma aventura gastronômica!, .', 4.4),
('Waker Chicken', 'Rua Prates,340', 'São Paulo', 'Bom Retiro', '(11)91877-2209', '(11)91877-2209', 'https://www.instagram.com/wakerchickenbrasil/', 'Oferece frango frito ao estilo coreano em um ambiente muito animado com bastante K-pop. A suculência da carne, a crocância da fritura e os molhos apimentados que podem ser pedidos a parte surpreendem. Fica um destaque para o mural do BTS na entrada do estabelcimento. Uma experiência autêntica da Coreia no Brasil!', 4.8);


CREATE TABLE IF NOT EXISTS horario_funcionamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_restaurante INT,
    dias_funcionamento ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'),
    horario_abertura TIME,
    horario_fechamento TIME,
    constraint fk_restaurante_horario FOREIGN KEY (fk_restaurante) REFERENCES restaurantes(idRestaurante)
);


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
);

INSERT INTO menu_itens (fk_restaurante, prato, menu_descricao, preco)
VALUES 
(1, 'Combo Asa G', 'Mega porção de frango frito com pedaços de Asinha E Coxinha.Acompanha porção de batata rústica e mais 4 molhos especiais.Serve até 3 pessoas', 65.00),
(1, 'Combo Pollo Loko G', 'Mega porção de frango frito com pedaços variados de Coxa, Sobrecoxa, Asinha E Coxinha. Acompanha porção de batata rústica e mais 4 molhos especiais. Serve até 4 pessoas', 65.00),
(2, 'Frango frito Yangnyom s/ osso', 'Com molho levemente apimentado agridoce - 900g Serve ate três pessoas, acompanha batata frita, nabo em conserva, salada de repolho com maionese, maionese de alho e molho barbecue.', 90.00),
(2, 'Frango frito Galbi s/ osso', 'Feito na base de shoyu levemente agridoce, acompanha batata frita, nabo em conserva, molho de alho e molho barbecue', 90.00),
(3, 'Drumete (coxinha da asa) Inteira', 'Drumete (coxinha da asa) com aprox. 900g antes da fritura. Podendo escolher entre a massa tradicional ou a massa hot', 97.90),
(3, 'Whole Chicken (Normal inteira)', 'Normal inteira(Asa, coxa, sobrecoxa e peito) Com aprox. 1,1 Kg antes da fritura.', 97.90);

CREATE TABLE ImagensRestaurante (
    id INT AUTO_INCREMENT,
    fk_restaurante INT,
    nomeImagem VARCHAR(50),
    imagem BLOB,
    
    primary key(id),
    CONSTRAINT fk_restaurante_img FOREIGN KEY ( fk_restaurante) REFERENCES Restaurantes(idRestaurante)
);

INSERT INTO ImagensRestaurante (fk_restaurante, nomeImagem, imagem) VALUES
(1, 'logopolloloko', LOAD_FILE('public/assets/invitation/polloLoko/logo2.jpg')),
(1, 'polloloko_img1', LOAD_FILE('/caminho/para/sua/imagem/restaurante1_img1.jpg')),
(1, 'polloloko_img2', LOAD_FILE('/caminho/para/sua/imagem/restaurante1_img2.jpg')),
(1, 'polloloko_img3', LOAD_FILE('/caminho/para/sua/imagem/restaurante1_img3.jpg')),
(2, 'logoseoulchicken', LOAD_FILE('/caminho/para/sua/imagem/restaurante2_img1.jpg')),
(2, 'seoulchicken_img1', LOAD_FILE('/caminho/para/sua/imagem/restaurante2_img1.jpg')),
(2, 'seoulchicken_img2', LOAD_FILE('/caminho/para/sua/imagem/restaurante2_img2.jpg')),
(2, 'seoulchicken_img3', LOAD_FILE('/caminho/para/sua/imagem/restaurante2_img3.jpg')),
(3, 'logowakerchicken', LOAD_FILE('/caminho/para/sua/imagem/restaurante3_img1.jpg')),
(3, 'wakerchicken_img1', LOAD_FILE('/caminho/para/sua/imagem/restaurante3_img1.jpg')),
(3, 'wakerchicken_img2', LOAD_FILE('/caminho/para/sua/imagem/restaurante3_img2.jpg')),
(3, 'wakerchicken_img3', LOAD_FILE('/caminho/para/sua/imagem/restaurante3_img3.jpg'));


SELECT 
    m.id, 
    m.prato, 
    m.menu_descricao, 
    m.preco
FROM menu_itens as m
JOIN Restaurantes as r on  m.fk_restaurante = r.idRestaurante;

  SELECT 
        r.idRestaurante,
        r.nome, 
        r.endereco, 
        r.cidade, 
        r.bairro, 
        r.Telefone, 
        r.WhatsApp, 
        r.Instagram,
        r. Descricao, 
        r.Ranking
FROM Restaurantes AS r;
    
SELECT 
        r.idRestaurante,
        r.nome,
        r.descricao
FROM Restaurantes AS r
WHERE r.idRestaurante IN (1, 2, 3);
    
SELECT
	r.idRestaurante, 
    r.nome, 
    img.imagem
FROM ImagensRestaurante AS img
	JOIN Restaurantes AS r ON   r.idRestaurante = img.fk_restaurante
    WHERE r.idRestaurante IN (1,2,3 );
    
    
    -- ORDER BY FIELD = Ordena pela sequência, visto que no meu insert estava desorganizado
    
    SELECT 
    r.idRestaurante,
    r.nome,
    GROUP_CONCAT(DISTINCT hf.dias_funcionamento ORDER BY FIELD(hf.dias_funcionamento, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo')) AS dias_funcionamento,
    r.WhatsApp,
    CONCAT(r.endereco, ', ', r.cidade, ', ', r.bairro) AS endereco_completo
FROM 
    Restaurantes AS r
JOIN 
    horario_funcionamento hf ON r.idRestaurante = hf.fk_restaurante
LEFT JOIN (
    SELECT 'Segunda' AS dia_semana UNION
    SELECT 'Terça' UNION
    SELECT 'Quarta' UNION
    SELECT 'Quinta' UNION
    SELECT 'Sexta' UNION
    SELECT 'Sábado' UNION
    SELECT 'Domingo'
) AS d ON d.dia_semana NOT IN (
    SELECT hf_inner.dias_funcionamento
    FROM horario_funcionamento hf_inner
    WHERE hf_inner.fk_restaurante = r.idRestaurante
)
GROUP BY 
    r.idRestaurante, r.nome, r.WhatsApp, endereco_completo
ORDER BY 
    r.nome;
    
    
      SELECT 
r.idRestaurante, 
r.nome,
    CONCAT(r.endereco, ', ', r.cidade, ', ', r.bairro) AS endereco_completo
FROM 
    Restaurantes AS r
JOIN 
    horario_funcionamento hf ON r.idRestaurante = hf.fk_restaurante
GROUP BY 
    r.idRestaurante, endereco_completo
ORDER BY 
    r.nome;


    
    
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);




CREATE TABLE perguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuarios(id)
);


CREATE TABLE respostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resposta TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    fkPergunta INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (fkPergunta) REFERENCES perguntas(id)
);


INSERT INTO usuarios (nome, email, senha) VALUES
('João da Silva', 'joao@gmail.com', 'senha123'),
('Maria Oliveira', 'maria@gmail.com', 'senha456'),
('Carlos Pereira', 'carlos@gmail.com', 'senha789');

INSERT INTO perguntas (titulo, descricao, fkUsuario) VALUES
('Como fazer frango frito crocante?', 'Gostaria de saber a melhor receita para fazer frango frito crocante.', 1),
('Qual o segredo do tempero coreano?', 'Quais são os ingredientes essenciais para o frango frito coreano?', 2);


INSERT INTO respostas (resposta, fkUsuario, fkPergunta) VALUES
('O segredo é usar farinha de arroz e fritar duas vezes.', 2, 1),
('Use molho de soja, alho, e gengibre para temperar.', 3, 2);

SELECT 
    r.id AS id_resposta,
    r.resposta,
    r.data_criacao AS data_resposta,
    u.nome AS nome_usuario,
    p.titulo AS titulo_pergunta
FROM 
    respostas r
JOIN 
    usuarios u ON r.fkUsuario = u.id
JOIN 
    perguntas p ON r.fkPergunta = p.id;